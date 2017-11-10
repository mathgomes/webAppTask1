var router        =   require("express").Router(),
    paymentModel  =   require("../models/payment");
    middleware    =   require("../middleware");

router.post("/", middleware.checkConstraints, function(req, res) {
    paymentModel.create(req.body, function(err, createdPayment) {
        if(err || !createdPayment) {
            res.json({
                code: 1,
                message: "One or more fields are not defined, please, insert all the fields"
            });
        }
        else res.json(createdPayment);
    });
});

module.exports = router;