var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);

// Chargement du fichier index.html affiché au client
app.use(express.static('../client'));
app.get('../client', function (req, res) {
  res.sendfile(__dirname + "/index.html");
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

//Reception de l'evenement connection
io.sockets.on('connection',function(socket,pseudo,color){

  //reception de l'evenement newPerson et message
  socket.on('newPerson',function(pseudo,color){
    socket.pseudo = pseudo;
    socket.color=color;
    //Envoie a tout les utilisateurs connecté qu'une nouvelle personne a rejoint la salle de chat
    socket.broadcast.emit("newPerson",pseudo);
  });

  socket.on('message',function(message){
    //Envoie a tout les utilisateurs connecté le nouveau message et qui l'a envoyé
    socket.broadcast.emit('message',{pseudo:socket.pseudo,message:message,color:socket.color});
  });
});
server.listen(8080);
