// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
    const navList = document.querySelector('#navbar');
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');

    // Loop through each section to create navigation items
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const navItem = document.createElement('li'); 
        const navLink = document.createElement('a'); 
        navLink.textContent = section.getAttribute('data-nav'); 
        navLink.href = `#${section.id}`;
        navItem.appendChild(navLink);
        navList.appendChild(navItem); 
    }

    // Function to check and toggle the 'active' class on sections based on scroll position
    const ActiveState = function () {
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const rect = section.getBoundingClientRect(); // Get the bounding rectangle of the section
            const isActive = rect.top >= 0 && rect.top < window.innerHeight / 2; // Check if section is in viewport
            section.classList.toggle('active', isActive);
            if (isActive) {
                const navLinks = document.querySelectorAll('nav ul li a'); 
                navLinks.forEach(link => link.classList.remove('active')); 
                navLinks[i].classList.add('active');
            }
        }
    };

    document.addEventListener('scroll', ActiveState);

    // Listen for click events on navigation links
    navList.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default link behavior
        const link = event.target.closest('a'); // Find the closest anchor element clicked
        if (link) {
            const targetSection = document.querySelector(link.getAttribute('href')); // Get the target section based on href
            if (targetSection) {
                const offset = header.offsetHeight; // Get the height of the header
                const targetPosition = targetSection.offsetTop - offset; // Calculate scroll position to target section
                window.scrollTo({ top: targetPosition, behavior: 'smooth' }); // Scroll to the target section smoothly
            }
        }
    });

    // Create a 'top' button and append it to the body
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scrollTopBtn';
    scrollToTopBtn.textContent = 'Top';
    scrollToTopBtn.style.display = 'none'; 
    document.body.appendChild(scrollToTopBtn);

    // Listen for click events on 'top' button and scroll to top smoothly
    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Listen for scroll events to toggle display of 'top' button
    window.addEventListener('scroll', function () {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollToTopBtn.style.display = 'block'; // Show button when scrolled past 100px
        } else {
            scrollToTopBtn.style.display = 'none'; 
        }
    });

    // Initial call to make sections active on page load
    ActiveState();
});
