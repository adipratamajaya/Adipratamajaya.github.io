// ==========================================================================
// KODE JAVASCRIPT: Navigasi Aktif dengan Garis Mengikuti
// ==========================================================================
const navIndicator = document.querySelector('.nav-indicator');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function moveIndicator(element) {
    if (window.innerWidth <= 768) return; 
    const { offsetWidth: width, offsetLeft: left } = element;
    navIndicator.style.width = `${width}px`;
    navIndicator.style.left = `${left}px`;
    navIndicator.style.opacity = '1';
}

document.addEventListener('DOMContentLoaded', () => {
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) moveIndicator(activeLink);
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        moveIndicator(link);
    });
});

// ==========================================================================
// KODE JAVASCRIPT: Slider Foto Otomatis Halaman About
// ==========================================================================
const slides = document.querySelectorAll('.about-slider .slide');
const dots = document.querySelectorAll('.slider-dots .dot');
let currentSlide = 0;
const slideInterval = 4000; // Mengubah foto setiap 4 detik

function nextSlide() {
    // Hilangkan kelas aktif dari slide dan dot saat ini
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Pindah ke indeks selanjutnya
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Tambahkan kelas aktif pada slide dan dot baru
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Jalankan fungsi auto slide dengan interval waktu tetap
setInterval(nextSlide, slideInterval);

// ==========================================================================
// KODE JAVASCRIPT: Animasi Efek Muncul Saat Scroll Halaman
// ==========================================================================
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const itemsToAnimate = document.querySelectorAll('.fade-in-up');
itemsToAnimate.forEach((item) => scrollObserver.observe(item));

// ==========================================================================
// KODE JAVASCRIPT: Menu Hamburger Responsif untuk Layar HP
// ==========================================================================
const mobileMenu = document.querySelector('#mobile-menu');
const navMenu = document.querySelector('nav');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('is-active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            mobileMenu.classList.remove('is-active');
            navMenu.classList.remove('active');
        }
    });
});

// ==========================================================================
// KODE JAVASCRIPT: Deteksi Gulir Halaman untuk Indikator Menu Otomatis
// ==========================================================================
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 180)) {
            current = section.getAttribute('id');
        }
    });

    if (current) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                if (window.innerWidth > 768) moveIndicator(link);
            }
        });
    }
});

window.addEventListener('resize', () => {
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) moveIndicator(activeLink);
});

// ==========================================================================
// KODE JAVASCRIPT: Logika Interaktif Fitur Pop-up (Modal)
// ==========================================================================

const customModal = document.getElementById('customModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalActionBtn = document.getElementById('modalActionBtn');

// MENCARI SEMUA TOMBOL "Learn More" / "Watch Videos" / "View Live Demo"
const projectLinks = document.querySelectorAll('.view-project-link');

function openModal() {
    customModal.classList.add('open');
    document.body.style.overflow = 'hidden'; 
}

function closeModal() {
    customModal.classList.remove('open');
    document.body.style.overflow = 'auto'; 
}

// MENGHUBUNGKAN SETIAP TOMBOL PROJECT DENGAN POP-UP
projectLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Mencegah halaman scroll ke atas tiba-tiba
        openModal();
    });
});

closeModalBtn.addEventListener('click', closeModal);
modalActionBtn.addEventListener('click', closeModal);

customModal.addEventListener('click', (event) => {
    if (event.target === customModal) {
        closeModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && customModal.classList.contains('open')) {
        closeModal();
    }
});