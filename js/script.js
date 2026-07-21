// --- Navigasi Aktif dengan Garis Mengikuti ---

const navIndicator = document.querySelector('.nav-indicator');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Fungsi untuk menggerakkan garis indikator
function moveIndicator(element) {
    // Jangan lakukan apa-apa jika di menu hp (indicator disembunyikan di CSS)
    if (window.innerWidth <= 768) return; 

    const { offsetWidth: width, offsetLeft: left } = element;
    navIndicator.style.width = `${width}px`;
    navIndicator.style.left = `${left}px`;
    navIndicator.style.opacity = '1';
}

// Inisialisasi posisi indikator pada link aktif saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
        moveIndicator(activeLink);
    } else {
        navIndicator.style.width = '0';
        navIndicator.style.opacity = '0';
    }
});

// Tambahkan event listener klik pada setiap link navigasi
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Hapus kelas aktif dari semua link
        navLinks.forEach(l => l.classList.remove('active'));
        // Tambahkan kelas aktif ke link yang diklik
        link.classList.add('active');
        // Pindahkan indikator
        moveIndicator(link);
    });
});

// --- Animasi Saat Gulir (Populer) ---

// Intersection Observer untuk animasi muncul saat gulir
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Hanya animasikan sekali
        }
    });
}, { threshold: 0.1 }); // 10% elemen harus terlihat

// Daftar kelas elemen yang akan dianimasikan
const animatableElements = document.querySelectorAll('.fade-in-up, .hero-content');
animatableElements.forEach((el) => observer.observe(el));

// Tambahkan kelas 'fade-in-on-scroll' ke elemen yang Anda ingin muncul
// Pastikan untuk mendefinisikan .fade-in-on-scroll { opacity: 0; transform: translateY(30px); transition: var(--transition-slow); } di CSS
// dan .fade-in-on-scroll.show { opacity: 1; transform: translateY(0); } di JS

// --- Menu Hamburger Responsif ---

const mobileMenu = document.querySelector('#mobile-menu');
const nav = document.querySelector('nav');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('is-active');
    nav.classList.toggle('active');
});

// Tutup menu saat link diklik (opsional, untuk UX yang lebih baik)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            mobileMenu.classList.remove('is-active');
            nav.classList.remove('active');
        }
    });
});

// --- Deteksi Scroll untuk Nav Menu Aktif Otomatis ---
// (Mengaktifkan kelas .active saat pengguna menggulir ke bagian tersebut)

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) { // Offset agar aktif sedikit sebelum tiba
            current = section.getAttribute('id');
        }
    });

    if (current) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                // Pindahkan indikator jika tidak di hp
                if (window.innerWidth > 768) {
                    moveIndicator(link);
                }
            }
        });
    } else {
        // Jika di bagian atas (Home), pastikan home aktif
         const homeLink = document.querySelector('a[href="#home"]');
         if (window.innerHeight > window.pageYOffset && homeLink) {
             navLinks.forEach(l => l.classList.remove('active'));
             homeLink.classList.add('active');
             if (window.innerWidth > 768) { moveIndicator(homeLink); }
         }
    }
});

// --- Menangani Resizing Layar untuk Indikator ---
window.addEventListener('resize', () => {
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
        moveIndicator(activeLink);
    }
});