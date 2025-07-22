
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

function listarGuerreiros() {
  const lista = document.getElementById("lista-guerreiros");
  const guerreiros = JSON.parse(localStorage.getItem("guerreiros")) || [];

  if (guerreiros.length === 0) {
    lista.innerHTML = '<li>Nenhum guerreiro alistado ainda.</li>';
    return;
  }

  
  guerreiros.sort((a, b) => b.vitorias - a.vitorias);

  lista.innerHTML = guerreiros.map((g, i) =>
    `<li>#${i + 1} ${g.nome} <span>— ${g.classe} da Casa ${g.casa} | Vitórias: ${g.vitorias}</span></li>`
  ).join('');
}

window.addEventListener("DOMContentLoaded", listarGuerreiros);


