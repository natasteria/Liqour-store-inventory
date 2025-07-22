const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS category (
    category_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE IF NOT EXISTS supplier (
    supplier_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    supplier_name VARCHAR(100) NOT NULL UNIQUE,
    contact VARCHAR(13) NULL
);

-- PRODUCT TABLE
CREATE TABLE IF NOT EXISTS product (
    product_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_name VARCHAR(100) NOT NULL,
    product_brand VARCHAR(100) NULL,
    product_img VARCHAR(150) NULL, 
    volume_value INTEGER NOT NULL, 
    volume_unit VARCHAR(2) NOT NULL,
    price NUMERIC NOT NULL, 
    category_id INT NULL REFERENCES category(category_id) ON DELETE SET NULL,
    supplier_id INT NULL REFERENCES supplier(supplier_id) ON DELETE SET NULL,
    
    CONSTRAINT product_name_volume_value_unit_key UNIQUE (product_name, volume_value, volume_unit);
);` ;

async function main(){
    const client = new Client({
        connectionString: process.env.DB_URL || "postgresql://nathan:nathan@localhost:5432/liqour_store"
    });
    try{
        await client.connect();
        await client.query(SQL);
        console.log("database schema created!!")
    }catch(err){
        console.log(err)
    }finally {
    await client.end();
    }
}

main();