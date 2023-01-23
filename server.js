const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const productRouter = require('./routes/products');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
const port = process.env.PORT || 5000;
const path = process.env.MONGO_PATH;
app.use(cors());
app.use(express.json());
app.use('/products', productRouter);

console.log(path);

mongoose.set('strictQuery', false);
mongoose.connect(path, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('mongodb is connected');
  }
});

const listener = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
