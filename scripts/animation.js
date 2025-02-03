// Navigation buttons
const buttonHome = document.getElementById('home');
const buttonAbout = document.getElementById('about');
const buttonResume = document.getElementById('resume');
const buttonPortfolio = document.getElementById('portfolio');

// Home navigation buttons
const buttonAboutHome = document.getElementById('about-home');
const buttonPortfolioHome = document.getElementById('portfolio-home');

const buttonLinkedin = document.getElementById('button-linkedin');
const linkLinkedin = document.getElementById('link-linkedin');

// Content
const landing_page = document.getElementById('landing-page');
const resume_body = document.getElementById('resume-body');
const left = document.getElementById('left');
const right = document.getElementById('right');
const about = document.getElementById('about_content');

const scroll_section = document.getElementById('scroll');

// const scroll = document.getElementById('scoll');

const sections = {
    home: buttonHome,
    about: buttonAbout,
    resume: buttonResume,
    portfolio: buttonPortfolio,
};

// Offset for each page
const customOffsets = {
    home: 0,
    about: 50,
    resume: 150,
    portfolio: 250,
};

// Define the color scheme
const colors = {
    hoverDefault: '#ffffff',
    default: '#999999',
    hoverCurrent: '#29ffff',
    current: '#ccffff',
};

// Utility function to add hover effects
function setHoverEffects(button, hoverColor, defaultColor) {
    button.addEventListener('mouseover', function () {
        button.style.color = hoverColor;
    });
    button.addEventListener('mouseout', function () {
        button.style.color = defaultColor;
    });
}

// Fonction pour configurer les effets de survol en fonction de la section active
function setupHoverEffects() {
    const currentPage = localStorage.getItem('currentSection') || 'home';

    // Parcours des sections pour appliquer les effets de survol
    Object.keys(sections).forEach(section => {

        if (section === currentPage) {
            // Si c'est la section active, appliquer la couleur active
            setHoverEffects(sections[section], colors.hoverCurrent, colors.current);
        } else {
            // Si c'est une autre section, appliquer les couleurs par défaut
            setHoverEffects(sections[section], colors.hoverDefault, colors.default);
        }
    });
}

// Reset color of navigation buttons
function resetButtonColorNav(...ids) {
    const elements = ids.map(id => document.getElementById(id));
    elements.forEach(element => {
        element.style.color = '#999999';
    });
}

// Function to change the button color based on the current section
function highlightButton(sectionId, color) {
    resetButtonColorNav('home', 'about', 'resume', 'portfolio'); // Reset all buttons' color
    switch (sectionId) {
        case 'home':
            buttonHome.style.color = color;
            break;
        case 'about':
            buttonAbout.style.color = color;
            break;
        case 'resume':
            buttonResume.style.color = color;
            break;
        case 'portfolio':
            buttonPortfolio.style.color = color;
            break;
    }
}

// Function of navigation
function navigateToSection(sectionId, disableTransition = false) {
    const landingPage = document.querySelector('.landing-page');
    const targetSection = sections[sectionId];

    scroll_section.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    // Optionally disable transition
    if (disableTransition) {
        landingPage.style.transition = 'none';
    }

    if (targetSection) {
        const offset = customOffsets[sectionId] || 0;
        landingPage.style.transform = `translateX(-${offset}vw)`;
    }

    // Save the current section in localStorage
    localStorage.setItem('currentSection', sectionId);

    // Re-enable transition after the navigation (if it was disabled)
    if (disableTransition) {
        // Ensure the transition is re-enabled after the next render
        setTimeout(() => {
            landingPage.style.transition = ''; // Reset to default
        }, 50); // Small delay to ensure the transition is disabled only during the load
    }
}

buttonHome.addEventListener('click', function() {
    navigateToSection('home')
    highlightButton('home', '#29ffff')
    localStorage.setItem('currentSection', 'home');
    setupHoverEffects();
});
buttonAbout.addEventListener('click', function() {
    navigateToSection('about')
    highlightButton('about', '#29ffff')
    localStorage.setItem('currentSection', 'about');
    setupHoverEffects();
});
buttonResume.addEventListener('click', function () {
    navigateToSection('resume')
    highlightButton('resume', '#29ffff')
    localStorage.setItem('currentSection', 'resume');
    setupHoverEffects();
});
buttonPortfolio.addEventListener('click', function () {
    navigateToSection('portfolio')
    highlightButton('portfolio', '#29ffff')
    localStorage.setItem('currentSection', 'portfolio');
    setupHoverEffects();
});

buttonAboutHome.addEventListener('click', function () {
    navigateToSection('about')
    highlightButton('about', '#ccffff')
    localStorage.setItem('currentSection', 'about');
    setupHoverEffects();
});
buttonPortfolioHome.addEventListener('click', function () {
    navigateToSection('portfolio')
    highlightButton('portfolio', '#ccffff')
    localStorage.setItem('currentSection', 'portfolio');
    setupHoverEffects();
});

buttonLinkedin.addEventListener('mouseover', function () {
    linkLinkedin.classList.toggle('linkedin_animate');
});
buttonLinkedin.addEventListener('mouseout', function () {
    linkLinkedin.classList.toggle('linkedin_animate');
});

// On page load, restore the last visited section
window.addEventListener('load', function () {
    const lastSection = localStorage.getItem('currentSection');
    if (lastSection) {
        // console.log(`Last section: ${lastSection}`);
        navigateToSection(lastSection, true);
        highlightButton(lastSection, '#ccffff')
    } else {
        navigateToSection('home'); // Default section is home
    }
});

setupHoverEffects()
const resumeDetailIcon = document.getElementById('details-icon');
const resumeDetailContent = document.getElementById('resume-details-content');
// const resumeDetailcontentIcon = document.getElementById('content-detail-icon');
const resumeDetailcontentTxt = document.getElementById('content-detail-txt');

let active_details_content = false;

resumeDetailContent.addEventListener('transitionend', function (event) {
    if (!active_details_content && event.propertyName === 'max-width') {
        resumeDetailContent.style.transition = '';
    }
});

resumeDetailIcon.addEventListener('mouseover', function () {
        resumeDetailContent.style.transition = '1s';
        resumeDetailIcon.style.transition = '1s';
        resumeDetailContent.style.maxWidth = '100%';
        // resumeDetailcontentIcon.style.transition = '4s';
        // resumeDetailcontentIcon.style.width = '2vw';
        // resumeDetailcontentTxt.style.transition = '4s';
        // resumeDetailcontentTxt.style.width = 'auto';
});

resumeDetailContent.addEventListener('mouseover', function () {
        resumeDetailContent.style.transition = '1s';
        resumeDetailIcon.style.transition = '1s';
        resumeDetailContent.style.maxWidth = '100%';
        // resumeDetailcontentIcon.style.transition = '4s';
        // resumeDetailcontentIcon.style.width = '2vw';
        // resumeDetailcontentTxt.style.transition = '4s';
        // resumeDetailcontentTxt.style.width = 'auto';
});

resumeDetailContent.addEventListener('mouseout', function () {
    // console.log('mouseleave');
    resumeDetailContent.style.transition = '1s';
    resumeDetailIcon.style.transition = '1s';
    resumeDetailContent.style.maxWidth = '0%';
    // resumeDetailcontentIcon.style.transition = '4s';
    // resumeDetailcontentIcon.style.width = '0vw';
    // resumeDetailcontentTxt.style.transition = '4s';
    // resumeDetailcontentTxt.style.width = '0vw';
});

resumeDetailIcon.addEventListener('mouseout', function () {
    // console.log('mouseleave');
    resumeDetailContent.style.transition = '1s';
    resumeDetailIcon.style.transition = '1s';
    resumeDetailContent.style.maxWidth = '0%';
    // resumeDetailcontentIcon.style.transition = '4s';
    // resumeDetailcontentIcon.style.width = '0vw';
    // resumeDetailcontentTxt.style.transition = '4s';
    // resumeDetailcontentTxt.style.width = '0vw';
});

// style.sheet.deleteRule(0);
//bug lorsqu'on scroll sur portfolio et qu'on revient à accueil par exemple