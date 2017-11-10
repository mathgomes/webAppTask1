# Web app task 1

Small web applciation to answer a few requests

## Getting Started

Clone the repository into your machine
```
git clone https://github.com/mathgomes/webAppTask1.git
```
### Prerequisites

You need to have nodeJs installed

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

A *POST* request to:
```
http://localhost:3000/payment
```
Adds a new payment to the database and returns the created payment

A *GET* request to: 
```
http://localhost:3000/plans
```
Returns a list of the plans stored in the database.

If you have mongo installed, you can connect to the database issuing the following command on the terminal:
```
mongo ds251845.mlab.com:51845/db_products -u math -p math
```

## Author

* **Matheus Gomes da Silva Horta** - (https://github.com/mathgomes)
