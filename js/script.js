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

function atualizarDinheiroNaTela() {
    let dinheiroDiv = document.getElementById('dinheiro');
    if (!dinheiroDiv) {
        dinheiroDiv = document.createElement('div');
        dinheiroDiv.id = 'dinheiro';
        dinheiroDiv.style.color = '#fff';
        dinheiroDiv.style.fontSize = '1.2rem';
        dinheiroDiv.style.margin = '10px';
        document.body.prepend(dinheiroDiv);
    }
    dinheiroDiv.textContent = `Dinheiro: $${dinheiro}`;
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
    const numero = document.createElement('span');
    numero.textContent = `+${valor}`;
    numero.style.position = 'absolute';
    numero.style.left = `${x}px`;
    numero.style.top = `${y}px`;
    numero.style.fontSize = '2rem';
    numero.style.fontWeight = 'bold';
    numero.style.color = '#8f00ff';
    numero.style.pointerEvents = 'none';
    numero.style.userSelect = 'none';
    numero.style.zIndex = 1000;
    numero.style.transition = 'all 1s ease';
    numero.style.opacity = 1;

    document.body.appendChild(numero);

    setTimeout(() => {
        numero.style.top = `${y - 60}px`;
        numero.style.opacity = 0;
    }, 10);

    setTimeout(() => {
        numero.remove();
    }, 1000);
}

// Clique na imagem do inimigo
document.addEventListener('DOMContentLoaded', function() {
    const img = document.getElementById('imagemDoJogo');
    img.addEventListener('click', function(e) {
        // Centraliza o número no centro da imagem
        const rect = img.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        mostrarNumeroAnimado(pontosPorClique, x, y);

        // Aqui você pode adicionar a lógica para somar pontos, etc.
    });
});

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


function comprarUpgrade(upg) {
    let custo;
    
    if (upg === 1) {
        custo = 10;
    } else if (upg === 2) {
        custo = 50;
    } else if (upg === 3) {
        custo = 100;
    } else {
        alert("Upgrade inválido!");
        return; // Sai da função se o upgrade for inválido
    }
    
    if (pontuacao >= custo) {
        pontuacao -= custo;
        upgradeAtivo = upg;
        document.getElementById("pontuacao").textContent = `Pontuação: ${pontuacao}`;
    } else {
        alert("Você não tem pontos suficientes!");
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