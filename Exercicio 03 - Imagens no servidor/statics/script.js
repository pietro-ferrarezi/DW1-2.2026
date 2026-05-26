const form = document.querySelector("#dados")

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const formData = new FormData(form)

    try {
        const response = await fetch(`http://localhost:3030/registrar`, {
            method: 'POST',
            body:  formData
        })

        const resposta = await response.text()
        const JSONresultado = JSON.parse(resposta)

        document.querySelector("#resultSpan").innerHTML = `Nome: ${JSONresultado.nome} <br> Média: ${JSONresultado.media} <br> Resultado: ${JSONresultado.resultado}`
    } catch (err) {
        console.log(err)
    }
})