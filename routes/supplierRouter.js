const { Router } = require('express');
const supplierController = require('../controllers/supplierController');

const supplierRouter = Router();

supplierRouter.post('/addSupplier', supplierController.addSupplier);
supplierRouter.put('/editSupplier', supplierController.editSupplier);
supplierRouter.delete('/removeSupplier', supplierController.removeSupplier);

module.exports = supplierRouter;