import { addDocument } from "./socket-front-index.js";

const documentList = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const documentInput = document.getElementById("input-documento");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    addDocument(documentInput.value);
    documentInput.value = "";
});

function insertDocumentLink(documentName){
    documentList.innerHTML += `
    <a 
    href="documento.html?nome=${documentName}" 
    class="list-group-item list-group-item-action"
    id="document-${documentName}"
    >
        ${documentName}
    </a>`;
}

function deleteDocumentLink(documentName){
    const documemt = document.getElementById(`document-${documentName}`);
    documentList.removeChild(document);
}

export{ insertDocumentLink, deleteDocumentLink };