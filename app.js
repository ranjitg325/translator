const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const route = require('./routes/route.js');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
extended: true
}));


mongoose.connect("mongodb+srv://sapna20:Sapnadha20@cluster0.crepr.mongodb.net/translator-db?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => console.log('mongodb running on 2707'))
    .catch(err => console.log(err))


app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});