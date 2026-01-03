/**
 * Debug endpoint to check environment variables
 * Access at: /debug-env
 */

export async function onRequest(context) {
  const { env } = context;

  // Check for OAuth credentials
  const clientId = env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = env.GITHUB_OAUTH_CLIENT_SECRET;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Environment Debug</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
      background: #f5f5f5;
    }
    .container {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h1 {
      margin-top: 0;
    }
    .status {
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
    }
    .success {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }
    .error {
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }
    .info {
      background: #d1ecf1;
      color: #0c5460;
      border: 1px solid #bee5eb;
      margin-top: 2rem;
    }
    code {
      background: #f8f9fa;
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-family: monospace;
    }
    ul {
      margin: 0.5rem 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔍 Environment Variables Debug</h1>

    <div class="status ${clientId && clientSecret ? 'success' : 'error'}">
      <h2>${clientId && clientSecret ? '✅ OAuth Configured' : '❌ OAuth NOT Configured'}</h2>
      <ul>
        <li><code>GITHUB_OAUTH_CLIENT_ID</code>: ${clientId ? '✅ Set (' + clientId.substring(0, 8) + '...)' : '❌ NOT SET'}</li>
        <li><code>GITHUB_OAUTH_CLIENT_SECRET</code>: ${clientSecret ? '✅ Set (' + clientSecret.substring(0, 4) + '***...)' : '❌ NOT SET'}</li>
      </ul>
    </div>

    ${!clientId || !clientSecret ? `
    <div class="info">
      <h3>⚠️ Environment Variables Missing</h3>
      <p>The OAuth environment variables are not set in your Cloudflare Pages deployment.</p>
      <p><strong>What to do:</strong></p>
      <ol>
        <li>Go to <a href="https://dash.cloudflare.com" target="_blank">Cloudflare Dashboard</a></li>
        <li>Navigate to: Workers & Pages → Your site → Settings → Environment variables</li>
        <li>Add both variables for <strong>Production</strong> AND <strong>Preview</strong> environments</li>
        <li><strong>IMPORTANT:</strong> After saving, trigger a new deployment:
          <ul>
            <li>Go to the Deployments tab</li>
            <li>Click "Retry deployment" on the latest deployment, OR</li>
            <li>Make any commit and push to trigger a new build</li>
          </ul>
        </li>
      </ol>
      <p><em>Environment variables only take effect on NEW deployments, not existing ones!</em></p>
    </div>
    ` : `
    <div class="info">
      <h3>✅ Configuration Looks Good!</h3>
      <p>OAuth environment variables are properly set. You should be able to log in to the CMS.</p>
      <p><a href="/admin/">Go to CMS Admin →</a></p>
    </div>
    `}

    <p style="margin-top: 2rem; text-align: center;">
      <a href="/">← Back to Home</a>
    </p>
  </div>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html;charset=UTF-8'
    }
  });
}
