function handlePhoneClick(number, element) {
    navigator.clipboard.writeText(number).then(() => {
        const notification = element.nextElementSibling;
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 6000);
    }).catch(err => {
        alert("Не удалось скопировать номер: " + err);
    });

    if (/Mobi/i.test(navigator.userAgent)) {
        window.location.href = 'tel:' + number;
    }
}



const modal = document.createElement('div');
modal.classList.add('modal');
document.body.appendChild(modal);

const modalImg = document.createElement('img');
modalImg.classList.add('modal-content');
modal.appendChild(modalImg);

const span = document.createElement('span');
span.classList.add('close');
span.innerHTML = '&times;';
modal.appendChild(span);

const carImages = document.querySelectorAll('.car-image img');
carImages.forEach(image => {
    image.addEventListener('click', () => {
        modal.style.display = "block";
        modalImg.src = image.getAttribute('data-large');
    });
});

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}



const toggleButton = document.getElementById('toggleButton');
const infoBox = document.getElementById('infoBox-');
const arrow = document.getElementById('arrow');

toggleButton.addEventListener('click', () => {
    const isOpen = infoBox.style.display === 'block';

    if (isOpen) {
        infoBox.style.maxHeight = '0';
        infoBox.style.opacity = '0';
        setTimeout(() => {
            infoBox.style.display = 'none';
        }, 300);
        arrow.innerHTML = '➦';
        toggleButton.classList.remove('square-corner');
    } else {
        infoBox.style.display = 'block';
        setTimeout(() => {
            if (window.innerWidth <= 480) {
                infoBox.style.maxHeight = '1780px';
            } else {
                infoBox.style.maxHeight = '1075px';
            }
            infoBox.style.opacity = '1';
            infoBox.scrollIntoView({ behavior: "smooth" });
        }, 0);
        arrow.innerHTML = '⮯';
        toggleButton.classList.add('square-corner');
    }
});





document.addEventListener('DOMContentLoaded', function() {
    const footer = document.getElementById('footer');
    const contactEmail = document.querySelector('.email');
    const copyMessage = document.querySelector('.copy-message');

    const phoneNumber = document.querySelector('.phone');
    phoneNumber.addEventListener('click', function() {
        const phone = phoneNumber.getAttribute('data-phone');
        navigator.clipboard.writeText(phone).then(() => {
            copyMessage.style.display = 'block';
            setTimeout(() => {
                copyMessage.style.display = 'none';
            }, 2000);
        });
    });

    const whatsappNumber = document.querySelector('.whatsapp');
    whatsappNumber.addEventListener('click', function() {
        const whatsapp = whatsappNumber.getAttribute('data-whatsapp');
        window.open(`https://wa.me/${whatsapp}`, '_blank');
    });

    contactEmail.addEventListener('click', function() {
        const email = contactEmail.getAttribute('data-email');
        window.location.href = `mailto:${email}`;
    });
});




let lastScrollTop = 0;
const navbar = document.querySelector('header');

function isMobile() {
    return window.innerWidth <= 768;
}

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (!isMobile()) {
        if (currentScroll > lastScrollTop) {
            navbar.style.top = "-130px";
        } else {
            navbar.style.top = "0";
        }
    } 
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});


function checkMobileMenu() {
    const mobileNavbar = document.getElementById('mobile-navbar');
    if (isMobile()) {
        mobileNavbar.style.display = 'flex';
    } else {
        mobileNavbar.style.display = 'none';
    }
}

document.getElementById('extra-buttons').style.display = 'none';

window.addEventListener('resize', checkMobileMenu);
checkMobileMenu();




document.getElementById('contactButton').addEventListener('click', function() {
    this.classList.toggle('expanded');
});

function getFormattedDate() {
    const daysOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября"];
    
    const now = new Date();
    const dayOfWeek = daysOfWeek[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    return { dayOfWeek, day, month, year };
}

function updateDate() {
    const { dayOfWeek, day, month, year } = getFormattedDate();

    document.getElementById('day-of-week').innerText = dayOfWeek;
    document.getElementById('date').innerText = `${day} ${month}`;
    document.getElementById('year').innerText = `${year} г.`;
}

updateDate();
setInterval(updateDate, 60000);

let tooltipTimeout;
let tooltipInterval;

function getUserTime(timeZone) {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: timeZone };
    return now.toLocaleTimeString('ru-RU', options);
}

async function getUserLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        const timeZone = data.timezone;
        const dateContainer = document.getElementById('date-container');
        const tooltip = document.getElementById('tooltip');

        dateContainer.addEventListener('mouseover', function (event) {
            tooltipTimeout = setTimeout(() => {
                tooltip.innerText = `Время: ${getUserTime(timeZone)}`;
                tooltip.style.display = 'block';
                tooltip.style.left = `${event.pageX + 10}px`;
                tooltip.style.top = `${event.pageY + 10}px`;

                tooltipInterval = setInterval(() => {
                    tooltip.innerText = `Время: ${getUserTime(timeZone)}`;
                }, 1000);
            }, 2000);
        });

        dateContainer.addEventListener('mouseout', function () {
            clearTimeout(tooltipTimeout);
            tooltip.style.display = 'none';
            clearInterval(tooltipInterval);
        });

        dateContainer.addEventListener('mousemove', function (event) {
            if (tooltip.style.display === 'block') {
                tooltip.style.left = `${event.pageX + 10}px`;
                tooltip.style.top = `${event.pageY + 10}px`;
            }
        });

    } catch (error) {
        console.error("Ошибка получения местоположения:", error);
    }
}

getUserLocation();










let currentIndex = 0;
const photos = [
    "Img/Services_1.jpg",
    "Img/Services_2.jpg",
    "Img/slide_2.jpg",
    "Img/auto_2.jpg",
    "Img/auto.jpg",
    "Img/slide_2.jpg"
];

function changePhoto(side) {
    currentIndex = (currentIndex + (side === 'left' ? -1 : 1) + photos.length) % photos.length;
    const leftIndex = (currentIndex - 1 + photos.length) % photos.length;
    const rightIndex = (currentIndex + 1) % photos.length;

    const centerImg = document.getElementById("centerImg");
    centerImg.style.transition = "transform 0.5s ease";
    centerImg.style.transform = "scale(1.1)";

    setTimeout(() => {
        document.getElementById("leftImg").src = photos[leftIndex];
        document.getElementById("centerImg").src = photos[currentIndex];
        document.getElementById("rightImg").src = photos[rightIndex];

        document.getElementById("leftImg").classList.add('dark-img');
        document.getElementById("rightImg").classList.add('dark-img');
        centerImg.style.transform = "scale(1)";
    }, 400);
}

let currentIndexVertical = 0;

function changePhotoVertical(direction) {
    currentIndexVertical = (currentIndexVertical + (direction === 'up' ? -1 : 1) + photos.length) % photos.length;

    const verticalCenterImg = document.getElementById("verticalCenterImg");
    verticalCenterImg.style.transition = "transform 0.5s ease";
    verticalCenterImg.style.transform = "scale(1.1)";

    setTimeout(() => {
        verticalCenterImg.src = photos[currentIndexVertical];
        verticalCenterImg.style.transform = "scale(1)";
    }, 400);
}






document.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.addEventListener('click', function () {
        const target = this.getAttribute('data-target');

        if (this.id === 'route-rk-btn') {
            const extraButtons = document.getElementById('extra-buttons');
            if (extraButtons.style.display === 'flex') {
                extraButtons.style.display = 'none';
                this.querySelector('i').classList.remove('bxs-x-circle');
                this.querySelector('i').classList.add('bx', 'bx-trip');
            } else {
                extraButtons.style.display = 'flex';
                this.querySelector('i').classList.remove('bx-trip');
                this.querySelector('i').classList.add('bxs-x-circle');
            }
        } else {
            window.location.href = target;
        }
    });
});

document.querySelectorAll('.extra-button').forEach(button => {
    button.addEventListener('click', function () {
        const target = this.getAttribute('data-target');
        window.location.href = target;
    });
});

function checkMobileMenu() {
    const mobileNavbar = document.getElementById('mobile-navbar');
    if (window.innerWidth <= 768) {
        mobileNavbar.style.display = 'flex';
    } else {
        mobileNavbar.style.display = 'none';
    }
}

document.getElementById('extra-buttons').style.display = 'none';

window.addEventListener('resize', checkMobileMenu);
checkMobileMenu();



function loadStylesheet() {
    const isMobile = window.innerWidth <= 768;
    const mainStylesheet = document.getElementById('main-stylesheet');

    if (isMobile) {
        mainStylesheet.href = 'Mobile-css/mobile-Questionnaire.css';
    } else {
        mainStylesheet.href = 'CSS/Questionnaire.css';
    }
}

window.addEventListener('resize', loadStylesheet);
document.addEventListener('DOMContentLoaded', loadStylesheet);



//Перенаправление на страницу загрузки при обновление!//

document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem('isRefreshing')) {
        localStorage.setItem('isRefreshing', 'false');
    }

    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        localStorage.setItem('isRefreshing', 'true');
        window.location.href = 'loading.html';
    }

    if (window.location.pathname.includes('loading.html')) {
        localStorage.removeItem('isRefreshing');
    }
});

window.addEventListener("beforeunload", function () {
    localStorage.removeItem('isRefreshing');
});