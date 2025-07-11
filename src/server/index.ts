import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

// In-memory history for each room:
const history: Record<string, any[]> = {};

io.on('connection', (socket) => {
  // When a client joins a room:
  socket.on('joinRoom', (roomId: string) => {
    socket.join(roomId);
    // send existing strokes to the new client
    const roomHistory = history[roomId] || [];
    socket.emit('history', roomHistory);
  });

  // When a stroke comes in:
  socket.on('draw', (data) => {
    const { roomId, stroke } = data;
    history[roomId] = history[roomId] || [];
    history[roomId].push(stroke);
    // broadcast to everyone else
    socket.to(roomId).emit('draw', stroke);
  });

  // Clear board:
  socket.on('clear', (roomId: string) => {
    history[roomId] = [];
    io.to(roomId).emit('clear');
  });

});

server.listen(3001, () => console.log('Socket server running on :3001'));
