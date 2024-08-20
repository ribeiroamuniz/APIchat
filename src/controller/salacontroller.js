exports.get=async function (){
    const salamodel = require('../model/salamodel');
    return await salamodel.listarSalas();
}

