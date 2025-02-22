const socketIo = require('socket.io');

let io;

// Initialize Socket.IO
const initSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: '*', // Adjust the origin as per your requirements
      methods: ['GET', 'POST'],
    },
  });

  // Handle new connections
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

// Function to emit events to clients
const sendNotification = (event, data) => {
  if (io) {
    io.emit(event, data);
  } else {
    console.error('Socket.IO is not initialized.');
  }
};

module.exports = {
  initSocket,
  sendNotification,
};
