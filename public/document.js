import { emmitText, selectDocument } from "./socket-front-document.js";

const parameters = new URLSearchParams(window.location.search);
const documentName = parameters.get("nome");

const textarea = document.getElementById("editor-texto");
const documentTitle = document.getElementById("titulo-documento");

documentTitle.textContent = documentName || "Documento sem título";

selectDocument(documentName);

textarea.addEventListener("keyup", () => {
  emmitText({
    text: textarea.value,
    documentName: documentName,
  });
});

function updateText(text) {
  textarea.value = text;
}

export { updateText };
