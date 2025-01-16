// Button 
const buttonlanguage = document.getElementById('button-lang');
const sliderlanguage = document.getElementById('slider-lang');

// Définir l'objet contenant les traductions
const translations = {
    fr: {
        home: 'ACCUEIL',
        about: 'A PROPOS DE MOI',
        resume: 'CV',
        portfolio: 'PORTFOLIO',
        who_i_am: 'QUI SUIS-JE ?',
        linkedin: 'www.linkedin.com/in/guillaume-mass%C3%A9-721813209/'
    },
    en: {
        home: 'HOME',
        about: 'ABOUT ME',
        resume: 'RESUME',
        portfolio: 'PORTFOLIO',
        who_i_am: 'WHO AM I?',
        linkedin: 'www.linkedin.com/in/guillaume-mass%C3%A9-721813209/?locale=en_US'
    }
};

const linkTranslations = {
    fr: {
        linkedin: "https://www.linkedin.com/in/guillaume-mass%C3%A9-721813209/"
    },
    en: {
        linkedin: "https://www.linkedin.com/in/guillaume-mass%C3%A9-721813209/?locale=en_US"
    }
};

// Fonction pour changer la langue
function changeLanguage(lang) {
    console.log(`Changement de langue vers: ${lang}`);
    // Sélectionner tous les éléments qui ont l'attribut data-translate
    const translatableElements = document.querySelectorAll('[data-translate]');

    translatableElements.forEach((element) => {
        // Récupérer la clé de traduction à partir de l'attribut data-translate
        const translationKey = element.getAttribute('data-translate');
        // Mettre à jour le texte avec la traduction correspondante
        element.textContent = translations[lang][translationKey];
    });

    // Mettre à jour les href des liens
    const links = document.querySelectorAll('a[data-link]');

    links.forEach((link) => {
        const linkKey = link.getAttribute('data-link');
        link.href = linkTranslations[lang][linkKey] || link.href;
    });

    localStorage.setItem('language', lang); // Enregistrer la langue dans le localStorage
}

// Ajouter l'écouteur d'événements pour le changement de langue
buttonlanguage.addEventListener('click', function () {
    sliderlanguage.classList.toggle('slider-animatation'); // Toggle animation

    // Récupérer la langue actuelle et basculer entre 'fr' et 'en'
    const currentLang = localStorage.getItem('language') || 'fr';
    console.log("Langue actuelle:", currentLang);
    if (currentLang === 'fr') {
        changeLanguage('en');
    } else {
        changeLanguage('fr');
    }
});

// Initialiser la langue au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    const savedLang = localStorage.getItem('language') || 'fr';
    if (savedLang === 'en') {
        sliderlanguage.classList.toggle('slider-animatation');
    }
    changeLanguage(savedLang); // Appliquer la langue au chargement
});