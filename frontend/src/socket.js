import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // Make sure this matches your backend port

export default socket;
