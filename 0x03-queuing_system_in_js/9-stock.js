import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

// Create an express application
const app = express();

// Connect to redis
const client = redis.createClient();

// List of products
const listProducts = [
    { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
    { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
    { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
    { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 }
];

// Function to get an item by id
function getItemById(id) {
    // Use the array method find to get the item
    return listProducts.find(item => item.id === id);
}

// Function to reserve stock by id
function reserveStockById(itemId, stock) {
    // Set the key in Redis
    client.set(itemId, stock, redis.print);
}

// Function to get the current reserved stock by itemId
async function getCurrentReservedStockById(itemId) {
    // Promisify the client.get function
    const getAsync = promisify(client.get).bind(client);
    // Get the reserved stock by itemId
    const reservedStock = await getAsync(itemId);
    // Return the reserved stock
    return Number(reservedStock) || 0;
}

// Route to get the list of products
app.get('/list_products', (req, res) => {
    // Map the list of products to the response
    const response = listProducts.map(item => {
        return {
            itemId: item.id,
            itemName: item.name,
            price: item.price,
            initialAvailableQuantity: item.stock
        };
    });
    // Send the response as json
    res.json(response);
});

// Route to get a product by id
app.get('/list_products/:itemId', async (req, res) => {
    // Get the itemId from the request
    const itemId = Number(req.params.itemId);
    // Get the item by id
    const item = getItemById(itemId);
    // If the item does not exist
    if (!item) {
        // Send the response as json
        res.json({ status: 'Product not found' });
    } else {
        // Get the current reserved stock by itemId
        const reservedStock = await getCurrentReservedStockById(itemId);
        // Send the response as json
        res.json({
            itemId: item.id,
            itemName: item.name,
            price: item.price,
            initialAvailableQuantity: item.stock,
            currentQuantity: item.stock - reservedStock
        });
    }
});

// Route to reserve a product by id
app.get('/reserve_product/:itemId', async (req, res) => {
    // Get the itemId from the request
    const itemId = Number(req.params.itemId);
    // Get the item by id
    const item = getItemById(itemId);
    // If the item does not exist
    if (!item) {
        // Send the response as json
        res.json({ status: 'Product not found' });
    } else {
        // Get the current reserved stock by itemId
        const reservedStock = await getCurrentReservedStockById(itemId);
        // Get the current quantity available
        const currentQuanity = item.stock - reservedStock;
        // If the current quantity is 0
        if (currentQuanity === 0) {
            // Send the response as json
            res.json({
                status: 'Not enough stock available',
                itemId: item.id
            });
        } else {
            // Increment the reserved stock of the item
            reserveStockById(item.id, reservedStock + 1);
            // Send the response as json
            res.json({
                status: 'Reservation confirmed',
                itemId: item.id
            });
        }
    }
});

// Listen on port 1245
app.listen(1245, () => {
    console.log('Listening on port 1245');
});
