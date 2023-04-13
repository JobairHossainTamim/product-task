const express = require("express");
require('dotenv').config()
const app = express();
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser');

//Router Path

const categoryRoute = require('./router/categories');
const attributeRoute = require('./router/attribute');
const product = require('./router/attribute');


app.use('/api/categories', categoryRoute);
app.use('/api/attributes', attributeRoute);
app.use('/api/products', product);






// App Required 
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.raw({ inflate: true, limit: '100kb', type: 'text/xml' }));
app.use(bodyParser.raw({ type: 'application/json' }));



const PORT = process.env.PORT || 5000;


app.get("/", (req, res) => res.send("Hello World!"));
app.listen(PORT, () => console.log("Server running on port " + PORT));

