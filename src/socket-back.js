import websocket from "./server.js";
import { deleteDocument, getDocuments, insertDocument, recoverDocument, updateDocument } from "./documentCollection.js";
import { emitDeleteDocument } from "../public/socket-front-document.js";

websocket.on("connection", (socket) => {

  socket.on("get_documents", async (returnDocuments) => {
    const documents = await getDocuments();
    
    returnDocuments(documents);
  });

  socket.on("add_document", async (documentName) => {
    const exists = await recoverDocument(documentName) !== null;

    if (!exists) {
      const inserted = await insertDocument(documentName);
      
      if (inserted.acknowledged) {
        socket.emit("add_document_interface", documentName);
      }
    } else {
      socket.emit("document_already_exists", documentName);
    }
  });

  socket.on("select-document", async (documentName, returnText) => {
    socket.join(documentName); //Grouping connections by document name
    const document = await recoverDocument(documentName);
    const documentContent = document.text;

    if (documentContent) {
      //socket.emit("recovering-text", documentContent); // Sending the text to the user who connected to the
      returnText(documentContent);
    }
  });

  socket.on("write-text", async ({ text, documentName }) => {
    const updated = await updateDocument(documentName, text)
    
    if (updated.modifiedCount) {
      socket.to(documentName).emit("receive-text", text); // Sending the text to all users connected to the document
      //io.to([nomeDocumento, "JavaScript"]).emit("texto_editor_clientes", texto); // Sending the text to all users connected to the document list, including the one who wrote it
      //io.except("sala3").emit("nome_do_evento");
    }
  });

  socket.on("delete_document", async (documentName) => {
    const deleted = await deleteDocument(documentName);

    if (deleted.deletedCount) {
      socket.emit("deleted_document_alert", documentName);
    }
  });

  socket.on("disconnect", (message) => {
    console.log("A user disconnected. Id: ", socket.id);
    console.log("Message: ", message);
  });
});
