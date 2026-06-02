const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require('fs').promises;

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

async function garantirPastaExistente(nomePasta) {
    try {
        const caminho = path.join(__dirname, nomePasta);
        
        await fs.mkdir(caminho, { recursive: true });
        console.log(`Pasta garantida com sucesso em: ${caminho}`);
    } catch (error) {
        console.error('Erro ao criar a pasta:', error);
    }
}

garantirPastaExistente('./images');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images/');
  },
  filename: function (req, file, cb) {
    const cpf = req.body.cpf;
    const extensao = path.extname(file.originalname);

    cb(null, `${cpf}${extensao}`);
  }
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.post("/imc", upload.single("imagem"), (req, res) => {
    const { nome, peso, altura } = req.body

    const imc = (peso / altura**2).toFixed(1)
    let resultado = ""

    if (imc <= 16) {
        resultado = "Magreza Extrema"
    } else if (imc <= 16.9) {
        resultado = "Magreza Moderada"
    } else if (imc <= 18.4) {
        resultado = "Magreza Leve"
    } else if (imc <= 24.9) {
        resultado = "Saudável"
    } else if (imc <= 29.9) {
        resultado = "Sobrepeso"
    } else if (imc <= 34.9) {
        resultado = "Obesidade Grau I"
    } else if (imc <= 39.9) {
        resultado = "Obesidade Grau II"
    } else if (imc >= 40) {
        resultado = "Obesidade Grau III"
    }

    console.log(nome, imc, resultado)
    res.json({ nome, imc, resultado })

})
 
app.listen(PORT, () => console.log(`Server Running! http://localhost:${PORT}`))