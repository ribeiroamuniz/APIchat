const jwt = require('jsonwebtoken');

const checktoken = async (token, id, key) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                console.error('Token inválido ou expirado.', err.message);
                return resolve(false); // Token inválido
            }
            if (decoded && decoded.id === id) {
                return resolve(true); // Token válido
            } else {
                return resolve(false); // Token não corresponde ao ID
            }
        });
    });
};

const SECRET = "1234"; // Use uma chave secreta segura e complexa em produção

const setToken = (id) => {
    return jwt.sign({ id }, SECRET, { expiresIn: '8h' }); // O token expira em 8 horas
};

// Exemplo de uso:
const iduser = "user123"; // ID do usuário
const token = setToken(iduser);
console.log('Token gerado:', token);

module.exports = {
    checktoken,
    setToken
};