import { createMockSocket } from "./mockSocket";

let socketInstance = null;

export const initSocket = (type = "mock") => {
  if (type === "real") {
    // future: real socket
  } else {
    socketInstance = createMockSocket();
  }
};

export const getSocket = () => socketInstance;

export const disconnectSocket = () => {
  socketInstance = null;
};