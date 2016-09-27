var express = require('express');  
var app = express();  
var server = require('http').Server(app);  
var io = require('socket.io')(server); 
app.use(express.static('public')); 
var messages = [{  
    author: "Carlos",
    text: "Hola! que tal?"
},{
    author: "Pepe",
    text: "Muy bien! y tu??"
},{
    author: "Paco",
    text: "Genial!"
}];


io.on('connection', function(socket) {  
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);
    socket.on('new-message', function(data) {  
    messages.push(data);

    io.sockets.emit('messages', messages);
});
});

server.listen(8080, function() {  
    console.log('Servidor corriendo en http://localhost:8080');
});
