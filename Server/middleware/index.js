var planModel =   require("../models/plan"),
    productModel = require("../models/plan");

function _checkDiscout(discount) {
    if(discount) {
        discount = discount.replace("%","");
        discount = Number(discount) / 100;
        return discount; 
    }
}
function _checkPrice(prod_price) {
    if(prod_price) {
        prod_price = prod_price.replace(",",".");
        // matches any decimal digit
        prod_price = prod_price.match(/\d+(.\d+)?/)[0];
        prod_price = Number(prod_price);
        return prod_price;
    }
}

module.exports = {
    /* Check for all the constraints related */
    checkConstraints: function(req, res, next) {
        // Validate price
        req.body.product_price = _checkPrice(req.body.product_price);
        // Validate date (format: MM/DD/YYYY)
        req.body.payment_date = new Date(req.body.payment_date);
        // Validate discount
        req.body.discount = _checkDiscout(req.body.discount);
        req.body.price = req.body.product_price * (1 - req.body.discount);

        //Discount error
        if(req.body.discount > 0.5) {
            return res.status(400).json({message: "Discount cant be bigger than 50%"});
        }
        else {
            planModel.findByName(req.body.product, function(err, foundPlan) {
                if(err) return res.status(500).json({message: "Internal server error"});
                else if(!foundPlan) return res.status(400).json({message: "Product not found"});
                else  {
                    // If found product, link its id to the product attribute
                    req.body.product = foundPlan._id;
                    if(foundPlan.price != req.body.product_price) {
                        var message = "Informed price does not match products R$ " + foundPlan.price + " price";
                        return res.status(400).json({message: message});
                    }
                    else next();
                }
            });
        }
    }
}


