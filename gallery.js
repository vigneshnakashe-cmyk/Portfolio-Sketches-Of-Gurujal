document.addEventListener("DOMContentLoaded", () => {
    
    // Selectors
    const galleryContainer = document.querySelector(".gallery-container");
    const galleryItems = document.querySelectorAll(".gallery-item");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const lightbox = document.getElementById("galleryLightbox");
    const preview = document.getElementById("galleryPreview");
    const title = document.getElementById("galleryTitle");
    const closeBtn = document.getElementById("galleryClose");
    const prevBtn = document.getElementById("galleryPrev");
    const nextBtn = document.getElementById("galleryNext");
    const mouseGlow = document.getElementById("mouseGlow");
    const particlesContainer = document.getElementById("particlesContainer");
    const swipeArea = document.getElementById("lightboxSwipeArea");

    let visibleItems = [...galleryItems];
    let currentIndex = 0;

    /* ==================================================
       1. LAZY LOADING IMAGES & SKELETON REMOVAL
    ================================================== */
    const lazyLoadImages = () => {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const img = card.querySelector(".lazy-img");
                    
                    if(img && img.dataset.src) {
                        img.src = img.dataset.src;
                        img.onload = () => {
                            img.classList.add("loaded");
                            card.classList.remove("skeleton"); // Remove shimmer skeleton
                        };
                    }
                    observer.unobserve(card);
                }
            });
        }, { rootMargin: "0px 0px 100px 0px" });

        galleryItems.forEach(item => imageObserver.observe(item));
    };
    lazyLoadImages();

    /* ==================================================
       2. SMOOTH ANIMATED GALLERY FILTERING
    ================================================== */
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Active state handling
            filterButtons.forEach(btn => {
                btn.classList.remove("active");
                btn.setAttribute("aria-selected", "false");
            });
            button.classList.add("active");
            button.setAttribute("aria-selected", "true");

            const filterValue = button.dataset.filter;

            galleryItems.forEach(item => {
                const category = item.dataset.category;
                if (filterValue === "all" || category === filterValue) {
                    item.classList.remove("hide");
                } else {
                    item.classList.add("hide");
                }
            });

            // Update indices of filtered array for lightbox navigation
            visibleItems = [...galleryItems].filter(item => !item.classList.contains("hide"));
        });
    });

    /* ==================================================
       3. PREMIUM LIGHTBOX LOGIC & KEYBOARD INTERACTION
    ================================================== */
    function showImage(index) {
        if(visibleItems.length === 0) return;
        currentIndex = index;
        const img = visibleItems[index].querySelector("img");
        
        preview.src = img.src;
        preview.alt = img.alt;
        title.textContent = img.alt;
    }

    function openLightbox(index) {
        showImage(index);
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        closeBtn.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    function nextImage() {
        let nextIdx = currentIndex + 1;
        if (nextIdx >= visibleItems.length) nextIdx = 0;
        showImage(nextIdx);
    }

    function prevImage() {
        let prevIdx = currentIndex - 1;
        if (prevIdx < 0) prevIdx = visibleItems.length - 1;
        showImage(prevIdx);
    }

    // Attach click events to items dynamically mapped via current filtered visibility
    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            const indexInFiltered = visibleItems.indexOf(item);
            if(indexInFiltered !== -1) openLightbox(indexInFiltered);
        });
    });

    closeBtn.addEventListener("click", closeLightbox);
    nextBtn.addEventListener("click", nextImage);
    prevBtn.addEventListener("click", prevImage);

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard Navigation
    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("active")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
    });

    /* ==================================================
       4. TOUCH SWIPE SUPPORT FOR MOBILE
    ================================================== */
    let touchStartX = 0;
    let touchEndX = 0;

    swipeArea.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    swipeArea.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        const threshold = 50; // swipe length minimum
        if (touchStartX - touchEndX > threshold) {
            nextImage(); // Swipe left -> Next image
        } else if (touchEndX - touchStartX > threshold) {
            prevImage(); // Swipe right -> Previous image
        }
    }

    /* ==================================================
       5. MOUSE FOLLOW GLOW & PARALLAX CARD TILT (3D)
    ================================================== */
    document.addEventListener("mousemove", (e) => {
        // Glow Follow
        mouseGlow.style.left = `${e.clientX}px`;
        mouseGlow.style.top = `${e.clientY}px`;
    });

    // 3D Card Tilt on Hover
    galleryItems.forEach(item => {
        item.addEventListener("mousemove", (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate tilt angle adjustments max 15deg
            const rx = -((y - rect.height / 2) / (rect.height / 2)) * 15;
            const ry = ((x - rect.width / 2) / (rect.width / 2)) * 15;

            item.style.setProperty("--rx", `${rx}deg`);
            item.style.setProperty("--ry", `${ry}deg`);
        });

        item.addEventListener("mouseleave", () => {
            item.style.setProperty("--rx", `0deg`);
            item.style.setProperty("--ry", `0deg`);
        });
    });

    /* ==================================================
       6. SCROLL REVEAL ANIMATIONS
    ================================================== */
    const revealElements = document.querySelectorAll(".scroll-reveal");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==================================================
       7. FLOATING BACKGROUND PARTICLES
    ================================================== */
    const createParticles = () => {
        const particleCount = 25;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.classList.add("particle");
            
            // Random styling properties
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.top = `${Math.random() * 100}vh`;
            particle.style.opacity = Math.random() * 0.5 + 0.2;

            particlesContainer.appendChild(particle);

            // Animate each point softly up/sideways
            animateParticle(particle);
        }
    };

    function animateParticle(el) {
        let posY = parseFloat(el.style.top);
        let posX = parseFloat(el.style.left);
        const speed = Math.random() * 0.05 + 0.02;
        const swing = Math.random() * 0.02;

        function move() {
            posY -= speed;
            posX += Math.sin(posY / 10) * swing;

            if (posY < -5) {
                posY = 105; // Wrap back to bottom loop
                posX = Math.random() * 100;
            }

            el.style.top = `${posY}vh`;
            el.style.left = `${posX}vw`;
            requestAnimationFrame(move);
        }
        move();
    }
    
    // Block particles processing if users configure reduced motion preferences
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
        createParticles();
    }
});