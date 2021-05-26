const express = require('express');
const app = express();
app.use(express.static('public'));
const socket = require('socket.io');
const server = app.listen(3000,function(){console.log('table click is  3000')});
const io = socket(server);

io.on('connection', function(socket){
    console.log('made connection ' + socket.id);

    socket.on('clicked', function(data){
        io.sockets.emit('clicked',data)
        console.log(data);
        // var rc = data.substr(0, 1);
        // console.log(rc)
        
    })


    socket.on('keyup', function(data){
        io.sockets.emit('keyup',data)
        console.log('***keyup***')
        console.log(data);
        console.log('***keyup***')
    })

    socket.on('td', function(data){
        io.sockets.emit('td',data)
        console.log('cell data',data);
    });
  
})

