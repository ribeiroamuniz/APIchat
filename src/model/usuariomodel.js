const db = require("./db");

async function registrarusuario(nick){
    return await db.insertOne("usuario", {"nick": nick});
}

module.exports = {registrarusuario}