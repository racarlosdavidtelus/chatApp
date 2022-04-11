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

const usersSocket = new Map();
let content = [];
let messages = [];
let lastId = 0;

// Middlewares
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cors())
// Templating engine setup
app.set("view engine", "ejs");
app.set('views', __dirname + '/views');

// Enpoints
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/views/index.html');
});

app.get("/user",(req,res) =>{
  res.status(200).send({data: content, error: null})
})

app.post("/user",(req,res) =>{
  lastId++;
  const {task} = req.body; console.log(req.body)
  const new_task = { id:lastId, status:'todo', task}
  content.push(new_task)
  //console.log("task added: ",content)
  res.status(200).send({data: content, error: null})
})

app.get("/messages",(req,res) =>{
  res.status(200).send(messages)
})

app.put("/tasks/:id",(req,res) =>{
  const id = parseInt(req.params.id,10); 
  const task = content.find(p => p.id == id);
  if (!task) {
    res.status(404).send({data: content, error: "Task id dont exist"})
  }else{
    const index = content.indexOf(task);
    content[index] = {...task,...req.body};
    res.status(200).send({data: content, error: null})
  }
})

app.delete("/tasks/:id",(req,res) =>{ 
  //console.log(req.params)
  const id = parseInt(req.params.id,10);
  const task = content.find(p => p.id == id);
  if (!task) {
      res.status(404).send({data: content, error: "Task id dont exist"})
  }else{
      content = content.filter(x => x != task)
      res.status(200).send({data: content, error: null})
  }
})

io.on('connection', (socket) => {

  socket.on('add user', data => {
    //console.log(data)
    usersSocket.set(socket.id,data);
    console.log(`New user connected, ${socket.id}, total connected: ${usersSocket.size}`); 
  });

  socket.on("disconnect", () => {
    //console.log(socket.id);
    usersSocket.delete(socket.id)
    console.log(`New user disconnected, ${socket.id}, total connected: ${usersSocket.size}`);
  });

  socket.on('chat message', msg => {
    console.log(msg)
    messages.push(msg)
    io.emit('chat message', msg);
  });
});

// Starting server
http.listen(2000, () => {
  console.log("Listening on port 2000");
});
