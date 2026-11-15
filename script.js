// script.js
const etapas = [
  {
    tipo: "input",
    pergunta: "1. Qual é o seu nome?",
    placeholder: "Digite seu nome..."
  },
  {
    tipo: "quiz",
    pergunta: "2. Qual linguagem é usada para estruturar páginas web?",
    opcoes: ["CSS", "HTML", "JavaScript", "Python"],
    resposta: "HTML"
  },
  {
    tipo: "quiz",
    pergunta: "3. Qual linguagem é usada para estilizar páginas web?",
    opcoes: ["HTML", "CSS", "C++", "SQL"],
    resposta: "CSS"
  }
];

let etapaAtual = 0;
let pontuacao = 0;
const quizDiv = document.getElementById("quiz");
const nextBtn = document.getElementById("next-btn");

function carregarEtapa() {
  const etapa = etapas[etapaAtual];
  quizDiv.innerHTML = "";
  nextBtn.style.display = "none";

  if (etapa.tipo === "input") {
    const label = document.createElement("label");
    label.textContent = etapa.pergunta;
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = etapa.placeholder;
    quizDiv.appendChild(label);
    quizDiv.appendChild(input);
    nextBtn.style.display = "block";
  } else if (etapa.tipo === "quiz") {
    const pergunta = document.createElement("h2");
    pergunta.textContent = etapa.pergunta;
    quizDiv.appendChild(pergunta);

    etapa.opcoes.forEach(op => {
      const btn = document.createElement("div");
      btn.textContent = op;
      btn.classList.add("option");
      btn.onclick = () => verificarResposta(btn, op === etapa.resposta);
      quizDiv.appendChild(btn);
    });
  }
}

function verificarResposta(element, correta) {
  if (correta) {
    element.classList.add("correct");
    pontuacao++;
  } else {
    element.classList.add("wrong");
  }
  Array.from(quizDiv.children).forEach(opt => opt.onclick = null);
  nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
  etapaAtual++;
  if (etapaAtual < etapas.length) {
    carregarEtapa();
  } else {
    mostrarResultado();
  }
};

function mostrarResultado() {
  quizDiv.innerHTML = `<h2>Fim do Quiz!</h2>
    <p>Você acertou ${pontuacao} de ${etapas.length - 1} perguntas.</p>`;
  nextBtn.style.display = "none";
}

carregarEtapa();
