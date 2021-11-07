var express = require("express");

var router = express.Router();

router.post("/", function(req, res) {
    let q = []
    for (let i in req.body.keyEvents){
        q.push(req.body.keyEvents[i].key)
    }
    console.log(q);
    res.status(200).send("Added a new sample at " + new Date());
});

module.exports = router;