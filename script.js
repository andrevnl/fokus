const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("./sons/luna-rise-part-one.mp3");
const musicaPlay = new Audio("./sons/play.wav");
const musicaPause = new Audio("./sons/pause.mp3");
const musicaBeep = new Audio("./sons/beep.mp3");
const startPauseBt = document.querySelector("#start-pause");
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const iniciarOuPausarIcone = document.querySelector("#start-pause img");
const tempoNaTela = document.querySelector("#timer");

let tempoDecorridoEmSegundos = 1500; // 25 minutos
let intervaloId = null;

musica.loop = true;
musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500; // 25 minutos
  alterarContexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300; // 5 minutos
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900; // 15 minutos
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

function alterarContexto(contexto) {
  mostrarTempo();
  botoes.forEach((botao) => {
    botao.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `./imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML =
        "Otimize sua produtividade,<br>" +
        '<strong class="app__title-strong">mergulhe no que importa.</strong>';
      break;
    case "descanso-curto":
      titulo.innerHTML =
        "Que tal dar uma respirada?<br>" +
        '<strong class="app__title-strong">Faça uma pausa pausa curta!.</strong>';
      break;
    case "descanso-longo":
      titulo.innerHTML =
        "Hora de voltar a superficie,<br>" +
        '<strong class="app__title-strong">Faça uma pausa longa!.</strong>';
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    musicaBeep.play();
    console.log("Temporizador finalizado!");
    zerar();
    return;
  }
  tempoDecorridoEmSegundos--;
  mostrarTempo();
};

startPauseBt.addEventListener("click", () => {
  iniciarOuPausar();
});

function iniciarOuPausar() {
  if (intervaloId) {
    musicaPause.play();
    zerar();
    return;
  }
  musicaPlay.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  iniciarOuPausarBt.textContent = "Pausar";
  iniciarOuPausarIcone.setAttribute("src", "./imagens/pause.png");
}

function zerar() {
  clearInterval(intervaloId);
  iniciarOuPausarBt.textContent = "Começar";
  iniciarOuPausarIcone.setAttribute("src", "./imagens/play_arrow.png");
  intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-BR", {
    timeZone: "UTC",
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
