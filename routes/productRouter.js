const { Router } = require('express');
const productController = require('../controllers/productController');

const productRouter = Router();

productRouter.get('/', productController.getAllProducts);
productRouter.get('/filter', productController.getSpecificProducts);
productRouter.post('/addProduct', productController.addProduct);
productRouter.put('/editProduct', productController.editProduct);
productRouter.delete('/removeProduct', productController.removeProduct);


module.exports = productRouter;

