const readline = require("readline");
const WebSocket = require("ws");
const { v4: uuidv4 } = require("uuid");
const id = uuidv4();
const SERVER_URL = "ws://192.168.1.154:8080/";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = new WebSocket(URL);

socket.addEventListener("open", function (m) {});

socket.addEventListener("message", function (m) {});

// // Prompt user for input
function promptUser() {
  rl.question("Enter your message: ", (answer) => {
    console.log(`Message sent: ${answer}`);

    // Send the message to WebSocket server

    socket.send(answer);

    promptUser();
  });
}

promptUser();
