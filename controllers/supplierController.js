const path = require('path');
const dbOperations = require(path.join(__dirname, "..", "db", "queries"));

async function addSupplier(req, res){
    const { supplier_name, contact } = req.body;
    try{
        const dbResponse = await dbOperations.addSupplier(supplier_name, contact);
        console.log('Supplier Added');
    }catch(err){
        console.log("Error: ", err);
    }
}

async function editSupplier(req, res){
    const { modifiedSupplier } = req.body;
    try{
        const dbResponse = await dbOperations.editSupplier(modifiedSupplier);
        console.log('Supplier Edited');
    }catch(err){
        console.log("Error: ", err);
    }
}

async function removeSupplier(req, res){
    const { supplier_id } = req.body;
    try{
        const dbResponse = await dbOperations.removeSupplier(supplier_id);
        console.log('Supplier Deleted');
    }catch(err){
        console.log("Error: ", err);
    }
}

module.exports = {addSupplier, editSupplier, removeSupplier};