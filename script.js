document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('.hidden-section');
    const menuLinks = document.querySelectorAll('.menu li a');
    const headerHeight = document.querySelector('header').offsetHeight; // Hauteur du header fixe

    // Fonction pour vérifier si une section est visible
    const isSectionVisible = (section) => {
        const rect = section.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom >= 0;
    };

    // Fonction pour vérifier et afficher les sections visibles
    const checkVisibility = () => {
        sections.forEach((section) => {
            if (isSectionVisible(section)) {
                section.classList.add('visible');
            }
        });
    };

    // Ajuster le défilement pour prendre en compte la hauteur du header fixe
    menuLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const targetID = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetID);

            if (targetSection) {
                // Utiliser scrollIntoView avec un ajustement pour le header fixe
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight, // Ajuste la position de défilement en fonction de la hauteur du header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Ajouter un événement de défilement pour afficher les sections
    window.addEventListener('scroll', checkVisibility);

    // Vérifier la visibilité au chargement initial
    checkVisibility();
});

