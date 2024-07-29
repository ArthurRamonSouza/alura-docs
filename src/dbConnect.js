import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.URI;

if (!uri) {
  throw new Error('MongoDB connection string is not defined in .env file');
}

const client = new MongoClient(uri);
let documentsCollection;

try {
    await client.connect();

    const db = client.db("alura-web-sockets");
    documentsCollection = db.collection("documents");

    console.log("Conectado com o banco de dados!");

} catch(erro) {
    console.log(erro);

}

export { documentsCollection };