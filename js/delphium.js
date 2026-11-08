function montarFundos() {
  let caixa = document.getElementById("fundos");
  let atual = lerFundoSalvo();

  for (let i = 0; i < fundos.length; i++) {
    let botao = document.createElement("button");
    botao.type = "button";
    botao.className = "amostra";
    botao.title = fundos[i].nome;
    botao.setAttribute("aria-label", fundos[i].nome);
    botao.style.background = "radial-gradient(circle, " + fundos[i].fundo2 + ", " + fundos[i].fundo1 + ")";
    botao.setAttribute("onclick", "escolherFundo(" + i + ")");

    if (imagemDoFundo(i) != "none") {
      let foto = document.createElement("span");
      foto.className = "foto";
      foto.style.backgroundImage = imagemDoFundo(i);
      foto.style.opacity = opacidadeDoFundo(i);
      botao.appendChild(foto);
    }

    if (i == atual) {
      botao.classList.add("escolhido");
    }
    caixa.appendChild(botao);
  }

  document.getElementById("nome-fundo").textContent = fundos[atual].nome;
}

function escolherFundo(indice) {
  let amostras = document.querySelectorAll(".amostra");

  try {
    localStorage.setItem("fundoDuelo", indice);
  }
  catch (erro) {
  }

  for (let i = 0; i < amostras.length; i++) {
    amostras[i].classList.remove("escolhido");
  }
  amostras[indice].classList.add("escolhido");

  document.getElementById("nome-fundo").textContent = fundos[indice].nome;
  aplicarFundo(indice);
}

montarFundos();