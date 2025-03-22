document.addEventListener('DOMContentLoaded', () => {
    // Add page loading animation
    const createLoader = () => {
        const loader = document.createElement('div');
        loader.classList.add('page-loader');
        
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-logo">A<span>.</span></div>
                <div class="loader-spinner">
                    <div class="spinner-element"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(loader);
        
        // Add loader styles
        const loaderStyle = document.createElement('style');
        loaderStyle.textContent = `
            .page-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: var(--bg-dark);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                transition: opacity 0.6s ease, visibility 0.6s ease;
            }
            
            .loader-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1.5rem;
            }
            
            .loader-logo {
                font-size: 4rem;
                font-weight: 700;
                color: var(--primary-color);
                animation: pulse 1.5s infinite alternate;
                position: relative;
            }
            
            .loader-logo span {
                color: var(--accent-color);
                position: relative;
                top: -5px;
            }
            
            .loader-spinner {
                position: relative;
                width: 60px;
                height: 60px;
            }
            
            .spinner-element {
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 3px solid transparent;
                border-top-color: var(--primary-color);
                animation: spin 1.2s linear infinite;
            }
            
            .spinner-element:before, .spinner-element:after {
                content: '';
                position: absolute;
                border-radius: 50%;
                border: 3px solid transparent;
            }
            
            .spinner-element:before {
                top: 5px;
                right: 5px;
                bottom: 5px;
                left: 5px;
                border-top-color: var(--accent-color);
                animation: spin 1.8s linear infinite reverse;
            }
            
            .spinner-element:after {
                top: 15px;
                right: 15px;
                bottom: 15px;
                left: 15px;
                border-top-color: var(--success-color);
                animation: spin 1.5s linear infinite;
            }
            
            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
            
            @keyframes pulse {
                0% {
                    opacity: 0.6;
                    transform: scale(0.98);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            .page-loader.loaded {
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
            }
        `;
        document.head.appendChild(loaderStyle);
        
        // Remove loader after content loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('loaded');
                
                // Enable scrolling after loader disappears
                document.body.style.overflow = 'auto';
                
                // Trigger entrance animations for hero section
                const hero = document.querySelector('.hero-content');
                if (hero) {
                    hero.style.opacity = '0';
                    hero.style.transform = 'translateY(30px)';
                    hero.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    
                    setTimeout(() => {
                        hero.style.opacity = '1';
                        hero.style.transform = 'translateY(0)';
                    }, 200);
                }
            }, 1500);
        });
        
        // Disable scrolling while loader is active
        document.body.style.overflow = 'hidden';
    };
    
    createLoader();
    
    // Navigation menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Toggle the icon between bars and X
        const icon = menuToggle.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.menu-toggle') && !e.target.closest('.nav-links') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Update active link on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (current && item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Add scroll animation with refined timing
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s cubic-bezier(0.215, 0.61, 0.355, 1), transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1)';
        section.style.transitionDelay = `${0.2 * index}s`;
        observer.observe(section);
    });
    
    // Add visible class to trigger animations
    document.body.addEventListener('load', () => {
        document.querySelectorAll('.visible').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    });
    
    // Add 3D tilt effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width - 0.5;
            const yPercent = y / rect.height - 0.5;
            
            const rotateX = yPercent * 10;
            const rotateY = xPercent * -10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            
            // Add subtle glow effect based on mouse position
            const cardContent = card.querySelector('.project-card-content');
            if (cardContent) {
                const gradientStrength = 0.15;
                cardContent.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, ${gradientStrength}), var(--code-bg) 50%)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            const cardContent = card.querySelector('.project-card-content');
            if (cardContent) {
                cardContent.style.background = '';
            }
            
            // Smooth transition back to normal state
            card.style.transition = 'transform 0.5s ease, background 0.5s ease';
            setTimeout(() => {
                card.style.transition = '';
            }, 500);
        });
    });
    
    // Add typing effect for mobile (since SVG typing might not work well)
    if (window.innerWidth < 768) {
        const typingTexts = [
            'Full Stack Developer',
            'Blockchain Enthusiast',
            'AI & ML Explorer',
            'Open Source Contributor'
        ];
        
        const typingContainer = document.querySelector('.typing-container');
        const typingElement = document.createElement('div');
        typingElement.classList.add('mobile-typing');
        typingContainer.appendChild(typingElement);
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 80;
        
        function typeText() {
            const currentText = typingTexts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 80;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % typingTexts.length;
                typingSpeed = 500; // Pause before typing next
            }
            
            setTimeout(typeText, typingSpeed);
        }
        
        // Add styles for mobile typing
        const style = document.createElement('style');
        style.textContent = `
            .mobile-typing {
                font-family: 'Fira Code', monospace;
                font-size: 1.5rem;
                color: var(--primary-color);
                font-weight: 500;
                min-height: 2.5rem;
                position: relative;
                display: inline-block;
            }
            
            .mobile-typing::after {
                content: '|';
                position: absolute;
                right: -8px;
                animation: blink 0.7s infinite;
            }
            
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
            
            @media (max-width: 768px) {
                .typing-container img {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Check if we're on mobile and start typing
        if (window.innerWidth < 768) {
            typeText();
        }
    }
    
    // Add theme toggle functionality with enhanced animation
    const createThemeToggle = () => {
        const footer = document.querySelector('footer');
        
        const themeToggle = document.createElement('div');
        themeToggle.classList.add('theme-toggle');
        themeToggle.innerHTML = `
            <button id="theme-toggle-btn">
                <i class="fas fa-moon"></i>
                <span>Toggle Theme</span>
            </button>
        `;
        
        footer.insertBefore(themeToggle, footer.firstChild);
        
        // Add enhanced styles
        const style = document.createElement('style');
        style.textContent = `
            .theme-toggle {
                margin-bottom: 1.5rem;
            }
            
            #theme-toggle-btn {
                background-color: var(--card-bg);
                color: var(--text-light);
                border: none;
                padding: 0.6rem 1.2rem;
                border-radius: 0.5rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin: 0 auto;
                transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                position: relative;
                overflow: hidden;
                z-index: 1;
            }
            
            #theme-toggle-btn::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
                transform: translateX(-100%);
            }
            
            #theme-toggle-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 7px 14px rgba(0, 0, 0, 0.3);
            }
            
            #theme-toggle-btn:hover::before {
                animation: shimmer 1.5s infinite;
            }
            
            @keyframes shimmer {
                100% {
                    transform: translateX(100%);
                }
            }
            
            body.light-theme {
                --bg-dark: #f8fafc;
                --text-light: #334155;
                --card-bg: #ffffff;
                --code-bg: #f1f5f9;
            }
            
            body.light-theme .code-block pre {
                color: #166534;
            }
            
            body.light-theme #theme-toggle-btn {
                background-color: #e2e8f0;
            }
            
            body.light-theme #theme-toggle-btn:hover {
                background-color: var(--primary-color);
                color: white;
            }
            
            /* Transition effect for theme switch */
            body {
                transition: background-color 0.5s ease, color 0.5s ease;
            }
            
            section, .badge, .social-button, .project-card, .code-block {
                transition: background-color 0.5s ease, box-shadow 0.5s ease, transform 0.5s ease;
            }
        `;
        document.head.appendChild(style);
        
        // Toggle theme with enhanced animation
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        themeToggleBtn.addEventListener('click', () => {
            // Add a flash effect when toggling
            const flash = document.createElement('div');
            flash.style.position = 'fixed';
            flash.style.top = '0';
            flash.style.left = '0';
            flash.style.width = '100%';
            flash.style.height = '100%';
            flash.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            flash.style.zIndex = '9999';
            flash.style.pointerEvents = 'none';
            flash.style.opacity = '0';
            document.body.appendChild(flash);
            
            // Animate the flash
            flash.animate(
                [
                    { opacity: 0 },
                    { opacity: 0.5 },
                    { opacity: 0 }
                ],
                {
                    duration: 500,
                    easing: 'ease-out'
                }
            );
            
            setTimeout(() => {
                document.body.removeChild(flash);
            }, 500);
            
            // Toggle theme class
            document.body.classList.toggle('light-theme');
            
            // Update icon with animation
            const icon = themeToggleBtn.querySelector('i');
            icon.style.transform = 'rotate(360deg)';
            icon.style.transition = 'transform 0.5s ease';
            
            setTimeout(() => {
                if (document.body.classList.contains('light-theme')) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
                icon.style.transform = '';
            }, 250);
        });
    };
    
    createThemeToggle();
    
    // Add dynamic background particle effect
    const createParticles = () => {
        const particleContainer = document.createElement('div');
        particleContainer.classList.add('particles');
        document.body.prepend(particleContainer);
        
        const style = document.createElement('style');
        style.textContent = `
            .particles {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -2;
                overflow: hidden;
                pointer-events: none;
            }
            
            .particle {
                position: absolute;
                border-radius: 50%;
                background: var(--primary-color);
                opacity: 0.3;
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
        
        // Create particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
            const size = Math.random() * 10 + 3;
            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight;
            const opacity = Math.random() * 0.3 + 0.1;
            const color = i % 3 === 0 ? 'var(--primary-color)' : 
                          i % 3 === 1 ? 'var(--accent-color)' : 
                          'var(--success-color)';
            
            // Set styles
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.opacity = opacity;
            particle.style.background = color;
            
            // Add animation
            const duration = Math.random() * 60 + 30;
            const delay = Math.random() * 5;
            particle.style.animation = `floatParticle ${duration}s ${delay}s infinite ease-in-out`;
            
            // Append
            particleContainer.appendChild(particle);
        }
        
        // Add animation keyframes
        const keyframes = document.createElement('style');
        keyframes.textContent = `
            @keyframes floatParticle {
                0%, 100% {
                    transform: translate(0, 0) rotate(0deg);
                }
                25% {
                    transform: translate(50px, 50px) rotate(90deg);
                }
                50% {
                    transform: translate(0, 100px) rotate(180deg);
                }
                75% {
                    transform: translate(-50px, 50px) rotate(270deg);
                }
            }
        `;
        document.head.appendChild(keyframes);
    };
    
    createParticles();
    
    // Handle contact button click
    const contactBtn = document.querySelector('.contact-btn');
    contactBtn.addEventListener('click', () => {
        // Create a modal for contact
        const modal = document.createElement('div');
        modal.classList.add('contact-modal');
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Connect With Me</h3>
                    <button class="close-modal"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="contact-links">
                        <a href="https://linkedin.com/in/notakshay" target="_blank" class="contact-link linkedin">
                            <i class="fab fa-linkedin"></i>
                            <div class="contact-link-content">
                                <h4>LinkedIn</h4>
                                <p>Connect professionally</p>
                            </div>
                            <i class="fas fa-external-link-alt link-icon"></i>
                        </a>
                        <a href="https://github.com/notcaliper" target="_blank" class="contact-link github">
                            <i class="fab fa-github"></i>
                            <div class="contact-link-content">
                                <h4>GitHub</h4>
                                <p>Check out my code</p>
                            </div>
                            <i class="fas fa-external-link-alt link-icon"></i>
                        </a>
                        <a href="https://notcaliper.me" target="_blank" class="contact-link portfolio">
                            <i class="fas fa-globe"></i>
                            <div class="contact-link-content">
                                <h4>Portfolio</h4>
                                <p>Visit my full portfolio</p>
                            </div>
                            <i class="fas fa-external-link-alt link-icon"></i>
                        </a>
                        <a href="#" class="contact-link snapchat">
                            <i class="fab fa-snapchat-ghost"></i>
                            <div class="contact-link-content">
                                <h4>Snapchat</h4>
                                <p>akshay9.99</p>
                            </div>
                        </a>
                        <a href="https://instagram.com/akshay.9.9.9" target="_blank" class="contact-link instagram">
                            <i class="fab fa-instagram"></i>
                            <div class="contact-link-content">
                                <h4>Instagram</h4>
                                <p>akshay.9.9.9</p>
                            </div>
                            <i class="fas fa-external-link-alt link-icon"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add modal styles
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .contact-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .modal-content {
                background-color: var(--card-bg);
                border-radius: 0.75rem;
                width: 90%;
                max-width: 500px;
                box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
                overflow: hidden;
                transform: translateY(20px);
                transition: transform 0.3s ease;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid var(--glass-border);
            }
            
            .modal-header h3 {
                margin: 0;
                color: var(--primary-color);
            }
            
            .close-modal {
                background: none;
                border: none;
                color: var(--text-light);
                font-size: 1.2rem;
                cursor: pointer;
                transition: color 0.3s ease;
            }
            
            .close-modal:hover {
                color: var(--primary-color);
            }
            
            .modal-body {
                padding: 1.5rem;
            }
            
            .contact-links {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .contact-link {
                display: flex;
                align-items: center;
                padding: 1.2rem;
                border-radius: 0.75rem;
                text-decoration: none;
                color: white;
                position: relative;
                overflow: hidden;
                transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            }
            
            .contact-link::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
                transform: translateX(-100%);
                transition: transform 0.6s ease;
            }
            
            .contact-link:hover {
                transform: translateY(-3px);
                box-shadow: 0 7px 14px rgba(0, 0, 0, 0.3);
            }
            
            .contact-link:hover::before {
                transform: translateX(100%);
            }
            
            .contact-link i:first-child {
                font-size: 2rem;
                margin-right: 1rem;
            }
            
            .contact-link-content {
                flex: 1;
            }
            
            .contact-link-content h4 {
                margin: 0 0 0.3rem 0;
                font-size: 1.1rem;
            }
            
            .contact-link-content p {
                margin: 0;
                opacity: 0.9;
                font-size: 0.9rem;
            }
            
            .link-icon {
                opacity: 0;
                transform: translateX(-10px);
                transition: all 0.3s ease;
            }
            
            .contact-link:hover .link-icon {
                opacity: 1;
                transform: translateX(0);
            }
            
            .linkedin {
                background-color: #0077B5;
            }
            
            .github {
                background-color: #333;
            }
            
            .portfolio {
                background-color: #FF5722;
            }
            
            /* Animation */
            .contact-modal.active {
                opacity: 1;
            }
            
            .contact-modal.active .modal-content {
                transform: translateY(0);
            }
        `;
        document.head.appendChild(modalStyle);
        
        // Animate modal in
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Close modal on outside click or close button
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.closest('.close-modal')) {
                modal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
        });
    });
    
    // Add smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle connect button click 
    const connectBtn = document.querySelector('.connect-btn');
    if (connectBtn) {
        connectBtn.addEventListener('click', (e) => {
            e.preventDefault();
            contactBtn.click(); // Trigger the contact modal by simulating a click on the contact button
        });
    }
}); 