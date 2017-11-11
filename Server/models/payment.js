var mongoose  =  require("mongoose");

/* The paiment model */
// the _id is generated automatically by the database
var paymentSchema = mongoose.Schema({
    payment_date: {
        type: Date,
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