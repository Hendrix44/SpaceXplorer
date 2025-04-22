fetch('/api/planets')
    .then(res => res.json())
    .then(planets => {
        const list = document.getElementById('planet-list');
        planets.forEach(p => {
            const item = document.createElement('div');
            item.innerHTML = `
        <h3>${p.name}</h3>
        <img src="${p.image_url}" width="200" />
        <p>${p.description}</p>
        <a href="detail.html?id=${p.id}">Voir plus</a>
      `;
            list.appendChild(item);
        });
    });
