// dependencies
const express = require("express");
const http = require("http");
const cors = require("cors");
const { connectDB } = require('./connection/connectDB')
const { config } = require('dotenv')

// read environment variables
config()

// utilities
const socketServer = require("./socketServer");
const authRoutes = require("./routes/authRoutes");
const friendInvitationRoutes = require("./routes/friendInvitationRoutes");

// Initializing our app
const app = express();

// connect to the Dabatase
connectDB()

// app middleware
app.use(express.json());
app.use(cors());

// register the routes
app.use("/api/auth", authRoutes);
app.use("/api/friend-invitation", friendInvitationRoutes);

// Server setup
const server = http.createServer(app);
socketServer.registerSocketServer(server);

const PORT = process.env.PORT || process.env.API_PORT;
server.listen(PORT, () => {
  console.log(`⚡ [server]: Server is listening on ${PORT}`);
});

