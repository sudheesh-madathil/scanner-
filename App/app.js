const net = require('net');

function scanPort(host, port, callback) {
  const socket = new net.Socket();
  socket.setTimeout(2000);

  socket.on('connect', () => {
    callback(port, true);
    socket.destroy();
  });

  socket.on('timeout', () => {
    callback(port, false);
    socket.destroy();
  });

  socket.on('error', () => {
    callback(port, false);
  });

  socket.connect(port, host);
}

function scanPorts(host, ports) {
  ports.forEach(port => {
    scanPort(host, port, (port, isOpen) => {
      console.log(`Port ${port} is ${isOpen ? 'open' : 'closed'}`);
    });
  });
}

const host = '127.0.0.1'; // Localhost
const ports = [22, 80, 443, 8080]; // Example ports

console.log(`Scanning ports on ${host}...`);
scanPorts(host, ports);
