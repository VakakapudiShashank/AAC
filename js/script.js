// script.js — full updated version with new features
document.addEventListener('DOMContentLoaded', () => {
    // ---------------- Generic Modal Toggling Logic (FIX) ----------------
    const allModals = document.querySelectorAll('.funding-modal, .modal');
    
    // Function to show a specific modal
    const showModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            allModals.forEach(m => m.style.display = 'none'); // Hide all others
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            modal.setAttribute('aria-hidden', 'false');
        }
    };
    
    // Function to hide a specific modal
    const hideModal = (modal) => {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            modal.setAttribute('aria-hidden', 'true');
        }
    };

    // Event listener for all data-modal-toggle buttons
    document.querySelectorAll('[data-modal-toggle]').forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-toggle');
            if (modalId) {
                showModal(modalId);
            }
        });
    });

    // Event listener for all data-modal-close buttons
    document.querySelectorAll('[data-modal-close]').forEach(closeButton => {
        closeButton.addEventListener('click', (e) => {
            const modal = e.target.closest('.funding-modal, .modal');
            hideModal(modal);
        });
    });

    // Event listener for clicking outside the modal content area
    window.addEventListener('click', (event) => {
        allModals.forEach(modal => {
            if (event.target === modal && modal.style.display === 'flex') {
                hideModal(modal);
            }
        });
    });

    // Keyboard navigation (Escape to close any open modal)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            allModals.forEach(modal => {
                if (modal.style.display === 'flex') {
                    hideModal(modal);
                }
            });
        }
    });


    // ---------------- Mobile Navigation Toggle ----------------
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const mobileMenu = document.querySelector('.mobile-nav-menu');
    const body = document.body;

    if (menuToggle && mobileMenu) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.addEventListener('click', () => {
            body.classList.add('mobile-nav-open');
            menuToggle.setAttribute('aria-expanded', 'true');
        });
    }

    if (menuClose && mobileMenu) {
        menuClose.addEventListener('click', () => {
            body.classList.remove('mobile-nav-open');
            if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        });
    }

    // Close mobile menu when a link is clicked (guard if mobile menu exists)
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                body.classList.remove('mobile-nav-open');
                if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ---------------- Gallery Modal Functionality ----------------
    const modal = document.getElementById('imageModal');
    const closeBtn = modal ? modal.querySelector('.close-btn') : null;
    const modalImage = modal ? modal.querySelector('#modalImage') : null;
    const prevBtn = modal ? modal.querySelector('.prev-btn') : null;
    const nextBtn = modal ? modal.querySelector('.next-btn') : null;

    const galleryItems = Array.from(document.querySelectorAll('.gallery-grid-fixed .gallery-item'));

    const modalData = {}; 

    let currentIndex = 0;

    function updateModal(item) {
        if (!modal) return;
        const imgSrc = item.getAttribute('data-image') || '';
        const captionText = item.getAttribute('data-caption') || '';

        if (modalImage) {
            modalImage.src = imgSrc;
            modalImage.alt = captionText || 'Gallery image';
        }
        
        currentIndex = galleryItems.indexOf(item);
        if (closeBtn) closeBtn.focus();
    }

    // Open Modal function — only if modal exists (Re-using generic showModal now)
    if (modal && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                updateModal(item);
                showModal('imageModal'); 
            });
        });
    }

    // Modal navigation (prev/next) — add listeners only if buttons exist
    if (prevBtn && galleryItems.length > 0) {
        prevBtn.addEventListener('click', () => {
            let newIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateModal(galleryItems[newIndex]);
        });
    }

    if (nextBtn && galleryItems.length > 0) {
        nextBtn.addEventListener('click', () => {
            let newIndex = (currentIndex + 1) % galleryItems.length;
            updateModal(galleryItems[newIndex]);
        });
    }


    // ---------------- Collaboration Tab Switching ----------------
    const tabLinks = Array.from(document.querySelectorAll('.tab-link'));
    const tabContents = Array.from(document.querySelectorAll('.tab-content'));

    const activateTab = (link) => {
        if (!link) return;
        const tabId = link.getAttribute('data-tab');
        if (!tabId) return;

        // Deactivate all links and contents
        tabLinks.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Activate the clicked link and its corresponding content
        link.classList.add('active');
        const contentEl = document.getElementById(tabId);
        if (contentEl) contentEl.classList.add('active');
    };

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            activateTab(link);
        });
    });

    // Automatically activate the first tab on load (or the one already marked active)
    if (tabLinks.length > 0) {
        const initialTab = tabLinks.find(t => t.classList.contains('active')) || tabLinks[0];
        activateTab(initialTab);
    }
    
    // ---------------- Service Card Toggle Functionality ----------------
    document.querySelectorAll('[data-card-toggle]').forEach(header => {
        header.addEventListener('click', () => {
            const card = header.closest('[data-service-card]');
            const details = card.querySelector('.card-details');
            
            // Toggle the visibility class on the details section
            details.classList.toggle('hidden');
            
            // Toggle the 'collapsed' class on the header for styling changes (like rotating the arrow)
            header.classList.toggle('collapsed');
        });
    });

    // ---------------- Animated Counter Functionality ----------------
    // ... (unchanged animation code)

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.textContent = Math.ceil(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    const impactSection = document.getElementById('impact');
    
    if (impactSection) {
        const observerOptions = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.1 
        };
        
        const impactObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const numberElements = entry.target.querySelectorAll('.impact-number');
                    
                    numberElements.forEach(element => {
                        const textContent = element.textContent.trim().replace(/[+,₹,]/g, '');
                        const finalValue = parseInt(textContent);

                        if (!isNaN(finalValue) && !element.classList.contains('animated')) {
                            animateValue(element, 0, finalValue, 1500); 
                            element.classList.add('animated'); 
                            
                            setTimeout(() => {
                                if (element.textContent.includes('₹')) {
                                    element.textContent = '₹' + finalValue.toLocaleString('en-IN'); 
                                } else {
                                    element.textContent = finalValue + ' +';
                                }
                            }, 1500); 
                        }
                    });

                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        impactObserver.observe(impactSection);
    }
    // ---------------- END Animated Counter Functionality ----------------


    // ---------------- Event Modal Logic ----------------
    const eventModal = document.getElementById('eventModal');
    const eventTriggers = document.querySelectorAll('.event-trigger');

    if (eventModal && eventTriggers.length > 0) {
        eventTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const title = trigger.getAttribute('data-title');
                const date = trigger.getAttribute('data-date');
                const location = trigger.getAttribute('data-location');
                const description = trigger.getAttribute('data-description');
                const imageClass = trigger.getAttribute('data-image-class');

                document.getElementById('event-modal-title').textContent = title;
                document.getElementById('eventModalDate').textContent = date;
                document.getElementById('eventModalLocation').textContent = location;
                document.getElementById('eventModalDescription').textContent = description;
                
                const imageContainer = document.getElementById('eventModalImageContainer');
                imageContainer.className = 'event-image-container'; 
                if (imageClass) {
                    imageContainer.classList.add(imageClass);
                }

                showModal('eventModal');
            });
        });
    }

    // ---------------- Team Member Modal Logic ----------------
    const teamModal = document.getElementById('teamModal');
    const teamTriggers = document.querySelectorAll('.team-member-trigger');
    
    if (teamModal && teamTriggers.length > 0) {
        teamTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const name = trigger.getAttribute('data-name');
                const title = trigger.getAttribute('data-title');
                const initials = trigger.getAttribute('data-initials');
                const about = trigger.getAttribute('data-about');
                const statsJson = JSON.parse(trigger.getAttribute('data-stats'));
                const contactLink = trigger.getAttribute('data-contact-link');

                // 1. Update Personal Info
                document.getElementById('teamModalName').textContent = name;
                document.getElementById('teamModalTitle').textContent = title;
                document.getElementById('teamModalAboutText').textContent = about;
                document.getElementById('teamModalContactBtn').href = contactLink;
                
                // 2. Update Avatar
                const avatar = document.getElementById('teamModalAvatar');
                avatar.className = 'team-avatar-initials';
                avatar.textContent = initials;
                avatar.classList.add(initials);
                
                // 3. Update Stats Grid
                const statsContainer = document.getElementById('teamModalStats');
                statsContainer.innerHTML = ''; // Clear previous stats
                
                const statLabels = {
                    startups: 'Startups',
                    funds: 'Funds',
                    partners: 'Partners'
                };
                
                Object.keys(statsJson).forEach(key => {
                    const statItem = document.createElement('div');
                    statItem.classList.add('team-stat-item');
                    statItem.innerHTML = `
                        <p class="team-stat-number">${statsJson[key]}</p>
                        <p class="team-stat-label">${statLabels[key]}</p>
                    `;
                    statsContainer.appendChild(statItem);
                });

                showModal('teamModal');
            });
        });
    }
});