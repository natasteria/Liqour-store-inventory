require('dotenv').config();

const express = require('express');

const productRouter = require('./routes/productRouter');
const categoryRouter = require ('./routes/catergoryRouter');
const supplierRouter = require ('./routes/supplierRouter');

const app = express();

app.use(express.json());

//route to get all products
app.use('/products', productRouter);
app.use('/category', categoryRouter);
app.use('/supplier', supplierRouter);

app.get('/', (req, res) => res.send('hello'));

app.listen(process.env.PORT, () => {
    console.log(`Server has started at port: ${process.env.PORT}`);
});

