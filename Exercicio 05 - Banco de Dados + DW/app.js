const express = require("express")
const dotenv = require("dotenv").config()
const {Pool} = require("pg")
const PORT = process.env.PORT

const app = express()

const pool = new Pool ({
    host: process.env.DB_HOST,
    name: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
})

app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// GET DATABASE DATA - ROUTES

app.get("/pessoas", async (req, res) => {
    query = "SELECT * FROM public.pessoa"
    result = await pool.query(query)

    res.json({
        sucesso: true,
        pessoas: result.rows,
    })
})


// --------------------------

app.listen(PORT, () => {
    console.log(`SERVER RUNNING! http://localhost:${PORT}`)
})