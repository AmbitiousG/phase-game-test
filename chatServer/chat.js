var socketioJwt = require('../utils/socketio-auth');
var secretkey = require('../utils/auth').secretkey;

class chatServer{
  constructor(io) {
    this.io = io;
    // this.clients = [];
    io.use(socketioJwt.authenticate({
      secret: secretkey
    }, (payload, done) => {
      // console.log(payload);
      return done(null, payload)
    }));

    this.init();
  }

  init(){
    this.io.on('connection', socket => {
      // console.log(socket.request.user);
      this.addClient(socket);
      this.io.emit('login', {user: socket.request.user});
    });

    // this.io.on('')
  }

  addClient(socket) {
    // console.log(socket);
    // this.clients.push(socket);
    socket.on('new chat message', message => {
      console.log(`message from ${socket.request.user.username}: ${message}`);
      this.io.emit('new chat message', {message, user: socket.request.user});
    });

    socket.on('disconnect', reason => {
      console.log(reason);
      this.io.emit('logout', {user: socket.request.user});
    })
  }
}

module.exports = chatServer;