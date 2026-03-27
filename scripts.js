// ── Cookie Consent Banner ──
document.addEventListener('DOMContentLoaded', function() {
    var banners = document.querySelectorAll('#cookieConsentBanner');
    var acceptBtns = document.querySelectorAll('#acceptCookiesBtn');
    var rejectBtns = document.querySelectorAll('#rejectCookiesBtn');
    if (!banners.length || !acceptBtns.length) return;

    function injectAnalytics() {
        if (window.masarakAnalyticsLoaded) return;
        window.masarakAnalyticsLoaded = true;
        var gtagScript = document.createElement('script');
        gtagScript.async = true;
        gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-08VHZPSCXW';
        document.head.appendChild(gtagScript);
        var inlineScript = document.createElement('script');
        inlineScript.innerHTML = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-08VHZPSCXW');`;
        document.head.appendChild(inlineScript);
    }

    if (localStorage.getItem('masarakCookieConsent') === 'accepted') {
        injectAnalytics();
    } else if (localStorage.getItem('masarakCookieConsent') === 'rejected') {
        banners.forEach(function(banner) { banner.style.display = 'none'; });
    } else {
        banners.forEach(function(banner) { banner.style.display = 'flex'; });
        acceptBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                localStorage.setItem('masarakCookieConsent', 'accepted');
                banners.forEach(function(banner) { banner.style.display = 'none'; });
                injectAnalytics();
            });
        });
        rejectBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                localStorage.setItem('masarakCookieConsent', 'rejected');
                banners.forEach(function(banner) { banner.style.display = 'none'; });
            });
        });
    }
});
/* ==========================================
   Masarak Education — Shared Scripts
   ==========================================
   Include this file on every page (before </body>):
   <script src="scripts.js"></script>
   ========================================== */

// ── Navbar scroll effect + floating button ──
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    const floatBtn = document.querySelector('.whatsapp-float');

    if (window.scrollY > 60) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Show floating button after hero (if hero exists), hide near footer
    if (floatBtn) {
        const hero = document.getElementById('home');
        const footer = document.querySelector('.footer');
        let showFloat = false;

        if (hero) {
            const heroBottom = hero.offsetTop + hero.offsetHeight;
            showFloat = window.scrollY > heroBottom - 100;
        } else {
            showFloat = window.scrollY > 300;
        }

        // Hide when footer is in view
        if (footer) {
            const footerTop = footer.getBoundingClientRect().top;
            if (footerTop <= window.innerHeight) {
                showFloat = false;
            }
        }

        if (showFloat) {
            floatBtn.classList.add('visible');
        } else {
            floatBtn.classList.remove('visible');
        }
    }
});

// ── Mobile nav toggle ──
function toggleNav() {
    if (window.innerWidth <= 768) {
        document.getElementById('navLinks').classList.toggle('active');
    }
}

// ── Hero video play ──
function playHeroVideo() {
    const thumbnail = document.getElementById('videoThumbnail');
    const video = document.getElementById('heroVideo');
    if (thumbnail && video) {
        thumbnail.style.display = 'none';
        video.style.display = 'block';
        video.play();
    }
}

// ── FAQ toggle ──
function toggleFaq(el) {
    const item = el.parentElement;
    const allItems = document.querySelectorAll('.faq-item');
    allItems.forEach(i => {
        if (i !== item) i.classList.remove('active');
    });
    item.classList.toggle('active');
}

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ── Active nav link on scroll ──
(function () {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var id = entry.target.getAttribute('id');
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-20% 0px -60% 0px' });

    sections.forEach(function (section) { observer.observe(section); });
})();

// ── Why-Masarak card image carousel ──
(function () {
    document.querySelectorAll('[data-carousel]').forEach(function (wrapper) {
        var imgs = wrapper.querySelectorAll('img');
        var labels = wrapper.querySelectorAll('.img-label');
        if (imgs.length < 2) return;
        var idx = 0;
        setInterval(function () {
            imgs[idx].classList.remove('active');
            if (labels[idx]) labels[idx].classList.remove('active');
            idx = (idx + 1) % imgs.length;
            imgs[idx].classList.add('active');
            if (labels[idx]) labels[idx].classList.add('active');
        }, 3000);
    });
})();
