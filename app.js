// AutoCare Car Service Web App JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Setup navigation
    setupNavigation();
    
    // Setup form handling
    setupFormHandling();
    
    // Setup animations
    setupAnimations();
    
    // Setup date input minimum date
    setupDateInput();
    
    console.log('AutoCare Car Service App initialized!');
}

// Navigation Setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active link
                updateActiveNavLink(this);
            }
        });
    });
}

function updateActiveNavLink(clickedLink) {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => link.classList.remove('active'));
    clickedLink.classList.add('active');
}

// Form Handling Setup
function setupFormHandling() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleFormSubmission);
    }
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        message: document.getElementById('message').value
    };
    
    // Validate form
    if (validateForm(formData)) {
        // Simulate form submission
        simulateBooking(formData);
    }
}

function validateForm(data) {
    const errors = [];
    
    // Name validation
    if (!data.name.trim()) {
        errors.push('Name is required');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Phone validation
    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
    if (!phoneRegex.test(data.phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    // Service validation
    if (!data.service) {
        errors.push('Please select a service');
    }
    
    // Date validation
    if (!data.date) {
        errors.push('Please select a preferred date');
    } else {
        const selectedDate = new Date(data.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            errors.push('Please select a future date');
        }
    }
    
    if (errors.length > 0) {
        showErrorMessages(errors);
        return false;
    }
    
    return true;
}

function showErrorMessages(errors) {
    // Remove existing error messages
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    
    // Create and display new error messages
    const form = document.getElementById('bookingForm');
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message';
    errorContainer.style.cssText = `
        background: #e74c3c;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        margin-bottom: 1rem;
    `;
    
    errorContainer.innerHTML = `
        <h4>Please correct the following errors:</h4>
        <ul style="margin: 0.5rem 0 0 1.5rem;">
            ${errors.map(error => `<li>${error}</li>`).join('')}
        </ul>
    `;
    
    form.insertBefore(errorContainer, form.firstChild);
    
    // Scroll to form
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function simulateBooking(data) {
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Booking...';
    submitBtn.disabled = true;
    
    // Simulate API call with timeout
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showSuccessMessage(data);
        
        // Reset form
        document.getElementById('bookingForm').reset();
        
        // Remove any error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
    }, 2000);
}

function showSuccessMessage(data) {
    const form = document.getElementById('bookingForm');
    
    // Remove existing success messages
    const existingSuccess = document.querySelectorAll('.success-message');
    existingSuccess.forEach(msg => msg.remove());
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.style.display = 'block';
    successMessage.innerHTML = `
        <h4>🎉 Booking Confirmed!</h4>
        <p>Thank you, ${data.name}! Your ${data.service.replace('-', ' ').toUpperCase()} appointment has been scheduled for ${formatDate(data.date)}.</p>
        <p>We'll send a confirmation email to ${data.email} shortly.</p>
        <p><strong>Next Steps:</strong> Our team will contact you at ${data.phone} to confirm the details.</p>
    `;
    
    form.appendChild(successMessage);
    
    // Auto-hide success message after 10 seconds
    setTimeout(() => {
        successMessage.style.opacity = '0';
        setTimeout(() => successMessage.remove(), 500);
    }, 10000);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Animation Setup
function setupAnimations() {
    // Intersection Observer for scroll animations
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
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Date Input Setup
function setupDateInput() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        // Set minimum date to today
        const today = new Date();
        const todayString = today.toISOString().split('T')[0];
        dateInput.min = todayString;
        
        // Set maximum date to 3 months from now
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        const maxDateString = maxDate.toISOString().split('T')[0];
        dateInput.max = maxDateString;
    }
}

// Utility Functions
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Scroll event for navigation highlighting
let isScrolling = false;
window.addEventListener('scroll', debounce(() => {
    if (!isScrolling) {
        updateActiveNavOnScroll();
    }
}, 100));

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
    const scrollPos = window.scrollY + 150; // Offset for header
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// CTA Button Click Handler
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cta-button')) {
        e.preventDefault();
        const targetSection = document.querySelector(e.target.getAttribute('href'));
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// Export functions for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        validateForm,
        formatDate
    };
}
