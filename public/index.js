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
    <a href="documento.html?nome=${documentName}" class="list-group-item list-group-item-action">
        ${documentName}
    </a>`;
}

export{ insertDocumentLink };