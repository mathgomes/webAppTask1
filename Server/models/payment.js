var mongoose  =  require("mongoose");

/* The paiment model */
var paymentSchema = mongoose.Schema({
    payment_date: {
        type: Date,
        required: true
    },
    payment_type: {
        type: String,
        required: true
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