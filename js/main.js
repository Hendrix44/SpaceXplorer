fetch('/api/planets')
    .then(res => res.json())
    .then(data => {
        document.getElementById('planet-count').textContent = data.length;
    });
