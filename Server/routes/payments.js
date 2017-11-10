var router        =   require("express").Router(),
    paymentModel  =   require("../models/payment");
    middleware    =   require("../middleware");

router.post("/", middleware.checkConstraints, function(req, res) {
    // Cretes the model on the database
    paymentModel.create(req.body, function(err, createdPayment) {
        if(err || !createdPayment) {
            var message = "One or more fields are not defined or incorrect, " +
            "please, insert all the fields correctly";
            return res.status(400).json({message: message});
        }
        else res.status(200).json(createdPayment);
    });
});

module.exports = router;