const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

// {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// }

app.use((req, res, next) => {
  req.user = {
    _id: '622e13ed15a3a243b16d3280',
  };

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening at ${PORT}`);
});
