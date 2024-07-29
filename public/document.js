import { emitText, selectDocument } from "./socket-front-document.js";

const parameters = new URLSearchParams(window.location.search);
const documentName = parameters.get("nome");

const textarea = document.getElementById("editor-texto");
const documentTitle = document.getElementById("titulo-documento");

documentTitle.textContent = documentName || "Documento sem título";

selectDocument(documentName);

textarea.addEventListener("keyup", () => {
  emitText({
    text: textarea.value,
    documentName: documentName,
  });
});

function updateText(text) {
  textarea.value = text;
}

function alertAndRedirect(documentName) {
  if (documentName === documentTitle) {
    alert(`Documento ${documentName} excluído.`);
    window.location.href = "/";
  }
}

export { updateText, alertAndRedirect };