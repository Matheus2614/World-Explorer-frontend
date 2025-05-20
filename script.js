document.addEventListener('DOMContentLoaded', () => {
    const gerarBtn = document.getElementById('generate-response-btn');
    const limparBtn = document.getElementById('clear-object-btn');
    const paisInput = document.getElementById('pais-input');
    const assuntoInput = document.getElementById('assunto-input');
    const responseDiv = document.getElementById('response');

    gerarBtn.addEventListener('click', async () => {
        const pais = paisInput.value.trim();
        const assunto = assuntoInput.value.trim();

        if (!pais || !assunto) {
            alert("Por favor, preencha o país e o assunto.");
            return;
        }

        // Mostra o div de resposta e informa que está carregando
        responseDiv.classList.remove('hidden');
        responseDiv.innerHTML = "Carregando...";

        const data = {
            pais: pais,
            assunto: assunto
        }

        try {
            const response = await fetch('http://localhost:5000/conteudo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pais, assunto })
            });

            const result = await response.text();

            if (result) {
                responseDiv.innerHTML = result;
            } else {
                responseDiv.innerHTML = `<p class="text-red-600 font-semibold">Erro: ${result.error}</p>`;
            }

        } catch (error) {
            responseDiv.innerHTML = `<p> Erro: ${error.message}</p>`
            responseDiv.style.display = 'block'
        }
    });

    limparBtn.addEventListener('click', () => {
        paisInput.value = '';
        assuntoInput.value = '';
        responseDiv.innerHTML = '';
        responseDiv.classList.add('hidden');
    });
});