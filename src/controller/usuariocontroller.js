const token = require('../../util/token');
const usuarioModel = require('../model/usuariomodel')

exports.entrar = async (nick) => {
    let resp = await usuarioModel.registrarUsuario(nick)
    if (resp.insertedId) {
        return {
            "IdUser": resp.insertedId,
            "token": await token.setToken(JSON.stringify(resp.insertedId.toString()).replace(/"/g, ''), nick),
            "nick": nick
        }
    }
}

exports.sairChat=async(iduser)=>{
    let resp = await usuarioModel.removerUsuario(iduser)
    return ("Saiu do chat")
}