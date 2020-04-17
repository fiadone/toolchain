const session = require('express-session')
const uuid = require('uuid').v4

module.exports = session({
  genid: () => uuid(),
  secret: process.env.SESSION_SECRET,
  name: process.env.COOKIE_NAME,
  resave: false,
  saveUninitialized: true,
  cookie: {
    domain: process.env.COOKIE_DOMAIN,
    secure: process.env.NODE_ENV === 'production',
    maxAge: process.env.COOKIE_MAX_AGE
  }
})
