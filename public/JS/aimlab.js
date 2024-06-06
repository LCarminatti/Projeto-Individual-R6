const tela = document.querySelector('.tela');
const pontosElemento = document.getElementById('pontos');
const fimJogoCard = document.getElementById('fimJogoCard');
const inicioJogoCard = document.getElementById('inicioJogoCard');
const pontosFinais = document.getElementById('pontosFinais');
const tempoJogo = document.getElementById('tempo');
const iniciarJogoBtn = document.getElementById('iniciarJogoBtn');
const tentarNovamenteBtn = document.getElementById('tentarNovamenteBtn');
const sairBtn = document.getElementById('sairBtn');
let pontos = 0;
let contadorElementos = 0;
const limiteElementos = 30;
let tempoInicial = 0;

iniciarJogoBtn.addEventListener('click', () => {
    inicioJogoCard.classList.add('oculto');
    iniciarJogo();
});

function iniciarJogo() {
    pontos = 0;
    contadorElementos = 0;
    pontosElemento.innerHTML = 'Pontos: ' + pontos;
    tempoInicial = Date.now();
    limparTela();
    gerarElementoAleatorio();
}

function gerarElementoAleatorio() {
    if (pontos >= limiteElementos) {
        exibirFimJogo();
        return;
    }

    const elemento = document.createElement('div');
    elemento.classList.add('elemento');
    const topRandom = Math.random() * (window.innerHeight - 100); 
    const leftRandom = Math.random() * (window.innerWidth - 100); 

    elemento.style.top = topRandom + 'px';
    elemento.style.left = leftRandom + 'px';

    elemento.addEventListener('click', clickElemento);

    tela.appendChild(elemento);

    contadorElementos++;

    setTimeout(gerarElementoAleatorio, 500);
}

function clickElemento() {
    pontos++;
    pontosElemento.innerHTML = 'Pontos: ' + pontos;
    this.remove();
    if (pontos >= limiteElementos) {
        exibirFimJogo();
    }
}

function exibirFimJogo() {
    const tempoFinal = (Date.now() - tempoInicial) / 1000; // Calcula o tempo de jogo em segundos
    const segundos = Math.floor(tempoFinal % 60);
    pontosFinais.innerHTML = pontos;
    tempoJogo.innerHTML = `Finalizado em: ${segundos} segundos`;
    fimJogoCard.classList.remove('oculto');
    limparTela()
}

function limparTela() {
    const elementos = document.querySelectorAll('.elemento'); 
    elementos.forEach(elemento => {
        elemento.remove(); 
    });
}

tentarNovamenteBtn.addEventListener('click', () => {
    fimJogoCard.classList.add('oculto');
    iniciarJogo();
});

sairBtn.addEventListener('click', () => {
    window.location = 'dashboard/dashboardR6.html';
});