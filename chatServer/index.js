module.exports = (io) => {
  var chatServer = require('./chat');
  new chatServer(io);
}
