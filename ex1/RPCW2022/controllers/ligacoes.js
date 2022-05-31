const mongoose = require('mongoose')
const ligacoes = require('../models/ligacoes')
var Ligacoes = require('../models/ligacoes')


// -----------------------------------------------------------------------------------

module.exports.origem = (id) =>{

    return Ligacoes
        .find({origem:id},{_id:0,id:1,origem:1,destino:1}) 
        .exec()
}

// -----------------------------------------------------------------------------------

module.exports.distancia = (distancia) =>{

    return Ligacoes
        .find({ $where: `this.distancia> ${distancia}` },{_id:0,id:1,origem:1,destino:1} )
        .exec()
}