const pool = require("./pool");

async function addCategory(category) {
  const sql = `INSERT INTO category (category_name) VALUES ($1)`;
  try {
    await pool.query(sql, [category]);
    return { success: true, message: "Category added successfully!" };
  } catch (err) {
    console.error("Error adding category:", err.message);
    return { success: false };
  }
}

async function addProduct({ product }) {
  const sql = `INSERT INTO product (product_name, product_brand, product_img, volume_value, volume_unit, price, category_id, supplier_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
  try {
    await pool.query(sql, [
      product.pName,
      product.brand,
      product.img,
      product.volume_value,
      product.volume_unit,
      product.price,
      product.category,
      product.supplier,
    ]);
    return { success: true, message: "Product added successfully" };
  } catch (err) {
    console.error("Error adding product:", err.message);
    return { success: false };
  }
}

async function getAllProducts() {
  const sql = `
    SELECT 
    product.*, 
    category.category_name,
    supplier.supplier_name
    FROM product 
    JOIN category 
    ON product.category_id = category.category_id
    JOIN supplier
    ON product.supplier_id = supplier.supplier_id
    `;

  try {
    const result = await pool.query(sql);
    return { success: true, data: result.rows };
  } catch (err) {
    return { success: false, error: err };
  }
}

async function getSpecificProducts(filterBy, filterOperation, filterValue) {
  const allowedColumns = [
    "product_id",
    "product_name",
    "product_brand",
    "volume_value",
    "price",
    "category_id",
    "supplier_id",
  ];
  const allowedOperations = ["=", "!=", "<", ">", "<=", ">=", "LIKE"];

  if (
    !allowedColumns.includes(filterBy) ||
    !allowedOperations.includes(filterOperation)
  ) {
    throw new Error("Invalid filter parameters");
  }

  const sql = `SELECT * FROM product WHERE ${filterBy} ${filterOperation} $1`;

  try {
    const result = await pool.query(sql, [filterValue]);
    return { success: true, data: result.rows };
  } catch (err) {
    console.log("Error: ", err);
    return { success: false };
  }
}

async function editProduct(modifiedProduct) {
  const sql = `UPDATE product SET 
    product_name = $1,
    product_brand = $2,
    product_img = $3,
    volume_value = $4,
    volume_unit = $5,
    price = $6,
    category_id = $7,
    supplier_id = $8 
    where product_id = $9;
    `;
  try {
    await pool.query(sql, [
      modifiedProduct.pName,
      modifiedProduct.brand,
      modifiedProduct.img,
      modifiedProduct.volume_value,
      modifiedProduct.volume_unit,
      modifiedProduct.price,
      modifiedProduct.category,
      modifiedProduct.supplier,
      modifiedProduct.product_id,
    ]);
    return { success: true, message: "Product edited successfully" };
  } catch (err) {
    console.log("Error: ", err);
    return { success: false };
  }
}

async function editCategory(category_name, category_id) {
  const sql = `UPDATE category set category_name = $1 where category_id = $2;`;
  try {
    await pool.query(sql, [category_name, category_id]);
    return { success: true, message: "Category edited successfully" };
  } catch (err) {
    console.log("Error: ", err);
    return { success: false };
  }
}

async function editSupplier(modifiedSupplier) {
  const sql = `UPDATE supplier set supplier_name = $1, contact = $2 where supplier_id = $3;`;
  try {
    console.log("modifed supplier id: ", modifiedSupplier.id);

    await pool.query(sql, [
      modifiedSupplier.name,
      modifiedSupplier.suppiler_contact,
      modifiedSupplier.id,
    ]);
    return { success: true, message: "Supplier edited successfully" };
  } catch (err) {
    console.log("Error: ", err);
    return { success: false };
  }
}

async function removeCategory(category_id) {
  const sql = "DELETE FROM category where category_id = $1;";
  try {
    await pool.query(sql, [category_id]);
    return { success: true, message: "Category deleted successfully" };
  } catch (err) {
    console.log("Error: ", err);
    return { success: false };
  }
}

async function removeProduct(product_id) {
  const sql = "DELETE FROM product where product_id = $1;";
  try {
    await pool.query(sql, [product_id]);
    return { success: true, message: "Product deleted successfully" };
  } catch (err) {
    console.log("Error: ", err);
    return { success: false };
  }
}

async function removeSupplier(supplier_id) {
  const sql = "DELETE FROM supplier where supplier_id = $1;";
  try {
    await pool.query(sql, [supplier_id]);
    return { success: true, message: "Product deleted successfully" };
  } catch (err) {
    console.log("Error: ", err);
    return { success: false };
  }
}

module.exports = {
  addCategory,
  addProduct,
  getAllProducts,
  getSpecificProducts,
  editCategory,
  editProduct,
  editSupplier,
  removeCategory,
  removeProduct,
  removeSupplier,
};
