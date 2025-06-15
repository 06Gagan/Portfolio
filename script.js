document.addEventListener('DOMContentLoaded', function() {
    // I need to handle the mobile menu toggling.
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        // I should also toggle the icon between bars and an X.
        const icon = menuButton.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // I want the mobile menu to close when I click a link.
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            // I need to reset the icon back to bars.
            const icon = menuButton.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // I need to set up smooth scrolling for all my navigation links.
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
    
    // I should check if IntersectionObserver is supported before using it.
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.1 
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // I'll unobserve after the first time to save resources.
                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    } else {
        // If the browser doesn't support it, I'll just show all the sections.
        sections.forEach(section => {
            section.classList.add('is-visible');
        });
    }

    // This part highlights the active navigation link based on the current scroll position.
    const allNavLinks = document.querySelectorAll('nav .hidden a.nav-link'); // Targeting only desktop links for this
    const pageSections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        pageSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // I've adjusted the trigger point to be about 1/3 down the section.
            if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
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

    // This automatically sets the current year in the footer.
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // I need to check the initial link on page load to set the active state.
    setTimeout(() => {
        const initialHash = window.location.hash;
        if (initialHash) {
            document.querySelector(`nav a[href="${initialHash}"]`)?.classList.add('nav-link-active');
        } else {
             document.querySelector('nav a[href="#home"]')?.classList.add('nav-link-active');
        }
    }, 100);
});