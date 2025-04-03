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
                card.style.display = 'none';
            });
            
            // Show the target card
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
            });
        }
    };
    
    // Sort table function
    const sortTable = (table, columnIndex) => {
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const headers = table.querySelectorAll('th');
        const header = headers[columnIndex];
        
        // Determine current sort direction
        const currentDirection = header.getAttribute('data-sort') === 'asc' ? 'desc' : 'asc';
        
        // Reset all headers
        headers.forEach(h => {
            h.removeAttribute('data-sort');
            const icon = h.querySelector('.sort-icon');
            if (icon) icon.innerHTML = ' <i class="fas fa-sort"></i>';
        });
        
        // Set current header sort direction
        header.setAttribute('data-sort', currentDirection);
        const icon = header.querySelector('.sort-icon');
        icon.innerHTML = currentDirection === 'asc' 
            ? ' <i class="fas fa-sort-up"></i>' 
            : ' <i class="fas fa-sort-down"></i>';
        
        // Sort the rows
        rows.sort((rowA, rowB) => {
            const cellA = rowA.querySelectorAll('td')[columnIndex].textContent.trim();
            const cellB = rowB.querySelectorAll('td')[columnIndex].textContent.trim();
            
            if (currentDirection === 'asc') {
                return cellA.localeCompare(cellB, undefined, {numeric: true, sensitivity: 'base'});
            } else {
                return cellB.localeCompare(cellA, undefined, {numeric: true, sensitivity: 'base'});
            }
        });
        
        // Remove existing rows
        rows.forEach(row => row.remove());
        
        // Add sorted rows
        rows.forEach(row => tbody.appendChild(row));
    };
    
    // Initialize table sorting
    initTableSorting();
    
    // Review filtering
    const initReviewFiltering = () => {
        const reviewsSection = document.getElementById('reviews');
        
        if (reviewsSection) {
            const reviewCards = reviewsSection.querySelectorAll('.review-card');
            
            // Create filter UI
            const filterContainer = document.createElement('div');
            filterContainer.classList.add('review-filters');
            filterContainer.innerHTML = `
                <div class="filter-group">
                    <label>Filter by provider:</label>
                    <select class="provider-filter">
                        <option value="all">All Providers</option>
                        <option value="GIADA">GIADA</option>
                        <option value="Georgia Dealer">Georgia Dealer</option>
                        <option value="Ron Widener">Ron Widener</option>
                        <option value="Used Auto Dealer Training">Used Auto Dealer Training</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Filter by rating:</label>
                    <select class="rating-filter">
                        <option value="all">All Ratings</option>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                </div>
            `;
            
            // Insert filter UI before the reviews grid
            const reviewsGrid = reviewsSection.querySelector('.reviews-grid');
            reviewsSection.insertBefore(filterContainer, reviewsGrid);
            
            // Add event listeners to filters
            const providerFilter = filterContainer.querySelector('.provider-filter');
            const ratingFilter = filterContainer.querySelector('.rating-filter');
            
            const applyFilters = () => {
                const selectedProvider = providerFilter.value;
                const selectedRating = ratingFilter.value;
                
                reviewCards.forEach(card => {
                    const provider = card.querySelector('.reviewer-info span').textContent;
                    const ratingText = card.querySelector('.rating-text').textContent;
                    const rating = parseInt(ratingText);
                    
                    const providerMatch = selectedProvider === 'all' || provider.includes(selectedProvider);
                    const ratingMatch = selectedRating === 'all' || rating === parseInt(selectedRating);
                    
                    if (providerMatch && ratingMatch) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            };
            
            providerFilter.addEventListener('change', applyFilters);
            ratingFilter.addEventListener('change', applyFilters);
        }
    };
    
    // Initialize review filtering
    initReviewFiltering();
    
    // Add scroll to top button
    const addScrollToTopButton = () => {
        const scrollButton = document.createElement('button');
        scrollButton.classList.add('scroll-to-top');
        scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(scrollButton);
        
        // Initially hide the button
        scrollButton.style.display = 'none';
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollButton.style.display = 'block';
            } else {
                scrollButton.style.display = 'none';
            }
        });
        
        // Add click event
        scrollButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    
    // Add scroll to top button
    addScrollToTopButton();
    
    // Add CSS for dynamic elements
    const addDynamicStyles = () => {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .mobile-nav-toggle {
                display: none;
                background: transparent;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
            }
            
            @media (max-width: 768px) {
                .mobile-nav-toggle {
                    display: block;
                }
                
                nav {
                    display: none;
                }
                
                nav.active {
                    display: block;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background-color: var(--primary-color);
                    padding: 20px;
                    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
                }
                
                nav.active ul {
                    flex-direction: column;
                    align-items: center;
                }
                
                nav.active ul li {
                    margin: 10px 0;
                }
            }
            
            .criteria-item {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.5s ease, transform 0.5s ease;
            }
            
            .criteria-item.animate {
                opacity: 1;
                transform: translateY(0);
            }
            
            .newsletter-success {
                background-color: var(--success-color);
                color: white;
                padding: 15px;
                border-radius: 4px;
                text-align: center;
                font-weight: 600;
            }
            
            .review-filters {
                display: flex;
                justify-content: center;
                margin-bottom: 30px;
                gap: 20px;
            }
            
            .filter-group {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .filter-group select {
                padding: 8px 12px;
                border-radius: 4px;
                border: 1px solid var(--medium-gray);
            }
            
            .scroll-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: var(--secondary-color);
                color: white;
                border: none;
                cursor: pointer;
                font-size: 1.2rem;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
            }
            
            .scroll-to-top:hover {
                background-color: #217dbb;
                transform: translateY(-3px);
            }
            
            .sort-icon {
                margin-left: 5px;
                display: inline-block;
            }
            
            th[data-sort="asc"], th[data-sort="desc"] {
                background-color: #34495e;
            }
        `;
        
        document.head.appendChild(styleElement);
    };
    
    // Add dynamic styles
    addDynamicStyles();
});