const telephoneAudio = new Audio("assets/telephoneRing.mp3");
const telephoneStop = new Audio("assets/telephoneStop.mp3");
const simNormalAudio = new Audio("assets/simnormal.mp3");
const simPutoAudio = new Audio("assets/simputo.mp3");
const naoNormalAudio = new Audio("assets/naonormal.mp3");
const naoPutoAudio = new Audio("assets/naoputo.mp3");
const fodaseAudio = new Audio("assets/fodaseputo.mp3");
const vaitomarnocuAudio = new Audio("assets/vaitomarnocu.mp3");
const seilaporraAudio = new Audio("assets/seilaporra.mp3");

const texts = document.querySelector(".texts");

let called = false;
function callPhone() {
  {
    called
      ? (document.querySelector("#phone").src = "assets/phone-call.svg")
      : (document.querySelector("#phone").src = "assets/phone-slash.svg");
  }
  {
    called ? telephoneStop.play() : telephoneAudio.play();
  }
  setTimeout(() => {
    called = !called;
    console.log(called);
  }, 1500);
}

function stopCall() {
  document.querySelector("#phone").src = "assets/phone-call.svg";
  document.querySelector("#benmauImg").src = "assets/capivara.png";
  telephoneStop.play();
  called = false;
}

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "pt-BR";
recognition.interimResults = true;

let p = document.createElement("p");

recognition.addEventListener("result", (e) => {
  if (called) {
    document.querySelector("#benmauImg").src = "assets/capivara-ouvindo.png";
    texts.appendChild(p);

    const text = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    p.innerText = text;

    if (e.results[0].isFinal) {
      if (texts.children.length > 4) texts.children[0].remove();
      let rn = Math.floor(Math.random() * 8);
      document.querySelector("#benmauImg").src = "assets/capivara-falando.png";
      switch (rn) {
        case 0:
          simNormalAudio.play();
          break;
        case 1:
          simPutoAudio.play();
          break;
        case 2:
          naoNormalAudio.play();
          break;
        case 3:
          seilaporraAudio.play();
          break;
        case 4:
          naoPutoAudio.play();
          break;
        case 5:
          fodaseAudio.play();
          break;
        case 6:
          vaitomarnocuAudio.play();
          break;
        case 7:
          stopCall();
          break;
      }
      p = document.createElement("p");
    }
  }
});

recognition.addEventListener("end", () => {
  recognition.start();
});

recognition.start();
