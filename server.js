const express = require('express');
const app = express();
const dbConnection = require('./database/db');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const File = require('./models/file');

dbConnection();

const corsOptions = {
      "origin": "*",
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": true,
      "optionsSuccessStatus": 204
}
    
app.use(cors(corsOptions))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));

app.get('/', async (req, res) => {
      res.sendFile(path.join(__dirname+'/public/index.html'));
});

// ye madarchod ke wajah se problem aa raha tha 127.0.0.1 dal raha tha main
app.listen(3000, async (err) => {
      if(!err) {
            const ans = await File.deleteMany({});
            console.log("Server listening at PORT 3000!");
      } 
});
