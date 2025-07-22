// Mostrar tooltip de forma dinâmica (por precaução)
document.querySelectorAll('.team').forEach(team => {
  team.addEventListener('mouseenter', () => {
    const tip = team.querySelector('.tooltip');
    if (tip) tip.style.display = 'block';
  });
  team.addEventListener('mouseleave', () => {
    const tip = team.querySelector('.tooltip');
    if (tip) tip.style.display = 'none';
  });
});

// Alistamento de guerreiros
document.getElementById("form-alistamento")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const casa = document.getElementById("casa").value;
  const classe = document.getElementById("classe").value;

  const guerreiro = { nome, casa, classe, vitorias: Math.floor(Math.random() * 5) };
  let guerreiros = JSON.parse(localStorage.getItem("guerreiros")) || [];
  guerreiros.push(guerreiro);
  localStorage.setItem("guerreiros", JSON.stringify(guerreiros));

  document.getElementById("resposta-alistamento").innerText =
    `⚔️ Bravo(a) ${nome}, sua alma foi vinculada à Casa ${casa} como um(a) ${classe}. Que os deuses de Eltheria te guiem na guerra!`;
});

// Ranking da Arena
function listarGuerreiros() {
  const lista = document.getElementById("lista-guerreiros");
  if (!lista) return;

  const guerreiros = JSON.parse(localStorage.getItem("guerreiros")) || [];

  if (guerreiros.length === 0) {
    lista.innerHTML = '<li>Nenhum guerreiro alistado ainda.</li>';
    return;
  }

  // Ordenar por vitórias
  guerreiros.sort((a, b) => b.vitorias - a.vitorias);

  lista.innerHTML = guerreiros.map((g, i) =>
    `<li>#${i + 1} ${g.nome} <span>— ${g.classe} da Casa ${g.casa} | Vitórias: ${g.vitorias}</span></li>`
  ).join('');
}

window.addEventListener("DOMContentLoaded", () => {
  listarGuerreiros();

  const arenaDiv = document.getElementById("disputa-arena");
  const btnLutar = document.getElementById("btn-lutar");
  if (arenaDiv && btnLutar) {
    btnLutar.addEventListener("click", () => {
      const guerreiros = JSON.parse(localStorage.getItem("guerreiros")) || [];
      if (guerreiros.length < 2) {
        arenaDiv.innerHTML = '<p>É necessário pelo menos dois guerreiros alistados para iniciar a batalha.</p>';
        return;
      }

      // Escolhe dois guerreiros aleatórios diferentes
      const [g1, g2] = [...guerreiros].sort(() => 0.5 - Math.random()).slice(0, 2);
      const vencedor = Math.random() > 0.5 ? g1 : g2;
      vencedor.vitorias++;

      // Atualiza a lista
      localStorage.setItem("guerreiros", JSON.stringify(guerreiros));

      arenaDiv.innerHTML = `
        <h3>🏟️ Disputa na Arena</h3>
        <p><strong>${g1.nome}</strong> (${g1.classe} da Casa ${g1.casa}) enfrentou <strong>${g2.nome}</strong> (${g2.classe} da Casa ${g2.casa}).</p>
        <p>⚔️ <strong>Vencedor:</strong> ${vencedor.nome} da Casa ${vencedor.casa}!</p>
      `;

      listarGuerreiros();
    });
  }
});
