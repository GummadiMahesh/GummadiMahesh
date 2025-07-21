// Template data
const templates = [
    {
        title: "Life & Stitch Summer Worksheet",
        subtitle: "Summer Specials",
        gradient: "linear-gradient(135deg, #3b82f6, #06b6d4)",
        displayText: "Stitch Summer"
    },
    {
        title: "Elf's Space Worksheet",
        subtitle: "Journey Through the Galaxy",
        gradient: "linear-gradient(135deg, #7c3aed, #3730a3)",
        displayText: "Space Galaxy"
    },
    {
        title: "The Lion King Savannah Worksheet",
        subtitle: "The Lion King Savannah Worksheet",
        gradient: "linear-gradient(135deg, #f59e0b, #eab308)",
        displayText: "Lion King"
    },
    {
        title: "Dory Worksheet",
        subtitle: "Dory Worksheet",
        gradient: "linear-gradient(135deg, #3b82f6, #06b6d4)",
        displayText: "Dory Ocean"
    },
    {
        title: "Cinderella and Stickers Worksheet",
        subtitle: "Cinderella and Stickers Worksheet",
        gradient: "linear-gradient(135deg, #ec4899, #7c3aed)",
        displayText: "Cinderella"
    },
    {
        title: "Big Hero 6 Labyrinth Worksheet",
        subtitle: "Big Hero 6 Labyrinth Worksheet",
        gradient: "linear-gradient(135deg, #dc2626, #f97316)",
        displayText: "Big Hero 6"
    },
    {
        title: "Soul Music Worksheet",
        subtitle: "Soul Music Worksheet",
        gradient: "linear-gradient(135deg, #3730a3, #7c3aed)",
        displayText: "Soul Music"
    },
    {
        title: "Snow White Worksheet",
        subtitle: "Snow White Worksheet",
        gradient: "linear-gradient(135deg, #fca5a5, #dc2626)",
        displayText: "Snow White"
    },
    {
        title: "Minnie Summer Planner",
        subtitle: "Minnie Summer Planner",
        gradient: "linear-gradient(135deg, #ec4899, #dc2626)",
        displayText: "Minnie Summer"
    },
    {
        title: "Soul Planner",
        subtitle: "Soul Planner",
        gradient: "linear-gradient(135deg, #7c3aed, #3730a3)",
        displayText: "Soul Jazz"
    },
    {
        title: "Bambi Monthly Planner",
        subtitle: "Bambi Monthly Planner",
        gradient: "linear-gradient(135deg, #22c55e, #06b6d4)",
        displayText: "Bambi Forest"
    },
    {
        title: "Big Hero 6 Planner",
        subtitle: "Big Hero 6 Planner",
        gradient: "linear-gradient(135deg, #dc2626, #ec4899)",
        displayText: "Big Hero 6"
    },
    {
        title: "101 Dalmatians Name Tag",
        subtitle: "101 Dalmatians Name Tag",
        gradient: "linear-gradient(135deg, #93c5fd, #3b82f6)",
        displayText: "Dalmatians"
    },
    {
        title: "Tim Burton's The Nightmare Before Christmas",
        subtitle: "Tim Burton's The Nightmare Before Christmas",
        gradient: "linear-gradient(135deg, #7c3aed, #374151)",
        displayText: "Nightmare"
    },
    {
        title: "Disney Villains Calendar",
        subtitle: "Disney Villains Calendar",
        gradient: "linear-gradient(135deg, #7c3aed, #3730a3)",
        displayText: "Villains"
    },
    {
        title: "Coco Day of the Dead",
        subtitle: "Coco Day of the Dead",
        gradient: "linear-gradient(135deg, #f97316, #dc2626)",
        displayText: "Coco"
    },
    {
        title: "Luca Summer Worksheet",
        subtitle: "Luca Summer Worksheet",
        gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
        displayText: "Luca Italian"
    },
    {
        title: "Elsa Lesson Plan",
        subtitle: "Elsa Lesson Plan",
        gradient: "linear-gradient(135deg, #3b82f6, #06b6d4)",
        displayText: "Elsa Frozen"
    }
];

// State management
let currentTemplateIndex = 0;
const templatesPerLoad = 9;
let isLoading = false;
let allTemplates = [...templates];
let filteredTemplates = [...templates];

// DOM elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const templatesGrid = document.getElementById('templatesGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const newsletterEmail = document.getElementById('newsletterEmail');
const subscribeBtn = document.getElementById('subscribeBtn');
const languageSelector = document.getElementById('languageSelector');
const searchInput = document.getElementById('searchInput');

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

// Mobile menu functionality
mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.style.display === 'block';
    mobileMenu.style.display = isOpen ? 'none' : 'block';
    
    // Animate hamburger menu
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (isOpen) {
        spans[0].style.transform = 'rotate(0deg)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0deg)';
    } else {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.style.display = 'none';
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'rotate(0deg)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0deg)';
    }
});

// Create template card
function createTemplateCard(template) {
    const safeTitle = sanitizeHTML(template.title);
    const safeSubtitle = sanitizeHTML(template.subtitle);
    const safeDisplayText = sanitizeHTML(template.displayText);
    
    return `
        <div class="template-card" onclick="openTemplate('${safeTitle}')">
            <div class="template-image" style="background: ${template.gradient}">
                ${safeDisplayText}
                <div class="premium-badge">
                    ⭐ Premium
                </div>
                <div class="star-icon" onclick="toggleFavorite(event, '${safeTitle}')">
                    ⭐
                </div>
            </div>
            <div class="template-content">
                <h3 class="template-title">${safeTitle}</h3>
                <p class="template-subtitle">${safeSubtitle}</p>
            </div>
        </div>
    `;
}

// Load templates
function loadTemplates() {
    if (isLoading) return;
    
    const endIndex = Math.min(currentTemplateIndex + templatesPerLoad, filteredTemplates.length);
    const templatesToLoad = filteredTemplates.slice(currentTemplateIndex, endIndex);
    
    if (templatesToLoad.length === 0) {
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    templatesToLoad.forEach(template => {
        templatesGrid.innerHTML += createTemplateCard(template);
    });
    
    currentTemplateIndex = endIndex;
    
    // Hide load more button if all templates are loaded
    if (currentTemplateIndex >= filteredTemplates.length) {
        loadMoreBtn.style.display = 'none';
    }
    
    // Add loading animation
    const newCards = templatesGrid.querySelectorAll('.template-card');
    newCards.forEach((card, index) => {
        if (index >= newCards.length - templatesToLoad.length) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, (index - (newCards.length - templatesToLoad.length)) * 100);
        }
    });
}

// Load more button functionality
loadMoreBtn.addEventListener('click', () => {
    if (isLoading) return;
    
    isLoading = true;
    loadMoreBtn.textContent = 'Loading...';
    loadMoreBtn.disabled = true;
    loadMoreBtn.classList.add('loading');
    
    setTimeout(() => {
        loadTemplates();
        loadMoreBtn.textContent = 'Load more';
        loadMoreBtn.disabled = false;
        loadMoreBtn.classList.remove('loading');
        isLoading = false;
    }, 1000);
});

// FAQ functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Newsletter functionality
subscribeBtn.addEventListener('click', () => {
    const email = newsletterEmail.value.trim();
    
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate API call
    subscribeBtn.textContent = 'Subscribing...';
    subscribeBtn.disabled = true;
    subscribeBtn.classList.add('loading');
    
    setTimeout(() => {
        showNotification('Successfully subscribed to newsletter!', 'success');
        newsletterEmail.value = '';
        subscribeBtn.textContent = 'Subscribe';
        subscribeBtn.disabled = false;
        subscribeBtn.classList.remove('loading');
    }, 1500);
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Language selector functionality
languageSelector.addEventListener('change', (e) => {
    const selectedLanguage = e.target.value;
    const selectedText = e.target.options[e.target.selectedIndex].text;
    showNotification(`Language changed to ${selectedText}`, 'info');
    
    // Store language preference
    try {
        localStorage.setItem('selectedLanguage', selectedLanguage);
    } catch (e) {
        console.warn('Could not save language preference');
    }
});

// Template interactions
function openTemplate(title) {
    showNotification(`Opening template: ${title}`, 'info');
    // Here you would typically navigate to the template page
    // window.location.href = `/template/${encodeURIComponent(title)}`;
}

function toggleFavorite(event, title) {
    event.stopPropagation();
    const starIcon = event.currentTarget;
    const isActive = starIcon.classList.contains('active');
    
    if (isActive) {
        starIcon.classList.remove('active');
        starIcon.style.color = 'white';
        showNotification(`Removed ${title} from favorites`, 'info');
        removeFavorite(title);
    } else {
        starIcon.classList.add('active');
        starIcon.style.color = '#fbbf24';
        showNotification(`Added ${title} to favorites`, 'success');
        addFavorite(title);
    }
}

// Favorites management
function addFavorite(title) {
    try {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (!favorites.includes(title)) {
            favorites.push(title);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    } catch (e) {
        console.warn('Could not save favorite');
    }
}

function removeFavorite(title) {
    try {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const updatedFavorites = favorites.filter(fav => fav !== title);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (e) {
        console.warn('Could not remove favorite');
    }
}

function loadFavorites() {
    try {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        favorites.forEach(title => {
            const cards = document.querySelectorAll('.template-card');
            cards.forEach(card => {
                const cardTitle = card.querySelector('.template-title').textContent;
                if (cardTitle === title) {
                    const starIcon = card.querySelector('.star-icon');
                    starIcon.classList.add('active');
                    starIcon.style.color = '#fbbf24';
                }
            });
        });
    } catch (e) {
        console.warn('Could not load favorites');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Search functionality
const debouncedSearch = debounce((searchTerm) => {
    if (searchTerm.length > 2) {
        // Filter templates based on search term
        filteredTemplates = allTemplates.filter(template => 
            template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.displayText.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        // Clear current templates
        templatesGrid.innerHTML = '';
        currentTemplateIndex = 0;
        
        // Display filtered templates
        loadTemplates();
        
        // Hide load more button during search if no more results
        if (filteredTemplates.length <= templatesPerLoad) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
        
        if (filteredTemplates.length === 0) {
            templatesGrid.innerHTML = '<div style="text-align: center; padding: 40px; color: #6b7280; font-size: 18px;">No templates found matching your search.</div>';
        }
    } else if (searchTerm.length === 0) {
        // Reset to original state
        filteredTemplates = [...allTemplates];
        templatesGrid.innerHTML = '';
        currentTemplateIndex = 0;
        loadTemplates();
        loadMoreBtn.style.display = 'block';
    }
}, 300);

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    debouncedSearch(searchTerm);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Performance optimization: Throttled scroll handler
let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    const characters = document.querySelectorAll('.character-circle');
    
    characters.forEach((character, index) => {
        const speed = 0.5 + (index * 0.1);
        character.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Load initial templates
    loadTemplates();
    
    // Load saved language preference
    try {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage && languageSelector) {
            languageSelector.value = savedLanguage;
        }
    } catch (e) {
        console.warn('Could not load language preference');
    }
    
    // Add collection card interactions
    document.querySelectorAll('.collection-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.collection-title').textContent;
            showNotification(`Opening ${title} collection`, 'info');
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.collection-card, .section-title');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add parallax effect for hero characters
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Load favorites after templates are loaded
    setTimeout(loadFavorites, 500);
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        mobileMenu.style.display = 'none';
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'rotate(0deg)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0deg)';
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

// Service worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
