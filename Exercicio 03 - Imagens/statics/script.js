const form = document.querySelector("#dados")

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const formData = new FormData(form)

    try {
        const response = await fetch(`http://localhost:3030/registrar`, {
            method: 'POST',
            body:  formData
        })

        const resultado = await response.text()
    } catch (err) {
        console.log(err)
    }
})