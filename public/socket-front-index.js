import { insertDocumentLink } from "./index.js";

const socket = io();

socket.emit("get_documents", (documents) => {
    documents.forEach(document => {
        insertDocumentLink(document.name);
      });
});