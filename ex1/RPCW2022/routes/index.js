var express = require('express');
var router = express.Router();
var Ligacoes = require('../controllers/ligacoes')
var Mapas = require('../controllers/mapas')



// ------------------------------------------------------------
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



// ------------------------------------------------------------

router.get('/api/ligacoes', function (req,res) {
  
  if(req.query['origem']==undefined || req.query['dist']==undefined)
  {}
 
  if(req.query['origem']!=undefined){
    Ligacoes.origem(req.query['origem'])
      .then(data=>res.json(data))
      .catch(error=>res.render('error',{error:error}));
  }
 
  if (req.query['dist']!=undefined){
    Ligacoes.distancia(req.query['dist'])
      .then(data=>res.json(data))
      .catch(error=>res.render('error',{error:error}));
  }
})



// ------------------------------------------------------------


router.get('/api/cidades', function (req,res) {
  if(req.query['distrito']==undefined)
  {
    Mapas.listar()
      .then(data=>res.json(data))
      .catch(error=>res.render('error',{error:error}));
  }
  
  else{
    Mapas.getDistrito(req.query['distrito'])
      .then(data=>res.json(data))
      .catch(error=>res.render('error',{error:error}));
  }
  
  
})

// ------------------------------------------------------------

//Devolve apenas uma lista com os nomes das cidades ordenada alfabeticamente;

router.get('/api/cidades/nomes', function (req,res) {
  Mapas.nomes()
      .then(data=>res.json(data))
      .catch(error=>res.render('error',{error:error}));
  
})

// ------------------------------------------------------------

//Devolve a informação completa de uma cidade;
router.get('/api/cidades/:id', function (req,res) {
  
  Mapas.cidade(req.params.id)
      .then(data=>res.json(data))
      .catch(error=>res.render('error',{error:error}));
  
})



module.exports = router;
