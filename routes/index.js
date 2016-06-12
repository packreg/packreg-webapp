var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    api = require('../workers/api-worker.js'),
    config = require('../config/config');


/* =============================================
* Displays main search site.
* =========================================== */
router.get('/', function(req, res, next) {

  api.searchPackage("Bower", function(err, packages){
    if(err){
      console.log(err);
    }

    var packArray = [];
    for(var i in packages){
      packArray.push(packages[i]);
    }

    res.render('index', {
      query: "Bower",
      packages: packArray
    });

  });
});



/* =============================================
* POST search query for package
* =========================================== */
router.post('/search', function(req, res, next) {

  api.searchPackage(req.body.query, function(err, packages){
    if(err){
      console.log(err);
    }

    var packArray = [];
    for(var i in packages){
      packArray.push(packages[i]);
    }

    res.render('index', {
      query: req.body.query,
      packages: packArray
    });

  });
});


// get single package
// api.getPackageBy("name", "d3", function(err, package){ ...

module.exports = router;
