
document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('planetList');
  const filter = document.getElementById('type');

  if (list) {
    fetch('/api/planets')
      .then(res => res.json())
      .then(planets => {
        function render(filtered) {
          list.innerHTML = '';
          filtered.forEach(p => {
            const div = document.createElement('div');
            div.className = 'planet-card';
            div.innerHTML = `
              <h3>${p.name}</h3>
              <img src="/${p.image_url}" alt="${p.name}" width="150" />
              <p>Type: ${p.type}</p>
              <a href="planet.html?id=${p.id}">Voir détails</a>
            `;
            list.appendChild(div);
          });
        }

        filter.addEventListener('change', () => {
          const value = filter.value;
          const filtered = value ? planets.filter(p => p.type === value || (value === "habitable" && p.habitable)) : planets;
          render(filtered);
        });

        render(planets);
      });
  }
});
