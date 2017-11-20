# Web app task 1

Small web applciation to answer a few requests.

Stack used: Nodejs, Express, mongoDB, mongoose.

## Getting Started

Clone the repository into your machine
```
git clone https://github.com/mathgomes/webAppTask1.git
```
### Prerequisites

You need to have _*nodeJs*_ and _*npm*_ installed

```
https://nodejs.org/en/
```

### Installing

Once nodejs is installed and the project is cloned, inside the /Server directory, do: 

```
npm install
```

This should install the node_modules folder and all the dependencies required

## Running the tests

To run the project, still inside the /Server directory, run the command: 

```
npm start
```

Once the server is initialized, open postman and test away!

A **POST** request to:
```
http://localhost:3000/payment
```
Adds a new payment to the database and returns the created payment


#### *NOTE* The **price** field is derived in the backend. Please, provide the following fields when making a request:
- transaction_id : _An **unique** id for the transaction_
- payment_date : The date of the trasanction
- payment_type : (cartao | boleto | cheque | dinheiro) are accepted
- product : The name of the product being purchased
- product_price : The price of the product
- discount: Amount of discount


A **GET** request to: 
```
http://localhost:3000/plans
```
Returns a list of the plans stored in the database.

The app uses a "database as a service" provided by MLab https://mlab.com/.

If you have mongo installed, you can connect to the database issuing the following command on the terminal:
```
mongo ds251845.mlab.com:51845/db_products -u math -p math
```
___

# Web app task 2

The frontend of this web app, to consume the API implemented on part 1
Stack used: 

[Bulma](https://bulma.io/), [Jquery](https://jquery.com/), [Font-awesome](http://fontawesome.io/)

## Getting Started

All the dependecies have its CDN linked so you're good to go.

Google Chrome is recommended.

## Running the tests

Entering
```
http://localhost:3000/
```
the user will be presented with the landing page, where it can click the button "List plans", to list
all the available plans.

When plans are listed, each one will have a button "Get this one! ". When this button is clicked, the user
will be redirected to
```
http://localhost:3000/payment/new
```
in which there will be a form to fill the fields and perform a payment.

A message will be displayed at the botttom of the form with an error or successful operation.

## Author

* **Matheus Gomes da Silva Horta** - (https://github.com/mathgomes)
