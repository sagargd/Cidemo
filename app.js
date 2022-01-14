
const express = require('express');
var cors = require('cors');
var swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('./swagger.json');

var app = express(); //create a new app object
//const PORT = process.env.PORT || 500  0;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())

//Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

//configure routes
app.use("/employees", require('./routes/employee-routes'));

// app.listen(PORT,()=>{
// console.log("Express Server started");
// })

//configure error handlers
// app.use(function(err,req,res,next){
//     console.error(err.stack)
//     res.status(500).send('Something broke!')
// })

//configure error handlers
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV == "development") {
    console.error(err.stack);
    }
    res.status(500).send({ 'error': 'Something broke!' })
    });

module.exports = app;

