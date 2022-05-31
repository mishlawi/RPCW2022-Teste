var express = require("express");
var router = express.Router();
var axios = require("axios");

var api = "http://clav-api.di.uminho.pt/v2/classes";
var apit = "http://clav-api.di.uminho.pt/v2/termosIndice";

// -----------------------------------------------------------------------------------

router.get("/", function (req, res, next) {
  axios
    .get("http://clav-api.di.uminho.pt/v2/classes?token=" + req.cookies.token)
    .then((dados) => {
      // console.log("data: ", dados.data);
      res.render("index", { title: "Teste RPCW2022", dados: dados.data });
    })
    .catch((e) => res.render("error", { error: e }));
});

// -----------------------------------------------------------------------------------

router.get("/classes", function (req, res) {
  axios
    .get(api + "?nivel=1&token=" + req.cookies.token)
    .then((dados) => {
      res.render("classes", { lista: dados.data });
    })
    .catch((erro) => {
      res.render("error", { error: erro });
    });
});

router.get("/termosIndice", function (req, res) {
  axios
    .get(apit + "?token=" + req.cookies.token)
    .then((dados) => {
      res.render("termosIndice", { lista: dados.data });
    })
    .catch((erro) => {
      res.render("error", { error: erro });
    });
});

// -----------------------------------------------------------------------------------

router.get("/classes/:codigo", function (req, res) {
  var codigo = req.params.codigo;
  var nivel3 = 0;
  var array = [];
  axios
    .get(api + "/" + codigo + "?token=" + req.cookies.token)
    .then((dados) => {
      pai = dados.data.pai.codigo;
      if (dados.data.nivel == 1) {
        pai = 0;
      } else if (dados.data.nivel == 3) {
        nivel3 = 1;
      }
      console.log("dados.data.termosInd: ", dados.data.termosInd);
      res.render("codigo", {
        classe: dados.data,
        arr: array,
        bool: nivel3,
        pai: pai,
        termosInd: dados.data.termosInd,
      });
    })
    .catch((erro) => res.render("error", { error: erro }));
});


// -----------------------------------------------------------------------------------

router.get("/classes/:id", function (req, res, next) {
  axios
    .get(api + "/c" + req.params.id + "?token=" + req.cookies.token)
    .then((dados) => {
      if (dados.data.nivel == 3) {
        axios
          .get(api + "/c" + req.params.id + "/ti?token=" + token)
          .then((ti) => {
            res.render("classe", {
              title: "Classe " + dados.data.codigo,
              classe: dados.data,
              termosIndice: ti.data,
            });
          });
      } else {
        res.render("classe", {
          title: "Classe " + dados.data.codigo,
          classe: dados.data,
        });
      }
    })
    .catch((e) => res.render("error", { error: e }));
});

module.exports = router;
