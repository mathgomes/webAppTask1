var express     =   require("express"),
    bodyParser  =   require("body-parser"),
    app         =   express();

/** REQUIRING ROUTES **/
var indexRouter       =   require("./routes"),
    paymentsRouter    =   require("./routes/payments"),
    plansRouter       =   require("./routes/plans");

app.use(bodyParser.urlencoded({extended: true}));


/** ROUTES **/
app.use("/", indexRouter);
app.use("/plans", plansRouter);
app.use("/payment", paymentsRouter);



/** SERVER CONNECTION **/
var port  = process.env.PORT || 3000;
var ip    = process.env.IP || "localhost";
app.listen(port, ip, function() {
    console.log("listening on port: " + port + " ip: " + ip);
});