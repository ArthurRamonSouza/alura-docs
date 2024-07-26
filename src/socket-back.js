import websocket from "./server.js";

const documents = [
  {
    name: "JavaScript",
    text: "Texto armazenado no arquivo JavaScript.",
  },
  {
    name: "Node",
    text: "Texto armazenado no arquivo Node.",
  },
  {
    name: "Socket.IO",
    text: "Texto armazenado no arquivo Socket.IO.",
  },
];

function recoverDocumentContent(documentName) {
  documents.find((document) => {
    return document.name === documentName;
  });
}

websocket.on("connection", (socket) => {
  console.log("A user connected. Id: ", socket.id);

  socket.on("select-document", (documentName) => {
    socket.join(documentName); //Grouping connections by document name
    const documentContent = recoverDocumentContent(documentName);

    if (documentContent) {
      socket.emit("recovering-text", documentContent.text); // Sending the text to the user who connected to the
    } else {
      socket.emit("recovering-text", ""); // Sending an empty text to the user who connected to the document
    }
  });

  socket.on("write-text", ({ text, documentName }) => {
    socket.to(documentName).emit("receive-text", text); // Sending the text to all users connected to the document
    //io.to([nomeDocumento, "JavaScript"]).emit("texto_editor_clientes", texto); // Sending the text to all users connected to the document list, including the one who wrote it
    //io.except("sala3").emit("nome_do_evento");
  });

  socket.on("disconnect", (message) => {
    console.log("A user disconnected. Id: ", socket.id);
    console.log("Message: ", message);
  });
});
