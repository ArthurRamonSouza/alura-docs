import { MongoClient } from "mongodb";

const client = new MongoClient(proces.env.URL);

try {

    await client.connect();

    const db = cliente.db("alura-web-socket");

} catch(erro) {
    console.log(erro);
}