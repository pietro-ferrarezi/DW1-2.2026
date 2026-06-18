const express = require('express')
const dotenv = require('dotenv').config()
const { Pool } = require('pg')

const app = express()
app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

app.get("/api/cidades", async (req, res) => {
    const query = await pool.query("SELECT * FROM cidade")

    const resposta = await query.rows

    res.status(200).json({
        status: "ok",
        resposta: resposta
    })
})

app.post("/api/buscarCidade", async (req, res) => {
    const { nome } = req.body
    
    const query = await pool.query("SELECT * FROM cidade WHERE nome_cidade ILIKE $1", [nome])

    const resposta = await query.rows[0]

    res.status(200).json({
        status: "ok",
        resposta: resposta
    })
})

app.listen(3030, () => {
    console.log("Servidor funcionando!")
})