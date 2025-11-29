/**
 * Main Cloudflare Worker for Kevin Franz Jr. Website
 * Handles routing for OAuth authentication and static assets
 */

import { onRequest as authHandler } from './functions/auth.js';
import { onRequest as callbackHandler } from './functions/callback.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Route OAuth endpoints
    if (pathname === '/auth') {
      return authHandler({ request, env, ctx });
    }

    if (pathname === '/callback') {
      return callbackHandler({ request, env, ctx });
    }

    // Handle static assets (served from _site directory)
    // This is handled automatically by Cloudflare Workers with assets configuration
    return env.ASSETS.fetch(request);
  }
};
