import websocket from "./server.js";

websocket.on("connection", (socket) => {
  console.log("A user connected. Id: ", socket.id);

  socket.on("select-document", (documentName) => {
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
