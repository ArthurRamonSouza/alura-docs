import { updateText } from "./document.js";

const socket = io();

function selectDocument(documentName) {
  console.log("Selecting document: ", documentName);
  socket.emit("select-document", documentName);
}

function emmitText(data) {
  socket.emit("write-text", data);
}

socket.on("receive-text", (text) => {
  updateText(text);
});

socket.on("recovering-text", (text) => {
  console.log("Recovering text: ", text);
  updateText(text);
});

socket.on("disconnect", (message) => {
  console.log(`Server disconnected!
    Message: ${message}`);
});

export { emmitText, selectDocument };
