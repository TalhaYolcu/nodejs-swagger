
var mongoose = require("mongoose");
var cors = require("cors");


var swaggerUI = require('swagger-ui-express');
swaggerDoc = require('./swagger.json');

//user localhost:PORT/swagger to see swagger ui


//import express and initialize
const express = require('express');
const app = express();

app.use('/swagger',swaggerUI.serve,swaggerUI.setup(swaggerDoc));

app.use(cors());


app.use(express.json());
//define port
const PORT = 8080

//listen on a port
app.listen(
    PORT,
    () => console.log(`listening on http://localhost:${PORT}`)
);

//get request on a tshirt page
app.get('/tshirt',(req,res) => {
    //answer to the request with a 200 status code and send the response
    res.status(200).send({
        color : 'red',
        size : 'xs'
    })
});

//dynamic url, there could be so many tshirts
app.post('/tshirt/:id',(req,res) => {
    const { id } = req.params;
    const {logo} = req.body;

    if(!logo) {
        res.status(418).send({message:"We need a logo!"});
    }
    else {
            res.send({
        tshirt:`Tshirt with your ${logo} and ID of ${id}`
    })
    }

});


app.get('/user/:id',(req,res) => {
    const {id} = req.params;
    res.status(200).send({message:`User found with an id ${id}`})
}) ;

app.post('/user/:id',(req,res) => {
    const {id} = req.params;
    const {name} = req.body;
    
    if(!name.includes('username')) {
        res.status(418).send({message:"Please enter valid username"});
    }
    else {
        res.status(418).send({message:"User sign up successful"})
    }
})

app.get('/',(req,res) => {
    res.status(200).send({message:"Welcome to nodejs express server!"})
})