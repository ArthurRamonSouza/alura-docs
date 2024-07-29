import { alertAndRedirect, updateText } from "./document.js";

const socket = io();

function selectDocument(documentName) {
  socket.emit("select-document", documentName, (text) => {
    updateText(text);
  });
}

function emitText(data) {
  socket.emit("write-text", data);
}

socket.on("receive-text", (text) => {
  updateText(text);
});

socket.on("deleted_document_alert", (documentName) => {
  alertAndRedirect(documentName);
});

// socket.on("recovering-text", (text) => {
//   updateText(text);
// });

socket.on("disconnect", (message) => {
  console.log(`Server disconnected!
    Message: ${message}`);
});

function emitDeleteDocument(documentName) {
  socket.emit("delete_document", documentName);
}

export { emitText, selectDocument, emitDeleteDocument };
