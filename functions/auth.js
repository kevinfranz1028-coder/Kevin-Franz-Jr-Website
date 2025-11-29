/**
 * OAuth Authorization Endpoint for Decap CMS + GitHub
 * Handles the initial OAuth request
 */

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Get OAuth app credentials from environment variables
  const clientId = env.GITHUB_OAUTH_CLIENT_ID;

  if (!clientId) {
    return new Response('GitHub OAuth not configured. Please set GITHUB_OAUTH_CLIENT_ID in Cloudflare Pages settings.', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
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
