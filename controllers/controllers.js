var express = require("express");
var router = express.Router();
var bathroom = require("../models/bathroom.js");
var db = require("../models");
var http = require("http");
var https = require("https");
var newBathroom = [];
var addBathroom = false;

router.get("/", function (req, res) {
  // db.Bathroom.findAll({}).then(function(data){
  //   var hbsObject = {
  //     bathroom: data
  //   };
  //   console.log(hbsObject);
  //   res.render("index", hbsObject);
  // });
  res.render("index");
});


router.get("/form", function (req, res) {
  // db.Bathroom.findAll().then(function(data){
  //   var hbsObject = {
  //     bathroom: data
  //   };
  //   console.log(hbsObject);
  //   res.render("index", hbsObject);
  // });
  res.render("form");
});

router.get("/bathroom", function (req, res) {
  res.render("bathroom");
});



//var url = "https://www.refugerestrooms.org/api/v1/restrooms/by_location.json?per_page=10&lat=33.1087872&lng=-117.0628608";
router.get("/listview", function (req, res) {
  var url = "https://www.refugerestrooms.org/api/v1/restrooms/by_location.json?per_page=20&lat=";
  if (!req.query.lat || !req.query.lng)
    return;
    var lat = req.query.lat.replace(/["']/g, "");
    var lng = req.query.lng.replace(/["']/g, "");
  url = url + lat + "&lng=" + lng;
  var response = res; //save response for use inside the on function
  https.get(url, function (res) {
    res.on('data', function (data) {
      var restrooms = JSON.parse(data);
      for (var i = 0; i < restrooms.length; i++) {
        restrooms[i].distance = restrooms[i].distance.toFixed(2);
      }
      var hbsObject = {
        bathroom: restrooms
      };
      response.render("listview", hbsObject);
    });
  });

});
router.get("/api/getnew/bathroom", function (req, res) {

    //var bathroom = JSON.parse('[{"id":33499,"name":"NEW Trader Joe\'s","street":"Center City Pkwy","city":"Escondido","state":"Ca","accessible":true,"unisex":true,"directions":"Back of the store by bread","comment":"","latitude":33.456512,"longitude":-117.107844,"created_at":"2017-04-02T04:31:13.371Z","updated_at":"2017-04-02T04:31:13.371Z","downvote":0,"upvote":0,"country":"US","changing_table":false,"edit_id":33499,"approved":true,"distance":0.85072952537192,"bearing":"248.56126807468"},{"id":34608,"name":"NEW California Center for the Arts Escondido","street":"340 N Escondido Blvd","city":"Escondido","state":"California","accessible":false,"unisex":true,"directions":"","comment":"you have to have a ticket if it\'s a show or concert but if it\'s a dance competition or something else you don\'t need tickets for you can just walk in","latitude":40.275969,"longitude":-85.831714,"created_at":"2017-04-27T20:19:51.157Z","updated_at":"2017-04-27T20:19:51.157Z","downvote":0,"upvote":0,"country":"US","changing_table":false,"edit_id":34608,"approved":true,"distance":1.56976856723142,"bearing":"301.999271327872"}]')
  
  res.json({
    restrooms: newBathroom
  });
});

router.post("/api/add/bathroom", function (req, res) {
  console.log("added bathroom");
  console.log(req.body.restroom.city);
  console.log(req.body.restroom.street);

  // bathroom.create(["name", "street","city","state","country", "comment" ], [req.body.restroom.name, req.body.restroom.street,req.body.restroom.city,req.body.restroom.state,req.body.restroom.country, req.body.restroom.comment],
  //  function (result) {

  //   res.json({
  //     id: result.insertId
  //   });
  // });

  var lat = parseFloat( req.body.restroom.latitude);
    var lng = parseFloat(  req.body.restroom.longitude);

var aNewBathroom  = {
    name: req.body.restroom.name,
    street: req.body.restroom.street,
    city: req.body.restroom.city,
    state: req.body.restroom.state,
    country: req.body.restroom.country,
    comment: req.body.restroom.comment,
    distance: 0.0,
    latitude: lat,
    longitude: lng
  };
  newBathroom.push(aNewBathroom);
  addBathroom = true;
  //add to database
  res.redirect('/');
  //res.end();
});

router.post("/api/bathroom", function (req, res) {
  //ask if I put this in the post also
  bathroom.create(["name", "street", "city", "state", "country", "comment"], [req.body.restroom.name, req.body.restroom.street, req.body.restroom.city, req.body.restroom.state, req.body.restroom.country, req.body.restroom.city, req.body.restroom.comment], function (result) {

    res.json({
      id: result.insertId
    });
  });
});

router.put("/api/bathroom/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  bathroom.update(

    {
      devoured: parseInt(req.body.devoured)
    },
    condition,
    function (result) {
      if (result.changedRows === 0) {
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});

module.exports = router;