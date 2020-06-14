  var socket = io.connect('http://localhost:8080');
  var pseudo = prompt('Pseudo ?');

  //genere une couleur aléatoire
  var colorR = Math.floor((Math.random() * 256));
  var colorG = Math.floor((Math.random() * 256));
  var colorB = Math.floor((Math.random() * 256));
  var color = colorR + ',' + colorB + ',' + colorB;

  nouvellePersonne();
  //Emet qu'une nouvelle personne a rejoint le chat au serveur
  socket.emit('newPerson',pseudo,color);
  document.title = pseudo;

  //Reception des evenement message et newPerson envoyé par le serveur
  socket.on('message',function(data){
    nouveauMessage(data.pseudo,data.message,data.color);
  });
  socket.on('newPerson',function(pseudo){
    nouvellePersonne(pseudo);
  });

  //Event listener submit d'un message -- emmet au serveur l'envoie d'un nouveau message
  $("#form_chat").submit(function(){
    var message = $('#message').val();
    socket.emit('message',message);
    nouveauMessage(pseudo,message,color);
    $("#message").val("").focus();
    return false;
  });


function nouveauMessage(pseudo,message,lacolor){
  $('#box').append('<p><span class="pseudoMessage" style="color:rgb('+lacolor+')">' + pseudo + '</span>: ' + message +'</p>');
}

function nouvellePersonne(pseudo){
  if (pseudo) {
    $('#box').append('<p class="messageConnexion"> ' + pseudo + ' a rejoint le chat</p>');
  }
  else {
    $('#box').append('<p class="messageConnexion"> Vous avez rejoint le chat</p>');
  }
}
