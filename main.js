const readline = require("readline");
const WebSocket = require("ws");
const { v4: uuidv4 } = require("uuid");
const uuid = uuidv4();
const SERVER_URL = "ws://192.168.1.154:8080/";
const MY_SYSTEM = "Prasana";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = new WebSocket(SERVER_URL);

socket.addEventListener("open", function (m) {});

socket.addEventListener("message", function (m) {});

// // Prompt user for input
function promptUser() {
  rl.question("Enter your message: ", (message) => {
    var obj = new Object();
    obj.id = uuid;
    obj.name = MY_SYSTEM;
    obj.msg = message;

    socket.send(JSON.stringify(obj));
    setTimeout(() => promptUser(), 500);
  });
}
setTimeout(() => promptUser(), 1000);
