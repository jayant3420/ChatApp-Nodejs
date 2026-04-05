require("dotenv").config();
require("./config/db")();

const { initServer } = require("./sockets");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const http = require("http");

const app = express();
const server = http.createServer(app);
initServer(server);

const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");

// Indicating the server to use ejs templates
app.set("view engine", "ejs");

// to use form data
app.use(express.urlencoded({ extended: true }));

// to parse cookies
app.use(cookieParser());

// to parse body of request
app.use(bodyParser.json());

// serve static files from public/
app.use(express.static("public"));



app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);











server.listen(process.env.PORT, () => console.log(`server running on PORT ${process.env.PORT}`));