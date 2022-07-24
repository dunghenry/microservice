const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const redis = require('redis');
dotenv.config();
const port = process.env.PORTORDER || 3000;
const app = express();
const client = redis.createClient();
client.on('error', (err) => console.log('Redis Client Error'));
client.on("connect", () => {
    console.log("Redis plugged in.");
});
app.use(cors());
app.use(helmet());

app.get('/', async (req, res) => {
    const order = [
        {
            productId: 1,
            price: 1000,
        },
        {
            productId: 2,
            price: 2000,
        }
    ]
   await client.publish('ordersystem', JSON.stringify(order));
    return res.json({
        status: 200,
        order
    })
});
(async () => {
    await client.connect();
})();
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));