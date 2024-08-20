const token = require("../util/token");
const usuariomodel = require('../model/usuariomodel');

exports.entrar = async (nick) => {
    let resp = await usuariomodel.registrarusuario(nick);
    if (resp.insertedID) {
        return {
            "idUser": resp.insertedID,
            "token": await token.setToken(JSON.stringify(resp.insertedID).replace(/"/g, ''), nick),
            "nick": nick
        };
    }
};