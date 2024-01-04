const { Server } = require("socket.io");

const socketConfig = {
  cors: {
    origin: "https://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
    transports: ["websocket", "polling"],
  },
  allowEIO3: true,
};

module.exports = { socketConfig };
