// Extract the access token from the GitHub response
const accessToken = response.access_token;

// Format it for Decap CMS
const formattedToken = {
  provider: 'GitHub',
  access_token: accessToken
};

// Use the formatted token as needed
