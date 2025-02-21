const map = L.map('map').setView([48.0196, 66.9237], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 2.5,
}).addTo(map);

const southWest = L.latLng(100.0, 190.0);
const northEast = L.latLng(-40.0, -30.0);
const bounds = L.latLngBounds(southWest, northEast);
map.setMaxBounds(bounds);
map.on('drag', function () {
    map.panInsideBounds(bounds);
});


let pointA = null;
let pointB = null;
let markerA = null;
let markerB = null;
let searchMarker = null;
let markers = [];

const geojsonRussia = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [20.0, 70.0], [180.0, 70.0], [180.0, 50.0], [20.0, 50.0], [20.0, 70.0]
                ]]
            }
        }
    ]
};

const geojsonKazakhstan = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [55.0, 40.0], [90.0, 40.0], [90.0, 55.0], [55.0, 55.0], [55.0, 40.0]
                ]]
            }
        }
    ]
};

const cities = {
    "Казахстан": {
        "Абай": [42.8713, 76.2002],
        "Акколь": [51.1681, 70.2400],
        "Аксай": [51.1500, 51.5000],
        "Аксу": [42.4892, 76.9938],
        "Актау": [43.6480, 51.1972],
        "Актобе": [50.3000, 57.1667],
        "Алатау": [43.1569, 77.0105],
        "Алга": [50.9786, 54.8901],
        "Алматы": [43.2220, 76.8512],
        "Алтай": [49.8531, 84.9894],
        "Арал": [44.4594, 60.5601],
        "Аркалык": [48.9878, 67.2672],
        "Арыс": [43.3000, 68.2500],
        "Астана": [51.1694, 71.4491],
        "Атбасар": [52.0911, 69.1544],
        "Атырау": [47.1162, 51.8864],
        "Аягоз": [46.2010, 80.4108],
        "Байконыр": [45.9592, 63.3000],
        "Балхаш": [46.9956, 74.9999],
        "Булаево": [53.9747, 66.9437],
        "Державинск": [52.4626, 69.1225],
        "Ерейментау": [51.6018, 72.3594],
        "Есик": [43.1957, 77.2693],
        "Есиль": [51.2515, 71.1669],
        "Жанаозен": [43.1958, 53.2480],
        "Жанатас": [42.9242, 70.6019],
        "Жаркент": [44.0213, 78.8964],
        "Жезказган": [47.7580, 67.7000],
        "Жем": [48.6350, 57.2500],
        "Жетысай": [42.2331, 69.9135],
        "Житикара": [49.6323, 73.1906],
        "Зайсан": [47.2894, 83.6594],
        "Казалинск": [43.4634, 66.0559],
        "Кандыагаш": [49.0283, 60.2575],
        "Караганда": [49.8003, 73.1004],
        "Каражал": [49.0053, 67.6842],
        "Каратау": [42.3130, 70.8714],
        "Каркаралинск": [49.6930, 72.1160],
        "Каскелен": [43.0257, 77.0000],
        "Кентау": [42.3644, 68.4462],
        "Кокшетау": [53.3139, 69.3454],
        "Конаев": [43.9825, 77.0000],
        "Костанай": [53.2144, 63.6266],
        "Косшы": [51.0731, 71.3299],
        "Кульсары": [47.1306, 55.4167],
        "Курчатов": [50.7213, 78.4898],
        "Кызылорда": [44.7956, 65.4825],
        "Ленгер": [42.2500, 69.9900],
        "Лисаковск": [53.8883, 63.6156],
        "Макинск": [52.5833, 69.2500],
        "Мамлютка": [54.3750, 65.2575],
        "Павлодар": [52.3000, 76.9666],
        "Петропавловск": [54.8673, 69.1645],
        "Приозёрск": [47.0919, 73.4347],
        "Риддер": [50.3870, 83.5766],
        "Рудный": [52.9883, 63.1702],
        "Сарань": [50.1266, 72.4328],
        "Сарканд": [43.1162, 78.3786],
        "Сарыагаш": [41.1800, 69.2899],
        "Сатпаев": [47.4762, 67.6939],
        "Семей": [50.4103, 80.4172],
        "Сергеевка": [52.5387, 69.2693],
        "Серебрянск": [50.6000, 82.0333],
        "Степногорск": [51.1231, 71.3401],
        "Степняк": [52.7690, 69.4060],
        "Тайынша": [54.2064, 63.5581],
        "Талгар": [43.0730, 77.0689],
        "Талдыкорган": [45.0000, 78.4000],
        "Тараз": [42.9011, 71.3656],
        "Текели": [44.2651, 78.7421],
        "Темир": [51.9293, 63.4025],
        "Темиртау": [50.0294, 72.9667],
        "Тобыл": [52.5862, 63.6482],
        "Туркестан": [43.1802, 68.5533],
        "Уральск": [51.2007, 51.3687],
        "Усть-Каменогорск": [49.9500, 82.6194],
        "Ушарал": [43.2279, 78.8494],
        "Уштобе": [43.3481, 77.1390],
        "Форт-Шевченко": [43.6142, 52.7409],
        "Хромтау": [50.5167, 58.6914],
        "Шалкар": [46.2674, 63.0356],
        "Шар": [45.3270, 81.7865],
        "Шардара": [42.4699, 68.7997],
        "Шахтинск": [50.5025, 72.7764],
        "Шемонаиха": [50.2567, 82.5873],
        "Шу": [43.0283, 73.2370],
        "Шымкент": [42.3000, 69.5900],
        "Щучинск": [53.0633, 70.1250],
        "Экибастуз": [51.3014, 75.2000],
        "Эмба": [47.2170, 54.6797]
    },
    "Россия": {
        "Абакан": [53.4875, 91.4091], "Адлер": [43.4231, 39.9117], "Анапа": [44.8956, 37.3166], "Архангельск": [64.5372, 40.5704],
        "Астрахань": [46.3491, 48.0350], "Барнаул": [53.3356, 83.7585], "Белгород": [50.5938, 36.5874], "Благовещенск": [50.2914, 127.5335],
        "Чебоксары": [56.1488, 47.2639], "Челябинск": [55.1644, 61.4362], "Череповец": [58.6005, 39.8787], "Черняховск": [54.4656, 21.8661],
        "Чита": [52.0386, 113.4784], "Екатеринбург": [56.8389, 60.6057], "Геленджик": [44.5738, 38.0759], "Иркутск": [52.2842, 104.2762],
        "Ижевск": [56.8356, 53.1718], "Кабардинка": [44.5580, 37.9794], "Калининград": [54.7104, 20.4522], "Казань": [55.8304, 49.0661],
        "Кемерово": [54.8502, 86.0855], "Хабаровск": [48.4823, 135.0583], "Ханты-Мансийск": [61.0025, 69.0148], "Кисловодск": [44.0041, 42.6966],
        "Комсомольск-на-Амуре": [50.5589, 137.0149], "Кострома": [57.7645, 40.9265], "Краснодар": [45.0355, 38.9753], "Красноярск": [56.0090, 92.7937],
        "Курган": [55.4266, 65.3447], "Курск": [51.7387, 36.1895], "Липецк": [52.6166, 39.5704], "Листвянка": [51.9423, 104.8838],
        "Магадан": [59.5702, 150.8024], "Магнитогорск": [53.4056, 58.9775], "Махачкала": [42.9850, 47.5046], "Минеральные Воды": [44.1187, 43.0437],
        "Москва": [55.7558, 37.6173], "Мурманск": [68.9585, 33.0736], "Находка": [42.9251, 132.8930], "Нальчик": [43.4859, 43.6090],
        "Нижневартовск": [60.9378, 76.5709], "Нижний Новгород": [56.2975, 43.9937], "Ноябрьск": [63.1777, 75.4418], "Норильск": [69.3558, 88.1883],
        "Новокузнецк": [53.7494, 86.9250], "Новороссийск": [44.7258, 37.7586], "Новосибирск": [55.0084, 82.9357], "Новый Уренгой": [66.0398, 76.6430],
        "Омск": [54.9885, 73.3682], "Оренбург": [51.7695, 58.5074], "Пенза": [53.0224, 45.0131], "Пермь": [58.0175, 56.2502],
        "Петропавловск-Камчатский": [53.0388, 158.6550], "Петрозаводск": [61.7850, 34.3484], "Псков": [57.8265, 28.3376], "Пятигорск": [44.0492, 42.7016],
        "Ростов-на-Дону": [47.2227, 39.7186], "Рязань": [54.6092, 39.7379], "Салехард": [66.5354, 66.5820], "Самара": [53.2411, 50.2215],
        "Саранск": [54.1840, 45.1751], "Саратов": [51.5330, 46.0343], "Саяногорск": [53.9026, 91.5426], "Сочи": [43.5858, 39.7202],
        "Санкт-Петербург": [59.9343, 30.3351], "Ставрополь": [45.0442, 41.9774], "Сургут": [61.2582, 73.3962], "Суздаль": [56.4237, 40.4488],
        "Светлогорск": [54.2959, 19.1013], "Сыктывкар": [61.6695, 50.8285], "Таганрог": [47.2271, 38.8959], "Тольятти": [52.4961, 49.8464],
        "Томск": [56.5011, 84.9726], "Тула": [54.1972, 37.6173], "Тверь": [56.8581, 35.9110], "Тюмень": [57.1523, 65.5272],
        "Уфа": [54.7388, 55.9721], "Углич": [57.5130, 38.3162], "Ухта": [63.5777, 53.7244], "Улан-Удэ": [51.8255, 107.5836],
        "Ульяновск": [54.3184, 48.4021], "Великий Новгород": [58.5161, 31.2746], "Владикавказ": [43.0246, 44.6781], "Владимир": [56.1290, 40.4123],
        "Владивосток": [43.1156, 131.8851], "Волгоград": [48.7071, 44.5133], "Воркута": [67.4940, 64.0666], "Воронеж": [51.6600, 39.1864],
        "Выборг": [60.7180, 28.7401], "Якутск": [64.8144, 147.7345], "Ярославль": [57.6260, 39.8855], "Йошкар-Ола": [56.6310, 47.8500],
        "Южно-Сахалинск": [46.9573, 142.7332], "Химки": [55.8890, 37.4318], "Калуга": [54.5123, 36.2757], "Елабуга": [55.7184, 52.1225],
        "Азов": [47.1272, 39.4243], "Александров": [56.4348, 38.1988], "Брянск": [52.9662, 34.3677], "Вологда": [59.2193, 39.8848],
        "Выкса": [55.5759, 42.1336], "Грозный": [43.3130, 45.6993], "Иваново": [57.0012, 40.9664], "Киров": [58.5987, 49.6636],
        "Муром": [54.0520, 40.5728], "Набережные Челны": [55.7408, 49.1099], "Нижнекамск": [55.6091, 51.8231], "Переславль-Залесский": [56.7963, 38.8561],
        "Ростов Великий": [57.1886, 39.4503], "Сергиев Посад": [56.3008, 38.1389], "Смоленск": [54.7862, 30.3096], "Старая Русса": [58.1775, 31.0656],
        "Тамбов": [52.7316, 41.4426], "Тобольск": [58.2505, 68.2892], "Шахты": [47.6989, 40.2195], "Стрельна": [59.8496, 30.1791],
        "Петергоф": [59.8986, 29.8858], "Пушкин": [59.6781, 30.3643], "Обнинск": [55.1340, 36.6062], "Армавир": [44.0040, 40.1500],
        "Гатчина": [58.41, 30.57], "Зеленогорск": [60.0020, 29.7596], "Репино": [60.0153, 29.9551], "Солнечное": [44.5094, 38.2935],
        "Шлиссельбург": [59.9424, 31.0494], "Воскресенское": [56.0348, 38.8843], "Коломна": [55.0906, 38.7717], "Рождествено": [55.6066, 37.1439],
        "Октябрьский": [54.2795, 68.7459], "Всеволожск": [60.0148, 30.4701], "Бузулук": [52.7717, 48.4074], "Ессентуки": [44.065, 42.8784],
        "Кировск": [59.4606, 30.5835], "Новокуйбышевск": [53.0282, 49.0753], "Приозерск": [60.3411, 30.8362], "Рыбинск": [58.0496, 38.8533],
        "Серпухов": [54.9164, 38.6974], "Стерлитамак": [53.6280, 55.9514], "Ступино": [54.93, 38.4115], "Туапсе": [44.0985, 39.0955],
        "Чайковский": [57.2076, 54.0895], "Энгельс": [51.4937, 46.1307], "Шуя": [57.9943, 41.1162], "Сорочинск": [51.8314, 53.0922],
        "Терскол": [43.3491, 42.6952], "Кропоткин": [45.4008, 40.5829], "Дзержинск": [56.2398, 39.5388], "Тихвин": [59.6700, 38.5805],
        "Шатура": [55.5366, 39.2096], "Златоуст": [55.4037, 59.0919], "Горно-Алтайск": [51.9645, 85.9490], "Великие Луки": [56.0957, 30.3890],
        "Биробиджан": [48.7751, 132.9184], "Волгодонск": [47.5140, 42.0685], "Волжский": [48.7502, 44.8238], "Ейск": [45.3501, 38.2719],
        "Белокуриха": [51.9618, 85.9325], "Кирово-Чепецк": [58.5438, 50.6294], "Майкоп": [44.6092, 40.1033], "Нягань": [62.0465, 65.3899],
        "Саров": [54.9145, 43.3497], "Северодвинск": [64.5730, 39.8373], "Старый Оскол": [50.6145, 38.5508], "Троицк": [54.0185, 38.1972],
        "Шадринск": [57.0345, 63.6373], "Подольск": [55.4060, 38.5346], "Дмитров": [56.3464, 38.5295], "Дагомыс": [44.4299, 39.7082],
        "Красная Поляна": [43.6804, 40.1184], "Лазаревское": [43.7634, 39.0547], "Лоо": [43.7600, 39.8825], "Хоста": [43.5770, 39.7355],
        "Зеленоградск": [54.4672, 19.1280], "Балашиха": [55.7600, 37.9817], "Лысково": [56.0300, 43.8299], "Витязево": [45.2622, 38.0572],
        "Вельск": [61.2401, 42.0805], "Великий Устюг": [61.538, 46.2485], "Кингисепп": [59.5965, 28.8533], "Звенигород": [55.7609, 36.8365],
        "Северобайкальск": [55.6507, 109.4837], "Первоуральск": [56.8725, 59.9628], "Ногинск": [56.0315, 38.4379], "Электросталь": [56.1815, 38.5133],
        "Тихорецк": [45.7507, 40.1456], "Ломоносов": [59.8857, 29.2506], "Дубна": [56.7465, 37.1826], "Брейтово": [57.6130, 42.0720],
        "Железноводск": [44.0424, 42.7051], "Голубицкая": [45.2450, 38.3247], "Грязи": [51.4472, 39.0730], "Эсто-Садок": [43.6620, 39.3865],
        "Ангелово": [59.4275, 60.4653], "Знаменский": [48.4320, 40.2350], "Архипо-Осиповка": [44.4236, 38.1715], "Горячий Ключ": [44.5264, 40.2618],
        "Домбай": [43.6179, 40.2011], "Животино": [53.7803, 39.3242], "Королёв": [55.9255, 37.8887], "Курово": [54.8448, 39.6221],
        "Мышкин": [57.6737, 38.8169], "Небуг": [44.4956, 38.5048], "Никола": [57.9938, 40.7601], "Сукко": [44.4784, 38.0553],
        "Шерегеш": [52.8371, 87.5168], "Янтарный": [54.7768, 19.1003], "Морское": [44.4670, 38.2040], "Гурзуф": [44.4866, 34.1570],
        "Евпатория": [45.1997, 33.3601], "Керчь": [45.3667, 36.4772], "Коктебель": [44.9230, 35.3391], "Курпаты": [44.4318, 34.2680],
        "Черноморское, Крым": [45.2626, 34.6397], "Одинцово": [55.6916, 36.7198], "Жуковский": [55.6051, 38.1575], "Конаково": [56.0466, 37.2404],
        "Петрово-Дальнее": [56.2962, 38.1416], "Городец": [56.2644, 43.4555], "Иноземцево": [57.6066, 39.3839], "Тургояк": [54.7855, 60.3199]
    }
};

const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const clearButton = document.getElementById('clearButton');

searchButton.addEventListener('mouseenter', showSearchInput);
searchButton.addEventListener('mouseleave', hideSearchInputAfterDelay);
searchInput.addEventListener('mouseenter', showSearchInput);
searchInput.addEventListener('mouseleave', hideSearchInputAfterDelay);
searchInput.addEventListener('input', toggleClearButtonVisibility);
clearButton.addEventListener('click', clearSearch);
searchButton.addEventListener('click', performSearch);


searchButton.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
        if (!isSearchInputVisible) {
            showSearchInput();
        } else {
            if (searchInput.value.trim() === '') {
                alert('Введите название населенного пункта!');
            }
        }
    } else {
        performSearch();
    }
});


searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

function showSearchInput() {
    searchInput.style.width = '250px';
    searchInput.style.opacity = '1';
    searchInput.style.visibility = 'visible';
    searchInput.focus();
}



function hideSearchInputAfterDelay() {
    if (searchInput.value === '') {
        setTimeout(() => {
            if (!searchInput.matches(':hover') && !searchButton.matches(':hover')) {
                hideSearchInput();
            }
        }, 100);
    }
}

function hideSearchInput() {
    if (searchInput.value.trim() === '') {
        searchInput.style.width = '0';
        searchInput.style.opacity = '0';
        searchInput.style.visibility = 'hidden';
    }
}

function toggleClearButtonVisibility() {
    clearButton.style.display = searchInput.value.trim() ? 'inline' : 'none';
}

function clearSearch() {
    searchInput.value = '';
    clearButton.style.display = 'none';
    hideSearchInput();
    clearMarkers();
}

function performSearch() {
    const input = searchInput.value.trim();


    if (input.length < 3 && input.length > 0) {
        alert('Введите не менее 3 букв!');
        return;
    }

    if (/[^а-яёА-ЯЁ\s:\-\,]/.test(input) || input.match(/[0-9]/)) {
        alert('Вы можете вводить только Русские буквы и символы (:, - или ,)!');
        return;
    }

    if (input.length >= 3) {
        const results = searchCities(input.toLowerCase());
        if (results.length > 0) {
            displayMarkers(results);
        } else {
            alert('Данного населенного пункта нет!');
        }
    } else if (input.length === 0) {
        clearMarkers();
        alert('Введите название населенного пункта!');
    }
}

document.getElementById('searchInput').addEventListener('input', () => {
    const input = document.getElementById('searchInput').value.trim();
    if (input.length === 0) {
        clearMarkers();
    }
});

function searchCities(query) {
    const results = [];
    for (const country in cities) {
        for (const city in cities[country]) {
            if (city.toLowerCase().startsWith(query)) {
                results.push({ name: city, location: cities[country][city], country: country });
            }
        }
    }
    return results;
}

function clearMarkers() {
    if (searchMarker) {
        map.removeLayer(searchMarker);
        searchMarker = null;
    }

    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
}

function displayMarkers(results) {
    clearMarkers();

    results.forEach(result => {
        const { name, location, country } = result;

        const markerColor = 'blue';
        const marker = L.marker(location, { icon: L.divIcon({ className: 'custom-marker', html: `<div style="background-color:${markerColor};width:16px;height:16px;border-radius:50%;"></div>` }) }).addTo(map);

        if (results.length === 1) {
            marker.setIcon(L.divIcon({ className: 'custom-marker', html: `<div style="background-color:green;width:16px;height:16px;border-radius:50%;"></div>` }));
            map.setView(location, 10);
        }

        marker.bindPopup(`Страна: ${country}<br>Название: ${name}`)
            .on('mouseover', function () {
                this.openPopup();
            })
            .on('mouseout', function () {
                this.closePopup();
            });

        markers.push(marker);
    });
}

const searchMarkerStyle = document.createElement('style');
searchMarkerStyle.innerHTML = `
    .search-marker {
        background-color: orange;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        opacity: 0.8;
        border: 2px solid #fff;
    }
`;
document.head.appendChild(searchMarkerStyle);


function isPointInCountry(latlng, geojson) {
    const point = turf.point([latlng.lng, latlng.lat]);
    return geojson.features.some(feature => turf.booleanPointInPolygon(point, feature));
}

const pricePerKmInTenge = 120;
let currentPricePerKm = pricePerKmInTenge;
let total = 0;
let reverseRouteEnabled = false;

const reverseRouteText = document.getElementById('reverse-route');
const reverseCheckbox = document.getElementById('reverse-checkbox');

function calculateDistance() {
    if (pointA && pointB) {
        const distance = map.distance(pointA, pointB) / 1000;
        let multiplier = reverseRouteEnabled ? 2 : 1;
        document.getElementById('distance').innerText = (distance * multiplier).toFixed(2);
        total = distance * multiplier * currentPricePerKm;
        document.getElementById('total').innerText = total.toFixed(2);

        reverseRouteText.style.display = 'block';
    } else {
        reverseRouteText.style.display = 'none';
    }
}

function resetPoints() {
    if (markerA) {
        map.removeLayer(markerA);
        markerA = null;
    }
    if (markerB) {
        map.removeLayer(markerB);
        markerB = null;
    }
    pointA = null;
    pointB = null;
    document.getElementById('pointA-text').innerText = 'Откуда   (Поставьте точку A на карте)';
    document.getElementById('pointB-text').innerText = 'Куда   (Поставьте точку B на карте)';
    document.getElementById('removeA').style.display = 'none';
    document.getElementById('removeB').style.display = 'none';
    document.getElementById('distance').innerText = '0';
    document.getElementById('total').innerText = '0';
    reverseRouteText.style.display = 'none';
    reverseCheckbox.textContent = "";
    reverseRouteEnabled = false;
}

reverseCheckbox.addEventListener('click', () => {
    reverseRouteEnabled = !reverseRouteEnabled;

    if (reverseRouteEnabled) {
        reverseCheckbox.textContent = "✔";
    } else {
        reverseCheckbox.textContent = "";
    }

    calculateDistance();
});

map.on('click', function (event) {
    const latlng = event.latlng;

    if (isPointInCountry(latlng, geojsonRussia) || isPointInCountry(latlng, geojsonKazakhstan)) {
        if (!pointA) {
            pointA = latlng;
            document.getElementById('pointA-text').innerText = `(${pointA.lat.toFixed(5)}, ${pointA.lng.toFixed(5)})`;
            markerA = L.marker(pointA).addTo(map).bindPopup('Маршрут A').openPopup();
            document.getElementById('removeA').style.display = 'inline';
        } else if (!pointB) {
            pointB = latlng;
            document.getElementById('pointB-text').innerText = `(${pointB.lat.toFixed(5)}, ${pointB.lng.toFixed(5)})`;
            markerB = L.marker(pointB).addTo(map).bindPopup('Маршрут B').openPopup();
            document.getElementById('removeB').style.display = 'inline';
            calculateDistance();
        }
    } else {
        alert('Пожалуйста, выберите точки только в России или Казахстане.');
    }

    adjustVisibility();
});

function adjustVisibility() {
    const info = document.querySelector('.info');
    const result = document.querySelector('.result');

    const reverseRouteText = document.getElementById('reverse-route');

    if (pointA && pointB) {
        result.style.display = 'block';
        result.style.transition = 'margin-left 0.5s';
        result.style.marginLeft = '439.0px';
        info.style.marginLeft = '0';
        reverseRouteText.style.display = 'block';
    } else {
        result.style.transition = 'margin-left 0.5s';
        result.style.marginLeft = '-590px';
        reverseRouteText.style.display = 'none';
    }
}

document.getElementById('removeA').addEventListener('click', function () {
    pointA = null;
    if (markerA) {
        map.removeLayer(markerA);
        markerA = null;
    }
    document.getElementById('pointA-text').innerText = 'Откуда   (Поставьте точку A на карте)';
    this.style.display = 'none';
    resetDistanceAndTotal();
    adjustVisibility();
});

document.getElementById('removeB').addEventListener('click', function () {
    pointB = null;
    if (markerB) {
        map.removeLayer(markerB);
        markerB = null;
    }
    document.getElementById('pointB-text').innerText = 'Куда   (Поставьте точку B на карте)';
    this.style.display = 'none';
    resetDistanceAndTotal();
    adjustVisibility();
});



function resetDistanceAndTotal() {
    document.getElementById('distance').innerText = '0';
    document.getElementById('total').innerText = '0';
}

const currencyToggle = document.getElementById('currency-toggle');
const currencyList_ = document.getElementById('currency-list_');
const currencyOptions = document.querySelectorAll('.currency-option');

currencyToggle.addEventListener('click', () => {
    currencyToggle.classList.toggle('active');
    currencyList_.style.display = currencyToggle.classList.contains('active') ? 'block' : 'none';
});

document.addEventListener('click', function (event) {
    const isClickInside = currencyToggle.contains(event.target) || currencyList_.contains(event.target);
    if (!isClickInside) {
        currencyList_.style.display = 'none';
        currencyToggle.classList.remove('active');
    }
});

currencyOptions.forEach(option => {
    option.addEventListener('click', function () {
        const selectedCurrency = this.getAttribute('data-value');
        currencyToggle.innerText = this.innerText;

        if (selectedCurrency === 'rub') {
            currentPricePerKm = pricePerKmInTenge * 0.190;
            document.getElementById('currency-price').innerText = 'Рубля';
            document.getElementById('currency-total').innerText = 'Рубля';
            document.getElementById('clarification').style.display = 'block';
        } else {
            currentPricePerKm = pricePerKmInTenge;
            document.getElementById('currency-price').innerText = 'Тенге';
            document.getElementById('currency-total').innerText = 'Тенге';
            document.getElementById('clarification').style.display = 'none';
        }

        document.getElementById('price-per-km').innerText = currentPricePerKm.toFixed(0);
        calculateDistance();
        currencyList_.style.display = 'none';
        currencyToggle.classList.remove('active');
    });
});






const cities2 = [
    'Ничего (Пусто)',
    'Абай', 'Акколь', 'Аксай', 'Аксу', 'Актау', 'Актобе', 'Алатау', 'Алга', 'Алматы', 'Алтай', 'Арал', 'Аркалык', 'Арыс', 'Астана', 'Атбасар', 'Атырау', 'Аягоз', 'Байконыр', 'Балхаш', 'Булаево', 'Державинск', 'Ерейментау', 'Есик', 'Есиль', 'Жанаозен', 'Жанатас', 'Жаркент', 'Жезказган', 'Жем', 'Жетысай', 'Житикара', 'Зайсан',
    'Казалинск', 'Кандыагаш', 'Караганда', 'Каражал', 'Каратау', 'Каркаралинск', 'Каскелен', 'Кентау', 'Кокшетау', 'Конаев', 'Костанай', 'Косшы', 'Кульсары', 'Курчатов', 'Кызылорда', 'Ленгер', 'Лисаковск', 'Макинск', 'Мамлютка', 'Павлодар', 'Петропавловск', 'Приозёрск', 'Риддер', 'Рудный', 'Сарань', 'Сарканд', 'Сарыагаш', 'Сатпаев',
    'Семей', 'Сергеевка', 'Серебрянск', 'Степногорск', 'Степняк', 'Тайынша', 'Талгар', 'Талдыкорган', 'Тараз', 'Текели', 'Темир', 'Темиртау', 'Тобыл', 'Туркестан', 'Уральск', 'Усть-Каменогорск', 'Ушарал', 'Уштобе', 'Форт-Шевченко', 'Хромтау', 'Шалкар', 'Шар', 'Шардара', 'Шахтинск', 'Шемонаиха', 'Шу', 'Шымкент', 'Щучинск', 'Экибастуз', 'Эмба',
    'Абакан', 'Адлер', 'Анапа', 'Архангельск', 'Астрахань', 'Азов', 'Александров', 'Армавир', 'Биробиджан', 'Балашиха', 'Барнаул', 'Белгород', 'Белокуриха', 'Благовещенск', 'Брянск', 'Бузулук', 'Гатчина', 'Геленджик', 'Горно-Алтайск', 'Грозный', 'Голубицкая', 'Грязи', 'Домбай', 'Дзержинск', 'Дагомыс', 'Дубна', 'Екатеринбург', 'Елабуга', 'Ейск',
    'Евпатория', 'Животино', 'Железноводск', 'Златоуст', 'Зеленогорск', 'Зеленоградск', 'Знаменский', 'Кабардинка', 'Калуга', 'Калининград', 'Казань', 'Кемерово', 'Керчь', 'Киров', 'Кировск', 'Кирово-Чепецк', 'Коктебель', 'Коломна', 'Комсомольск-на-Амуре', 'Краснодар', 'Красноярск', 'Красная Поляна', 'Курган', 'Курск', 'Лазаревское', 'Листвянка',
    'Липецк', 'Ломоносов', 'Лысково', 'Магадан', 'Магнитогорск', 'Майкоп', 'Морское', 'Москва', 'Мурманск', 'Муром', 'Набережные Челны', 'Находка', 'Нальчик', 'Нижневартовск', 'Нижний Новгород', 'Нижнекамск', 'Новороссийск', 'Новосибирск', 'Новокузнецк', 'Новокуйбышевск', 'Обнинск', 'Одинцово', 'Омск', 'Оренбург', 'Пенза', 'Пермь', 'Петергоф',
    'Петрозаводск', 'Петропавловск-Камчатский', 'Псков', 'Приозерск', 'Репино', 'Ростов-на-Дону', 'Ростов Великий', 'Рыбинск', 'Рязань', 'Салехард', 'Самара', 'Саранск', 'Саратов', 'Саяногорск', 'Северобайкальск', 'Северодвинск', 'Сергиев Посад', 'Сизябск', 'Смоленск', 'Солнечное', 'Сорочинск', 'Ставрополь', 'Стерлитамак', 'Стрельна', 'Ступино',
    'Таганрог', 'Тамбов', 'Тверь', 'Тихвин', 'Тихорецк', 'Тольятти', 'Туапсе', 'Тургояк', 'Уфа', 'Углич', 'Улан-Удэ', 'Ульяновск', 'Хабаровск', 'Химки', 'Ханты-Мансийск', 'Хоста', 'Цивилизация', 'Чайковский', 'Чебоксары', 'Челябинск', 'Череповец', 'Черноморское, Крым', 'Черняховск', 'Шадринск', 'Шахты', 'Шлиссельбург', 'Шуя', 'Энгельс', 'Эсто-Садок',
    'Якутск', 'Янтарный', 'Ярославль', 'Выборг', 'Всеволожск', 'Великий Устюг', 'Великие Луки', 'Владикавказ', 'Владимир', 'Владивосток', 'Волгоград', 'Волгодонск', 'Волжский', 'Воркута', 'Голубицкая', 'Грязи', 'Грозный', 'Иноземцево', 'Кингисепп', 'Курово', 'Мышкин', 'Небуг', 'Никола', 'Нягань', 'Октябрьский', 'Партизанск', 'Петропавловськ-камчатский', 'Пушкин', 'Фрязино', 'Электросталь'
];

const fromInput = document.getElementById('fromInput');
const fromList = document.getElementById('fromList');
const toInput = document.getElementById('toInput');
const toList = document.getElementById('toList');
const calculateBtn = document.getElementById('calculateBtn');
const result2 = document.getElementById('result');
const fromInput2 = document.getElementById('fromInput2');
const fromList2 = document.getElementById('fromList2');
const toInput2 = document.getElementById('toInput2');
const toList2 = document.getElementById('toList2');
const fromInput3 = document.getElementById('fromInput3');
const fromList3 = document.getElementById('fromList3');
const toInput3 = document.getElementById('toInput3');
const toList3 = document.getElementById('toList3');

let selectedFromCity = '';
let selectedToCity = '';

window.onload = () => {
    resetInput(fromInput);
    resetInput(toInput);
    resetInput2(fromInput2);
    resetInput2(toInput2);
    resetInput3(fromInput3);
    resetInput3(toInput3);
    populateCityList();
};

function populateCityList() {
    const kazakhstanCities = getKazakhstanCities();
    const russiaCities = getRussiaCities();

    const cityOptions = `
        <strong style="display: block; margin-left: 15px; margin-top: 7px; margin-bottom: 10px; font-size: 20px;">Казахстан</strong>
        ${kazakhstanCities.map(city => `<div class="city-item">${city}</div>`).join('')}
        <strong style="display: block; margin-left: 15px; margin-top: 7px; margin-bottom: 10px; font-size: 20px;">Россия</strong>
        ${russiaCities.map(city => `<div class="city-item">${city}</div>`).join('')}
    `;

    fromList.innerHTML = cityOptions;
    toList.innerHTML = cityOptions;
    fromList2.innerHTML = cityOptions;
    toList2.innerHTML = cityOptions;
    fromList3.innerHTML = cityOptions;
    toList3.innerHTML = cityOptions;
}

function getKazakhstanCities() {
    return [
        'Ничего (Пусто)', 'Абай', 'Акколь', 'Аксай', 'Аксу', 'Актау', 'Актобе', 'Алатау',
        'Алга', 'Алматы', 'Алтай', 'Арал', 'Аркалык', 'Арыс', 'Астана',
        'Атбасар', 'Атырау', 'Аягоз', 'Байконыр', 'Балхаш', 'Булаево',
        'Державинск', 'Ерейментау', 'Есик', 'Есиль', 'Жанаозен', 'Жанатас',
        'Жаркент', 'Жезказган', 'Жем', 'Жетысай', 'Житикара', 'Зайсан',
        'Казалинск', 'Кандыагаш', 'Караганда', 'Каражал', 'Каратау',
        'Каркаралинск', 'Каскелен', 'Кентау', 'Кокшетау', 'Конаев',
        'Костанай', 'Косшы', 'Кульсары', 'Курчатов', 'Кызылорда', 'Ленгер',
        'Лисаковск', 'Макинск', 'Мамлютка', 'Павлодар', 'Петропавловск',
        'Приозёрск', 'Риддер', 'Рудный', 'Сарань', 'Сарканд', 'Сарыагаш',
        'Сатпаев', 'Семей', 'Сергеевка', 'Серебрянск', 'Степногорск',
        'Степняк', 'Тайынша', 'Талгар', 'Талдыкорган', 'Тараз', 'Текели',
        'Темир', 'Темиртау', 'Тобыл', 'Туркестан', 'Уральск',
        'Усть-Каменогорск', 'Ушарал', 'Уштобе', 'Форт-Шевченко', 'Хромтау',
        'Шалкар', 'Шар', 'Шардара', 'Шахтинск', 'Шемонаиха', 'Шу',
        'Шымкент', 'Щучинск', 'Экибастуз', 'Эмба'
    ];
}

function getRussiaCities() {
    return [
        'Ничего (Пусто)', 'Абакан', 'Адлер', 'Анапа', 'Архангельск', 'Астрахань', 'Азов', 'Александров', 'Армавир', 'Биробиджан', 'Балашиха', 'Барнаул', 'Белгород', 'Белокуриха', 'Благовещенск', 'Брянск', 'Бузулук', 'Гатчина', 'Геленджик', 'Горно-Алтайск', 'Грозный', 'Голубицкая', 'Грязи', 'Домбай', 'Дзержинск', 'Дагомыс', 'Дубна', 'Екатеринбург', 'Елабуга', 'Ейск',
        'Евпатория', 'Животино', 'Железноводск', 'Златоуст', 'Зеленогорск', 'Зеленоградск', 'Знаменский', 'Кабардинка', 'Калуга', 'Калининград', 'Казань', 'Кемерово', 'Керчь', 'Киров', 'Кировск', 'Кирово-Чепецк', 'Коктебель', 'Коломна', 'Комсомольск-на-Амуре', 'Краснодар', 'Красноярск', 'Красная Поляна', 'Курган', 'Курск', 'Лазаревское', 'Листвянка',
        'Липецк', 'Ломоносов', 'Лысково', 'Магадан', 'Магнитогорск', 'Майкоп', 'Морское', 'Москва', 'Мурманск', 'Муром', 'Набережные Челны', 'Находка', 'Нальчик', 'Нижневартовск', 'Нижний Новгород', 'Нижнекамск', 'Новороссийск', 'Новосибирск', 'Новокузнецк', 'Новокуйбышевск', 'Обнинск', 'Одинцово', 'Омск', 'Оренбург', 'Пенза', 'Пермь', 'Петергоф',
        'Петрозаводск', 'Петропавловск-Камчатский', 'Псков', 'Приозерск', 'Репино', 'Ростов-на-Дону', 'Ростов Великий', 'Рыбинск', 'Рязань', 'Салехард', 'Самара', 'Саранск', 'Саратов', 'Саяногорск', 'Северобайкальск', 'Северодвинск', 'Сергиев Посад', 'Сизябск', 'Смоленск', 'Солнечное', 'Сорочинск', 'Ставрополь', 'Стерлитамак', 'Стрельна', 'Ступино',
        'Таганрог', 'Тамбов', 'Тверь', 'Тихвин', 'Тихорецк', 'Тольятти', 'Туапсе', 'Тургояк', 'Уфа', 'Углич', 'Улан-Удэ', 'Ульяновск', 'Хабаровск', 'Химки', 'Ханты-Мансийск', 'Хоста', 'Цивилизация', 'Чайковский', 'Чебоксары', 'Челябинск', 'Череповец', 'Черноморское, Крым', 'Черняховск', 'Шадринск', 'Шахты', 'Шлиссельбург', 'Шуя', 'Энгельс', 'Эсто-Садок',
        'Якутск', 'Янтарный', 'Ярославль', 'Выборг', 'Всеволожск', 'Великий Устюг', 'Великие Луки', 'Владикавказ', 'Владимир', 'Владивосток', 'Волгоград', 'Волгодонск', 'Волжский', 'Воркута', 'Голубицкая', 'Грязи', 'Грозный', 'Иноземцево', 'Кингисепп', 'Курово', 'Мышкин', 'Небуг', 'Никола', 'Нягань', 'Октябрьский', 'Партизанск', 'Петропавловськ-камчатский', 'Пушкин', 'Фрязино', 'Электросталь'
    ];
}

function toggleDropdown(dropdownList, input, arrow) {
    const isVisible = dropdownList.style.display === 'block';
    dropdownList.style.display = isVisible ? 'none' : 'block';
    arrow.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
}

function setInputValue(input, value) {
    input.innerText = value;
}

function setInputValue2(input, value) {
    input.innerText = value;
}

function setInputValue3(input, value) {
    input.innerText = value;
}

function resetInput(input) {
    setInputValue(input, 'Выберите город');
    input.style.backgroundColor = 'transparent';
    input.style.borderColor = 'transparent';
    input.style.borderBottom = '2px solid orangered';
}

function resetInput2(input) {
    setInputValue2(input, 'Выберите город');
    input.style.backgroundColor = 'transparent';
    input.style.borderColor = 'transparent';
    input.style.borderBottom = '2px solid orangered';
}

function resetInput3(input) {
    setInputValue3(input, 'Выберите город');
    input.style.backgroundColor = 'transparent';
    input.style.borderColor = 'transparent';
    input.style.borderBottom = '2px solid orangered';
}

function handleSelection(input, city) {
    if (city === 'Ничего (Пусто)') {
        resetInput(input);
        input === fromInput ? selectedFromCity = 'Ничего (Пусто)' : selectedToCity = 'Ничего (Пусто)';
    } else {
        setInputValue(input, city);
        input === fromInput ? selectedFromCity = city : selectedToCity = city;
        updateInputStyles(input, city);
    }
}

function handleSelection2(input, city) {
    if (city === 'Ничего (Пусто)') {
        resetInput2(input);
        input === fromInput2 ? selectedFromCity = 'Ничего (Пусто)' : selectedToCity = 'Ничего (Пусто)';
    } else {
        setInputValue2(input, city);
        input === fromInput2 ? selectedFromCity = city : selectedToCity = city;
        updateInputStyles(input, city);
    }
}

function handleSelection3(input, city) {
    if (city === 'Ничего (Пусто)') {
        resetInput3(input);
        input === fromInput3 ? selectedFromCity = 'Ничего (Пусто)' : selectedToCity = 'Ничего (Пусто)';
    } else {
        setInputValue3(input, city);
        input === fromInput3 ? selectedFromCity = city : selectedToCity = city;
        updateInputStyles(input, city);
    }
}

fromInput.onclick = () => {
    toggleDropdown(fromList, fromInput, document.getElementById('fromArrow'));
};

toInput.onclick = () => {
    toggleDropdown(toList, toInput, document.getElementById('toArrow'));
};

fromInput2.onclick = () => {
    toggleDropdown(fromList2, fromInput2, document.getElementById('fromArrow2'));
};

toInput2.onclick = () => {
    toggleDropdown(toList2, toInput2, document.getElementById('toArrow2'));
};

fromInput3.onclick = () => {
    toggleDropdown(fromList3, fromInput3, document.getElementById('fromArrow3'));
};

toInput3.onclick = () => {
    toggleDropdown(toList3, toInput3, document.getElementById('toArrow3'));
};

fromList.onclick = (e) => {
    const cityItem = e.target.closest('.city-item');
    if (cityItem) {
        handleSelection(fromInput, cityItem.innerText);
        resetDistanceAndTotal();
        updateDistanceWhenCitiesSelected();
        fromList.style.display = 'none';
        toggleArrowToInitialState(document.getElementById('fromArrow'));
    }
};

toList.onclick = (e) => {
    const cityItem = e.target.closest('.city-item');
    if (cityItem) {
        handleSelection(toInput, cityItem.innerText);
        resetDistanceAndTotal();
        updateDistanceWhenCitiesSelected();
        toList.style.display = 'none';
        toggleArrowToInitialState(document.getElementById('toArrow'));
    }
};

fromList2.onclick = (e) => {
    const cityItem = e.target.closest('.city-item');
    if (cityItem) {
        handleSelection2(fromInput2, cityItem.innerText);
        fromList2.style.display = 'none';
        toggleArrowToInitialState(document.getElementById('fromArrow2'));
    }
};

toList2.onclick = (e) => {
    const cityItem = e.target.closest('.city-item');
    if (cityItem) {
        handleSelection2(toInput2, cityItem.innerText);
        toList2.style.display = 'none';
        toggleArrowToInitialState(document.getElementById('toArrow2'));
    }
};

fromList3.onclick = (e) => {
    const cityItem = e.target.closest('.city-item');
    if (cityItem) {
        handleSelection3(fromInput3, cityItem.innerText);
        fromList3.style.display = 'none';
        toggleArrowToInitialState(document.getElementById('fromArrow3'));
    }
};

toList3.onclick = (e) => {
    const cityItem = e.target.closest('.city-item');
    if (cityItem) {
        handleSelection3(toInput3, cityItem.innerText);
        toList3.style.display = 'none';
        toggleArrowToInitialState(document.getElementById('toArrow3'));
    }
};

function getCoordinates(city) {
    for (const country in cities) {
        if (cities[country][city]) {
            return cities[country][city];
        }
    }
    return null;
}

calculateBtn.addEventListener('click', function () {
    const fromCity = fromInput.innerText;
    const toCity = toInput.innerText;

    if (fromCity === 'Выберите город' || toCity === 'Выберите город') {
        alert('Пожалуйста, выберите оба города.');
        return;
    }

    const fromCoordinates = getCoordinates(fromCity);
    const toCoordinates = getCoordinates(toCity);

    if (fromCoordinates && toCoordinates) {
        const fromLatLng = L.latLng(fromCoordinates[0], fromCoordinates[1]);
        const toLatLng = L.latLng(toCoordinates[0], toCoordinates[1]);

        const distance = map.distance(fromLatLng, toLatLng) / 1000;

        document.getElementById('result').innerText = `${distance.toFixed(0)} км.`;
        document.getElementById('distance').innerText = '0';
    } else {
        alert('Ошибка при получении координат для одного из городов.');
    }
});

function resetDistanceAndTotal() {
    document.getElementById('distance').innerText = '0';
    document.getElementById('total').innerText = '0';
}

document.addEventListener('click', (e) => {
    if (!fromList.contains(e.target) && e.target !== fromInput) {
        fromList.style.display = 'none';
        toggleArrowToInitialState(document.getElementById('fromArrow'));
    }

    if (!toList.contains(e.target) && e.target !== toInput) {
        toList.style.display = 'none';
        toggleArrowToInitialState(document.getElementById('toArrow'));
    }
});

document.addEventListener('click', (e) => {
    if (!fromList2.contains(e.target) && e.target !== fromInput2) {
        fromList2.style.display = 'none';
        toggleArrowToInitialState(document.getElementById('fromArrow2'));
    }

    if (!toList2.contains(e.target) && e.target !== toInput2) {
        toList2.style.display = 'none';
        toggleArrowToInitialState(document.getElementById('toArrow2'));
    }
});

document.addEventListener('click', (e) => {
    if (!fromList3.contains(e.target) && e.target !== fromInput3) {
        fromList3.style.display = 'none';
        toggleArrowToInitialState(document.getElementById('fromArrow3'));
    }

    if (!toList3.contains(e.target) && e.target !== toInput3) {
        toList3.style.display = 'none';
        toggleArrowToInitialState(document.getElementById('toArrow3'));
    }
});

function updateInputStyles(input, city) {
    if (!city || city === 'Ничего (Пусто)') {
        resetInput(input);
    } else {
        input.style.borderColor = 'darkblue';
        input.style.borderBottom = '2px solid darkblue';
        input.style.backgroundColor = 'gray';
        input.style.animation = 'borderAnimation 1s infinite alternate';
    }
}

function updateInputStyles(input, city) {
    if (!city || city === 'Ничего (Пусто)') {
        resetInput2(input);
    } else {
        input.style.borderColor = 'darkblue';
        input.style.borderBottom = '2px solid darkblue';
        input.style.backgroundColor = 'gray';
        input.style.animation = 'borderAnimation 1s infinite alternate';
    }
}

function updateInputStyles(input, city) {
    if (!city || city === 'Ничего (Пусто)') {
        resetInput3(input);
    } else {
        input.style.borderColor = 'darkblue';
        input.style.borderBottom = '2px solid darkblue';
        input.style.backgroundColor = 'gray';
        input.style.animation = 'borderAnimation 1s infinite alternate';
    }
}

function toggleArrowToInitialState(arrow) {
    arrow.style.transform = 'rotate(0deg)';
}

function shortenCityName(city) {
    return city.length > 10 ? city.slice(0, 10) + '...' : city;
}






const calculateBtnPrice = document.getElementById('calculateBtn-price');
const resultPrice = document.getElementById('result-price');
let priceBase = 120;
let totalPrice = 0;


calculateBtnPrice.onclick = () => {
    const fromCity = fromInput2.innerText;
    const toCity = toInput2.innerText;

    if (fromCity === 'Выберите город' && toCity === 'Выберите город') {
        const isDistanceCitiesSelected = (fromInput.innerText !== 'Выберите город') && (toInput.innerText !== 'Выберите город');

        if (!isDistanceCitiesSelected) {
            resultPrice.innerText = '';
            alert('Пожалуйста, выберите города в разделе расчета цены.');
        }

        return;
    }

    const fromCoordinates = getCoordinates(fromCity);
    const toCoordinates = getCoordinates(toCity);

    if (fromCoordinates && toCoordinates) {
        const fromLatLng = L.latLng(fromCoordinates[0], fromCoordinates[1]);
        const toLatLng = L.latLng(toCoordinates[0], toCoordinates[1]);
        const distance = map.distance(fromLatLng, toLatLng) / 1000;
        totalPrice = distance * priceBase;
        resultPrice.innerText = `${totalPrice.toFixed(0)} Тг.`;
    } else {
        resultPrice.innerText = '';
    }
};

function calculateDistanceOnClick(selectedCityFrom, selectedCityTo) {
    const fromCoordinates = getCoordinates(selectedCityFrom);
    const toCoordinates = getCoordinates(selectedCityTo);

    if (fromCoordinates && toCoordinates) {
        const fromLatLng = L.latLng(fromCoordinates[0], fromCoordinates[1]);
        const toLatLng = L.latLng(toCoordinates[0], toCoordinates[1]);
        const distance = map.distance(fromLatLng, toLatLng) / 1000;

        document.getElementById('distance').innerText = `${distance.toFixed(2)} км.`;
    }
}

function updateDistanceWhenCitiesSelected() {
    if (selectedFromCity && selectedToCity) {
        calculateDistanceOnClick(selectedFromCity, selectedToCity);
    }
}

fromInput.onclick = () => {
    toggleDropdown(fromList, fromInput, document.getElementById('fromArrow'));
};

fromList.onclick = (e) => {
    const cityItem = e.target.closest('.city-item');
    if (cityItem) {
        handleSelection(fromInput, cityItem.innerText);
        updateDistanceWhenCitiesSelected();
        fromList.style.display = 'none';
        toggleArrowToInitialState(document.getElementById('fromArrow'));
    }
};


const averageSpeed = 60;

function calculateTravelTime(distance) {
    return distance / averageSpeed;
}

document.getElementById('timesBtn').addEventListener('click', function () {
    const fromCity3 = fromInput3.innerText;
    const toCity3 = toInput3.innerText;

    if (fromCity3 === 'Выберите город' || toCity3 === 'Выберите город') {
        alert('Пожалуйста, выберите оба города.');
        return;
    }

    const fromCoordinates3 = getCoordinates(fromCity3);
    const toCoordinates3 = getCoordinates(toCity3);

    if (fromCoordinates3 && toCoordinates3) {
        const fromLatLng3 = L.latLng(fromCoordinates3[0], fromCoordinates3[1]);
        const toLatLng3 = L.latLng(toCoordinates3[0], toCoordinates3[1]);

        const distance3 = map.distance(fromLatLng3, toLatLng3) / 1000;
        const travelTime = calculateTravelTime(distance3);

        document.getElementById('time-result').innerText = travelTime.toFixed(0);
    } else {
        alert('Ошибка при получении координат для одного из городов.');
    }
});






















document.addEventListener('DOMContentLoaded', function () {
    const footer = document.getElementById('footer');
    const contactEmail = document.querySelector('.email');
    const copyMessage = document.querySelector('.copy-message');

    const phoneNumber = document.querySelector('.phone');
    phoneNumber.addEventListener('click', function () {
        const phone = phoneNumber.getAttribute('data-phone');
        navigator.clipboard.writeText(phone).then(() => {
            copyMessage.style.display = 'block';
            setTimeout(() => {
                copyMessage.style.display = 'none';
            }, 2000);
        });
    });

    const whatsappNumber = document.querySelector('.whatsapp');
    whatsappNumber.addEventListener('click', function () {
        const whatsapp = whatsappNumber.getAttribute('data-whatsapp');
        window.open(`https://wa.me/${whatsapp}`, '_blank');
    });

    contactEmail.addEventListener('click', function () {
        const email = contactEmail.getAttribute('data-email');
        window.location.href = `mailto:${email}`;
    });
});








document.getElementById('contactButton').addEventListener('click', function () {
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






const helpButton = document.getElementById('helpButton');
const helpPopup = document.getElementById('helpPopup');
const closePopup = document.getElementById('closePopup');

const icon = document.createElement('i');
icon.className = 'bx bx-help-circle icon';
helpButton.appendChild(icon);

helpButton.addEventListener('click', function () {
    helpPopup.style.display = helpPopup.style.display === "none" ? "block" : "none";
    icon.className = helpPopup.style.display === "block" ? 'bx bx-x-circle icon' : 'bx bx-help-circle icon';
});

closePopup.addEventListener('click', function () {
    helpPopup.style.display = "none";
    icon.className = 'bx bx-help-circle icon';
});

document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowLeft':
            map.panBy([-100, 0]);
            break;
        case 'ArrowRight':
            map.panBy([100, 0]);
            break;
        case 'ArrowUp':
            map.panBy([0, -100]);
            break;
        case 'ArrowDown':
            map.panBy([0, 100]);
            break;
        case '=':
        case '+':
            map.zoomIn();
            break;
        case '-':
            map.zoomOut();
            break;
    }
});

document.addEventListener('click', function (event) {
    if (!helpButton.contains(event.target) && !helpPopup.contains(event.target)) {
        helpPopup.style.display = "none";
        icon.className = 'bx bx-help-circle icon';
    }
});











let lastScrollTop = 0;
const navbar = document.querySelector('header');

function isMobile() {
    return window.innerWidth <= 768;
}

window.addEventListener('scroll', function () {
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
        mainStylesheet.href = 'Mobile-css/mobile-Route.css';
    } else {
        mainStylesheet.href = 'CSS/Route.css';
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