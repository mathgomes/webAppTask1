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
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
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