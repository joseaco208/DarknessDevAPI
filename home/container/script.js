function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const button = document.querySelector('.button-bw');
    button.textContent = document.body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Oscuro';
}

window.onload = function() {
    const button = document.getElementById('darkModeButton');
    let bounceCount = 0;
    const bounceInterval = setInterval(() => {
        if (bounceCount < 10) {
            button.style.animation = `bounce 0.5s forwards`;
            bounceCount++;
        } else {
            clearInterval(bounceInterval);
        }
    }, 500);

    // Animación de los endpoints al hacer scroll
    const endpoints = document.querySelectorAll('.endpoint');
    const windowHeight = window.innerHeight;

    window.addEventListener('scroll', function() {
        endpoints.forEach(endpoint => {
            const endpointTop = endpoint.getBoundingClientRect().top;

            if (endpointTop < windowHeight * 0.8) {
                endpoint.classList.add('visible');
            } else {
                endpoint.classList.remove('visible');
            }
        });
    });
};