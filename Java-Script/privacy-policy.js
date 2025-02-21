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








document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopButton = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollToTopButton.classList.add('show');
        } else {
            scrollToTopButton.classList.remove('show');
        }
    });

    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
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



document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.step');
    const section = document.querySelector('.total-fon-cont');

    function checkVisible() {
        const sectionRect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (sectionRect.top < windowHeight && sectionRect.bottom > 0) {
            steps.forEach((step, index) => {
                setTimeout(() => {
                    step.classList.add('visible');
                }, index * 100);
            });
            window.removeEventListener('scroll', checkVisible);
        }
    }

    window.addEventListener('scroll', checkVisible);
    checkVisible();
});



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
        mainStylesheet.href = 'Mobile-css/mobile-privacy-policy.css';
    } else {
        mainStylesheet.href = 'CSS/privacy-policy.css';
    }
}

window.addEventListener('resize', loadStylesheet);
document.addEventListener('DOMContentLoaded', loadStylesheet);