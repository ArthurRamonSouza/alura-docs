import { documentsCollection } from "./dbConnect.js";

function getDocuments() {
    const documents = documentsCollection.find().toArray();
    return documents;
}

function insertDocument(documentName) {
    const result = documentsCollection.insertOne({
        name: documentName,
        text: "",
    });

    return result;
}

function deleteDocument(documentName) {
    return documentsCollection.deleteOne({
        name:documentName
    });
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

export { recoverDocument, updateDocument, getDocuments, insertDocument, deleteDocument }; 