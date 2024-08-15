let numeroSecreto;
let jogoAtivo = false;
let maxNumero;
let dificuldadeEscolhida = '';
let tentativas = 0;
let fireworks;
const fireworksCanvas = document.getElementById('fireworksCanvas');

function iniciarJogo() {
    const dificuldade = document.querySelector('input[name="dificuldade"]:checked').value;
    maxNumero = parseInt(dificuldade, 10);
    dificuldadeEscolhida = `Dificuldade: ${getDificuldadeLabel(dificuldade)}`;

    numeroSecreto = Math.floor(Math.random() * maxNumero) + 1;
    jogoAtivo = true;
    tentativas = 0;

    document.getElementById('difficultyContainer').classList.add('hidden');
    document.getElementById('gameContainer').classList.remove('hidden');
    document.getElementById('restartButton').classList.add('hidden'); // Garante que o botão está oculto inicialmente
    document.getElementById('mensagem').innerText = `Jogo iniciado! Escolha um número entre 1 e ${maxNumero} e clique em 'Enviar Chute'.`;
    document.getElementById('dificuldadeEscolhida').innerText = dificuldadeEscolhida;
    document.getElementById('tentativas').innerText = `Tentativas: ${tentativas}`;

    if (!fireworksCanvas) {
        console.error('Elemento canvas não encontrado.');
        return;
    }

    fireworks = new Fireworks(fireworksCanvas, {
        maxRockets: 5,
        rocketSpawnInterval: 150,
        numParticles: 200,
        explosionMinHeight: 0.2,
        explosionMaxHeight: 0.9,
        explosionChance: 0.08
    });
}

// Adiciona o evento para o campo de input
inputChute.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        verificarChute();
    }
});

function verificarChute() {
    if (!jogoAtivo) {
        document.getElementById('mensagem').innerText = "Por favor, inicie um novo jogo primeiro.";
        return;
    }

    const chute = parseInt(document.getElementById('inputChute').value, 10);
    tentativas++;

    if (isNaN(chute) || chute < 1 || chute > maxNumero) {
        document.getElementById('mensagem').innerText = `Por favor, insira um número válido entre 1 e ${maxNumero}.`;
        return;
    }

    if (chute === numeroSecreto) {
        document.getElementById('mensagem').innerText = `Parabéns! Você descobriu o número ${numeroSecreto}.`;
        jogoAtivo = false;
        mostrarFogosDeArtificio();
        trocarFundo();
        document.getElementById('restartButton').classList.remove('hidden');
    } else if (chute > numeroSecreto) {
        document.getElementById('dicas').innerText = "O número secreto é menor.";
    } else {
        document.getElementById('dicas').innerText = "O número secreto é maior.";
    }

    document.getElementById('tentativas').innerText = `Tentativas: ${tentativas}`;
    document.getElementById('inputChute').value = ''; // Limpa o campo de input
}

function mostrarFogosDeArtificio() {
    if (fireworks) {
        fireworks.start();
        
        setTimeout(() => {
            fireworks.stop();
        }, 5000);
    }
}

function trocarFundo() {
    document.body.style.backgroundImage = "url('Design.png')";
}

function reiniciarJogo() {
    location.reload();
}

function getDificuldadeLabel(value) {
    switch(value) {
        case '10':
            return 'Fácil (1-10)';
        case '50':
            return 'Médio (1-50)';
        case '100':
            return 'Difícil (1-100)';
        default:
            return '';
    }
}
