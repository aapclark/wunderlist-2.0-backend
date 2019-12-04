const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

const checkJwt = jwt({

  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwskRequestsPerMinute: 5,
    jwksUri: `https://apclark.auth0.com/.well-known/jwks.json`
  }),

  audience: 'YOUR_API_IDENTIFIER',
  issue: 'https://apclark.auth0.com/',
  algorithms: [`RS256`]
});

// incorporate ability to pass in strings defining authnorizations
const checkScopes = jwtAuthz(['read:messages']);



module.exports = {
  checkJwt,
  checkScopes
};
