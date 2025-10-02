const newsSlides = [
  {
    image: 'assets/images/NovynaN1.png',
    title: 'Нікополь і Марганець отримали звання Міст-Героїв – Зеленський',
    url: 'https://www.president.gov.ua/news/nikopol-i-marganec-otrimali-zvannya-mist-geroyiv-zelenskij-85789',
    date: '1 жовтня, 2025 р.'
  },
  {
    image: 'assets/images/NovynaN2.png',
    title: 'Дитяча лікарня Нікополя отримала гуманітарний вантаж від благодійник...',
    url: 'https://nikopol.city/articles/271490/dityacha-likarnya-nikopolya-otrimala-gumanitarnij-vantazh',
    date: '29 вересня, 2025 р.'
  },
  {
    image: 'assets/images/NovynaN3.png',
    title: 'Футболісти з Нікополя завдали розгромної поразки супернику у ...',
    url: 'https://sport.nikopolcity.net/news/football/nikopol-vs-rival-2025',
    date: '29 вересня, 2025 р.'
  }
];

const slider = document.getElementById('news-slider');
let currentIndex = 0;

function isMobile() {
  return window.innerWidth <= 700;
}

function renderSlides() {
  slider.innerHTML = '';
  // Мобильная версия — только один активный слайд
  if (isMobile()) {
    const slide = newsSlides[currentIndex];
    const slideDiv = document.createElement('div');
    slideDiv.className = 'news-slide';
    // Картинка
    const img = document.createElement('img');
    img.className = 'slide-image';
    img.src = slide.image;
    img.alt = slide.title;
    // Контент
    const content = document.createElement('div');
    content.className = 'slide-content';
    const titleRow = document.createElement('div');
    titleRow.className = 'slide-title-row';
    const titleLink = document.createElement('a');
    titleLink.className = 'slide-title';
    titleLink.href = slide.url;
    titleLink.textContent = slide.title;
    titleLink.target = '_blank';
    titleLink.rel = 'noopener noreferrer';
    // Иконка-ссылка
    const linkIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    linkIcon.setAttribute('class', 'slide-link-icon');
    linkIcon.setAttribute('viewBox', '0 0 24 24');
    linkIcon.innerHTML = `<path d="M15 3h6v6m-1.5-4.5L10 14m-7 7h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" stroke="#222" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    linkIcon.addEventListener('click', (e) => {
      window.open(slide.url, '_blank');
      e.stopPropagation();
    });
    titleRow.appendChild(titleLink);
    titleRow.appendChild(linkIcon);

    // Дата
    const date = document.createElement('div');
    date.className = 'slide-date';
    date.textContent = slide.date;

    content.appendChild(titleRow);
    content.appendChild(date);

    // Точки внутри карточки
    const dots = document.createElement('div');
    dots.className = 'slider-pagination';
    newsSlides.forEach((_, dotIdx) => {
      const dot = document.createElement('span');
      dot.className = 'slider-dot' + (dotIdx === currentIndex ? ' active' : '');
      dot.onclick = () => {
        currentIndex = dotIdx;
        renderSlides();
      };
      dots.appendChild(dot);
    });
    content.appendChild(dots);

    slideDiv.appendChild(img);
    slideDiv.appendChild(content);
    slider.appendChild(slideDiv);
  } else {
    // Десктопная версия — все карточки сразу, без точек
    newsSlides.forEach((slide) => {
      const slideDiv = document.createElement('div');
      slideDiv.className = 'news-slide';
      const img = document.createElement('img');
      img.className = 'slide-image';
      img.src = slide.image;
      img.alt = slide.title;
      const content = document.createElement('div');
      content.className = 'slide-content';
      const titleRow = document.createElement('div');
      titleRow.className = 'slide-title-row';
      const titleLink = document.createElement('a');
      titleLink.className = 'slide-title';
      titleLink.href = slide.url;
      titleLink.textContent = slide.title;
      titleLink.target = '_blank';
      titleLink.rel = 'noopener noreferrer';
      const linkIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      linkIcon.setAttribute('class', 'slide-link-icon');
      linkIcon.setAttribute('viewBox', '0 0 24 24');
      linkIcon.innerHTML = `<path d="M15 3h6v6m-1.5-4.5L10 14m-7 7h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" stroke="#222" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
      linkIcon.addEventListener('click', (e) => {
        window.open(slide.url, '_blank');
        e.stopPropagation();
      });
      titleRow.appendChild(titleLink);
      titleRow.appendChild(linkIcon);

      const date = document.createElement('div');
      date.className = 'slide-date';
      date.textContent = slide.date;

      content.appendChild(titleRow);
      content.appendChild(date);

      slideDiv.appendChild(img);
      slideDiv.appendChild(content);
      slider.appendChild(slideDiv);
    });
  }
}

// Свайп для мобильных
let startX = null;
let isSwiping = false;

slider.addEventListener('touchstart', (e) => {
  if (!isMobile()) return;
  if (e.touches.length === 1) {
    startX = e.touches[0].clientX;
    isSwiping = true;
  }
});
slider.addEventListener('touchend', (e) => {
  if (!isMobile()) return;
  if (!isSwiping) return;
  const endX = e.changedTouches[0].clientX;
  const dx = endX - startX;
  if (Math.abs(dx) > 40) {
    if (dx < 0 && currentIndex < newsSlides.length - 1) {
      currentIndex++;
      renderSlides();
    } else if (dx > 0 && currentIndex > 0) {
      currentIndex--;
      renderSlides();
    }
  }
  isSwiping = false;
  startX = null;
});

// Перерисовка при изменении размера окна
window.addEventListener('resize', () => {
  // На мобилке индекс не должен выходить за пределы
  if (isMobile() && currentIndex >= newsSlides.length) currentIndex = 0;
  renderSlides();
});

// Старт
renderSlides();
