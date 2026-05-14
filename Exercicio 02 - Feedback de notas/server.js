const express = require('express')

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'POST')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use(express.json())

app.post('/verificar_nota', (req, res) => {
    const { nome, nota } = req.body
    if (nota < 7 && nota >= 0) {
        res.send(`Olá ${nome}, você precisará de recuperação`)
    } else if (nota >= 7 && nota <= 10) {
        res.send(`Parabéns ${nome}! Você foi aprovado!`)
    } else {
        res.send('Nota inválida!')
    }
})

app.listen(3000, () => {console.log("Server Running! 2")})