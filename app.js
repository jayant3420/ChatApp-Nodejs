require("dotenv").config();
require("./config/db")();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const authRoutes = require("./routes/authRoutes");


// Indicating the server to use ejs templates
app.set("view engine", "ejs");

// to use form data
app.use(express.urlencoded({extended: true}));

// serve static files from public/
app.use(express.static("public"));



app.use("/auth", authRoutes);











server.listen(process.env.PORT, () => console.log(`server running on PORT ${process.env.PORT}`));