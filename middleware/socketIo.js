const socketIo = (io) => {
  io.on("connection", (socket) => {
    console.log("user connected ", socket.id);

    socket.on("join_room", (data) => {
      socket.join(data);
      // console.log(`user with ${socket.id} joins room ${data}`);
    });

    socket.on("send_message", (data) => {
      // console.log(data)
      socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
};

export default socketIo;
