let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let touchStartY = 0;
let touchEndY = 0;

function handleScroll(event) {
    event.preventDefault();  // Verhindert das Standard-Scrollen der Seite

    if (event.deltaY > 0) {
        // Scroll nach unten
        currentSlide = (currentSlide + 1) % totalSlides;
    } else {
        // Scroll nach oben
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    }

    updateSlidePosition();
}

// Touch-Event für mobile Geräte
function handleTouchStart(event) {
    touchStartY = event.touches[0].clientY;
}

function handleTouchEnd(event) {
    touchEndY = event.changedTouches[0].clientY;

    if (touchStartY - touchEndY > 50) {
        // Wischen nach oben (nächste Slide)
        currentSlide = (currentSlide + 1) % totalSlides;
    } else if (touchEndY - touchStartY > 50) {
        // Wischen nach unten (vorherige Slide)
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    }

    updateSlidePosition();
}

// Verhindert das Scrollen auf mobilen Geräten
function handleTouchMove(event) {
    event.preventDefault();  // Verhindert das Standard-Scrollen der Seite beim Wischen
}

function updateSlidePosition() {
    const slideHeight = slides[0].offsetHeight;
    const offset = -currentSlide * slideHeight;
    document.querySelector('.slideshow-container').style.transform = `translateY(${offset}px)`;
}

// Fügt den Event Listener für das Scrollen hinzu (Desktop)
window.addEventListener('wheel', handleScroll, { passive: false });

// Fügt Event Listener für Touch-Events hinzu (Mobile)
window.addEventListener('touchstart', handleTouchStart, { passive: true });
window.addEventListener('touchend', handleTouchEnd, { passive: true });
window.addEventListener('touchmove', handleTouchMove, { passive: false });

function toggleMenu() {
    const menu = document.getElementById('menu');
    const overlay = document.getElementById('overlay');
    const elements = document.querySelectorAll('.blur-target');

    menu.classList.toggle('hidden');
    overlay.classList.toggle('hidden');  // Overlay anzeigen/verbergen

    elements.forEach(element => {
        // Toggle die Unschärfe-Klasse auf allen Elements (section und div)
        element.classList.toggle('filter');
        element.classList.toggle('blur-2xl');
    });
}

function toggleDarkMode() {
    if (document.body.classList.contains('bg-white')) {
        // Wechsel auf den dunklen Modus
        document.body.classList.remove('bg-white', 'text-black', 'dark');
        document.body.classList.add('bg-[#181818]', 'text-white');
        document.getElementById('menu-button').style.fill = "white";
        document.getElementById('theme-button').style.fill = "white";
        document.getElementById('close-button').style.fill = "white";

        const lightSVG = `
                <svg id="theme-button" xmlns="http://www.w3.org/2000/svg" class="md:w-12 w-8 md:h-12 h-8" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z" /></svg>
            `;

        // Ersetze das bestehende SVG mit dem neuen SVG
        document.getElementById('theme-button').outerHTML = lightSVG;

    } else {
        // Wechsel auf den hellen Modus
        document.body.classList.remove('bg-[#181818]', 'text-white');
        document.body.classList.add('bg-white', 'text-black', 'dark');
        document.getElementById('menu-button').style.fill = "black";
        document.getElementById('theme-button').style.fill = "black";
        document.getElementById('close-button').style.fill = "black";

        const darkSVG = `
        <svg id="theme-button" xmlns="http://www.w3.org/2000/svg" class="md:w-12 w-8 md:h-12 h-8" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>
    `;

        // Ersetze das bestehende SVG mit dem neuen SVG
        document.getElementById('theme-button').outerHTML = darkSVG;

    }
}

var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};