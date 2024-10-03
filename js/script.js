// função para abrir todos os links em uma nova aba
document.querySelectorAll("a").forEach(function (link) {
  if (!link.classList.contains("ignore") && !link.getAttribute("data-ignore")) {
    link.setAttribute("target", "_blank");
  }
});

const button = document.getElementById("slide-btn");
const seasonList = document.getElementById("season-list");

button.addEventListener("click", () => {
  if (seasonList.style.display === "none") {
    seasonList.style.display = "block";
    button.querySelector("i").classList.remove("fa-caret-down");
    button.querySelector("i").classList.add("fa-caret-up");
  } else {
    seasonList.style.display = "none";
    button.querySelector("i").classList.remove("fa-caret-up");
    button.querySelector("i").classList.add("fa-caret-down");
  }
});

// Script de autoplay

let html = document.querySelector("html");
let musica = document.querySelector("#play");
html.addEventListener("onchange", () => {
  musica.play();
});

// Função para remover o destaque anterior
function removeHighlight() {
  var highlightedElements = document.querySelectorAll(".highlight");
  highlightedElements.forEach(function (el) {
    // Remover o <span> de destaque mantendo o conteúdo original
    el.replaceWith(...el.childNodes);
  });
}

// Função para destacar todas as ocorrências do texto encontrado
function highlightText(element, termo) {
  // Caminha pelos nós filhos do elemento para processar nós de texto
  const walk = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  let node;

  while ((node = walk.nextNode())) {
    let index = node.nodeValue.toLowerCase().indexOf(termo);
    while (index !== -1) {
      // Divide o nó de texto em três partes: antes, o termo buscado, e depois
      const span = document.createElement("span");
      span.className = "highlight";
      const before = node.nodeValue.slice(0, index);
      const match = node.nodeValue.slice(index, index + termo.length);
      const after = node.nodeValue.slice(index + termo.length);

      // Criar os nós de texto correspondentes
      const beforeNode = document.createTextNode(before);
      const matchNode = document.createTextNode(match);
      const afterNode = document.createTextNode(after);

      // Colocar o texto buscado dentro do <span>
      span.appendChild(matchNode);

      // Substituir o nó de texto original pelos novos nós
      node.parentNode.insertBefore(beforeNode, node);
      node.parentNode.insertBefore(span, node);
      node.nodeValue = after; // Atualizar o nó com o restante (depois)

      // Atualizar o índice para continuar a busca no restante do texto
      index = node.nodeValue.toLowerCase().indexOf(termo);
    }
  }
}

// Função para realizar a busca
function buscarTexto() {
  // Remover o destaque anterior
  removeHighlight();

  // Obter o termo buscado
  var termo = document.getElementById("txtBusca").value.toLowerCase();

  // Buscar apenas nos elementos com a classe "buscavel"
  var elementos = document.querySelectorAll(".buscavel");

  var encontrado = false;

  // Procurar o termo nos elementos com a classe "buscar"
  elementos.forEach(function (el) {
    highlightText(el, termo);
    if (el.querySelector(".highlight")) {
      // Rolar até o primeiro elemento encontrado
      if (!encontrado) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        encontrado = true;
      }
    }
  });

  // Se o termo não for encontrado
  if (!encontrado) {
    alert("Termo não encontrado.");
  }
}

// Captura do evento Enter na caixa de texto
document.getElementById("txtBusca").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    buscarTexto();
  }
});

// Alternativamente, busca ao clicar no botão
document.getElementById("btnBusca").addEventListener("click", function () {
  buscarTexto();
});
