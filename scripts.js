// ==========================================================================
// Nav: scroll shadow + mobile toggle
// ==========================================================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 12);
}, { passive: true });

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ==========================================================================
// Scroll reveal animations
// ==========================================================================
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('in-view'), i % 6 * 60);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
} else {
    revealEls.forEach(el => el.classList.add('in-view'));
}

// ==========================================================================
// Project modals
// ==========================================================================
function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (!popup) return;
    popup.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closePopup(popup) {
    if (!popup) return;
    popup.classList.remove('open');
    document.body.style.overflow = '';
}

document.querySelectorAll('[data-popup]').forEach(card => {
    card.addEventListener('click', () => openPopup(card.getAttribute('data-popup')));
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openPopup(card.getAttribute('data-popup'));
        }
    });
});

document.querySelectorAll('.popup [data-close]').forEach(btn => {
    btn.addEventListener('click', () => closePopup(btn.closest('.popup')));
});

document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', (e) => {
        if (e.target === popup) closePopup(popup);
    });
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.popup.open').forEach(closePopup);
    }
});
