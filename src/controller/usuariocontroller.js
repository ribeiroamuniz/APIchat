const Usuario = require('../model/usuarioModel'); // Ajuste o caminho conforme necessário

async function entrar(nick) {
    try {
        const usuario = await Usuario.findOne({ nick }).exec();
        if (usuario) {
            return { sucesso: true, usuario };
        } else {
            return { sucesso: false, mensagem: 'Usuário não encontrado' };
        }
    } catch (error) {
        throw new Error(`Erro ao entrar: ${error.message}`);
    }
}

module.exports = {
    entrar
};