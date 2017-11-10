var router   =   require("express").Router(),
    mongoose =   require("mongoose"),
    seedDB   =   require("../seeds");

// Mongoose connection to "database as a service" mLab
var dburl = process.env.DATABASEURL || "mongodb://math:math@ds251845.mlab.com:51845/db_products";
mongoose.connect(dburl, {useMongoClient: true}, function(error) {
    if(error) console.log("Failed to connect to database");
    else {
        console.log("Succesfully connected");
        /* Inserts the plans in the database */
        seedDB();
    }
});



router.get("/", function(req, res) {
    res.send("Welcome to the home pageaaaaaaa");
});

module.exports = router;