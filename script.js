const form = document.getElementById("ticketForm");
const lista = document.getElementById("listaChamados");

// salva no navegador
let chamados = JSON.parse(localStorage.getItem("chamados")) || [];

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;

  const chamado = {
    id: Date.now(),
    titulo,
    descricao,
    status: "Aberto",
    dataAbertura: new Date().toLocaleString()
  };

  chamados.push(chamado);
  renderizar();

  form.reset();
});

function renderizar() {
  lista.innerHTML = "";

  chamados.forEach(chamado => {
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${chamado.titulo}</strong><br>
      ${chamado.descricao}<br><br>

      📅 Abertura: ${chamado.dataAbertura}<br>

      Status: <span class="${chamado.status === "Fechado" ? "fechado" : "aberto"}">
        ${chamado.status}
      </span>

      <br><br>

      <button class="closeBtn" onclick="fecharChamado(${chamado.id})">
        Fechar
      </button>
    `;

    lista.appendChild(li);
  });

  localStorage.setItem("chamados", JSON.stringify(chamados));
}

function fecharChamado(id) {
  chamados = chamados.map(c => {
    if (c.id === id) {
      return { ...c, status: "Fechado" };
    }
    return c;
  });

  renderizar();
}
