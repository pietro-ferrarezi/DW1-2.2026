const express = require("express")

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'POST')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use(express.json())

app.post("/enviar", (req, res) => {
    const { cat_A, cat_B } = req.body
    let hipotenusa = Math.hypot(cat_A, cat_B)
    res.send(`A hipotenusa é: ${hipotenusa}`)
})

app.listen("3000", () => {
    console.log("Server Running! 1")
})