const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 5000;
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

// Middlewares
app.use(router);
app.use(cors());

//Connection
io.on("connect", socket => {
  socket.on("join", ({ Name, Room }, callback) => {
    const { error, user } = addUser({ id: socket.id, Name, Room });

    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.Name}, welcome to Room ${user.Room}.`
    });
    socket.broadcast
      .to(user.Room)
      .emit("message", { user: "admin", text: `${user.Name} has joined!` });

    io.to(user.Room).emit("roomData", {
      Room: user.Room,
      users: getUsersInRoom(user.Room)
    });

    socket.join(user.Room);

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.Room).emit("message", { user: user.Name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.Room).emit("message", {
        user: "Admin",
        text: `${user.Name} has left.`
      });
      io.to(user.Room).emit("RoomData", {
        Room: user.Room,
        users: getUsersInRoom(user.Room)
      });
    }
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started correctly:).`)
);
