let pontuacao = 0;
let cliques = 0;
let imagemAtual = 1;
let upgradeLevel = 1;
let pontosPorClique = 1;
let dinheiro = 0;

let upgrade1 = false;
let upgrade2 = false;
let upgrade3 = false;

function atualizarValorCliqueNaTela() {
    document.getElementById("valor_clique").textContent = pontosPorClique;
}


function atualizarUpgradeNaTela() {
    document.getElementById("numero_upgrades").textContent = upgradeLevel;
}


document.querySelectorAll('.nome_upgrade').forEach((upgrade, index) => {
    upgrade.addEventListener('click', () => {
        if (upgradeLevel >= 4) {
            alert('Você não pode comprar mais upgrades, nível máximo atingido!');
            return;
        }

        let custo;

        switch (index) {
            case 0: // Bobby
                custo = 10;
                if (pontuacao >= custo && upgrade1 == false) {
                    pontuacao -= custo;
                    pontosPorClique += 1;
                    upgradeLevel = 2;
                    upgrade1 = true;
                    atualizarValorCliqueNaTela();
                    alert('Bobby liberado! Aumento de clique: +1');
                } else {
                    alert('Não é possível liberar Bobby!');
                }
                break;
            case 1: // Doge
                custo = 50;
                if (pontuacao >= custo && upgrade2 == false) {
                    pontuacao -= custo;
                    pontosPorClique += 8;
                    upgradeLevel = 3;
                    upgrade2 = true;
                    atualizarValorCliqueNaTela();
                    alert('Doge liberado! Aumento de clique: +8');
                } else {
                    alert('Não é possível liberar Doge!');
                }
                break;
            case 2: // Erebro
                custo = 100;
                if (pontuacao >= custo && upgrade3 == false) {
                    pontuacao -= custo;
                    pontosPorClique += 32;
                    upgradeLevel = 4;
                    upgrade3 = true;
                    atualizarValorCliqueNaTela();
                    alert('Erebro liberado! Aumento de clique: +32');
                } else {
                    alert('Não é possível para liberar Erebro!');
                }
                break;
        }
        document.getElementById("pontuacao").textContent = `Pontuação: ${pontuacao}`;
        atualizarUpgradeNaTela();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const img = document.getElementById('imagemDoJogo');
    img.addEventListener('click', function (e) {
        const rect = img.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        mostrarNumeroAnimado(pontosPorClique, x, y);
        dinheiro += pontosPorClique;
        atualizarDinheiroNaTela();
    });
    atualizarDinheiroNaTela();
});

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

    if (pontuacao >= 500) {
        alert('Pontuação máxima de 500 atingida! Reiniciando jogo...');
        pontuacao = 0;
        upgradeLevel = 1;
        pontosPorClique = 1;
        atualizarValorCliqueNaTela();
        atualizarUpgradeNaTela();
    }

    cliques++;
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
