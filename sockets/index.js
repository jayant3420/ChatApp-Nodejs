const { Server } = require("socket.io");

function initServer(server) {
    const io = new Server(server);

    io.on("connection", (socket) => {
        console.log("User connected : ", socket.id);

        socket.on("disconnect", () => {
            console.log("Socket disconnted : ", socket.id);
        })
    })
}

module.exports = { initServer };