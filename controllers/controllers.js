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
  res.render("index", hbsObject);
});

router.get("/bathroom", function(req, res) {
  // db.Bathroom.findAll().then(function(data){
  //   var hbsObject = {
  //     bathroom: data
  //   };
  //   console.log(hbsObject);
  //   res.render("bathroom", hbsObject);
  //});
  res.render("bathroom", hbsObject);
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
