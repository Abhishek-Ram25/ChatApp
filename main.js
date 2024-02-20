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

socket.addEventListener("message", function (m) {
  const parsedMessages = JSON.parse(m.data);
  // Filter out non-JSON strings
  const jsonMessages = parsedMessages.filter((message) => {
    try {
      JSON.parse(message);
      return true;
    } catch (error) {
      return false;
    }
  });

  // Parse JSON strings as objects and process them
  jsonMessages.forEach(function (message) {
    const parsedMessage = JSON.parse(message);

    if (
      parsedMessage &&
      parsedMessage.id &&
      parsedMessage.name &&
      parsedMessage.msg
    ) {
      // Skip messages sent by the current client
      if (parsedMessage.id !== uuid) {
        // Display message details
        console.log(`${parsedMessage.name}: ${parsedMessage.msg}`);
      }
    }
  });
});

// // Prompt user for input
function promptUser() {
  rl.question("", (message) => {
    var obj = new Object();
    obj.id = uuid;
    obj.name = MY_SYSTEM;
    obj.msg = message;
    if (message == null || message == " ") {
      socket.send(JSON.stringify(obj));
    }
    setTimeout(() => promptUser(), 500);
  });
}
setTimeout(() => promptUser(), 1000);
