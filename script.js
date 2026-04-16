const form = document.getElementById("ticketForm");
const lista = document.getElementById("listaChamados");

let chamados = [];

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;

  const chamado = {
    id: Date.now(),
    titulo,
    descricao,
    status: "Aberto"
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
      ${chamado.descricao}<br>
      Status: ${chamado.status}
      <br><br>
      <button onclick="fecharChamado(${chamado.id})">Fechar</button>
    `;

    lista.appendChild(li);
  });
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