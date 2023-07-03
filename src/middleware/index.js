const jwt = require('jsonwebtoken')
const flash = require('flash');
const userController = require('../controller/userController');

const initLocals = (req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.errors = req.flash('error');
    res.locals.infos = req.flash('info');
    next();
  };

const isAuthenticated = async (req, res, next) => {
    const { access_token } = req.cookies;
    const msg = 'Você precisa se autenticar para acessar essa página.';
  
    if (access_token) {
      try {
        const [, token] = access_token.split(' ');
        await jwt.verify(token, process.env.SECRET);
  
        return next();
      } catch (error) {
        req.session.user = null;
        req.flash('info', msg);
        return userController.renderLogin(req, res)
      }
    } else {
      req.session.user = null;
      req.flash('info', msg);
      return userController.renderLogin(req, res)
    }
  };

module.exports = {initLocals, isAuthenticated}