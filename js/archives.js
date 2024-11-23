document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('.hidden-section');
    const menuLinks = document.querySelectorAll('.menu li a:not([id])');
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

    const getDataFromFile = () => {
        console.log("data fetch");
        fetch("..\\ressources\\data_archives.json")
        .then((res) => res.text())
        .then((text) => {
            data = JSON.parse(text);
            displayDataCours(data.cours);
            displayDataExos(data.exercices);
        })
        .catch((e) => console.error(e));
    };

    function displayDataCours(data){
        var dataList = document.getElementById("container-cours");
        dataList.innerHTML = "";
        data.forEach((object) => {
          const dataDiv = document.createElement("div");
          dataDiv.className= "box";
          dataDiv.innerHTML = `<div class="box_text"><strong>${object.nom}</strong><a href="pdf_show.html?pdf=${object.nom_fichier}" id="a">Lien PDF</a><p2>${object.text}</p2></div>`;
          dataList.appendChild(dataDiv);
        });
    }

    function displayDataExos(data){
        var dataList = document.getElementById("container-exos");
        dataList.innerHTML = "";
        data.forEach((object) => {
          const dataDiv = document.createElement("div");
          dataDiv.className= "box";
          dataDiv.innerHTML = `<div class="box_text"><strong>${object.nom}</strong><a href="pdf_show.html?pdf=${object.nom_fichier}" id="a">Sujet</a><a href="pdf_show.html?pdf=${object.nom_correction}" id="a">Correction</a><p2>${object.text}</p2></div>`;
          dataList.appendChild(dataDiv);
        });
    }

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

    getDataFromFile();
    // Vérifier la visibilité au chargement initial
    checkVisibility();
});

