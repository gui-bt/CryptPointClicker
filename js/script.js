let pontuacao = 0;
let upgradeAtivo = 0;
let cliques = 0;
let imagemAtual = 1;

const pontosPorClique = [1,2,8,32]

document.getElementById("imagemDoJogo").addEventListener("click", clickBotao);

document.getElementById("pontuacao").textContent = `Pontuação: ${pontuacao}`;


function clickBotao() {
    pontuacao += pontosPorClique[upgradeAtivo];
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