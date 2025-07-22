
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

