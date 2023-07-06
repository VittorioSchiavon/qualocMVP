const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  console.log("I'm here");
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
const getUserBySocketId = (socketId) => {
  return users.find((user) => user.socketId === socketId);
};
io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");
  console.log("users", users);
  //take userId and socketId from user
  socket.on("addUser", async (userId) => {
    addUser(userId, socket.id);
    try{
    const response = await fetch("http://localhost:3001/users/setOnline/"+userId, {
      method: "GET",
    });
    const data = await response.json();
  }catch (err) {
    console.log(err.message);
  }
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", (data) => {
    const user = getUser(data.receiverId);
    var id = user?.socketId;
    if (!id) id = 0;
    io.to(user?.socketId).emit("getMessage", {
      text: data.text,
      type: data.type,
      sender: data.senderID,
      conversationID: data.conversationID,
    });
  });

  //when disconnect
  socket.on("disconnect", async () => {
    console.log("a user disconnected!: ", socket.id);
    const user = getUserBySocketId(socket.id);
    console.log("id:", user?.userId);
    try{
    const response = await fetch("http://localhost:3001/users/setOffline/"+user?.userId, {
      method: "GET",
    });
    const data = await response.json();
  }catch (err) {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    }

    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
