const { login } = require('./login.service')
const { logout } = require('./logout.service')
const { resetPass } = require('./resetPass.service')

module.exports = {
  login,
  logout,
  resetPass
}
