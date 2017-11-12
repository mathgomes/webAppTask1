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
        // Atempt to find the product in the database
        planModel.findByName(req.body.product, function(err, foundPlan) {
            if(err) return res.status(500).json({message: "Internal server error"});
            else if(!foundPlan) return res.status(400).json({message: "Product not found"});
            else  {
                if(foundPlan.price != req.body.product_price) {
                    var message = "Informed price does not match products R$ " + foundPlan.price + " price";
                    return res.status(400).json({message: message});
                }
                else  {
                // If no errors occured until now, validate the other attributes
                    req.body.transaction_id = Number(req.body.transaction_id);
                    // Validate price
                    req.body.product_price = _checkPrice(req.body.product_price);
                    // Validate discount
                    req.body.discount = _checkDiscout(req.body.discount);
                    req.body.product = foundPlan._id;
                    req.body.price = req.body.product_price * (1 - req.body.discount);
                    if(req.body.discount > 0.5) {
                        return res.status(400).json({message: "Discount cant be bigger than 50%"});
                    }
                    next();
                }
            }
        });
    }
};


