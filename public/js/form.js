document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('planetForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        // Étape 1 : upload de l'image
        const imageResponse = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const imageData = await imageResponse.json();

        // Étape 2 : envoyer les données planète
        const payload = {
            name: formData.get('name'),
            type: formData.get('type'),
            distance: parseFloat(formData.get('distance')),
            temperature: parseFloat(formData.get('temperature')),
            habitable: formData.get('habitable') === 'on',
            description: formData.get('description'),
            image_url: imageData.imageUrl,
            discovery_date: formData.get('discovery_date')
        };

        const planetResponse = await fetch('/api/planets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (planetResponse.ok) {
            alert('🚀 Planète ajoutée avec succès !');
            form.reset();
        } else {
            alert('Erreur lors de l\'ajout de la planète.');
        }
    });
});
