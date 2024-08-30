const db = require('./db');
let listarSalas = async () => {
  let salas = await db.findAll("salas");
  return salas;
};

let buscarSala = async (idsala) => {
  return await db.findOne("salas", idsala);
}

let atualizarMensagens = async (sala) => {
  return await db.updateOne("salas", sala, { _id: sala._id });
}

let buscarMensagens = async (idsala, timestamp) => {
  let sala = await buscarSala(idsala);
  if (sala.msgs) {
    let msgs = [];
    sala.msgs.forEach((msg) => {
      if (msg.timestamp >= timestamp) {
        msgs.push(msg);
      }
    });
    return msgs;
  }
  return [];
}

const listarMembros = async (idSala) => {
   const database = await db.connect();
   const salas = database.collection('salas');
   const sala = await salas.findOne({ _id: new ObjectId(idSala) }, { projection: { membros: 1, _id: 0 } });
 
   if (!sala) {
     throw new Error("Sala não encontrada");
   }
 
   return sala.membros;
 };

module.exports = { listarSalas, buscarSala, atualizarMensagens, buscarMensagens, listarMembros };