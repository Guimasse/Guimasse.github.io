


const resumeDetailIcon = document.getElementById('details-icon');
const resumeDetailContent = document.getElementById('resume-details-content');

const hightlight_org = document.getElementById('hightlight_org');

let active_details_content = false;

// A revoir
scroll_section.addEventListener('scroll', function () {
    if (scroll_section.scrollTop === 0) {
        resumeDetailContent.style.transition = '1s';
        resumeDetailIcon.style.transition = '1s';
        resumeDetailContent.style.maxWidth = '100%';
        active_details_content = false;

    } else {
        resumeDetailContent.style.transition = '1s';
        resumeDetailIcon.style.transition = '1s';
        resumeDetailContent.style.maxWidth = '0%';
        active_details_content = true;
    }
});

resumeDetailIcon.addEventListener('mouseover', function () {
    if(active_details_content){
        resumeDetailContent.style.maxWidth = '100%';
    }
});

resumeDetailContent.addEventListener('mouseover', function () {
    if(active_details_content){
        resumeDetailContent.style.maxWidth = '100%';
    }
});

resumeDetailContent.addEventListener('mouseout', function () {
    if(active_details_content){
        resumeDetailContent.style.maxWidth = '0%';
    }
});

resumeDetailIcon.addEventListener('mouseout', function () {
    if(active_details_content){
        resumeDetailContent.style.maxWidth = '0%';
    }
});

// // Calcul de la valeur
let leftValue = (0.5 + 0.1*(1/3))*100

// Appliquer la valeur calculée à l'élément
document.querySelector('.job-card-detail').style.left = leftValue + '%';



// // Content
// const landing_page = document.getElementById('landing-page');
// const resume_body = document.getElementById('resume-body');
// const left = document.getElementById('left');
// const right = document.getElementById('right');
// const about = document.getElementById('about_content');


// style.sheet.deleteRule(0);
//bug lorsqu'on scroll sur portfolio et qu'on revient à accueil par exemple