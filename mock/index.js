const user = require('./user.js')
const message = require('./message.js')
const manage = require('./manage.js')

module.exports = {
  ...user,
  ...message,
  ...manage,
}
