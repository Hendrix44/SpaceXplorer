document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reservationForm');
    const planetSelect = document.getElementById('planet');

    // Charger les planètes dans le <select>
    fetch('/api/planets')
        .then(res => res.json())
        .then(planets => {
            planets.forEach(p => {
                const option = document.createElement('option');
                option.value = p.id;
                option.textContent = p.name;
                planetSelect.appendChild(option);
            });
        });

    // Gérer la soumission du formulaire
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            planet_id: form.planet_id.value,
            explorer_id: form.explorer_id.value,
            departure_date: form.departure_date.value,
            duration: form.duration.value
        };

        const response = await fetch('/api/missions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('🚀 Mission réservée avec succès !');
            form.reset();
        } else {
            const error = await response.text();
            alert('❌ Erreur : ' + error);
        }
    });
});
