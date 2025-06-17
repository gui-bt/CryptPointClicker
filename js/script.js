let pontuacao = 0;
let upgradeAtivo = 0;
let cliques = 0;
//Guilherme
let imagemAtual = 1;
//Imagem sempre começa por 1
//Guilherme
let upgradeLevel = 0;
let pontosPorClique = 1;
let dinheiro = 0;


function atualizarValorCliqueNaTela() {
    document.getElementById("valor_clique").textContent = pontosPorClique;
}

//Guilherme
//Função puxa a variavel upgradeLevel que começa com 0, de acordo com o upgrade aumenta os pontos
function atualizarPontosPorClique() {
    if (upgradeLevel === 0) {
        pontosPorClique = 1;
        document.getElementById("qtdade_upgrades").innerText = "Quantidade de upgrades comprados: 0 Upgrades";
    } else if (upgradeLevel === 2) {
        pontosPorClique = 2;
        document.getElementById("qtdade_upgrades").textContent = "Quantidade de upgrades comprados: 1 Upgrades";
    } else if (upgradeLevel === 3) {
        pontosPorClique = 8;
        document.getElementById("qtdade_upgrades").textContent = "Quantidade de upgrades comprados: 2 Upgrades";
    } else if (upgradeLevel === 4) {
        pontosPorClique = 32;
        document.getElementById("qtdade_upgrades").textContent = "Quantidade de upgrades comprados: 3 Upgrades";
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
        atualizarValorCliqueNaTela(); 
        alert('Upgrade comprado! Nível atual: ' + upgradeLevel);
    } else if (upgradeLevel >= 4) {
        alert('Você já atingiu o nível máximo de upgrade!');
    } else {
        alert('Dinheiro insuficiente para upgrade!');
    }
}

document.querySelectorAll('.nome_upgrade').forEach((upgrade, index) => {
    upgrade.addEventListener('click', () => {
        let custo;
        switch (index) {
            case 0: // Bobby
                custo = 10;
                if (pontuacao >= custo) {
                    pontuacao -= custo;
                    pontosPorClique += 1;
                    atualizarValorCliqueNaTela(); 
                    comprarUpgrade();
                    alert('Bobby liberado! Aumento de clique: +1');
                } else {
                    alert('Pontos insuficientes para liberar Bobby!');
                }
                break;
            case 1: // Doge
                custo = 50;
                if (pontuacao >= custo) {
                    pontuacao -= custo;
                    pontosPorClique += 8;
                    atualizarValorCliqueNaTela(); 
                    alert('Doge liberado! Aumento de clique: +8');
                } else {
                    alert('Pontos insuficientes para liberar Doge!');
                }
                break;
            case 2: // Erebro
                custo = 100;
                if (pontuacao >= custo) {
                    pontuacao -= custo;
                    pontosPorClique += 32;
                    atualizarValorCliqueNaTela(); 
                    alert('Erebro liberado! Aumento de clique: +32');
                } else {
                    alert('Pontos insuficientes para liberar Erebro!');
                }
                break;
        }
        document.getElementById("pontuacao").textContent = `Pontuação: ${pontuacao}`;
    });
});


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

    if (pontuacao >= 500) {
        alert('Pontuação máxima de 500 atingida! Reiniciando jogo...');
        pontuacao = 0; // Reinicia a pontuação
        upgradeLevel = 0; // Reinicia o nível de upgrade
        pontosPorClique = 1; // Reinicia o valor de cada clique
        atualizarValorCliqueNaTela(); // Atualiza a tela com o novo valor de clique
    }

    //Guilherme
    //Função chama o trocar imagem
    cliques++;
    console.log(cliques);
    if (cliques % 15 === 0 && cliques !== 0) {
        trocarImagem();
    }
}


//Guilherme
function trocarImagem() { 
    //Costante img armazena a imagem do jogo, pega o elemento pelo Id chamado "imagemDoJogo"
    const img = document.getElementById("imagemDoJogo");
    
    //Comparação com três ===, == não verifica o tipo, === verifica o tipo
    if (imagemAtual === 1) {
        //muda o source da imagem para a imagem 2 se for 1
        img.src = "img/inimigo2.png";
        imagemAtual = 2;
    } else if (imagemAtual === 2) {
        //muda o source da imagem para a imagem 3 se for 1
        img.src = "img/inimigo3.png";
        imagemAtual = 3;
    } else {
        //muda o source da imagem para a imagem 1 se não for 1 ou 2, logo 3
        img.src = "img/inimigo1.png";
        imagemAtual = 1;
    }
}
