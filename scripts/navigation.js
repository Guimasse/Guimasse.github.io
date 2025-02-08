// ========================
// CONFIGURATION & CONSTANTS
// ========================

// Define color scheme for navigation buttons
const colors = {
    hoverDefault:   '#ffffff',      // Hover color for inactive buttons
    default:        '#999999',      // Default color for inactive buttons
    hoverCurrent:   '#29ffff',      // Hover color for the active section
    current:        '#ccffff',      // Active section button color
};

// Custom offsets for each section (for smooth transitions)
const customOffsets = {
    home:       0,
    about:      50,
    resume:     150,
    portfolio:  250,
};

// ========================
// ELEMENT SELECTION
// ========================

// Navigation buttons
const buttonHome = document.getElementById('home');
const buttonAbout = document.getElementById('about');
const buttonResume = document.getElementById('resume');
const buttonPortfolio = document.getElementById('portfolio');

// Sections mapping
const sections = {
    home:       buttonHome,
    about:      buttonAbout,
    resume:     buttonResume,
    portfolio:  buttonPortfolio,
};

// Home navigation buttons (for quick navigation from home section)
const buttonAboutHome = document.getElementById('about-home');
const buttonPortfolioHome = document.getElementById('portfolio-home');

// Scrollable section
const scroll_section = document.getElementById('scroll');

// ========================
// UTILITY FUNCTIONS
// ========================

// Utility function to add hover effects to a button
function setHoverEffects(button, hoverColor, defaultColor) {
    button.addEventListener('mouseover', () => button.style.color = hoverColor);
    button.addEventListener('mouseout', () => button.style.color = defaultColor);
}

// Apply hover effects based on the current active section
function setupHoverEffects() {
    const currentPage = localStorage.getItem('currentSection') || 'home';
    Object.keys(sections).forEach(section => {
        if (section === currentPage) {
            setHoverEffects(sections[section], colors.hoverCurrent, colors.current);
        } else {
            setHoverEffects(sections[section], colors.hoverDefault, colors.default);
        }
    });
}

// Reset the color of navigation buttons
function resetButtonColorNav(...ids) {
    ids.forEach(id => document.getElementById(id).style.color = colors.default);
}

// Highlight the currently active button
function highlightButton(sectionId, color) {
    resetButtonColorNav('home', 'about', 'resume', 'portfolio'); // Reset all buttons
    if (sections[sectionId]) {
        sections[sectionId].style.color = color;
    }
}

// ========================
// NAVIGATION FUNCTIONS
// ========================

// Navigate to a specific section with smooth transitions
function navigateToSection(sectionId, disableTransition = false) {
    const landingPage = document.querySelector('.landing-page');
    const targetSection = sections[sectionId];

    if (disableTransition) {
        landingPage.style.transition = 'none';
    }

    if (targetSection) {
        const offset = customOffsets[sectionId] || 0;
        landingPage.style.transform = `translateX(-${offset}vw)`;
    }

    localStorage.setItem('currentSection', sectionId); // Save section in localStorage

    if (disableTransition) {
        setTimeout(() => landingPage.style.transition = '', 50); // Re-enable transition
    }
}

// ========================
// EVENT LISTENERS
// ========================

// Add event listeners for navigation buttons
buttonHome.addEventListener('click', () => {
    navigateToSection('home');
    highlightButton('home', colors.hoverCurrent);
    setupHoverEffects();
});

buttonAbout.addEventListener('click', () => {
    navigateToSection('about');
    highlightButton('about', colors.hoverCurrent);
    setupHoverEffects();
});

buttonResume.addEventListener('click', () => {
    navigateToSection('resume');
    highlightButton('resume', colors.hoverCurrent);
    setupHoverEffects();
});

buttonPortfolio.addEventListener('click', () => {
    navigateToSection('portfolio');
    highlightButton('portfolio', colors.hoverCurrent);
    setupHoverEffects();
});

// Home section quick navigation buttons
buttonAboutHome.addEventListener('click', () => {
    navigateToSection('about');
    highlightButton('about', colors.current);
    setupHoverEffects();
});

buttonPortfolioHome.addEventListener('click', () => {
    navigateToSection('portfolio');
    highlightButton('portfolio', colors.current);
    setupHoverEffects();
});

// ========================
// PAGE LOAD HANDLING
// ========================

// Restore last visited section on page load
window.addEventListener('load', () => {
    const lastSection = localStorage.getItem('currentSection') || 'home';
    navigateToSection(lastSection, true);
    highlightButton(lastSection, colors.current);
});

setupHoverEffects()