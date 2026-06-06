const express = require("express")
const dotenv = require("dotenv").config()
const {Pool} = require("pg")
const PORT = process.env.PORT || 3030

const app = express()

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;

if (DB_HOST && DB_PORT && DB_NAME && DB_USER && DB_PASS) {
  const pool = new Pool({
    host: DB_HOST,
    port: Number(DB_PORT),
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASS,
  });
} else {
  console.error( 
    "ERRO - Variáveis de ambiente não encontradas para conexão ao banco de dados.",
  );
}

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