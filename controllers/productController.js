const path = require('path');
const dbOperations = require(path.join(__dirname, "..", "db", "queries"));

async function getAllProducts(req, res) {
    const products = await dbOperations.getAllProducts();
    if(products.success){
        res.json(products.data);
    }
    else{
        res.send("Error retriving products");
    }
}

async function getSpecificProducts(req, res){
    const {filterBy, filterOperation, filterValue} = req.body;
    const products = await dbOperations.getSpecificProducts(filterBy, filterOperation, filterValue);
    if(products.success){
        res.json(products.data);
    }
    else{
        res.send("Error retriving products");
    }
}

async function addProduct(req, res){
    const { product } = req.body;
    try{
        const dbResponse = await dbOperations.addProduct(product);
        console.log('data submitted');
    }catch(err){
        console.log("Error: ", err);
    }
}

async function editProduct(req, res){
    const { modifiedProduct } = req.body;

    try{
        const dbResponse = await dbOperations.editProduct(modifiedProduct);
        console.log('Product successfully modified');
    }catch(err){
        console.log("Error: ", err);
    }


};

async function removeProduct(req, res){
    const { product_id } = req.body;

    try{
        const dbResponse = await dbOperations.removeProduct(pro);
        console.log('Product Deleted');
    }catch(err){
        console.log("Error: ", err);
    }


};





module.exports = { getAllProducts, getSpecificProducts, addProduct, editProduct, removeProduct};