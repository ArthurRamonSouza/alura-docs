import { insertDocumentLink } from "./index.js";

const socket = io();

socket.emit("get_documents", (documents) => {
    documents.forEach(document => {
        insertDocumentLink(document.name);
      });
});

function addDocument(documentName) {
  socket.emit("add_document", documentName);
};

socket.on("add_document_interface", (documentName) => {
  insertDocumentLink(documentName);
});

socket.on("document_already_exists", (documentName) => {
  console.log(`Documento ${documentName} já existe.`);
  alert(`Documento ${documentName} já existe.`);
});

socket.on("deleted_document_aler", (documentName) => {
  deleteDocumentLink(documentName);
});

export { addDocument };