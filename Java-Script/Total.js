const cars = [
    {
        name: "Kia Rio 3",
        image: "Img/Kia-Rio 2013.png",
        Places: "Количество мест: 5 шт.",
        Comfort: "Комфорт: Средний.",
        Safety: "Безопасность: ABS, EBD, ESC.",
        Fuel_economy: "Экономия топлива: 5-6 л/100 км.",
        Trunk_volume: "Объем багажника: 392 кг.",
        Load_capacity: "Грузоподъемность: 400 кг."
    },
    {
        name: "Kia Rio 4",
        image: "Img/Kia-Rio 2017.png",
        Places: "Количество мест: 5 шт.",
        Comfort: "Комфорт: Средний.",
        Safety: "Безопасность: ABS, EBD, ESC, Airbags.",
        Fuel_economy: "Экономия топлива: 6-7 л/100 км.",
        Trunk_volume: "Объем багажника: 388 кг.",
        Load_capacity: "Грузоподъемность: 400-500 кг."
    },
    {
        name: "Toyota Camry 40",
        image: "Img/Camry 40 2011.png",
        Places: "Количество мест: 5 шт.",
        Comfort: "Комфорт: Высокий.",
        Safety: "Безопасность: NHTSA, ABS, DSC, EBD.",
        Fuel_economy: "Экономия топлива: 8-10 л/100 км.",
        Trunk_volume: "Объем багажника: 495 кг.",
        Load_capacity: "Грузоподъемность: 450-500 кг."
    },
    {
        name: "Ford Mondeo 3",
        image: "Img/Ford 2007.png",
        Places: "Количество мест: 5 шт.",
        Comfort: "Комфорт: Высокий.",
        Safety: "Безопасность: NCAP.",
        Fuel_economy: "Экономия топлива: 7-9 л/100 км.",
        Trunk_volume: "Объем багажника: 500 кг.",
        Load_capacity: "Грузоподъемность: 500-600 кг."
    }
];

const carImage = document.getElementById('car-image');
const carDetails = document.getElementById('car-details');
const links = document.querySelectorAll('.link');
let currentCarIndex = 0;

function updateCarDisplay(index) {
    currentCarIndex = index;
    carImage.src = cars[index].image;
    carDetails.innerHTML = `
    <h2 style="font-size: 22px; text-align: center; margin-top: -2px; color: yellow; margin-bottom: -5px;">${cars[index].name}</h2>
    <p style="text-align: left; margin-left: 15px; margin-bottom: -10px;">${cars[index].Places}</p>
    <p style="text-align: left; margin-left: 15px; margin-bottom: -10px;">${cars[index].Safety}</p>
    <p style="text-align: left; margin-left: 15px; margin-bottom: -10px;">${cars[index].Fuel_economy}</p>
    <p style="text-align: left; margin-left: 15px; margin-bottom: -10px;">${cars[index].Comfort}</p>
    <p style="text-align: left; margin-left: 15px; margin-bottom: -10px;">${cars[index].Trunk_volume}</p>
    <p style="text-align: left; margin-left: 15px;">${cars[index].Load_capacity}</p>
    `;
    links.forEach(link => link.classList.remove('active'));
    links[index].classList.add('active');
}

links.forEach((link, index) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        updateCarDisplay(index);
    });
});

function adjustButtonsVisibility() {
    if (window.innerWidth < 480) {
        document.querySelector('.total_auto').style.display = 'flex';
        document.querySelector('.menu_auto').style.flexDirection = 'row';
        
        links[0].style.marginRight = '125px';

        const leftButtonsWrapper = document.createElement('div');
        const rightButtonsWrapper = document.createElement('div');
        
        leftButtonsWrapper.style.display = 'flex';
        leftButtonsWrapper.style.flexDirection = 'column';
        leftButtonsWrapper.style.marginRight = '15px';
        leftButtonsWrapper.append(links[0], links[1]);

        rightButtonsWrapper.style.display = 'flex';
        rightButtonsWrapper.style.flexDirection = 'column';
        rightButtonsWrapper.append(links[2], links[3]);

        const menuAuto = document.querySelector('.menu_auto');
        menuAuto.append(leftButtonsWrapper, rightButtonsWrapper);
    } else {
        const menuAuto = document.querySelector('.menu_auto');
        menuAuto.innerHTML = '';
        links.forEach(link => menuAuto.append(link));

        menuAuto.style.flexDirection = 'row';
    }
}

adjustButtonsVisibility();
window.addEventListener('resize', adjustButtonsVisibility);
updateCarDisplay(0);




document.addEventListener("DOMContentLoaded", function () {
    const cookieConsent = localStorage.getItem("cookie-consent");

    if (!cookieConsent) {
        setTimeout(function () {
            document.getElementById("cookie-consent").style.display = "flex";
        }, 1000);
    } else {
        if (cookieConsent === 'accepted') {
            setupCookies("all");
        } else if (cookieConsent === 'declined') {
            setupCookies("minimal");
        }
    }

    document.getElementById("accept").onclick = function () {
        localStorage.setItem("cookie-consent", "accepted");
        document.getElementById("cookie-consent").style.display = "none";
        setupCookies("all");
    };

    document.getElementById("decline").onclick = function () {
        localStorage.setItem("cookie-consent", "declined");
        document.getElementById("cookie-consent").style.display = "none";
        setupCookies("minimal");
    };
});

function setupCookies(consent) {
    if (consent === "all") {
        console.log("Все куки установлены");
    } else if (consent === "minimal") {
        console.log("Минимально необходимые куки установлены");
    }
}




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
        mainStylesheet.href = 'Mobile-css/mobile-total.css';
    } else {
        mainStylesheet.href = 'CSS/Total.css';
    }
}

window.addEventListener('resize', loadStylesheet);
document.addEventListener('DOMContentLoaded', loadStylesheet);



function toggleInfoBlocks() {
    const isMobile = window.innerWidth < 768;
    const infoBlocks = document.querySelector('.info-blocks');
    const mainInfoBlocks = document.querySelectorAll('.box_sl, .box_sl-2');

    if (isMobile) {
        infoBlocks.style.display = 'flex';
        mainInfoBlocks.forEach(block => block.style.display = 'none');
    } else {
        infoBlocks.style.display = 'none';
        mainInfoBlocks.forEach(block => block.style.display = 'block');
    }
}

window.addEventListener('resize', toggleInfoBlocks);
document.addEventListener('DOMContentLoaded', toggleInfoBlocks);





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
