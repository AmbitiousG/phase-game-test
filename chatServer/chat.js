var socketioJwt = require('socketio-jwt');
var secretkey = require('../utils/auth').secretkey;

class chatServer{
  constructor(io) {
    this.io = io;
    this.clients = [];
    io.use('authorization', socketioJwt.authorize({
      secret: secretkey,
      handshake: true
    }));

    this.init();
  }

  init(){
    this.io.on('connection', socket => {
      console.log(socket.decoded_token);
      this.addClient(socket);
    })
  }

  addClient(socket) {
    console.log(socket);
    this.clients.push(socket);
  }
}

module.exports = chatServer;