var mongoose = require('mongoose')




var mapaSchema = new mongoose.Schema({
    id:String,
    nome:String,
    populacao:Number,
    descricao:String,
    distrito:String
})



module.exports = mongoose.model('mapas',mapaSchema)