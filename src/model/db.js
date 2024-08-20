const { MongoClient, ObjectId } = require("mongodb");

let singleton;

async function connect() {
    if (singleton) return singleton;

    const client = new MongoClient(process.env.DB_HOST);
    await client.connect().db(process.env.DB_DATABASE);
    return singleton;
}

let findAll = async (collection) => {
    const db = await connect();

    var sala = await db.collection(collection).find().toArray();

    console.log(sala);
    return sala;
}

module.exports = { findAll };