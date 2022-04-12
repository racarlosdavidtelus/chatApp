const express = require("express");
const cors = require("cors");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const usersSocket = new Map();
let content = [];
let messages = [];
let lastId = 0;

// Middlewares
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Templating engine setup
app.set("view engine", "ejs");
app.set('views', __dirname + '/views');

// Enpoints
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/views/index.html');
});

app.get("/messages",(req,res) =>{
  res.status(200).send(messages)
})

app.delete("/messages",(req,res) =>{ 
  messages = [];
  res.status(200).send([])
})

io.on('connection', (socket) => {

  socket.on('add user', data => {
    //console.log(data)
    usersSocket.set(socket.id,data);
    console.log(`New user connected, total connected: ${usersSocket.size}`); 
  });

  socket.on("disconnect", () => {
    //console.log(socket.id);
    usersSocket.delete(socket.id)
    console.log(`User disconnected, total connected: ${usersSocket.size}`);
  });

  socket.on('chat message', msg => {
    //console.log(msg)
    messages.push(msg)
    io.emit('chat message', msg);
  });
});

// Starting server
http.listen(2000, () => {
  console.log("Listening on port 2000");
});

module.exports = app;