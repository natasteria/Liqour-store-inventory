const {Router} = require('express');
const categoryController = require('../controllers/categoryController');

const categoryRouter = Router();

categoryRouter.post('/createCategory', categoryController.addCategory);
categoryRouter.put('/editCategory', categoryController.editCategory);
categoryRouter.delete('/removeCategory', categoryController.removeCategory);

module.exports = categoryRouter;