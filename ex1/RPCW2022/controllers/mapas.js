const mongoose = require('mongoose')
const mapas = require('../models/mapas')
var Mapas = require('../models/mapas')

// -----------------------------------------------------------------------------------

module.exports.listar = () => {
    return Mapas
    .find({},{_id:0,id:1,nome:1,distrito:1})
    .exec()
}

// -----------------------------------------------------------------------------------

module.exports.cidade = (idCidade) =>{
    return Mapas
    .findOne({id:idCidade},{_id:0})
    .exec()
}

// -----------------------------------------------------------------------------------

module.exports.nomes = () =>{
    return Mapas
    .find({},{"nome":1,"_id":0}).sort({"nome":1})
    .exec()
}

// -----------------------------------------------------------------------------------

module.exports.getDistrito = (odistrito) =>{
    return Mapas
    .find({distrito:odistrito},{_id:0,id:1,nome:1})
    .exec()
}

// -----------------------------------------------------------------------------------

// module.exports.distritos = () =>{
//     return Mapas
//     .aggregate([ {$project: {_id:0,distrito:1},{$distinct:{"distrito"}}
//     .exec()
// }

