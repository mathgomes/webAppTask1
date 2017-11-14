# Web app task 1

Small web applciation to answer a few requests.

Stack used: Nodejs, Express, mongoDB, mongoose.

## Getting Started

Clone the repository into your machine
```
git clone https://github.com/mathgomes/webAppTask1.git
```
### Prerequisites

You need to have *nodeJs* and *npm* installed

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

*NOTE* The **price** field is derived in the backend. Please, provide the following fields when making a request:
- transaction_id : An **unique** id for the transaction
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

## Author

* **Matheus Gomes da Silva Horta** - (https://github.com/mathgomes)
