// ==========================================================================
// Ziad Taha — Portfolio Interactivity
// Clean, lightweight JavaScript without external dependencies
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Project Category Filtering
    const filterButtons = document.querySelectorAll('.filter-button');
    const caseCards = document.querySelectorAll('.case-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                caseCards.forEach(card => {
                    const category = card.getAttribute('data-category') || '';
                    if (filter === 'all' || category.includes(filter)) {
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

        document.querySelectorAll('.nav-item').forEach(link => {
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
            const sectionTop = sec.offsetTop - 100;
            const sectionId = sec.getAttribute('id');
            const navLink = document.querySelector(`.nav-item[href*="${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-item').forEach(l => l.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }, { passive: true });
});

// Bilingual Case Study Language Switcher
function switchLang(btn, lang) {
    const card = btn.closest('.case-card');
    if (!card) return;
    card.querySelectorAll('.lang-toggle-btn').forEach(b => b.classList.remove('active'));
    card.querySelectorAll('.story-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const target = card.querySelector('.story-content.' + lang);
    if (target) {
        target.classList.add('active');
    }
}

// Copy Email Utility
function copyEmail() {
    const emailEl = document.getElementById('emailVal');
    const email = emailEl ? emailEl.textContent.trim() : 'ziad.taha3456@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        const feedback = document.getElementById('copyFeedback');
        if (feedback) {
            feedback.textContent = 'Copied to clipboard: ' + email;
            setTimeout(() => { feedback.textContent = ''; }, 3000);
        }
    }).catch(() => {
        prompt('Copy email:', email);
    });
}

// Contact Form Handler
function handleFormSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const feedback = document.getElementById('formFeedback');
    
    if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        btn.disabled = true;
    }

    setTimeout(() => {
        if (btn) {
            btn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent</span>';
            btn.style.background = '#10B981';
            btn.style.borderColor = '#10B981';
            btn.style.color = '#ffffff';
        }
        if (feedback) {
            feedback.style.color = '#10B981';
            feedback.textContent = 'Message received. Ziad will follow up via WhatsApp or email.';
        }
        const form = document.getElementById('contactForm');
        if (form) form.reset();

        setTimeout(() => {
            if (btn) {
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Send Direct Message</span>';
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.color = '';
                btn.disabled = false;
            }
        }, 4000);
    }, 500);
}