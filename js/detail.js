const id = new URLSearchParams(window.location.search).get('id');

fetch(`/api/planets/${id}`)
    .then(res => res.json())
    .then(p => {
        const container = document.getElementById('planet-detail');
        container.innerHTML = `
      <h2>${p.name}</h2>
      <img src="${p.image_url}" width="300" />
      <p>${p.description}</p>
      <ul>
        <li>Type: ${p.type}</li>
        <li>Distance: ${p.distance}</li>
        <li>Température: ${p.temperature}°</li>
        <li>Habitable: ${p.habitable ? 'Oui' : 'Non'}</li>
      </ul>
    `;
    });
