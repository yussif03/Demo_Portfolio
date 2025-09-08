// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Load data from info.json
    loadPortfolioData();

    // Add smooth scrolling for buttons
    setupButtonHandlers();

    // Add scroll animations
    addScrollAnimations();
    
    // Add interactive effects
    addInteractiveEffects();
    
    // Initialize navigation
    initializeNavigation();
});

// Load portfolio data from info.json
async function loadPortfolioData() {
    try {
        const response = await fetch('info.json');
        const data = await response.json();
        
        // Update hero section
        updateHeroSection(data);
        
        // Update skills section
        updateSkillsSection(data.skills);
        
        // Update expertise sections
        updateExpertiseSections(data.sections);
        
        // Update navigation name
        updateNavigationName(data.name);
        
        // Update page title
        document.title = `${data.name} - ${data.title}`;
        
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        // Fallback to default content if JSON fails to load
        console.log('Using default content from HTML');
    }
}

// Update hero section with data
function updateHeroSection(data) {
    const nameElement = document.getElementById('name');
    const titleElement = document.getElementById('title');
    const bioElement = document.getElementById('bio');
    const experienceElement = document.getElementById('experience');
    
    if (nameElement) nameElement.textContent = data.name;
    if (titleElement) titleElement.textContent = data.title;
    if (bioElement) bioElement.textContent = data.bio;
    if (experienceElement) {
        // Parse experience to highlight company names
        const experienceText = data.experience.replace(/\[([^\]]+)\]/g, '<span class="highlight">$1</span>');
        experienceElement.innerHTML = experienceText;
    }
}

// Update skills section
function updateSkillsSection(skills) {
    const skillsGrid = document.getElementById('skills-grid');
    if (!skillsGrid) return;
    
    skillsGrid.innerHTML = '';
    
    skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.textContent = skill;
        skillsGrid.appendChild(skillItem);
    });
}

// Update expertise sections
function updateExpertiseSections(sections) {
    Object.keys(sections).forEach(sectionKey => {
        const section = sections[sectionKey];
        const titleElement = document.getElementById(`${sectionKey}-title`);
        const itemsElement = document.getElementById(`${sectionKey}-items`);
        
        if (titleElement) titleElement.textContent = section.title;
        
        if (itemsElement) {
            itemsElement.innerHTML = '';
            section.items.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item;
                itemsElement.appendChild(listItem);
            });
        }
    });
}

// Update navigation name
function updateNavigationName(name) {
    const navNameElement = document.getElementById('nav-name');
    if (navNameElement) {
        navNameElement.textContent = name;
    }
}

// Setup button handlers
function setupButtonHandlers() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();

            if (buttonText.includes('Get in Touch')) {
                // This button should open the email client.
                e.preventDefault();
                openEmailClient();
            } else if (buttonText.includes('View Resume')) {
                // This button should open the resume.
                e.preventDefault();
                openResume();
            }
            // For other buttons that are actual links (like GitHub),
            // we do nothing and let the browser's default behavior take over.
            // The `e.preventDefault()` is now inside the conditions where it's needed.
        });
    });
}

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Observe skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Observe expertise cards
    const expertiseCards = document.querySelectorAll('.expertise-card');
    expertiseCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });
}

// Add interactive effects
function addInteractiveEffects() {
    // Add hover effects to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add typing effect to hero name (optional)
    addTypingEffect();
}

// Add typing effect to hero name
function addTypingEffect() {
    const nameElement = document.getElementById('name');
    if (!nameElement) return;
    
    const originalText = nameElement.textContent;
    nameElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            nameElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Add parallax effect to background
function addParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('body::before');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
}

// Initialize parallax effect
addParallaxEffect();

// Add loading animation
function addLoadingAnimation() {
    const body = document.body;
    body.style.opacity = '0';
    
    window.addEventListener('load', function() {
        body.style.transition = 'opacity 0.5s ease';
        body.style.opacity = '1';
    });
}

// Initialize loading animation
addLoadingAnimation();

// Add theme toggle functionality (bonus feature)
function addThemeToggle() {
    // This is a bonus feature - you can add a theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(139, 92, 246, 0.2);
        border: 1px solid rgba(139, 92, 246, 0.3);
        color: #f1f5f9;
        padding: 10px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        // Toggle between dark and light themes
        document.body.classList.toggle('light-theme');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });
}

// Uncomment the line below to enable theme toggle
// addThemeToggle();

// Initialize Navigation
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navToggle && 
            !navMenu.contains(event.target) && 
            !navToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // Add active class to current section
    addActiveSectionHighlight();
}

// Add active section highlighting
function addActiveSectionHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightCurrentSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && 
                window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Highlight on scroll
    window.addEventListener('scroll', highlightCurrentSection);
    
    // Highlight on page load
    highlightCurrentSection();
}

function openEmailClient() {
    const email = 'yussifabdelmaqsoud2003@gmail.com';
    const subject = 'Job Opportunity';
    const body = 'Hello Yussif, I would like to discuss a potential project with you.';
    
    // Try multiple approaches
    try {
        // Method 1: Direct mailto
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Fallback: If nothing happens after a short delay, try opening in new tab
        setTimeout(() => {
            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
        }, 500);
    } catch (error) {
        console.error('Error opening email client:', error);
    }
}

function openResume() {
    // Try multiple approaches to handle different browser behaviors
    try {
        // Method 1: Direct open
        const openedWindow = window.open('/MyResume.pdf', '_blank');
        
        // If popup was blocked, offer download instead
        if (!openedWindow || openedWindow.closed || typeof openedWindow.closed === 'undefined') {
            // Method 2: Create download link
            const link = document.createElement('a');
            link.href = '/MyResume.pdf';
            link.download = 'Yussif_Mohamed_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    } catch (error) {
        console.error('Error opening resume:', error);
        alert('Please allow pop-ups for this site to view the resume, or check if the file exists.');
    }
}