require('dotenv').config();
const { Client } = require('pg');
const path = require('path');

const pathToProductImg = path.join(__dirname, 'public', 'img', 'product')

let SQL = ``;

if(process.env.NODE_ENV === 'dev'){
    SQL = `
     TRUNCATE TABLE product, category, supplier RESTART IDENTITY CASCADE;

     INSERT INTO category (category_name) VALUES ('Beer'), ('Whisky'), ('Vodka'), ('Wine');

     INSERT INTO supplier (supplier_name, contact) VALUES ('ABC Trading', '+251911431717'), ('Ethio Liqour', '+251911342313');

    INSERT INTO product (product_name, product_brand, product_img, volume_value, volume_unit, price, category_id, supplier_id)
    VALUES 
    ('St. George Beer', 'BGI Ethiopia', '${path.join(pathToProductImg, 'beer.jpg')}', '330', 'ml', 35.00, 1, 1),
    ('Red Label Whisky', 'Johnnie Walker', '${path.join(pathToProductImg, 'whiskey.jpg')}', '750', 'ml', 550.00, 2, 2),
    ('Absolut Vodka', 'Absolut', '${path.join(pathToProductImg, 'vodka.jpg')}', '700', 'ml', 500.00, 3, 1),
    ('Gouder Wine', 'Castel Winery', '${path.join(pathToProductImg, 'wine.jpg')}', '750', 'ml', 250.00, 4, 2);
    `;


} 

async function seed(){
    const client = new Client({
        connectionString: process.env.DB_URL
    });
    try{
        await client.connect();
        await client.query(SQL);
        console.log('seeding completed')
    }catch(err){
        console.log(err);
    }finally{
        await client.end();
    }
}

seed();
