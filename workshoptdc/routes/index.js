var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  global.db.findAll((err, docs) => {
    if (err) {
      console.log(err);
      return;
    }

    res.render('index', { title: 'Lista de Clientes', doc: docs });
  });
});

module.exports = router;
