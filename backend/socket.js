const { Server } = require("socket.io");
const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io = null;
const connectedSockets = new Map();

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  // Handle socket connection
  io.on("connection", (socket) => {
  
    connectedSockets.set(socket.id, socket);

    // Handle join event to update user or captain status
    socket.on("join", async (data) => {
      const { userId, userType } = data;
  
      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    // this function update the location of captain
    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      
      if (!location || !location.lat || !location.lng) {
        return socket.emit("error", { message: "Invalid location data." });
      }
      await captainModel.findByIdAndUpdate(userId, {
     
        $set: {
          location: {
            type: "Point",
            coordinates: [Number(location.lng), Number(location.lat)],
          },
        }
      });
    })


    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
      connectedSockets.delete(socket.id);
    });
  });
}

// Function to send a message to a specific socket by its ID
function sendMessageToSocketId(socketId, messageObject) {
  console.log(`sending message to ${socketId}, messageObject`);
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
    console.log(`Message sent to socket ${socketId}:`, messageObject);
  } else {
    console.warn(`Socket with id ${socketId} not found or not connected.`);
  }
}
module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
