const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const dotenv = require("dotenv");

const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*"
  },
  connectionStateRecovery: {},
});

app.use(cors());
app.use(express.json());
dotenv.config({ path: '../.env' });

//--------DEPLOYMENT---------
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "./frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("The API is running successfully");
  });
}
//--------DEPLOYMENT---------

const port_no = process.env.PORT || 3001;
server.listen(port_no, () => {
  console.log(`Server running on port ${port_no}`);
});

// Game State
const chats = [];
const players = [];
let word = "";
let drawerIndex = 0;
let timeout;
let playerGuessedRightWord = [];

const startGame = () => {
  console.log("Game started");
  io.emit("game-start", {});
  startTurn();
};

const stopGame = () => {
  console.log("Game stopped");
  io.emit("game-stop", {});
  drawerIndex = 0;
  clearTimeout(timeout);
};

const startTurn = () => {
  if (players.length === 0) return;
  if (drawerIndex >= players.length) drawerIndex = 0;
  const currentDrawer = players[drawerIndex];
  io.emit("start-turn", currentDrawer);
};

const startDraw = () => {
  const drawer = players[drawerIndex];
  io.emit("start-draw", drawer);
  timeout = setTimeout(endTurn, 60000);
};

const endTurn = () => {
  const drawer = players[drawerIndex];
  io.emit("end-turn", drawer);
  clearTimeout(timeout);
  playerGuessedRightWord = [];
  drawerIndex = (drawerIndex + 1) % players.length;
  startTurn();
};

// Socket.IO Handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  io.to(socket.id).emit("send-user-data", {});

  socket.on("recieve-user-data", ({ username, avatar }) => {
    const newUser = {
      id: socket.id,
      name: username,
      points: 0,
      avatar: avatar
    };
    players.push(newUser);
    io.emit("updated-players", players);
    
    if (players.length === 2) {
      startGame();
    } else if (players.length > 2) {
      io.emit("game-already-started", {});
    }
  });

  socket.on("sending", (data) => {
    socket.broadcast.emit("receiving", data);
  });

  socket.on("sending-chat", (inputMessage) => {
    const userID = socket.id;
    const index = players.findIndex(p => p.id === userID);
    let rightGuess = false;

    if (word && inputMessage.toLowerCase() === word.toLowerCase()) {
      rightGuess = true;
      if (index > -1) players[index].points += 100;
      chats.push(`${userID} guessed the right word`);
    } else {
      chats.push(inputMessage);
    }

    const returnObject = {
      msg: inputMessage,
      player: players[index],
      rightGuess,
      players
    };
    io.emit("recieve-chat", returnObject);

    if (rightGuess && !playerGuessedRightWord.includes(userID)) {
      playerGuessedRightWord.push(userID);
      if (playerGuessedRightWord.length === players.length - 1) {
        io.emit("all-guessed-correct", {});
        playerGuessedRightWord = [];
        endTurn();
      }
    }
  });

  socket.on("word-select", (w) => {
    word = w;
    const wordLength = w.length;

    // Send full word to drawing player only
    io.to(socket.id).emit("selected-word", w);

    // Send word length to everyone else
    io.emit("word-len", wordLength);

    console.log(`Word selected by ${socket.id}: ${w}`);
    startDraw();
  });

  socket.on("disconnect", (reason) => {
    console.log(`User disconnected: ${socket.id}, reason: ${reason}`);
    const index = players.findIndex(p => p.id === socket.id);
    if (index > -1) players.splice(index, 1);
    io.emit("updated-players", players);
    io.to(socket.id).emit("user-disconnected", {});

    if (players.length <= 1) stopGame();
  });
});
