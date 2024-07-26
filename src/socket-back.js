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
    const documentContent = recoverDocumentContent(documentName);
    socket.join(documentName); //Grouping connections by document name
  });

  socket.on("write-text", ({ text, documentName }) => {
    socket.to(documentName).emit("receive-text", text); // Sending the text to all users connected to the document
    //io.to([nomeDocumento, "JavaScript"]).emit("texto_editor_clientes", texto); // Sending the text to all users connected to the document list, including the one who wrote it
    //io.to(["sala1", "sala2"]).except("sala3").emit("nome_do_evento");
  });

  socket.on("disconnect", (message) => {
    console.log("A user disconnected. Id: ", socket.id);
    console.log("Message: ", message);
  });
});
