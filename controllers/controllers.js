var express = require("express");
var router = express.Router();
var bathroom = require("../models/bathroom.js");
var http = require("http");
var https = require("https");
var lastLat = 0;
var lastLng = 0;
router.get("/", function (req, res) {
  res.render("index");
});


router.get("/form", function (req, res) {
  res.render("form");
});

router.get("/map", function (req, res) {

  res.render("bathroom");
});

router.get("/404", function (req, res) {
  res.render("404");
});


//var url = "https://www.refugerestrooms.org/api/v1/restrooms/by_location.json?per_page=10&lat=33.1087872&lng=-117.0628608";
router.get("/listview", function (req, res) {
  var url = "https://www.refugerestrooms.org/api/v1/restrooms/by_location.json?per_page=20&lat=";

  if (!req.query.lat || !req.query.lng)
    return;
  lastLat = req.query.lat.replace(/["']/g, "");
  lastLng = req.query.lng.replace(/["']/g, "");
  url = url + lastLat + "&lng=" + lastLng;

  var response = res; //save response for use inside the on function
  https.get(url, function (res) {
    res.on('data', function (data) {
      var restrooms = JSON.parse(data);

      for (var i = 0; i < restrooms.length; i++) {
        restrooms[i].distance = restrooms[i].distance.toFixed(2);
      }
      //add bathrooms from database to list bathrooms returned from the refuge api
      addBathroomsFromDb(data, restrooms);


      var hbsObject = {
        bathroom: restrooms
      };

      response.render("listview", hbsObject);
    });
  });

});

router.get("/api/getnew/bathroom", function (req, res) {
  bathroom.all(function (data) {
    res.json({
      restrooms: data
    });
  });
});

router.get("/api/get/currentposition", function (req, res) {

  //var bathroom = JSON.parse('[{"id":33499,"name":"NEW Trader Joe\'s","street":"Center City Pkwy","city":"Escondido","state":"Ca","accessible":true,"unisex":true,"directions":"Back of the store by bread","comment":"","latitude":33.456512,"longitude":-117.107844,"created_at":"2017-04-02T04:31:13.371Z","updated_at":"2017-04-02T04:31:13.371Z","downvote":0,"upvote":0,"country":"US","changing_table":false,"edit_id":33499,"approved":true,"distance":0.85072952537192,"bearing":"248.56126807468"},{"id":34608,"name":"NEW California Center for the Arts Escondido","street":"340 N Escondido Blvd","city":"Escondido","state":"California","accessible":false,"unisex":true,"directions":"","comment":"you have to have a ticket if it\'s a show or concert but if it\'s a dance competition or something else you don\'t need tickets for you can just walk in","latitude":40.275969,"longitude":-85.831714,"created_at":"2017-04-27T20:19:51.157Z","updated_at":"2017-04-27T20:19:51.157Z","downvote":0,"upvote":0,"country":"US","changing_table":false,"edit_id":34608,"approved":true,"distance":1.56976856723142,"bearing":"301.999271327872"}]')

  res.json({
    lat: parseFloat(lastLat),
    lng: parseFloat(lastLng)
  });
});

router.post("/api/add/bathroom", function (req, res) {
  //add to database
  bathroom.create(["name", "street", "city", "state", "country", "comment", "latitude", "longitude"],
    [req.body.restroom.name, req.body.restroom.street, req.body.restroom.city,
      req.body.restroom.state, req.body.restroom.country,
      req.body.restroom.comment,
      parseFloat(req.body.restroom.latitude), parseFloat(req.body.restroom.longitude)
    ],
    function (result) {
      res.redirect('/');
      // res.json({
      //   id: result.insertId
      // });
    });

  //res.end();
});

function addBathroomsFromDb(data, restrooms) {
  bathroom.all(function (data) {
    for (var i = 0; i < data.length; i++) {
      var r = {};
      r.id = data[i].id;
      r.name = data[i].name;
      r.street = data[i].street;
      r.city = data[i].city;
      r.state = data[i].state;
      r.latitude = data[i].latitude;
      r.longitude = data[i].longitude;
      restrooms.unshift(r);
    }
  });
}
module.exports = router;