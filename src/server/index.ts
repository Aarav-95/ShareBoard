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

  socket.on('text', (data) => {
    const { roomId, x, y, text, fontFamily, fontSize, color } = data;
    history[roomId] = history[roomId] || [];
    // store exactly the same payload so we can replay it later
    history[roomId].push({ x, y, text, fontFamily, fontSize, color, type: 'text' });
    // broadcast to everyone else
    socket.to(roomId).emit('text', { x, y, text, fontFamily, fontSize, color });
  });

  socket.on("bgColor", (data: { roomId: string; color: string }) => {
    const { roomId, color } = data;
    history[roomId] = history[roomId] || [];
    history[roomId].push({ type: "bgColor", color });
    io.to(roomId).emit("bgColor", color);
  });
  // Clear board:
  socket.on('clear', (roomId: string) => {
    history[roomId] = [];
    io.to(roomId).emit('clear');
  });

});

server.listen(3001, () => console.log('Socket server running on :3001'));
