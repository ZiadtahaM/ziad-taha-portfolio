// ==========================================================================
// Ziad Taha Portfolio. Production Systems & Client Interface Scripts
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Project Category Filtering
    const filterPills = document.querySelectorAll('.filter-pill');
    const projectCards = document.querySelectorAll('.project-dossier-card, .project-showcase-card');

    if (filterPills.length > 0) {
        filterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                filterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');

                const filterValue = pill.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category') || '';
                    if (filterValue === 'all' || category.includes(filterValue)) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 2. Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-open');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('mobile-open');
            });
        });
    }

    // 3. Active Nav Link Scrollspy
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(sec => {
            const sectionHeight = sec.offsetHeight;
            const sectionTop = sec.offsetTop - 140;
            const sectionId = sec.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }, { passive: true });
});

// Bilingual Case Study Tab Switcher
function switchTab(btn, lang) {
    const card = btn.closest('.project-dossier-card, .project-showcase-card');
    if (!card) return;
    card.querySelectorAll('.cs-tab-btn').forEach(b => b.classList.remove('active'));
    card.querySelectorAll('.cs-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const targetContent = card.querySelector('.cs-content.' + lang);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}

// Copy Email Utility
function copyEmail() {
    const emailEl = document.getElementById('emailVal');
    const email = emailEl ? emailEl.textContent.trim() : 'ziad.taha3456@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        const feedback = document.getElementById('copyFeedback');
        if (feedback) {
            feedback.textContent = 'Copied to clipboard';
            setTimeout(() => { feedback.textContent = ''; }, 3000);
        } else {
            alert('Copied email to clipboard: ' + email);
        }
    }).catch(() => {
        prompt('Copy email:', email);
    });
}

// Contact Form Submission Handler
function handleFormSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const feedback = document.getElementById('formFeedback');
    
    if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending Message...</span>';
        btn.disabled = true;
    }

    setTimeout(() => {
        if (btn) {
            btn.innerHTML = '<i class="fas fa-check"></i> <span>Message Dispatched</span>';
            btn.style.background = '#2563EB';
        }
        if (feedback) {
            feedback.style.color = '#10B981';
            feedback.textContent = 'Message received. Ziad will follow up via email or WhatsApp.';
        }
        const form = document.getElementById('contactForm');
        if (form) form.reset();

        setTimeout(() => {
            if (btn) {
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Send Message Directly</span>';
                btn.style.background = '';
                btn.disabled = false;
            }
        }, 4000);
    }, 800);
}