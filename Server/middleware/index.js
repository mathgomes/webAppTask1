var planModel =   require("../models/plan"),
    productModel = require("../models/plan");

function _checkDiscout(discount) {
    if(discount) {
        discount = discount.replace("%","");
        discount = Number(discount) / 100;
        return discount; 
    }
}

module.exports = {
    /* Check for all the constraints related */
    checkConstraints: function(req, res, next) {
        req.body.product_price = req.body.product_price.replace(",",".");
        req.body.product_price = Number(req.body.product_price);
        req.body.payment_date = new Date(req.body.payment_date);
        req.body.discount = _checkDiscout(req.body.discount);
        req.body.price = req.body.product_price * (1 - req.body.discount);
        
        if(req.body.discount > 0.5) {
            return res.json({
                code: 0,
                message: "Discount cant be bigger than 50%"
            });
        }
        else {
            planModel.findByName(req.body.product, function(err, foundPlan) {
                if(err || !foundPlan) {
                    return res.json({
                        code: 2,
                        message: "Product not found"
                    });
                }
                else  {
                    // If found product, link its id to the attribute
                    req.body.product = foundPlan._id;
                    console.log(req.body);
                    if(foundPlan.price != req.body.product_price) {
                        return res.json({
                            code: 3,
                            message: "Informed price does not match the product price"
                        });
                    }
                    next();
                }
            });
        }

    }
}


