let pontuacao = 0;
let upgradeAtivo = 0;
let cliques = 0;
let imagemAtual = 1;

let upgradeLevel = 0;
let pontosPorClique = 1;
let dinheiro = 0;


function atualizarPontosPorClique() {
    if (upgradeLevel === 0) {
        pontosPorClique = 1;
    } else if (upgradeLevel === 2) {
        pontosPorClique = 2;
    } else if (upgradeLevel === 3) {
        pontosPorClique = 8;
    } else if (upgradeLevel === 4) {
        pontosPorClique = 32;
    }
}

// Função para comprar upgrade
function comprarUpgrade() {
    let custo = 10 * (upgradeLevel + 1); // Exemplo de custo progressivo
    if (dinheiro >= custo && upgradeLevel < 4) {
        dinheiro -= custo;
        upgradeLevel++;
        atualizarPontosPorClique();
        atualizarDinheiroNaTela();
        alert('Upgrade comprado! Nível atual: ' + upgradeLevel);
    } else if (upgradeLevel >= 4) {
        alert('Você já atingiu o nível máximo de upgrade!');
    } else {
        alert('Dinheiro insuficiente para upgrade!');
    }
}

// Clique na imagem do inimigo
document.addEventListener('DOMContentLoaded', function() {
    const img = document.getElementById('imagemDoJogo');
    img.addEventListener('click', function(e) {
        const rect = img.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        mostrarNumeroAnimado(pontosPorClique, x, y);
        dinheiro += pontosPorClique;
        atualizarDinheiroNaTela();
    });
    atualizarDinheiroNaTela();
});

// Função para mostrar o número animado ao clicar
function mostrarNumeroAnimado(valor, x, y) {
    const container = document.createElement('span');
    container.style.position = 'absolute';
    container.style.left = `${x}px`;
    container.style.top = `${y}px`;
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.fontSize = '2rem';
    container.style.fontWeight = 'bold';
    container.style.color = '#8f00ff';
    container.style.pointerEvents = 'none';
    container.style.userSelect = 'none';
    container.style.zIndex = 1000;
    container.style.transition = 'all 1s ease';
    container.style.opacity = 1;

    const numero = document.createElement('span');
    numero.textContent = `+${valor}`;

    const img = document.createElement('img');
    img.src = 'https://github.com/gui-bt/CryptPointClicker/blob/main/img/coin.png?raw=true';
    img.alt = 'Moeda';
    img.style.width = '28px';
    img.style.height = '28px';
    img.style.marginLeft = '8px';

    container.appendChild(numero);
    container.appendChild(img);
    document.body.appendChild(container);

    setTimeout(() => {
        container.style.top = `${y - 60}px`;
        container.style.opacity = 0;
    }, 10);

    setTimeout(() => {
        container.remove();
    }, 1000);
}


document.getElementById("imagemDoJogo").addEventListener("click", clickBotao);

document.getElementById("pontuacao").textContent = `Pontuação: ${pontuacao}`;


function clickBotao() {
    pontuacao += pontosPorClique;
     document.getElementById("pontuacao").textContent = `Pontuação: ${pontuacao}`;

    cliques++;
    console.log(cliques);
    if (cliques % 15 === 0 && cliques !== 0) {
        trocarImagem();
    }
}


function trocarImagem() { 
    const img = document.getElementById("imagemDoJogo");
    
    if (imagemAtual === 1) {
        img.src = "img/inimigo2.png";
        imagemAtual = 2;
    } else if (imagemAtual === 2) {
        img.src = "img/inimigo3.png";
        imagemAtual = 3;
    } else {
        img.src = "img/inimigo1.png";
        imagemAtual = 1;
    }
}
