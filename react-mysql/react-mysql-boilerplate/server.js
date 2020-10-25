const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 5000

// app.use(express.urlencoded({extended: true}));
// app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

const Users = require("./models/User");

app.use("/users", Users)

app.listen(port, () => {
    console.log('Server is listening on port:', port)
})