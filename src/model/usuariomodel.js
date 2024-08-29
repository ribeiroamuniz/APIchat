const db = require("./db");

async function registrarusuario(nick){
    return await db.insertOne("usuario", {"nick": nick});
}

async function removerUsuario(idUser){
    const db = await connect();
    return await db.collection("usuario").deleteOne({ "_id": ObjectId(idUser) });
}

module.exports = {registrarusuario, removerUsuario}

module.exports = {registrarusuario}