const express = require("express");

const router = require("./routes");
const bodyParser = require("body-parser");
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TIdb', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB', error);
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(cookieParser());

app.engine('ejs', require('ejs').renderFile);
app.set('view engine','ejs');

console.log(path.join(path.dirname(module.filename),'views'));
console.log(path.join(path.dirname(require.main.filename),'views/'));

app.set('views',[path.join(path.dirname(module.filename),'views/'),path.join(path.dirname(module.filename),'views/pages/')]);



app.use(router);

const PORT = 3000;

app.listen(PORT,function(){
    console.log("Server listening on 3000");
});