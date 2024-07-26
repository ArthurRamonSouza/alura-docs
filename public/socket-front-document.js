import { updateText } from "./document.js";

const socket = io();

function selectDocument(documentName) {
  socket.emit("select-document", documentName, (text) => {
    updateText(text);
  });
}

function emmitText(data) {
  socket.emit("write-text", data);
}

socket.on("receive-text", (text) => {
  updateText(text);
});

// socket.on("recovering-text", (text) => {
//   updateText(text);
// });

socket.on("disconnect", (message) => {
  console.log(`Server disconnected!
    Message: ${message}`);
});

export { emmitText, selectDocument };