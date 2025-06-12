let pontuacao = 0;
// Upgrade vai de 0 nenhum, a 1,2,3
let upgradeAtivo = 0;

const pontosPorClique = [1,2,8,32]

document.getElementById("botaoPrincipal").addEventListener("click", clickBotao);

//Exibe pontuação inicial, 0
document.getElementById("pontuacaoJogador").textContent = `Pontuação: ${pontuacaoJogador}`;




function clickBotao() {
     pontuacao += pontosPorClique[upgradeAtivo];
     document.getElementById("pontuacaoJogador").textContent = `Pontuação: ${pontuacao}`;
}


function comprarUpgrade(n) {
    const custo = [0, 10, 50, 100]; // custos por upgrade
    
    if (pontuacao >= custo[n]) {
        pontuacao -= custo[n];
        upgradeAtivo = n;
        document.getElementById("pontuacaoJogador").textContent = `Pontuação: ${pontuacao}`;
        // Aqui você pode atualizar o estado dos botões, avisar o jogador etc.
    } else {
        alert("Você não tem pontos suficientes!");
    }
}