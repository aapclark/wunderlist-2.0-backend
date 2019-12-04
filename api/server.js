const express = require('express');
const configureMiddleware = require(`./middleware-config`);
const { checkJwt, checkScopes } = require(`../middleware/checkJwt`);

const server = express();
configureMiddleware(server);


// public route
server.get('/public', (req, res) => {
  res.json({ message: `API is runing.` })
});

// private route with checkJwt
server.get('/private', checkJwt, (req, res) => {
  res.json({ message: `You have reached a private endpoint.` })
});

server.get(`/auth`, checkJwt, checkScopes, (req, res) => {
  res.json({
    message: `You have reached a private that requires the scope of read:messages to view.`
  })
})


module.exports = server
