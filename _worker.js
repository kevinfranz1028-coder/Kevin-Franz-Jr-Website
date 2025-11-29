/**
 * Main Cloudflare Worker for Kevin Franz Jr. Website
 * Handles routing for OAuth authentication and static assets
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Debug endpoint to check environment variables
    if (pathname === '/debug-env') {
      return new Response(JSON.stringify({
        hasClientId: !!env.GITHUB_OAUTH_CLIENT_ID,
        hasClientSecret: !!env.GITHUB_OAUTH_CLIENT_SECRET,
        clientIdLength: env.GITHUB_OAUTH_CLIENT_ID?.length || 0,
        clientSecretLength: env.GITHUB_OAUTH_CLIENT_SECRET?.length || 0,
        allEnvKeys: Object.keys(env)
      }, null, 2), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Route OAuth endpoints
    if (pathname === '/auth') {
      return handleAuth({ request, env, ctx });
    }

    if (pathname === '/callback') {
      return handleCallback({ request, env, ctx });
    }

    // Handle static assets (served from _site directory)
    // This is handled automatically by Cloudflare Workers with assets configuration
    return env.ASSETS.fetch(request);
  }
};

/**
 * OAuth Authorization Endpoint for Decap CMS + GitHub
 * Handles the initial OAuth request
 */
async function handleAuth(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  console.log('Auth endpoint called');
  console.log('Environment variables:', {
    hasClientId: !!env.GITHUB_OAUTH_CLIENT_ID,
    hasClientSecret: !!env.GITHUB_OAUTH_CLIENT_SECRET
  });

  // Get OAuth app credentials from environment variables
  const clientId = env.GITHUB_OAUTH_CLIENT_ID;

  if (!clientId) {
    const errorHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Configuration Error</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      background: #f5f5f5;
    }
    .error {
      text-align: center;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      max-width: 600px;
    }
    .error h2 {
      color: #e74c3c;
      margin-bottom: 1rem;
    }
    .error ol {
      text-align: left;
      margin: 1rem 0;
    }
    .error code {
      background: #f8f9fa;
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <div class="error">
    <h2>⚠️ GitHub OAuth Not Configured</h2>
    <p>Please set up the following in Cloudflare Pages:</p>
    <ol>
      <li>Create a GitHub OAuth App at <a href="https://github.com/settings/developers" target="_blank">github.com/settings/developers</a></li>
      <li>Set callback URL to: <code>https://kevin-franz-jr.kevinfranz1028.workers.dev/callback</code></li>
      <li>Add environment variables in Cloudflare Pages Settings:
        <ul>
          <li><code>GITHUB_OAUTH_CLIENT_ID</code></li>
          <li><code>GITHUB_OAUTH_CLIENT_SECRET</code></li>
        </ul>
      </li>
    </ol>
    <p><a href="/admin/">← Back to Admin</a></p>
  </div>
</body>
</html>`;
    return new Response(errorHtml, {
      status: 500,
      headers: { 'Content-Type': 'text/html;charset=UTF-8' }
    });
  }

  // Get the callback URL
  const redirectUri = `${url.origin}/callback`;

  // Build GitHub OAuth URL
  const authUrl = new URL('https://github.com/login/oauth/authorize');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('scope', 'repo,user');

  // Redirect to GitHub OAuth
  return Response.redirect(authUrl.toString(), 302);
}

/**
 * OAuth Callback Endpoint for Decap CMS + GitHub
 * Handles the OAuth callback and exchanges code for token
 */
async function handleCallback(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Get OAuth credentials from environment variables
  const clientId = env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = env.GITHUB_OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new Response('GitHub OAuth not configured. Please set GITHUB_OAUTH_CLIENT_ID and GITHUB_OAUTH_CLIENT_SECRET in Cloudflare Pages settings.', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }

  // Get the authorization code from the callback
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('No authorization code provided', {
      status: 400,
      headers: { 'Content-Type': 'text/plain' }
    });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code
      })
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      throw new Error(tokenData.error_description || tokenData.error);
    }

    // Serialize token data for embedding in HTML
    const tokenDataJSON = JSON.stringify(tokenData);

    // Return HTML that sends the token to the parent window (Decap CMS)
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Authorizing...</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      background: #f5f5f5;
    }
    .message {
      text-align: center;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .spinner {
      border: 3px solid #f3f3f3;
      border-top: 3px solid #3498db;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div class="message">
    <div class="spinner"></div>
    <h2>Authorization successful!</h2>
    <p>Redirecting back to CMS...</p>
  </div>
  <script>
    (function() {
      var tokenData = ${tokenDataJSON};

      function receiveMessage(message) {
        window.opener.postMessage(
          'authorization:github:success:' + JSON.stringify(tokenData),
          message.origin
        );
        window.removeEventListener('message', receiveMessage, false);
      }
      window.addEventListener('message', receiveMessage, false);

      window.opener.postMessage('authorizing:github', '*');

      setTimeout(function() {
        window.close();
      }, 1000);
    })();
  </script>
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html;charset=UTF-8'
      }
    });

  } catch (error) {
    console.error('OAuth error:', error);

    const errorHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Authorization Error</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      background: #f5f5f5;
    }
    .error {
      text-align: center;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      max-width: 400px;
    }
    .error h2 {
      color: #e74c3c;
    }
  </style>
</head>
<body>
  <div class="error">
    <h2>Authorization Failed</h2>
    <p>${error.message}</p>
    <p><a href="/admin/">Return to CMS</a></p>
  </div>
</body>
</html>`;

    return new Response(errorHtml, {
      status: 500,
      headers: {
        'Content-Type': 'text/html;charset=UTF-8'
      }
    });
  }
}
