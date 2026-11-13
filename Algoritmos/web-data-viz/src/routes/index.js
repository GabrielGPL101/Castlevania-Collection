var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.send("API Web Data Viz em funcionamento.");
});

module.exports = router;