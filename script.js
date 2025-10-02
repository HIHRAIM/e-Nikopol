// Данные для новостей
const newsSlides = [
  {
    image: 'assets/images/news1.jpg',
    title: 'Нікополь і Марганець отримали звання Міст-Героїв – Зеленський',
    url: 'https://www.president.gov.ua/news/nikopol-i-marganec-otrimali-zvannya-mist-geroyiv-zelenskij-85789',
    date: '1 жовтня, 2025 р.'
  },
  {
    image: 'assets/images/news2.jpg',
    title: 'Дитяча лікарня Нікополя отримала гуманітарний вантаж від благодійник...',
    url: 'https://nikopol.city/articles/271490/dityacha-likarnya-nikopolya-otrimala-gumanitarnij-vantazh',
    date: '29 вересня, 2025 р.'
  },
  {
    image: 'assets/images/news3.jpg',
    title: 'Футболісти з Нікополя завдали розгромної поразки супернику у ...',
    url: 'https://sport.nikopolcity.net/news/football/nikopol-vs-rival-2025',
    date: '29 вересня, 2025 р.'
  }
];

const slider = document.getElementById('news-slider');
let currentIndex = 0;

// Функция генерации слайдов
function renderSlides() {
  slider.innerHTML = '';
  newsSlides.forEach((slide, idx) => {
    const slideDiv = document.createElement('div');
    slideDiv.className = 'news-slide';
    slideDiv.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Картинка
    const img = document.createElement('img');
    img.className = 'slide-image';
    img.src = slide.image;
    img.alt = slide.title;

    // Контент
    const content = document.createElement('div');
    content.className = 'slide-content';

    const titleLink = document.createElement('a');
    titleLink.className = 'slide-title';
    titleLink.href = slide.url;
    titleLink.textContent = slide.title;
    titleLink.target = '_blank';
    titleLink.rel = 'noopener noreferrer';

    const date = document.createElement('div');
    date.className = 'slide-date';
    date.textContent = slide.date;

    content.appendChild(titleLink);
    content.appendChild(date);

    slideDiv.appendChild(img);
    slideDiv.appendChild(content);

    slider.appendChild(slideDiv);
  });
}

// Смена слайда
function showSlide(idx) {
  if (idx < 0) idx = 0;
  if (idx >= newsSlides.length) idx = newsSlides.length - 1;
  currentIndex = idx;
  renderSlides();
}

// Кнопки
document.getElementById('slider-prev').onclick = () => showSlide(currentIndex - 1);
document.getElementById('slider-next').onclick = () => showSlide(currentIndex + 1);

// Начальный рендер
renderSlides();