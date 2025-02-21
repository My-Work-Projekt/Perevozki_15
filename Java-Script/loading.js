window.onload = function() {
    setTimeout(() => {
        window.location.href = 'Home.html';
    }, 3500);
};



function loadStylesheet() {
    const isMobile = window.innerWidth <= 768;
    const mainStylesheet = document.getElementById('main-stylesheet');

    if (isMobile) {
        mainStylesheet.href = 'Mobile-css/mobile-loading.css';
    } else {
        mainStylesheet.href = 'CSS/loading.css';
    }
}

window.addEventListener('resize', loadStylesheet);
document.addEventListener('DOMContentLoaded', loadStylesheet);

