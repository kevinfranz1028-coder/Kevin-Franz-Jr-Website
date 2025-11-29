/**
 * OAuth Callback Endpoint for Decap CMS + GitHub
 * Handles the OAuth callback and exchanges code for token
 */

export async function onRequest(context) {
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
      function receiveMessage(message) {
        window.opener.postMessage(
          `authorization:github:success:${JSON.stringify(tokenData)}`,
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
