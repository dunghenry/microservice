const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
dotenv.config();
const redis = require('redis');
const port = process.env.PORTSENDMAIL || 5000;
const app = express();
app.use(cors());
app.use(helmet());
const client = redis.createClient();
(async () => {
    const subscriber = client.duplicate();
    await subscriber.connect();

    // await subscriber.subscribe('ordersystem', (channel, message) => {
    //     console.log(message);
    //     console.log(typeof message);
    //     console.log(channel);
    // });

    await subscriber.pSubscribe('o*', (pattern, channel, message) => {
        console.log(message);
        console.log(pattern);
        console.log(typeof message);
        console.log(channel);

    });
})();
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));