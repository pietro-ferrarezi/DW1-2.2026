const express = require("express")
const multer = require("multer")
const path = require("path")

const app = express()

const PORT = 3030

app.use(express.json())
app.use(express.static(path.join(__dirname, "statics")))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'POST')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.post("/registrar", upload.single("imagem"), (req, res) => {
    const { nome, nota1, nota2, nota3, nota4 } = req.body
    const notas = [nota1, nota2, nota3, nota4]

    let soma = 0
    for (let i = 0;i < notas.length;i++) {
        if (notas[i] > 10) notas[i] = parseFloat(notas[i] / 10)
        soma = soma + parseFloat(notas[i])
    }
    let media = (soma / notas.length).toFixed(1)

    let resultado = parseFloat(media) >= 6 ? "Aprovado" : "Reprovado"

    console.log({ nome, media, resultado })
    res.send({ nome, media, resultado })
})
 
app.listen(PORT, () => console.log(`Server Running! http://localhost:${PORT}`))