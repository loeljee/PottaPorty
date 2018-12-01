/*eslint linebreak-style: ["error", "windows"]*/
var express = require("express");
var router = express.Router();
var bathroom = require("../models/bathroom.js");
var db = require("../models");

router.get("/", function(req, res) {
  // db.Bathroom.findAll().then(function(data){
  //   var hbsObject = {
  //     bathroom: data
  //   };
  //   console.log(hbsObject);
  //   res.render("index", hbsObject);
  // });
  res.render("index")
});

router.get("/bathroom", function(req, res) {
  // db.Bathroom.findAll().then(function(data){
  //   var hbsObject = {
  //     bathroom: data
  //   };
  //   console.log(hbsObject);
  //   res.render("bathroom", hbsObject);
  //});
  var hbsObject = {
        bathroom: JSON.parse('[{"id":33499,"name":"Trader Joe\'s","street":"Center City Pkwy","city":"Escondido","state":"Ca","accessible":true,"unisex":true,"directions":"Back of the store by bread","comment":"","latitude":33.103561,"longitude":-117.07617,"created_at":"2017-04-02T04:31:13.371Z","updated_at":"2017-04-02T04:31:13.371Z","downvote":0,"upvote":0,"country":"US","changing_table":false,"edit_id":33499,"approved":true,"distance":0.85072952537192,"bearing":"248.56126807468"},{"id":34608,"name":"California Center for the Arts Escondido","street":"340 N Escondido Blvd","city":"Escondido","state":"California","accessible":false,"unisex":true,"directions":"","comment":"you have to have a ticket if it\'s a show or concert but if it\'s a dance competition or something else you don\'t need tickets for you can just walk in","latitude":33.1223726,"longitude":-117.0846026,"created_at":"2017-04-27T20:19:51.157Z","updated_at":"2017-04-27T20:19:51.157Z","downvote":0,"upvote":0,"country":"US","changing_table":false,"edit_id":34608,"approved":true,"distance":1.56976856723142,"bearing":"301.999271327872"}]')
      }; 
  res.render("bathroom");
});

router.get("/listview", function(req,res){
  res.render("listview");
 });
 
router.post("/api/bathroom", function(req, res) {
  bathroom.create(["bathroom_name", "devoured"], [req.body.name, req.body.devoured], function(result) {

    res.json({ id: result.insertId });
  });
});

router.put("/api/bathroom/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  bathroom.update(

    {
      devoured: parseInt(req.body.devoured)
    },
    condition,
    function(result) {
      if (result.changedRows === 0) {
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});

module.exports = router;