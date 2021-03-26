const io = require('socket.io-client');
let socket = io('http://localhost:8000');
export default socket;
