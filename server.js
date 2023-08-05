const express = require('express');
const app = express();
const dbConnection = require('./database/db');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');


dbConnection();

// console.log("hello");

// https://tanshare.onrender.com
 
// console.log(path.resolve("./database"));

const corsOptions = {
      origin: process.env.ALLOWED_CILENTS.split(',')
};    

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));

app.get('/', (req, res) => {
      res.send('Hello there Mate! Just believe in yourself and do it');
});

app.listen(3000, (err) => {
      if(!err) {
            console.log("Server listening at PORT 3000!");
      }
});


