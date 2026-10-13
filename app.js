// ==========================================================================
// Ziad Taha Portfolio — Interactive UI/UX Scripts & Motion
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Cursor Spotlight Glow
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow) {
        window.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }

    // 2. Animated Role Scramble / Typing Text
    const roles = [
        "Angular Enterprise Specialist",
        "Full-Stack System Architect",
        "High-Conversion UI/UX Engineer",
        "TypeScript & RxJS Expert"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedRoleEl = document.getElementById('typedRole');

    function typeEffect() {
        if (!typedRoleEl) return;
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typedRoleEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedRoleEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentRole.length) {
            speed = 2000; // Pause at end of text
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 400;
        }

        setTimeout(typeEffect, speed);
    }
    typeEffect();

    // 3. Counter Animation on Scroll
    const counters = document.querySelectorAll('.counter');
    let counted = false;

    function runCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 1500;
            const step = Math.ceil(target / (duration / 30));
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = current;
                }
            }, 30);
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                runCounters();
                counted = true;
            }
        });
    }, { threshold: 0.5 });

    const metricsStrip = document.querySelector('.metrics-strip');
    if (metricsStrip) observer.observe(metricsStrip);

    // 4. Project Filtering
    const filterPills = document.querySelectorAll('.filter-pill');
    const projectCards = document.querySelectorAll('.project-showcase-card');

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const filterValue = pill.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category') || '';
                if (filterValue === 'all' || category.includes(filterValue)) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 5. Mobile Navigation
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

    // 6. Active Nav Link Scrollspy
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(sec => {
            const sectionHeight = sec.offsetHeight;
            const sectionTop = sec.offsetTop - 120;
            const sectionId = sec.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
});

// Copy Email Utility
function copyEmail() {
    const email = document.getElementById('emailVal').textContent;
    navigator.clipboard.writeText(email).then(() => {
        alert('📋 Copied email to clipboard: ' + email);
    }).catch(() => {
        prompt('Copy email:', email);
    });
}

// Contact Form Submission Handler
function handleFormSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const feedback = document.getElementById('formFeedback');
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending Message...</span>';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
        btn.style.background = '#10b981';
        feedback.style.color = '#10b981';
        feedback.textContent = '🎉 Thank you! Your message has been sent. Ziad will reply shortly.';
        document.getElementById('contactForm').reset();

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Send Message Directly</span>';
            btn.style.background = '';
            btn.disabled = false;
        }, 4000);
    }, 1000);
}