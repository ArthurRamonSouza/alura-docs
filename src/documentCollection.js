import { documentsCollection } from "./dbConnect.js";

function getDocuments() {
    const documents = documentsCollection.find().toArray();
    return documents;
}

function recoverDocument(documentName) {
    return documentsCollection.findOne({
        name: documentName
    });
}

function updateDocument(documentName, text) {
    return documentsCollection.updateOne({
        name: documentName
    },
    {
        $set: {
            text
        },
    });
}

export { recoverDocument, updateDocument, getDocuments }; 