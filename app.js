const express = require('express');
const dotenv = require('dotenv');
const { Client } = require('pg');

const app = express();
dotenv.config();

const client = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

client.connect();
app.get('/api/branches/autocomplete', (req, res) => {
    const q = req.query.q.toLowerCase();
    const limit = req.query.limit ? req.query.limit : 0;
    const offset = req.query.offset ? req.query.offset : 0;

    const query = `
        SELECT * FROM branches 
        WHERE LOWER(branch) LIKE '%${q}%' 
        ORDER BY ifsc ASC 
        LIMIT ${limit} OFFSET ${offset}
        `;
    (async() => {
        try {
            const response = await client.query(query);
            res.send(response.rows);
            for(let row of response.rows) {
                console.log(row);
            }
        } catch (err) {
            console.log(err.stack);
        }
    })();
});


app.get('/api/branches', (req, res) => {
    console.log(req.query);
    const q = req.query.q.toLowerCase();
    const limit = req.query.limit ? req.query.limit : 0;
    const offset = req.query.offset ? req.query.offset : 0;

    const query = `
        SELECT * FROM branches 
        WHERE (
            LOWER(ifsc) LIKE '%${q}%' OR
            bank_id::text LIKE '%${q}%' OR
            LOWER(branch) LIKE '%${q}%' OR
            LOWER(address) LIKE '%${q}%' OR
            LOWER(city) LIKE '%${q}%' OR
            LOWER(district) LIKE '%${q}%' OR
            LOWER(state) LIKE '%${q}%'
        )
        ORDER BY ifsc ASC 
        LIMIT ${limit} OFFSET ${offset}
        `;
    (async() => {
        try {
            const response = await client.query(query);
            res.send(response.rows);
            for(let row of response.rows) {
                console.log(row);
            }
        } catch (err) {
            console.log(err.stack);
        }
    })();
});

app.listen(3000, () => {
    console.log('Listening on port 3000...')
});