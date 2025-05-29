document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
    });

    const createLoader = () => {
        const loader = document.createElement('div');
        loader.classList.add('page-loader');
        
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-logo">
                    <svg viewBox="0 0 100 100" class="logo-svg">
                        <circle cx="50" cy="50" r="45" class="logo-circle" />
                        <text x="50" y="65" class="logo-text">A</text>
                    </svg>
                </div>
                <div class="loader-progress">
                    <div class="progress-bar"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(loader);
        
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
                transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.6s;
            }
            
            .loader-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 2rem;
            }
            
            .logo-svg {
                width: 80px;
                height: 80px;
                animation: rotate 2s linear infinite;
            }
            
            .logo-circle {
                fill: none;
                stroke: var(--primary-color);
                stroke-width: 2;
                stroke-dasharray: 283;
                stroke-dashoffset: 283;
                animation: drawCircle 2s ease-in-out infinite;
            }
            
            .logo-text {
                font-size: 40px;
                fill: var(--primary-color);
                text-anchor: middle;
                font-family: 'Space Grotesk', sans-serif;
                font-weight: bold;
            }
            
            .loader-progress {
                width: 200px;
                height: 4px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 2px;
                overflow: hidden;
            }
            
            .progress-bar {
                width: 0%;
                height: 100%;
                background: var(--gradient-primary);
                transition: width 0.3s ease;
            }
            
            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            @keyframes drawCircle {
                0% { stroke-dashoffset: 283; }
                50% { stroke-dashoffset: 0; }
                100% { stroke-dashoffset: -283; }
            }
        `;
        document.head.appendChild(loaderStyle);
        
        let progress = 0;
        const progressBar = loader.querySelector('.progress-bar');
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('loaded');
                document.body.style.overflow = 'auto';
                    initializeAnimations();
                }, 500);
            }
            progressBar.style.width = `${progress}%`;
                    }, 200);
        
        document.body.style.overflow = 'hidden';
    };
    
    const initializeAnimations = () => {
        gsap.from('.hero-greeting', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });

        gsap.from('.hero-title .title-line', {
            duration: 1,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 0.3
        });

        gsap.from('.hero-description', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.6
        });

        gsap.from('.hero-cta', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.9
        });

        gsap.to('.float-item', {
            y: 'random(-20, 20)',
            x: 'random(-20, 20)',
            rotation: 'random(-10, 10)',
            duration: 'random(2, 4)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: {
                amount: 2,
                from: 'random'
            }
        });

        gsap.utils.toArray('.skill-level').forEach(level => {
            const value = level.getAttribute('data-level');
            gsap.to(level, {
                width: `${value}%`,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: level,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse'
            }
        });
    });
    
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            gsap.from(card, {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse'
                },
                delay: i * 0.2
            });
        });

        gsap.utils.toArray('.stat-number').forEach(stat => {
            const value = parseInt(stat.textContent);
            gsap.to(stat, {
                duration: 2,
                snap: { textContent: 1 },
                textContent: value,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: stat,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    };

    const initNavigation = () => {
        const nav = document.querySelector('.navbar');
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelectorAll('.nav-link');
        let lastScroll = 0;
        
        menuToggle.addEventListener('mousemove', (e) => {
            const rect = menuToggle.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(menuToggle, {
                duration: 0.3,
                x: x * 0.3,
                y: y * 0.3,
                ease: 'power2.out'
            });
        });

        menuToggle.addEventListener('mouseleave', () => {
            gsap.to(menuToggle, {
                duration: 0.3,
                x: 0,
                y: 0,
                ease: 'power2.out'
            });
        });

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                smoother.scrollTo(target, true, 'center center');
        });
    });
    
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                nav.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
                nav.classList.remove('scroll-up');
                nav.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
                nav.classList.remove('scroll-down');
                nav.classList.add('scroll-up');
            }
            lastScroll = currentScroll;
        });
    };

    const initProjectCards = () => {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                gsap.to(card, {
                    duration: 0.5,
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transformPerspective: 1000,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.5,
                    rotateX: 0,
                    rotateY: 0,
                    ease: 'power2.out'
                });
            });
        });
    };

    const initCustomCursor = () => {
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        const links = document.querySelectorAll('a, button, .project-card, .skill-item');
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let followerX = 0;
        let followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        gsap.ticker.add(() => {
            cursorX = gsap.utils.interpolate(cursorX, mouseX, 0.5);
            cursorY = gsap.utils.interpolate(cursorY, mouseY, 0.5);
            followerX = gsap.utils.interpolate(followerX, mouseX, 0.2);
            followerY = gsap.utils.interpolate(followerY, mouseY, 0.2);
            
            gsap.set(cursor, { x: cursorX, y: cursorY });
            gsap.set(cursorFollower, { x: followerX, y: followerY });
        });
        
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                cursorFollower.classList.add('active');
                gsap.to(cursorFollower, {
                    scale: 2,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            link.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                cursorFollower.classList.remove('active');
                gsap.to(cursorFollower, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    };
    
    createLoader();
    initNavigation();
    initProjectCards();
    initCustomCursor();

    const createScrollProgress = () => {
        const progress = document.createElement('div');
        progress.classList.add('scroll-progress');
        document.body.appendChild(progress);
        
        const style = document.createElement('style');
        style.textContent = `
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: var(--gradient-primary);
                transform-origin: 0 50%;
                transform: scaleX(0);
                z-index: 1001;
            }
        `;
        document.head.appendChild(style);
        
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            
            gsap.to(progress, {
                scaleX: scrolled / 100,
                duration: 0.1,
                ease: 'none'
            });
        });
    };

    createScrollProgress();

    window.addEventListener('beforeunload', () => {
        document.body.classList.add('page-transition');
    });

    function initButtonEffects() {
        const buttons = document.querySelectorAll('.cta-button');
        
        buttons.forEach(button => {
            const particles = button.querySelectorAll('.btn-particles span');
            
            particles.forEach((particle, index) => {
                particle.style.setProperty('--i', index);
                particle.style.setProperty('--x', Math.random() * 100 + '%');
                particle.style.setProperty('--y', Math.random() * 100 + '%');
            });
            
            button.addEventListener('mouseenter', () => {
                particles.forEach(particle => {
                    gsap.to(particle, {
                        duration: 0.6,
                        x: 'random(-100, 100)',
                        y: 'random(-100, 100)',
                        scale: 'random(0.5, 1.5)',
                        opacity: 0,
                        ease: 'power2.out',
                        stagger: {
                            amount: 0.2,
                            from: 'random'
                        }
                    });
                });
            });
            
            button.addEventListener('mouseleave', () => {
                particles.forEach(particle => {
                    gsap.set(particle, {
                        x: 0,
                        y: 0,
                        scale: 1,
                        opacity: 1
                    });
                });
            });
            
            button.addEventListener('click', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.className = 'btn-ripple';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                button.appendChild(ripple);
                
                gsap.to(ripple, {
                    scale: 4,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    onComplete: () => ripple.remove()
                });
                
                particles.forEach(particle => {
                    gsap.to(particle, {
                        duration: 0.8,
                        x: 'random(-200, 200)',
                        y: 'random(-200, 200)',
                        scale: 'random(1, 2)',
                        opacity: 0,
                        ease: 'power2.out',
                        stagger: {
                            amount: 0.3,
                            from: 'random'
                        }
                    });
                });
            });
        });
    }

    initButtonEffects();
});