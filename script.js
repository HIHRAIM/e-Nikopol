const newsSlides = [
  {
    image: 'assets/images/NovynaN1.png',
    title: 'Нікополь і Марганець отримали звання Міст-Героїв – Зеленський',
    url: 'https://nikopol.nikopolnews.net/rajon/nikopol-i-marhanets-otrymaly-zvannia-misto-heroj-zelenskyj',
    date: '1 жовтня, 2025 р.'
  },
  {
    image: 'assets/images/NovynaN2.png',
    title: 'Дитяча лікарня Нікополя отримала гуманітарний вантаж від благодійників з Закарпаття',
    url: 'https://nikopol.nikopolnews.net/nikopol/mariana-dyt-likarn-nikopol-zakapat',
    date: '29 вересня, 2025 р.'
  },
  {
    image: 'assets/images/NovynaN3.png',
    title: '5:0! Юні футболісти з Нікополя завдали розгромної поразки супернику у Дніпрі',
    url: 'https://nikopol.nikopolnews.net/nikopol/5-0-iuni-futbolisty-z-nikopolia',
    date: '29 вересня, 2025 р.'
  }
];

const slider = document.getElementById('news-slider');
let currentIndex = 0;
let isTransitioning = false;

function isMobile() {
  return window.innerWidth <= 700;
}

function renderSlides() {
  slider.innerHTML = '';
  if (isMobile()) {
    newsSlides.forEach((slide, idx) => {
      const slideDiv = document.createElement('div');
      slideDiv.className = 'news-slide';
      slideDiv.style.transform = `translateX(${(idx - currentIndex) * 100}%)`;
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

      if (idx === currentIndex) {
        const dots = document.createElement('div');
        dots.className = 'slider-pagination';
        newsSlides.forEach((_, dotIdx) => {
          const dot = document.createElement('span');
          dot.className = 'slider-dot' + (dotIdx === currentIndex ? ' active' : '');
          dot.onclick = () => {
            if (dotIdx !== currentIndex) {
              slideTo(dotIdx);
            }
          };
          dots.appendChild(dot);
        });
        content.appendChild(dots);
      }

      slideDiv.appendChild(img);
      slideDiv.appendChild(content);
      slider.appendChild(slideDiv);
    });
  } else {
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

function slideTo(idx) {
  if (isTransitioning || idx < 0 || idx >= newsSlides.length || idx === currentIndex) return;
  isTransitioning = true;
  currentIndex = idx;
  renderSlides();
  setTimeout(() => {
    isTransitioning = false;
  }, 450);
}

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
      slideTo(currentIndex + 1);
    } else if (dx > 0 && currentIndex > 0) {
      slideTo(currentIndex - 1);
    }
  }
  isSwiping = false;
  startX = null;
});

window.addEventListener('resize', () => {
  if (isMobile() && currentIndex >= newsSlides.length) currentIndex = 0;
  renderSlides();
});

const body = document.body;
const btnSun = document.getElementById('theme-sun');
const btnMoon = document.getElementById('theme-moon');
const indicator = document.querySelector('.theme-indicator');

btnSun.addEventListener('click', () => {
  if (!body.classList.contains('theme-light')) {
    body.classList.remove('theme-dark');
    body.classList.add('theme-light');
    btnSun.classList.add('active');
    btnMoon.classList.remove('active');
    indicator.style.left = '3px';
  }
});
btnMoon.addEventListener('click', () => {
  if (!body.classList.contains('theme-dark')) {
    body.classList.remove('theme-light');
    body.classList.add('theme-dark');
    btnMoon.classList.add('active');
    btnSun.classList.remove('active');
    indicator.style.left = '35px';
  }
});

window.addEventListener('DOMContentLoaded', () => {
  indicator.style.left = body.classList.contains('theme-dark') ? '35px' : '3px';
  renderSlides();
});
