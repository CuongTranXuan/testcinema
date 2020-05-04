//using jwt for authentication

const expressJwt = require('express-jwt');
const config = require('../config/config.json');
const userService = require('../user/userService.js');
const { pathToRegexp, match, parse, compile } = require("path-to-regexp");
module.exports = jwt;

function jwt() {
    const secret = config.secret;
    const unprotected = [// public routes that don't require authentication
    '/user/authenticate',
    '/user/register',
    '/films',
    pathToRegexp('/films/:id',[]),
    ];
    return expressJwt({ secret, isRevoked }).unless({
        path: unprotected
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);
    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};