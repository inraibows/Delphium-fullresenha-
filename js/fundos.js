// Para adicionar um fundo, acrescente um novo item no fim da lista (com vírgula antes).
// fundo2 é a cor do centro e fundo1 é a cor das bordas.
// imagem (opcional): nome do arquivo de imagem, na mesma pasta dos arquivos HTML.
// opacidade (opcional): de 0 (invisível) a 1 (opaca). Se faltar, vale 0.35.
var fundos = [
  { nome: "Pôster 1968", fundo1: "#1a0505", fundo2: "#5c0f0f", imagem: "../imagens/_Long live Marxism-Leninism-Mao Zedong Thought!_ 1968.jpg", opacidade: 0.55 },
  {nome: "bomdia", fundo1: "#1a0505", fundo2: "#5c0f0f", imagem:"../imagens/bomdia.jpg", opacidade: 0.55 },
    {nome: "boanoite", fundo1: "#1a0505", fundo2: "#5c0f0f", imagem:"../imagens/boanoite.jpg", opacidade: 0.55 },
  {nome: "bomnoitevsaco", fundo1: "#1a0505", fundo2: "#5c0f0f", imagem:"../imagens/boavasco.jpg", opacidade: 0.55 }

];

// lê o fundo escolhido na página inicial (0 se nunca foi escolhido)
function lerFundoSalvo() {
  let indice = 0;

  try {
    let salvo = Number(localStorage.getItem("fundoDuelo"));
    if (salvo >= 0 && salvo < fundos.length) {
      indice = salvo;
    }
  }
  catch (erro) {
    indice = 0;
  }

  return indice;
}

// texto url("...") da imagem do fundo, ou "none" se o fundo não tiver imagem
function imagemDoFundo(indice) {
  let imagem = "none";

  if (fundos[indice].imagem != undefined && fundos[indice].imagem != "") {
    imagem = 'url("' + fundos[indice].imagem + '")';
  }

  return imagem;
}

function opacidadeDoFundo(indice) {
  let opacidade = 0.35;

  if (fundos[indice].opacidade != undefined) {
    opacidade = fundos[indice].opacidade;
  }

  return opacidade;
}

function aplicarFundo(indice) {
  document.body.style.setProperty("--bg-1", fundos[indice].fundo1);
  document.body.style.setProperty("--bg-2", fundos[indice].fundo2);
  document.body.style.setProperty("--fundo-imagem", imagemDoFundo(indice));
  document.body.style.setProperty("--fundo-opacidade", opacidadeDoFundo(indice));
}

aplicarFundo(lerFundoSalvo());