var mongoose  =  require("mongoose");

/* The paiment model */
// Remember to always type in an unique transaction_id
var paymentSchema = mongoose.Schema({
    transaction_id: {
        type: Number,
        required: true,
        unique: true
    },
    payment_date: {
        type: String,
        required: true
    },
    payment_type: {
        type: String,
        required: true,
        match: /^(cart(a|ã)o|boleto|cheque|dinheiro)$/i  
    },
    product: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});


module.exports = mongoose.model("payments", paymentSchema);
module.exports.DISCOUNT_LIMIT = 0.5;
module.exports.NO_PRICE = 0;