var router        =   require("express").Router(),
    paymentModel  =   require("../models/payment");
    middleware    =   require("../middleware");

router.post("/", middleware.checkConstraints, function(req, res) {
    // Cretes the model on the database
    paymentModel.create(req.body, function(err, createdPayment) {
        if(err || !createdPayment) {
            var message = "One or more fields are not defined or incorrect. " +
            "Please, insert all the fields correctly.\nErrors are: ";

            if(err.name == "MongoError") {
                message += "\n\t You inserted a transaction_id that already exists";
                return res.status(400).send(message);
            }
            for (var attr in err.errors) {
                message += "\n\t" + err.errors[attr].message;
            }
            return res.status(400).send(message);
        }
        else  {
            // For display purposes
            var sentPayment = {};
            sentPayment.transaction_id = createdPayment.transaction_id;
            sentPayment.payment_date = createdPayment.payment_date;
            sentPayment.payment_type = createdPayment.payment_type;
            sentPayment.product = createdPayment.product;
            sentPayment.product_price = createdPayment.product_price;
            sentPayment.discount = createdPayment.discount;
            sentPayment.price = createdPayment.price;
            return res.status(200).json(sentPayment);
        }
    });
});

// /payment/new
router.get("/new", function(req, res) {
    res.render("new");
});


module.exports = router;
