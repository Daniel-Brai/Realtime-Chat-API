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

// main route
app.get('/', (req, res) => {
  res.status(200).send(
    `<h2 style='display: flex; align-items: center; justify-content: center; color: #ADD8E6'>Welcome to my API 🙂</h2>`
  )
 }
)

// register, login and invitation routes
app.use("/api/auth", authRoutes);
app.use("/api/friend-invitation", friendInvitationRoutes);

// Server setup
const server = http.createServer(app);
socketServer.registerSocketServer(server);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`⚡ [server]: Server is listening on ${PORT}....`);
});

