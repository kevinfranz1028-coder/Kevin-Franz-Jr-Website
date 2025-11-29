/**
 * OAuth Authorization Endpoint for Decap CMS + GitHub
 * Handles the initial OAuth request
 */

export async function onRequest(context) {
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
