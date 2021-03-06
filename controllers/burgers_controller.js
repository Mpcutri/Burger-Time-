var burger = require("../models/burger.js");
var express = require("express");
var router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = { // handlebars object
      burgers: data // we're storing all the data here in key cats.
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) { // we want to make sure this code doesn't run till the cat creation.
  burger.insertOne([
    "burger_name"
  ], [
    req.body.burger_name
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/devoured/:id", function(req, res) {
  var condition = "id = " + req.params.id; // id comes from the URL line :id

  console.log("condition", condition);

  burger.updateOne({
	devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


// Export routes for server.js to use.
module.exports = router;
