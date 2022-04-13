const express = require("express");
const app = express();
const server = require("http").createServer(app);
const PORT = process.env.PORT || 2000;
const socketio = require("socket.io");
const io = socketio(server).listen(server);

const Redis = require("redis");
let client;
(async () => {
  client = Redis.createClient();

  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();
})();

app.set("view engine", "ejs");

app.get("/mainApp", (req, res) => {
  let username = req.query.username;

  io.emit("Room_joined", username);
  res.render("Demo_chatroom", { username });
});

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(PORT, () => {
  console.log(`LISTENING ON PORT:${PORT}`);
});

//Socket

async function getMessages(socket) {
 let data = await client.lRange("messages", "0", "-1");
    data.map((key) => {
        const keyValue = key.split(":");
        const redisUser = keyValue[0];
        const redisMessage = keyValue[1];

        socket.emit("message", {
          from: redisUser,
          message: redisMessage,
        });
      });
}

io.on("connection", (socket) => {
  getMessages(socket);

  socket.on("message", async ({ message, from }) => {
    //messages["name : message"]

    await client.rPush("messages", `${from} : ${message}`);
    // emit globally to all users
    io.emit("message", { message, from });
  });

  socket.on("typing" , (data)=>{
      socket.broadcast.emit("typing" , data);
  })
});
