const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const redis = require('redis');
dotenv.config();
const port = process.env.PORTPAYMENT || 4000;
const app = express();
app.use(cors());
app.use(helmet());
const client = redis.createClient();
(async () => {
    const subscriber = client.duplicate();
    await subscriber.connect();
    await subscriber.subscribe('ordersystem', (channel, message) => {
        console.log(message);
        console.log(channel);
    });
})();
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));