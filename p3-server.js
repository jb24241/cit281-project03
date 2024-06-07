// Import the necessary modules
const fastify = require('fastify')();
const fs = require('fs');
const path = require('path');
const { coinCount } = require('./p3-module.js');

// Route to serve the main index.html page
fastify.get('/', (request, reply) => {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            reply.status(500).send('Error reading the file');
        } else {
            reply.header("Content-Type", "text/html; charset=utf-8").code(200).send(data);
        }
    });
});

// Route to handle /coin requests
fastify.get('/coin', (request, reply) => {
    const { denom = 0, count = 0 } = request.query;
    const denomNum = parseInt(denom, 10);
    const countNum = parseInt(count, 10);
    const coinValue = coinCount({ denom: denomNum, count: countNum });

    reply
        .code(200)
        .header("Content-Type", "text/html; charset=utf-8")
        .send(`<h2>Value of ${countNum} of ${denomNum} is ${coinValue}</h2><br /><a href="/">Home</a>`);
});

// Route to handle /coins requests with different options
fastify.get('/coins', (request, reply) => {
    const { option } = request.query;
    let coinValue = 0;
    const coins = [{ denom: 5, count: 3 }, { denom: 10, count: 2 }];
    switch(option) {
        case '1':
            coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
            break;
        case '2':
            coinValue = coinCount(...coins);
            break;
        case '3': // Extra credit: Handling array of coin objects
            coinValue = coinCount(coins);
            break;
        default:
            coinValue = 0; // For invalid options
    }

    reply
        .code(200)
        .header("Content-Type", "text/html; charset=utf-8")
        .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);
});

// Start the server
fastify.listen(8080, 'localhost', (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening on ${address}`);
});