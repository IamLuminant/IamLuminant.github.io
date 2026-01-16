// Magic Project JavaScript
// Interactive functionality for the Magic System project page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavbar();
    initializeScrollAnimations();
    initializeFeatureCards();
    initializeTimeline();
    initializeProgressBars();
    
    console.log('Magic Project page initialized successfully');
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
            background: linear-gradient(180deg, #007bff, #0dcaf0, #198754, #ffc107, #dc3545, #f8f9fa);
        }
        
        .timeline-item {
            position: relative;
            margin-bottom: 30px;
            padding-bottom: 30px;
        }
        
        .timeline-item:last-child {
            padding-bottom: 0;
        }
        
        .timeline-marker {
            position: absolute;
            left: -20px;
            top: 0;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 0 0 3px currentColor;
            background: currentColor;
        }
        
        .timeline-content {
            padding-left: 20px;
        }
    `;
    document.head.appendChild(timelineStyle);
}

// Initialize progress bars
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-out';
            bar.style.width = width;
        }, 100 + (index * 100));
    });
}

// Modal helper function
function showModal(title, content) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('documentationModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'documentationModal';
        modal.className = 'modal fade';
        modal.setAttribute('tabindex', '-1');
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalTitle"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="modalContent"></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Update modal content
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalContent').innerHTML = content;
    
    // Show modal
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}

// Export functions for HTML onclick handlers
window.scrollToSection = scrollToSection;
window.showModal = showModal;
