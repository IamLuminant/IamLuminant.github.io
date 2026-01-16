// LEP Project JavaScript
// Interactive functionality for the Luminant's Expansions Plugin project page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavbar();
    initializeScrollAnimations();
    initializeFeatureCards();
    initializeTimeline();
    initializeCodeHighlighting();
    initializeProgressBars();
    
    console.log('LEP Project page initialized successfully');
});

// Navbar functionality
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Initialize scroll animations
function initializeScrollAnimations() {
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

    // Add animation styles and observe elements
    const animatedElements = document.querySelectorAll('.card, .timeline-item, .feature-card');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(element);
    });
}

// Feature cards hover effects
function initializeFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease-out, box-shadow 0.3s ease-out';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// Timeline animation
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Add timeline styles
    const timelineStyle = document.createElement('style');
    timelineStyle.textContent = `
        .timeline {
            position: relative;
            padding-left: 30px;
        }
        
        .timeline::before {
            content: '';
            position: absolute;
            left: 15px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: #e9ecef;
        }
        
        .timeline-item {
            position: relative;
            margin-bottom: 30px;
            padding-left: 30px;
        }
        
        .timeline-marker {
            position: absolute;
            left: -45px;
            top: 5px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 3px solid #fff;
            box-shadow: 0 0 0 3px #e9ecef;
        }
        
        .timeline-content {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(timelineStyle);
    
    // Animate timeline items on scroll
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                
                // Animate the marker
                const marker = entry.target.querySelector('.timeline-marker');
                if (marker) {
                    marker.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        marker.style.transform = 'scale(1)';
                    }, 300);
                }
            }
        });
    }, { threshold: 0.5 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease-out ${index * 0.2}s, transform 0.6s ease-out ${index * 0.2}s`;
        timelineObserver.observe(item);
    });
}

// Code highlighting enhancement
function initializeCodeHighlighting() {
    // Add copy button to code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(codeBlock => {
        const pre = codeBlock.parentElement;
        const copyButton = document.createElement('button');
        
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.className = 'btn btn-sm btn-outline-light position-absolute';
        copyButton.style.cssText = 'top: 10px; right: 10px; opacity: 0.7;';
        copyButton.title = 'Copy code';
        
        copyButton.addEventListener('click', function() {
            navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                copyButton.classList.remove('btn-outline-light');
                copyButton.classList.add('btn-success');
                
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                    copyButton.classList.remove('btn-success');
                    copyButton.classList.add('btn-outline-light');
                }, 2000);
            });
        });
        
        pre.style.position = 'relative';
        pre.appendChild(copyButton);
    });
}

// Progress bars for features (simulate loading/completion)
function initializeProgressBars() {
    const features = [
        { name: 'Inventory System', completion: 98 },
        { name: 'Item System', completion: 100 },
        { name: 'Interaction System', completion: 100 },
        { name: 'Ability System', completion: 85 }
    ];
    
    // Add progress visualization to feature cards
    const featureCards = document.querySelectorAll('.feature-card .card-body');
    
    featureCards.forEach((cardBody, index) => {
        if (index < features.length) {
            const feature = features[index];
            const progressContainer = document.createElement('div');
            progressContainer.className = 'mt-3';
            progressContainer.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <small class="text-muted">Development Progress</small>
                    <small class="text-muted">${feature.completion}%</small>
                </div>
                <div class="progress" style="height: 6px;">
                    <div class="progress-bar bg-primary" style="width: 0%;" data-width="${feature.completion}%"></div>
                </div>
            `;
            cardBody.appendChild(progressContainer);
        }
    });
    
    // Animate progress bars when they come into view
    const progressBars = document.querySelectorAll('.progress-bar');
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('data-width');
                
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                    progressBar.style.transition = 'width 1.5s ease-out';
                }, 500);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Documentation functions
function showDocumentation(type) {
    let content = '';
    let title = '';
    
    switch(type) {
        case 'api':
            title = 'Forums';
            content = `
                <div class="alert alert-info">
                    <i class="fas fa-info-circle me-2"></i>
                    <a href="https://www.fab.com/listings/84988f48-5dab-432a-a003-5a76f4e2b70f" class="btn btn-primary">View on Fab Store</a>
                </div>
                <h5>Core Classes</h5>
                <ul>
                    <li><strong>ULE_InventoryComponent</strong> - Main inventory management component</li>
                    <li><strong>ULE_ItemObject</strong> - Base class for all items</li>
                    <li><strong>ULE_InteractionComponent</strong> - Handles object interactions</li>
                    <li><strong>ILE_InteractionInterface</strong> - Interface for interactable objects</li>
                    <li><strong>ULE_AbilityComponent</strong> - Manages character abilities</li>
                    <li><strong>ULE_AbilityObject</strong> - Manages character abilities</li>
                    <li><strong>ULE_AbilityTask</strong> - Async task for abilities</li>
                </ul>
            `;
            break;
        case 'tutorials':
            title = 'Tutorials';
            content = `
                <div class="alert alert-success">
                    <i class="fas fa-graduation-cap me-2"></i>
                    <a href="https://youtube.com/playlist?list=PLj6tC9CfpgYIyfFQUq0XeViAiWvqa4iY2&si=hgnlaK82OM6zNcEP" target="_blank" class="btn btn-primary">Watch Tutorials on YouTube</a>
                </div>
                <h5>Current Tutorials</h5>
                <ol>
                    <li>Overview</li>
                    <li>Inventory and Item System</li>
                    <li>Interaction System</li>
                    <li>Ability System</li>
                </ol>
                <h5>Planned Tutorials</h5>
                <ol>
                    <li>Quick Start Guide</li>
                    <li>Custom Items and Inventory</li>
                    <li>Implementing Interactions</li>
                    <li>Building Abilities Series</li>
                </ol>
            `;
            break;
    }
    
    if (type === 'youtube') {
        window.open('https://youtube.com/playlist?list=PLj6tC9CfpgYIyfFQUq0XeViAiWvqa4iY2&si=hgnlaK82OM6zNcEP', '_blank');
        return;
    }
    
    showModal(title, content);
}

// FAQ toggle functionality
function toggleFAQ() {
    const faqSection = document.getElementById('faq-section');
    const isVisible = faqSection.style.display !== 'none';
    
    if (isVisible) {
        faqSection.style.display = 'none';
    } else {
        faqSection.style.display = 'block';
        // Smooth scroll to FAQ section
        setTimeout(() => {
            faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

// Modal helper function
function showModal(title, content) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('documentationModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'documentationModal';
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body"></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Update modal content
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-body').innerHTML = content;
    
    // Show modal
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to close modals/FAQ
    if (e.key === 'Escape') {
        const faqSection = document.getElementById('faq-section');
        if (faqSection.style.display !== 'none') {
            faqSection.style.display = 'none';
        }
    }
    
    // Ctrl/Cmd + K for search (placeholder)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        console.log('Search functionality (to be implemented)');
    }
});

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

// Performance monitoring
function trackPagePerformance() {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

// Initialize performance tracking
trackPagePerformance();

// Export functions for global access
window.LEPProject = {
    scrollToSection,
    showDocumentation,
    toggleFAQ
};
