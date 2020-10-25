const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('./dotenv');

const app = express(); 
const PORT = process.env.PORT || 8003;

const routes = require('./routes/api')
dotenv.config();

mongoose.connect( 
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    },
    () => console.log('connected to db!')
);

//Check for database connection
mongoose.connection.on('connected', () => {
    console.log("Mongoose is connected!")
})

//Make data available to req.body 
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//Http request logger
app.use(morgan('tiny'));
app.use('/api', routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));