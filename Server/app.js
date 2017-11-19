var express     =   require("express"),
    bodyParser  =   require("body-parser"),
    path        =   require("path"),
    app         =   express();


/** REQUIRING ROUTERS **/
var indexRouter       =   require("./routes"),
    paymentsRouter    =   require("./routes/payments"),
    plansRouter       =   require("./routes/plans");

/** MIDDLEWARE **/
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../Client/public')));


/** ROUTES **/
app.use("/", indexRouter);
app.use("/plans", plansRouter);
app.use("/payment", paymentsRouter);


/** SERVER CONNECTION **/
var port  = process.env.PORT || 3000;
var ip    = process.env.IP || "localhost";
app.listen(port, ip, function() {
    console.log("listening on port: " + port + " ip: " + ip);
    console.log("Loading data onto server...");
});