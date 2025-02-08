// LinkedIn button
const buttonLinkedin = document.getElementById('button-linkedin');
const linkLinkedin = document.getElementById('link-linkedin');

buttonLinkedin.addEventListener('mouseover', function () {
    linkLinkedin.classList.toggle('linkedin_animate');
});
buttonLinkedin.addEventListener('mouseout', function () {
    linkLinkedin.classList.toggle('linkedin_animate');
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