// script.js — full updated version with new features
document.addEventListener('DOMContentLoaded', () => {
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
    const modalCaption = modal ? modal.querySelector('#modalCaption') : null;
    const modalDetails = modal ? modal.querySelector('#modalDetails') : null;
    const modalFooter = modal ? modal.querySelector('#modalFooter') : null;
    const prevBtn = modal ? modal.querySelector('.prev-btn') : null;
    const nextBtn = modal ? modal.querySelector('.next-btn') : null;

    const galleryItems = Array.from(document.querySelectorAll('.gallery-grid-fixed .gallery-item'));

    // Modal data: details stored as arrays (safer to construct UL/LI)
    const modalData = {
        'assets/gallery/glimpse-modal.jpg': {
            caption: 'Abdul HKL: Investment Director, Andhra Angels',
            details: [
                'Currently Investment Director for Andhra Angels.',
                'Ex-Accenture (Sr Talent Acquisition Manager).',
                'Ex-HCL Employee (Project Manager-Tech).',
                'Ex-JP Morgan (General Manager-Fund Raising).',
                "Master's in Computer Applications from Acharya Nagarjuna University.",
                'Certified CSR Professional from Indian Institute of Corporate Affairs.',
                'Executive Program from IIM Jammu on Digital Marketing & Entrepreneurship.',
                'Delivered 50+ Sessions on Entrepreneurship Necessity for Top Tier B Schools & Colleges.',
                'Recognised as a Best Startup mentor for 2023 (Under SDG & Deeptech) from Business Outlook.',
                'Monitoring 8+ Startups which are Unicorns in the market, Active Mentor for Startup India.',
                'Currently hold 23 Cr+ investments in the startup ecosystem where he invested into Deeptech, Agri, Waste Management and EV industry.',
                'He Successfully Exited from 6 Startups and hold 18% Equity in 14 Startups which value around 76 Cr++ for 2024.'
            ],
            footer: 'Sharing insights on entrepreneurship and investment.'
        }
    };

    let currentIndex = 0;

    function buildDetailsList(detailsArray) {
        if (!Array.isArray(detailsArray) || detailsArray.length === 0) return '';
        return '<ul>' + detailsArray.map(item => `<li>${item}</li>`).join('') + '</ul>';
    }

    function updateModal(item) {
        if (!modal) return;
        const imgSrc = item.getAttribute('data-image') || '';
        const captionText = item.getAttribute('data-caption') || '';
        const detailsData = modalData[imgSrc];

        if (modalImage) {
            modalImage.src = imgSrc;
            modalImage.alt = captionText || 'Gallery image';
        }
        if (modalCaption) modalCaption.textContent = captionText || '';

        if (modalDetails) {
            if (detailsData && detailsData.details) {
                modalDetails.innerHTML = buildDetailsList(detailsData.details);
            } else {
                modalDetails.innerHTML = '<p>Details about this specific event will be uploaded soon. This is a moment captured at one of our recent gatherings.</p>';
            }
        }

        if (modalFooter) {
            modalFooter.textContent = detailsData && detailsData.footer ? detailsData.footer : 'A moment from our journey.';
        }

        currentIndex = galleryItems.indexOf(item);
        // Focus management for accessibility
        if (closeBtn) closeBtn.focus();
    }

    // Open Modal function — only if modal exists
    if (modal && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                updateModal(item);
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                modal.setAttribute('aria-hidden', 'false');
            });
        });
    }

    // Close Modal when close button is clicked
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            modal.setAttribute('aria-hidden', 'true');
        });
    }

    // Close Modal when clicking outside of the modal content
    if (modal) {
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                modal.setAttribute('aria-hidden', 'true');
            }
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

    // Keyboard navigation for modal (Escape to close, left/right for prev/next)
    document.addEventListener('keydown', (e) => {
        if (!modal || modal.style.display !== 'block') return;
        if (e.key === 'Escape') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            modal.setAttribute('aria-hidden', 'true');
            return;
        }
        if (e.key === 'ArrowLeft' && galleryItems.length > 0 && prevBtn) {
            let newIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateModal(galleryItems[newIndex]);
        }
        if (e.key === 'ArrowRight' && galleryItems.length > 0 && nextBtn) {
            let newIndex = (currentIndex + 1) % galleryItems.length;
            updateModal(galleryItems[newIndex]);
        }
    });

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

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Use Math.ceil to ensure the number is an integer (for '50 +')
            obj.textContent = Math.ceil(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Observer to trigger animation when section is visible
    const impactSection = document.getElementById('impact');
    
    if (impactSection) {
        const observerOptions = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.1 // Triggers when 10% of the section is visible
        };
        
        const impactObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Find all impact numbers and run the animation
                    const numberElements = entry.target.querySelectorAll('.impact-number');
                    
                    numberElements.forEach(element => {
                        // Extract the pure number for animation
                        const textContent = element.textContent.trim().replace(/[+,₹,]/g, '');
                        const finalValue = parseInt(textContent);

                        // Only animate if it's a valid number and hasn't been animated yet
                        if (!isNaN(finalValue) && !element.classList.contains('animated')) {
                            // Duration set to 1.5 seconds (1500ms)
                            animateValue(element, 0, finalValue, 1500); 
                            element.classList.add('animated'); // Mark as animated
                            
                            // Re-add the currency/symbols after the animation finishes
                            setTimeout(() => {
                                if (element.textContent.includes('₹')) {
                                    // Funds Raised: format with commas
                                    element.textContent = '₹' + finalValue.toLocaleString('en-IN'); 
                                } else {
                                    // Simple Counts: add '+'
                                    element.textContent = finalValue + ' +';
                                }
                            }, 1500); 
                        }
                    });

                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);

        impactObserver.observe(impactSection);
    }
});