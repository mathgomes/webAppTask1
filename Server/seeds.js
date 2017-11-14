var mongoose     =  require("mongoose"),
    planModel    =   require("./models/plan"),
    paymentModel =   require("./models/payment");


function _eraseDB(cb) {
    planModel.remove({}, function(err) {
        if(err) console.log(err);
        else {
            paymentModel.remove({}, function(err) {
                cb();
            });
        }
    });
}

/* Populate the database adding the plans offered */
function _populateDB() {
    var plans = [
        {
            product: "gold_plan",
            price: 59.90,
            description: "plano pago gold"
        },
        {
            product: "platinum_plan",
            price: 79.90,
            description: "premium platinum"
        },
        {
            product: "super_premium_plan",
            price: 129.90,
            description: "o melhor plano de todos"
        },
    ];
    plans.forEach(function(plan) {
        planModel.create(plan, function(err, createdPlan) {
            if(err) console.log(err);
            else {
                console.log("inserted " + createdPlan.product); 
            }
        });
    });
}

function seedDB() {
    // Erase database, then populate it
    _eraseDB(_populateDB);
}

module.exports = seedDB;