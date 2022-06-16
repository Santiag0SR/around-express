const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const router = require('./routes');

const { apiLimiter } = require('./utils/rateLimit');
const { MONGO_SERVER } = require('./utils/apploication_constants');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(MONGO_SERVER);

app.use(helmet());
app.use(apiLimiter);

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

// if (process.env.NODE_ENV !== "test") {
//   app.listen(PORT, () => {
//     console.log(`App listening on port ${PORT}`);
//   });
// }
