let cartas = [
  { classe: "mago-negro", vida: 2500, ataque: 2500 },
  { classe: "dragao-negro", vida: 2400, ataque: 2400 },
  { classe: "dragao-branco", vida: 3000, ataque: 3000 },
  { classe: "guerreiro", vida: 1800, ataque: 1800 },
  { classe: "cavaleiro-vermelho", vida: 2000, ataque: 2000 },
  { classe: "propaganda", vida: 1600, ataque: 1600 }
]
var campojogo = [];
 
for (let l = 0; l < 2; l++) {
  campojogo[l] = [];
  for (let c = 0; c < 5; c++) {
    campojogo[l][c] = null;
  }
}
 
function selecionarCarta(qual, quem) {
  let qualturno = testeturno()
  if (qualturno == quem) {
    let elementos = document.querySelectorAll(".carta.selecionada");
    for (let i = 0; i < elementos.length; i++) {
      elementos[i].classList.remove("selecionada");
    }
    qual.classList.add('selecionada')
  }
}
 
// compra uma única carta por turno
function comprarCarta(quem) {
  let qualturno = testeturno()
  let turno = document.querySelector('#turno')
  let mao = [];
 
  if (qualturno == quem && turno.dataset.comprou != "sim") {
 
    if (quem == 'me') {
      mao = document.querySelectorAll("#maome .carta.vazia");
    }
    else {
      mao = document.querySelectorAll("#maop .carta.vazia");
    }
 
    // só compra se houver espaço na mão
    if (mao.length > 0) {
      let carta = mao[0];
 
      for (let j = 0; j < cartas.length; j++) {
        carta.classList.remove(cartas[j].classe);
      }
 
      let numero = Math.floor(Math.random() * cartas.length);
      carta.classList.add(cartas[numero].classe);
 
      carta.classList.remove("vazia");
 
      turno.dataset.comprou = "sim";
    }
  }
}
 
function deploy(qual, quem, posicao) {
  let qualturno = testeturno()
  let turno = document.querySelector('#turno')
  let mao = [];
  let encontrada = null;
  let linha = 0;
 
  if (qualturno == quem && turno.dataset.jogou != "sim") {
 
    if (quem == 'me') {
      mao = document.querySelectorAll("#maome .carta.selecionada");
      linha = 1;
    }
    if (quem == 'op') {
      mao = document.querySelectorAll("#maop .carta.selecionada");
      linha = 0;
    }
 
    if (mao.length > 0 && qual.classList.contains("ocupada") == false) {
      let carta = mao[0];
 
      for (let i = 0; i < cartas.length; i++) {
        if (carta.classList.contains(cartas[i].classe)) {
          encontrada = cartas[i];
        }
      }
 
      if (encontrada != null) {
        qual.classList.add(encontrada.classe);
        qual.classList.add("ocupada");
        qual.dataset.posicao = posicao
 
        // copia os campos para um objeto novo, para cada carta ter a sua própria vida
        campojogo[linha][posicao] = {
          classe: encontrada.classe,
          vida: encontrada.vida,
          ataque: encontrada.ataque
        };
 
        carta.classList.remove("selecionada");
        carta.classList.add("vazia");
 
        turno.dataset.jogou = "sim";
        verificarFimDeTurno();
      }
    }
  }
}
 
function trocarTurno() {
  let turno = document.querySelector('#turno')
 
  turno.dataset.comprou = "nao";
  turno.dataset.jogou = "nao";
  turno.dataset.atacou = "nao";
 
  let atacantes = document.querySelectorAll(".zona.atacante");
  for (let i = 0; i < atacantes.length; i++) {
    atacantes[i].classList.remove("atacante");
  }
 
  let selecionadas = document.querySelectorAll(".carta.selecionada");
  for (let i = 0; i < selecionadas.length; i++) {
    selecionadas[i].classList.remove("selecionada");
  }
 
  if (turno.classList.contains("turno-me")) {
    turno.classList.remove("turno-me");
    turno.classList.add("turno-op");
    turno.textContent = "Turno do oponente";
  }
  else {
    turno.classList.remove("turno-op");
    turno.classList.add("turno-me");
    turno.textContent = "Seu turno";
  }
}
 
function testeturno() {
  let turno = document.querySelector('#turno')
  let qualturno = false
  if (turno.classList.contains("turno-me")) {
    qualturno = "me"
  }
  else {
    qualturno = "op"
  }
  return (qualturno)
}
 
function ataq(qual, quem, posicao) {
  let qualturno = testeturno()
  let turno = document.querySelector('#turno')
  let atacantes = document.querySelectorAll(".zona.atacante");
  let linhaAtacante = 0;
  let linhaAlvo = 0;
  let idPlacar = "";
  let fim = false;
 
  // restrições: zona do adversário, ocupada, com um atacante marcado e sem ataque feito no turno
  if (qualturno != quem && turno.dataset.atacou != "sim" &&
    qual.classList.contains("ocupada") && atacantes.length > 0) {
 
    if (qualturno == 'me') {
      linhaAtacante = 1;
      linhaAlvo = 0;
      idPlacar = "pontosop";
    }
    else {
      linhaAtacante = 0;
      linhaAlvo = 1;
      idPlacar = "pontos";
    }
 
    let zonaAtacante = atacantes[0];
    let colunaAtacante = Number(zonaAtacante.dataset.posicao);
 
    let atacante = campojogo[linhaAtacante][colunaAtacante];
    let alvo = campojogo[linhaAlvo][posicao];
 
    if (atacante != null && alvo != null) {
      alvo.vida = alvo.vida - atacante.ataque;
 
      if (alvo.vida <= 0) {
        campojogo[linhaAlvo][posicao] = null;
        qual.classList.remove(alvo.classe);
        qual.classList.remove("ocupada");
 
        // o que passou da vida do monstro vira dano nos pontos de vida do jogador
        let excedente = 0 - alvo.vida;
        let placar = document.getElementById(idPlacar);
        let pontos = Number(placar.textContent) - excedente;
 
        if (pontos <= 0) {
          pontos = 0;
          fim = true;
        }
        placar.textContent = pontos;
      }
 
      // o atacante já atacou
      zonaAtacante.classList.remove("atacante");
 
      if (fim == true) {
        fimDeJogo(qualturno);
      }
      else {
        turno.dataset.atacou = "sim";
        verificarFimDeTurno();
      }
    }
  }
}
 
function fimDeJogo(vencedor) {
  let turno = document.querySelector('#turno')
  let botoes = document.querySelectorAll("button");
 
  for (let i = 0; i < botoes.length; i++) {
    botoes[i].disabled = true;
  }
 
  if (vencedor == 'me') {
    turno.textContent = "Você venceu!";
  }
  else {
    turno.textContent = "O oponente venceu!";
  }
}
 
function selecionarmonstro(qual, quem) {
  let qualturno = testeturno()
  let atacantes = document.querySelectorAll(".zona.atacante");
  let selecionadas = document.querySelectorAll(".carta.selecionada");
 
  if (qualturno == quem && qual.classList.contains("ocupada")) {
 
    // só um atacante por vez
    for (let i = 0; i < atacantes.length; i++) {
      atacantes[i].classList.remove("atacante");
    }
 
    // tira a seleção da mão, para não haver dois destaques ao mesmo tempo
    for (let i = 0; i < selecionadas.length; i++) {
      selecionadas[i].classList.remove("selecionada");
    }
 
    qual.classList.add("atacante");
  }
}
 
function verificarFimDeTurno() {
  let turno = document.querySelector('#turno');
 
  if (turno.dataset.jogou == "sim" && turno.dataset.atacou == "sim") {
    trocarTurno();
  }
}

var dicas = [
  "Clique no seu baralho para comprar uma carta. Só é possível comprar uma por turno.",
  "Selecione uma carta da sua mão e clique em uma zona livre do seu lado para lançá-la.",
  "Clique em um monstro seu no campo para marcá-lo como atacante e depois no monstro do oponente.",
  "Cada turno permite lançar uma carta e atacar uma vez. Depois das duas ações, o turno passa sozinho.",
  "Sem ações possíveis? Use o botão do meio para passar o turno.",
  "Se o ataque for maior que a vida do monstro, o que sobrar vira dano nos pontos de vida do oponente.",
  "O dragão branco tem a maior vida do baralho: 3000 pontos.",
  "Israel nao é um estado legitimo!",
  "Taiwan nao é um país"
];
 
function mostrarDica() {
  let caixa = document.getElementById("caixa-dica");
  let indice = Number(caixa.dataset.indice);
 
  if (indice >= dicas.length) {
    indice = 0;
  }
 
  document.getElementById("texto-dica").textContent = dicas[indice];
  document.getElementById("contador-dica").textContent = "Dica " + (indice + 1) + " de " + dicas.length;
 
  caixa.classList.add("aberta");
  caixa.dataset.indice = indice + 1;
}
 
function fecharDica() {
  document.getElementById("caixa-dica").classList.remove("aberta");
}