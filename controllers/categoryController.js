const path = require('path');
const dbOperations = require(path.join(__dirname, "..", "db", "queries"));

async function addCategory(req, res){
    const { category_name } = req.body;
    try{
        const dbResponse = await dbOperations.addCategory(category_name);
        console.log('Category Added');
    }catch(err){
        console.log("Error: ", err);
    }
}

async function editCategory(req, res){
    const { category_name, category_id } = req.body;
    try{
        const dbResponse = await dbOperations.editCategory(category_name, category_id);
        console.log('Category Edited Successfully');
    }catch(err){
        console.log("Error: ", err);
    }
}

async function removeCategory(req, res){
    const { category_id } = req.body;
    try{
        const dbResponse = await dbOperations.removeCategory(category_id);
        console.log('Category Deleted');
    }catch(err){
        console.log("Error: ", err);
    }
}

module.exports = {addCategory, editCategory, removeCategory};