// Espera o DOM carregar
document.addEventListener("DOMContentLoaded", () => {
    const slidesContainer = document.querySelector(".slides-container");
    const slides = document.querySelectorAll(".slide");
    const navLinks = document.querySelectorAll(".slide-nav a");

    let currentSlideIndex = 0;
    const totalSlides = slides.length;

    // --- Função para rolar para um slide específico ---
    const scrollToSlide = (index) => {
        // Valida o índice
        if (index < 0) index = 0;
        if (index >= totalSlides) index = totalSlides - 1;

        currentSlideIndex = index;
        slides[currentSlideIndex].scrollIntoView({ behavior: "smooth" });
    };

    // --- Navegação via Teclado (Setas Cima/Baixo) ---
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            // Impede o scroll padrão do navegador
            event.preventDefault(); 
            scrollToSlide(currentSlideIndex + 1);
        } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            // Impede o scroll padrão do navegador
            event.preventDefault(); 
            scrollToSlide(currentSlideIndex - 1);
        }
    });

    // --- Navegação via Cliques nos Pontinhos ---
    navLinks.forEach((link, index) => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Impede o link padrão
            scrollToSlide(index);
        });
    });

    // --- Observer para Atualizar a Navegação Lateral no Scroll manual ---
    const options = {
        root: null, // usa a viewport do navegador
        rootMargin: '0px',
        threshold: 0.6 // 60% do slide deve estar visível
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.getAttribute('id');
                
                // Remove a classe 'active' de todos os links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Adiciona 'active' ao link correspondente
                const activeLink = document.querySelector(`.slide-nav a[href="#${targetId}"]`);
                if (activeLink) activeLink.classList.add('active');

                // Atualiza o índice atual caso o usuário faça scroll manual
                slides.forEach((slide, index) => {
                    if (slide.getAttribute('id') === targetId) {
                        currentSlideIndex = index;
                    }
                });
            }
        });
    }, options);

    // Começa a observar cada slide
    slides.forEach(slide => observer.observe(slide));
});