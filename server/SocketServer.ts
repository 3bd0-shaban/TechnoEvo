import { Socket } from 'socket.io';

interface OnlineUserType {
  userId: string;
  socketId: string;
}

let onlineUsers: OnlineUserType[] = [];

const addUser = (userId: string, socketId: string) => {
  if (!onlineUsers.some((user) => user.userId === userId)) {
    onlineUsers.push({ userId, socketId });
  }
};

const removeUser = (socketId: string) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId: string) => {
  return onlineUsers.find((user) => user.userId === userId);
};

const findConnectedUser = (userId: string) =>
  onlineUsers.find((user) => user.userId === userId);

const SocketServer = (socket: Socket) => {
  socket.on('join', (userId: string) => {
    addUser(userId, socket.id);
    socket.emit('getusers', onlineUsers);
  });

  socket.on('disconnect', () => {
    removeUser(socket.id);
    socket.emit('getusers', onlineUsers);
  });

  //#region //!Messages

  socket.on('disconnect', () => {
    removeUser(socket.id);
  });
};

export default SocketServer;
