// My portfolio's main script file for interactions.

document.addEventListener('DOMContentLoaded', function() {
    // Setting up smooth scrolling for all navigation links that point to an ID.
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Using Intersection Observer to fade sections in as I scroll to them.
    const sections = document.querySelectorAll('.fade-in-section');
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // I can unobserve after the first time to save resources.
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Highlighting the active navigation link based on the current scroll position.
    const allNavLinks = document.querySelectorAll('nav a.nav-link');
    const pageSections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        pageSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjusting the trigger point to be about 1/3 down the section.
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            link.classList.remove('nav-link-active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('nav-link-active');
            }
        });
    });

    // Automatically setting the current year in the footer.
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Checking the initial link on page load to set the active state.
    setTimeout(() => {
        const initialHash = window.location.hash;
        if (initialHash) {
            document.querySelector(`nav a[href="${initialHash}"]`)?.classList.add('nav-link-active');
        } else {
             document.querySelector('nav a[href="#home"]')?.classList.add('nav-link-active');
        }
    }, 100);
});