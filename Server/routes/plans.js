var router    =   require("express").Router(),
    planModel =   require("../models/plan");
    
router.get("/", function(req, res) {
    planModel.find({}, function(err, plans) {
        if(err || plans.length < 1) res.send("<h1>Could not find any plans</h1>");
        else res.json(plans);
    });
});

module.exports = router;