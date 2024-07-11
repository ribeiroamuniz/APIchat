exports.get=async function (){
    const salaModel = require('../model/salamodel');
    return await salaModel.listarSalas();
}
