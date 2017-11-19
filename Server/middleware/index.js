var planModel =   require("../models/plan"),
    paymentModel = require("../models/payment");

function _checkDate(date) {
    //YYYY/MM/DD
    date = date.match(/\d{4}\-\d{2}\-\d{2}/);
    if(!date) return;
    else return date[0]; 
}
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
        //Atempt to find the product in the database
        planModel.findByName(req.body.product, function(err, foundPlan) {
            if(err) return res.status(500).send("Internal server error");
            else if(!foundPlan) return res.status(400).send("Product not found");
            else  {
                // Validate product_price
                req.body.product_price = _checkPrice(req.body.product_price);
                if(foundPlan.price != req.body.product_price) {
                    var message = "Informed price does not match product's R$ " + foundPlan.price + " price";
                    return res.status(400).send(message);
                }
                else  {
                // If no errors occured until now, validate the other attributes
                    req.body.transaction_id = Number.parseInt(req.body.transaction_id);
                    // Validate discount
                    req.body.discount = _checkDiscout(req.body.discount);
                    if(req.body.discount > paymentModel.DISCOUNT_LIMIT) {
                        return res.status(400).send("Discount cant be bigger than 50%." +
                            " Currently, it is " + req.body.discount*100 + "%.");
                    }
                    // Validate date
                    req.body.payment_date = _checkDate(req.body.payment_date);
                    // Set price to 0 if discount is not set
                    if(req.body.discount) req.body.price = (req.body.product_price * (1 - req.body.discount)).toFixed(2);
                    else req.body.price = paymentModel.NO_PRICE;
                    return next();
                }
            }
        });
    }
};


