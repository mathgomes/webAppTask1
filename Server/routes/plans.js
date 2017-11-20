var router    =   require("express").Router(),
    planModel =   require("../models/plan");
    
router.get("/", function(req, res) {
    planModel.find({}, function(err, plans) {
        if(err || plans.length < 1) {
            var message = "Could not find any plans";
            return res.status(400).json({message: message});
        }
        return res.status(200).json(plans);
    });
});

module.exports = router;