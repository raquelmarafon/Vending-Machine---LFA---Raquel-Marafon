let saldo = 0;
const limite = 100;
let historico = [];

const display = document.getElementById("display");
const productMessage = document.getElementById("productMessage");
const histDiv = document.getElementById("histMoedas");

function atualizarDisplay() {
    display.textContent = `Saldo: ${saldo} centavos`;
}

function atualizarHistorico() {
    histDiv.innerHTML = "<strong>Histórico de moedas:</strong><br>" + historico.join(" - ");
}

function liberarProduto(preco) {
    let produtosLiberados = 0;
    while (saldo >= preco) {
        saldo -= preco;
        produtosLiberados++;
        animarProduto();
    }
    if (produtosLiberados > 0) {
        const msg = produtosLiberados === 1 ? `Produto liberado!` : `${produtosLiberados} produtos liberados!`;
        productMessage.textContent = msg;
    } else {
        productMessage.textContent = "";
    }
}

function animarProduto() {
    const span = document.createElement("span");
    span.textContent = "🎁";
    span.className = "produto-animado";
    productMessage.appendChild(span);
    setTimeout(() => {
        if (span.parentNode) productMessage.removeChild(span);
    }, 1000);
}

function inserirMoeda(valor) {
    if (saldo + valor > limite) {
        alert("Limite de saldo atingido!");
        return;
    }
    saldo += valor;
    historico.push(`${valor}c`);
    atualizarDisplay();
    atualizarHistorico();

    const precoProduto = parseInt(document.getElementById("produtoSelect").value);
    liberarProduto(precoProduto);
    atualizarDisplay();
}

// Inicializa display e histórico
atualizarDisplay();
atualizarHistorico();