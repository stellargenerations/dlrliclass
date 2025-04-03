document.addEventListener('DOMContentLoaded', function() {
    // Provider details toggle
    const detailsButtons = document.querySelectorAll('.details-btn');
    const providerCards = document.querySelectorAll('.provider-detail-card');
    
    detailsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const providerId = this.dataset.provider;
            const targetCard = document.getElementById(`${providerId}-details`);
            
            // Hide all cards first
            providerCards.forEach(card => {
                card.classList.remove('active');
                card.style.display = 'none';
            });
            
            // Show the target card
            targetCard.classList.add('active');
            targetCard.style.display = 'block';
            
            // Scroll to the card
            targetCard.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-answer').style.display = 'none';
            });
            
            // If the clicked item wasn't active before, open it
            if (!isActive) {
                item.classList.add('active');
                answer.style.display = 'block';
            }
        });
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav a, .cta-buttons a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only process internal links that start with #
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Scroll to the target element
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Mobile navigation toggle (for smaller screens)
    const createMobileNav = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        // Create mobile nav toggle button if it doesn't exist
        if (!document.querySelector('.mobile-nav-toggle')) {
            const mobileToggle = document.createElement('button');
            mobileToggle.classList.add('mobile-nav-toggle');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            header.querySelector('.container').appendChild(mobileToggle);
            
            mobileToggle.addEventListener('click', function() {
                const isOpen = nav.classList.contains('active');
                
                if (isOpen) {
                    nav.classList.remove('active');
                    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                } else {
                    nav.classList.add('active');
                    mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
                }
            });
        }
    };
    
    // Add mobile nav if screen is small
    const checkScreenSize = () => {
        if (window.innerWidth <= 768) {
            createMobileNav();
        }
    };
    
    // Check screen size on load
    checkScreenSize();
    
    // Check screen size on resize
    window.addEventListener('resize', checkScreenSize);
    
    // Handle newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('newsletter-success');
                successMessage.textContent = 'Thank you for subscribing to our newsletter!';
                
                // Replace form with success message
                this.innerHTML = '';
                this.appendChild(successMessage);
            }
        });
    }
    
    // Auto-show provider details if hash in URL
    const checkUrlHash = () => {
        const hash = window.location.hash;
        if (hash && hash.includes('-details')) {
            const providerId = hash.substring(1).replace('-details', '');
            const detailsButton = document.querySelector(`.details-btn[data-provider="${providerId}"]`);
            
            if (detailsButton) {
                detailsButton.click();
            }
        }
    };
    
    // Check URL hash on load
    checkUrlHash();
    
    // Add animation to criteria items
    const animateCriteriaItems = () => {
        const criteriaItems = document.querySelectorAll('.criteria-item');
        
        criteriaItems.forEach((item, index) => {
            // Add animation delay based on index
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('animate');
        });
    };
    
    // Check if element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };
    
    // Animate elements when they come into view
    const handleScrollAnimations = () => {
        const methodologySection = document.getElementById('methodology');
        
        if (methodologySection && isInViewport(methodologySection)) {
            animateCriteriaItems();
            // Remove scroll listener once animation is triggered
            window.removeEventListener('scroll', handleScrollAnimations);
        }
    };
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Check on initial load as well
    handleScrollAnimations();
    
    // Initialize comparison table sorting
    const initTableSorting = () => {
        const comparisonTable = document.querySelector('.comparison-table');
        
        if (comparisonTable) {
            const headers = comparisonTable.querySelectorAll('th');
            
            headers.forEach((header, index) => {
                // Skip the first column (Feature)
                if (index === 0) return;
                
                header.addEventListener('click', function() {
                    sortTable(comparisonTable, index);
                });
                
                // Add sort indicator and cursor
                header.style.cursor = 'pointer';
                header.setAttribute('title', 'Click to sort');
                
                // Add sort icon
                const sortIcon = document.createElement('span');
                sortIcon.classList.add('sort-icon');
                sortIcon.innerHTML = ' <i class="fas fa-sort"></i>';
                header.appendChild(sortIcon);