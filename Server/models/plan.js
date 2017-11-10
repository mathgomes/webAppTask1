var mongoose  =  require("mongoose");

/* The plan model */
var productSchema = mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

var planModel = module.exports = mongoose.model("products", productSchema);
module.exports.findByName = function(name, cb) {
    planModel.findOne({product: name}, function(err, foundPlan) {
        cb(err, foundPlan);
    });
}

