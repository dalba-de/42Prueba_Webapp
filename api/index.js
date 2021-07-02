const express = require("express");
session = require('express-session');
const app = express();
var cors = require('cors');
app.use(cors());
const axios = require('axios');
path = require('path');
const fs = require('fs');
app.use(session({
  secret: '1234567890QWERTY',
  resave: true,
  saveUninitialized: false
}));

var ClientOAuth2 = require('client-oauth2')
require('dotenv').config()

var auth = new ClientOAuth2({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  accessTokenUri: process.env.ACCESS_TOKEN_URI,
  authorizationUri: process.env.AUTHORIZATION_URI,
  redirectUri: process.env.REDIRECT_URI
})

app.get('/', function (req, res) {
    return {url: process.env.FORTYTWO_GET_CODE_URI, statusCode: 302};
})

app.get('/callback', function (req, res) {
  auth.code.getToken(req.originalUrl) .then(function (user) {
		// Refresh the current users access token.
		user.refresh().then(function (updatedUser) {
      req.session.token = updatedUser.accessToken;
      var token = req.session.token;
      console.log(token)
		  axios.get("https://api.intra.42.fr/v2/me", {
			  headers: {
				'Authorization': 'Bearer ' + token
			  }
			}).then(function (response) {
				let data = JSON.stringify(response.data);
				res.send(data);
			})
		})
	})
})

app.listen(3000);