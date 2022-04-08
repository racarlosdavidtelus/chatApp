const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require('socket.io')(server);
const content = require("./content/cards.json");

const memory = [];

// Middlewares
app.use(express.static("public"));

// Templating engine setup
app.set("view engine", "ejs");

// Enpoints
app.get("/", (req, res) => {
  res.render("chat", { content });
});

app.get("/instructions", (req, res) => {
  res.render("index", { content });
});

app.get("/messages", (req, res) => {
  res.status(200).send(memory)
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    memory.push(msg)
    io.emit('chat message', msg);
  });
});


// Starting server.

server.listen(3000, () => {
  console.log("Listening on port 3000...");
});

