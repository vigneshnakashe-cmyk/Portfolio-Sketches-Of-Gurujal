
var typed = new Typed(".text", {
    strings: [
        "Kajal Nakashe",
        "Portrait Sketches Artist",
        "Pencil Sketches Artist",
        "Craft Artist",
        "Wall Painting Artist",
        "Drawing Teacher"
    ],
    typeSpeed: 70,
    backSpeed: 50,
    loop: true,
    smartBackspace: true
});


// Music player functions are defined once in index.html to avoid duplicate overrides.\n\n// NAYA HAMBURGER TOGGLE — Bootstrap se independent, no conflict
document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById('menu-icon');
  const navbar = document.querySelector('.mynavbar');

  if (menuIcon && navbar) {
    menuIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      navbar.classList.toggle('active');
      menuIcon.classList.toggle('bx-x');   // hamburger ↔ cross icon switch
    });

    // Bahar click karne par navbar band ho jaye
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
      }
    });

    // Kisi link pe click karne se navbar auto-close ho
    navbar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
      });
    });
  }
});

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const content = document.getElementById("content");
    if(loader) loader.style.display = "none";
    if(content) content.style.display = "block";
});

document.addEventListener("DOMContentLoaded", () => {
  const radialBars = document.querySelectorAll(".radial-bars");
  const linearBars = document.querySelectorAll(".progress-line span");

  // Reset radial bars
  radialBars.forEach(el => el.classList.remove("active"));

  // Reset linear bars to 0 width
  linearBars.forEach(bar => {
    bar.style.animation = "none";
    bar.style.width = "0";
  });

  // Observe the skills sections
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          radialBars.forEach(el => el.classList.add("active"));
          linearBars.forEach(bar => {
            bar.style.animation = "fillBar 2s forwards";
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  const artistsSection = document.getElementById("artists-skills");
  const creativeSection = document.getElementById("creative-skills");

  if (artistsSection) observer.observe(artistsSection);
  if (creativeSection) observer.observe(creativeSection);
});

window.addEventListener("load", () => {
    const container = document.querySelector(".skills-container");
    const bars = document.querySelectorAll(".progress-bar");

    bars.forEach(bar => {
        bar.style.width = "0%";
    });

    setTimeout(() => {
        bars.forEach(bar => {
            const value = bar.getAttribute("data-width");
            bar.style.width = value + "%";
        });
        if (container) {
            container.classList.add("active");
        }
    }, 300);
});

/*==============================
 PREMIUM FOOTER JAVASCRIPT
===============================*/

const scrollBtn = document.getElementById("scrollTop");
if(scrollBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = "1";
            scrollBtn.style.visibility = "visible";
            scrollBtn.style.transform = "translateY(0)";
        } else {
            scrollBtn.style.opacity = "0";
            scrollBtn.style.visibility = "hidden";
            scrollBtn.style.transform = "translateY(30px)";
        }
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    });
}

const footer = document.querySelector(".footer-section");
if(footer){
    const footerObserver = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                footer.classList.add("footer-show");
            }
        });
    },{threshold:.3});
    footerObserver.observe(footer);
}

// Mouse Glow
const glow = document.createElement("div");
glow.className = "mouse-glow";
document.body.appendChild(glow);

document.addEventListener("mousemove",(e)=>{
    glow.style.left = e.pageX + "px";
    glow.style.top = e.pageY + "px";
});

// Floating Particles
const footerParticles = document.querySelector(".footer-section");
if (footerParticles) {
    for (let i = 0; i < 35; i++) {
        const p = document.createElement("span");
        p.className = "particle";
        p.style.left = Math.random() * 100 + "%";
        p.style.animationDuration = 5 + Math.random() * 8 + "s";
        p.style.animationDelay = Math.random() * 5 + "s";
        p.style.width = 3 + Math.random() * 6 + "px";
        p.style.height = p.style.width;
        footerParticles.appendChild(p);
    }
}

// Ripple Effect
document.querySelectorAll(".footer-social a").forEach(btn=>{
    btn.addEventListener("click",function(e){
        const circle = document.createElement("span");
        circle.classList.add("ripple");
        this.appendChild(circle);
        const d = Math.max(this.clientWidth,this.clientHeight);
        circle.style.width = d + "px";
        circle.style.height = d + "px";
        circle.style.left = e.offsetX - d/2 + "px";
        circle.style.top = e.offsetY - d/2 + "px";
        setTimeout(()=>{
            circle.remove();
        },700);
    });
});

// Typing Quote
const quote = document.querySelector(".footer-quote h4");
const text = 'Turning Memories Into Timeless Sketches.';
let i = 0;
if(quote) {
    quote.innerHTML = "";
    function typing(){
        if(i < text.length){
            quote.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, 70);
        }
    }
    setTimeout(typing, 1000);
}

// Social Icon Hover
document.querySelectorAll(".footer-social a").forEach(icon=>{
    icon.addEventListener("mouseenter",()=>{
        icon.style.transform = "translateY(-10px) scale(1.18) rotate(10deg)";
    });
    icon.addEventListener("mouseleave",()=>{
        icon.style.transform = "translateY(0) scale(1) rotate(0deg)";
    });
});

// Parallax Footer
if(footer) {
    window.addEventListener("mousemove",(e)=>{
        const x = (window.innerWidth/2 - e.pageX)/40;
        const y = (window.innerHeight/2 - e.pageY)/40;
        footer.style.backgroundPosition = x + "px " + y + "px";
    });
}

// Floating Light
if(footer) {
    setInterval(()=>{
        const light = document.createElement("div");
        light.className = "light";
        light.style.left = Math.random() * 100 + "%";
        footer.appendChild(light);
        setTimeout(()=>{
            light.remove();
        },6000);
    },1200);
}

// Footer Cards Hover
document.querySelectorAll(".footer-section .col-lg-4, .footer-section .col-lg-3, .footer-section .col-lg-2").forEach(card=>{
    card.addEventListener("mousemove",(e)=>{
        const x = e.offsetX / card.offsetWidth * 20 - 10;
        const y = e.offsetY / card.offsetHeight * 20 - 10;
        card.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    });
    card.addEventListener("mouseleave",()=>{
        card.style.transform = "rotateY(0) rotateX(0)";
    });
});

// Random Glow Pulse
setInterval(()=>{
    document.querySelectorAll(".footer-social a").forEach(icon=>{
        icon.style.boxShadow = "0 0 25px gold";
        setTimeout(()=>{
            icon.style.boxShadow = "";
        },600);
    });
},5000);

// Scroll Progress
window.addEventListener("scroll",()=>{
    const progressLine = document.querySelector(".footer-top-line");
    if(progressLine) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const sc = window.scrollY / h * 100;
        progressLine.style.width = sc + "%";
    }
});

console.log("Premium Footer Loaded Successfully 🔥");

function likeSketch(btn){
  let countSpan = btn.nextElementSibling;
  let count = parseInt(countSpan.innerText);
  count++;
  countSpan.innerText = count + " Likes";
}

function showOptions(btn){
  let dropdown = btn.nextElementSibling;
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

const buttons = document.querySelectorAll(".like-btn");
buttons.forEach(button => {
    const id = button.dataset.id;
    const count = document.getElementById("like-count-" + id);
    if(!count) return;

    let likes = Number(localStorage.getItem("likes_" + id)) || 0;
    let liked = localStorage.getItem("liked_" + id) === "true";

    count.textContent = likes;

    if(liked){
        button.classList.add("liked");
        button.innerHTML = "💖 Liked";
    }

    button.addEventListener("click",()=>{
        if(!liked){
            likes++;
            liked = true;
            button.classList.add("liked");
            button.innerHTML = "💖 Liked";
        }else{
            likes--;
            liked = false;
            button.classList.remove("liked");
            button.innerHTML = "❤️ Like";
        }
        count.textContent = likes;
        localStorage.setItem("likes_" + id, likes);
        localStorage.setItem("liked_" + id, liked);
    });
});

/*=========================================
      TESTIMONIALS - BOOTSTRAP 5
=========================================*/
document.addEventListener("DOMContentLoaded", function () {
    const testimonialCarousel = document.querySelector("#testimonialCarousel");
    if (!testimonialCarousel) return;

    const carousel = new bootstrap.Carousel(testimonialCarousel, {
        interval: 4500,
        ride: "carousel",
        wrap: true,
        keyboard: true,
        pause: "hover"
    });

    document.addEventListener("keydown", function(e){
        if(e.key === "ArrowLeft") carousel.prev();
        if(e.key === "ArrowRight") carousel.next();
    });

    testimonialCarousel.addEventListener("slide.bs.carousel", function(){
        document.querySelectorAll(".testimonial-card").forEach(card=>{
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
        });
    });

    testimonialCarousel.addEventListener("slid.bs.carousel", function(){
        document.querySelectorAll(".testimonial-card").forEach(card=>{
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        });
    });

    testimonialCarousel.addEventListener("mouseleave", function () {
        carousel.cycle();
    });
});

/*=========================================
      IMAGE HOVER & STAR RATING
=========================================*/
document.querySelectorAll(".student-image").forEach(img => {
    img.addEventListener("mouseenter", () => { img.style.transform = "scale(1.08)"; });
    img.addEventListener("mouseleave", () => { img.style.transform = "scale(1)"; });
});

document.querySelectorAll(".rating").forEach(star => {
    star.addEventListener("mouseenter", () => { star.style.transform = "scale(1.12)"; });
    star.addEventListener("mouseleave", () => { star.style.transform = "scale(1)"; });
});

/*=========================================
      SERVICES SECTION V3.0 RE-FIXED
=========================================*/
document.addEventListener("DOMContentLoaded", () => {
    const dropBtn = document.querySelector(".dropbtn");
    const dropContent = document.querySelector(".dropdown-content");

    if (dropBtn && dropContent) {
        dropBtn.addEventListener("click", (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropContent.classList.toggle("show");
            }
        });
    }

/*=========================================
   SERVICES — LEARN MORE FUNCTIONALITY
=========================================*/

document.querySelectorAll(".service-box .learn-btn").forEach(button => {

    button.addEventListener("click", function () {

        const serviceBox = this.closest(".service-box");

        if (!serviceBox) return;

        const moreText = serviceBox.querySelector(".more-text");

        if (!moreText) return;

        const isOpen = moreText.classList.toggle("show");

        this.textContent = isOpen ? "Show Less" : "Learn More";

        this.setAttribute("aria-expanded", isOpen);

    });

});

    const serviceCards = document.querySelectorAll(".service-box");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.20,
            rootMargin: "0px 0px -40px 0px"
        });

        serviceCards.forEach((card) => { revealObserver.observe(card); });
    } else {
        serviceCards.forEach((card) => { card.classList.add("show"); });
    }

    // TILT EFFECT
    serviceCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotateX = ((y - cy) / cy) * -8;
            const rotateY = ((x - cx) / cx) * 8;

            card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;

            const light = card.querySelector(".mouse-light");
            if (light) {
                light.style.left = x + "px";
                light.style.top = y + "px";
            }
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });

    // FLOATING PARTICLES
    document.querySelectorAll(".service-box .particles").forEach((container) => {
        const sizes = ["small", "medium", "medium", "large"];
        for (let i = 0; i < 9; i++) {
            const span = document.createElement("span");
            span.className = sizes[Math.floor(Math.random() * sizes.length)];
            span.style.left = Math.random() * 100 + "%";
            span.style.animationDuration = (5 + Math.random() * 5) + "s";
            span.style.animationDelay = (Math.random() * 6) + "s";
            container.appendChild(span);
        }
    });
});


/* =========================================
   EMAILJS — PORTFOLIO CONTACT FORM
========================================= */

/*document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");

    if (!contactForm) return;

    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        if (typeof emailjs === "undefined") {
            alert("EmailJS load nahi hua. SDK script check karo.");
            return;
        }

        const submitButton = contactForm.querySelector(
            'input[type="submit"]'
        );

        const originalText = submitButton
            ? submitButton.value
            : "Submit";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.value = "Sending...";
        }

        try {
            // Form fields aur configured file attachment bhejo
            const response = await emailjs.sendForm(
                "service_3qbczmc",
                "template_ptx68co",
                contactForm
            );

            console.log("EmailJS success:", response.status);

            alert(
                "✅ Enquiry sent successfully! Thank you for contacting Gurujal Art Studio."
            );

            contactForm.reset();

        } catch (error) {
            console.error("EmailJS error:", error);

            alert(
                "❌ Email send nahi hua.\n" +
                (error.text || error.message || "EmailJS settings check karo.")
            );

        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.value = originalText;
            }
        }
    });
});*/



/*=========================================
   EMAILJS + CLOUDINARY CUSTOMER IMAGE UPLOAD
=========================================*/

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const selectedFile = document.getElementById("reference_image").files[0];

        // Check image
        if (!selectedFile) {
            alert("Please upload your reference image!");
            return;
        }

        // Allow only JPG, JPEG, PNG, WEBP
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(selectedFile.type)) {
            alert("Only JPG, PNG and WEBP images are allowed!");
            return;
        }

        // Maximum 5 MB
        if (selectedFile.size > 5 * 1024 * 1024) {
            alert("Image size must be less than 5 MB!");
            return;
        }

        const submitButton = contactForm.querySelector('input[type="submit"]');
        const originalText = submitButton.value;

        try {

            submitButton.disabled = true;
            submitButton.value = "Uploading Image...";

            // STEP 1: Upload customer image to Cloudinary

            const cloudinaryData = new FormData();

            cloudinaryData.append("file", selectedFile);

            cloudinaryData.append(
                "upload_preset",
                "kajal_customer_upload"
            );

            const cloudinaryResponse = await fetch(
                "https://api.cloudinary.com/v1_1/tkugjatb/image/upload",
                {
                    method: "POST",
                    body: cloudinaryData
                }
            );

            const cloudinaryResult = await cloudinaryResponse.json();

            if (!cloudinaryResponse.ok || !cloudinaryResult.secure_url) {
                throw new Error(
                    cloudinaryResult.error?.message || "Cloudinary upload failed!"
                );
            }

            // Get customer's uploaded image URL

            const imageURL = cloudinaryResult.secure_url;

            const imageName = selectedFile.name;

            // STEP 2: Send customer details + image URL through EmailJS

            submitButton.value = "Sending Enquiry...";

            await emailjs.send(
                "service_3qbczmc",
                "template_15wotp8",
                {
                    name: document.getElementById("name").value,
                    email: document.getElementById("email").value,
                    phone: document.getElementById("phone").value,
                    address: document.getElementById("address").value,
                    artwork: document.getElementById("artwork").value,
                    budget: document.getElementById("budget").value,
                    delivery: document.getElementById("delivery").value,
                    subject: document.getElementById("subject").value,
                    message: document.getElementById("message").value,

                    // Customer image details
                    reference_image_url: imageURL,
                    reference_image_name: imageName
                }
            );

            // STEP 3: Success

            alert("✅ Your enquiry and reference image have been sent successfully!");

            contactForm.reset();

       } catch (error) {

    console.error("Contact Form Error:", error);

    const errorMessage =
        error?.text ||
        error?.message ||
        (typeof error === "string" ? error : JSON.stringify(error)) ||
        "Unknown error";

    alert("❌ Something went wrong: " + errorMessage);

} finally {

            submitButton.disabled = false;
            submitButton.value = originalText;

        }

    });

}


/* =========================================
   GURUJAL - UNIVERSAL IMAGE LIGHTBOX
   Home + Sketches + Testimonials
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const lightbox = document.createElement("div");
    lightbox.className = "site-image-lightbox";

    lightbox.innerHTML = `
        <button class="site-image-close" aria-label="Close">&times;</button>

        <button class="site-image-nav site-image-prev" aria-label="Previous">
            &#10094;
        </button>

        <img src="" alt="Full Screen Artwork">

        <button class="site-image-nav site-image-next" aria-label="Next">
            &#10095;
        </button>

        <div class="site-image-counter"></div>
    `;

    document.body.appendChild(lightbox);

    const preview = lightbox.querySelector("img");
    const closeBtn = lightbox.querySelector(".site-image-close");
    const prevBtn = lightbox.querySelector(".site-image-prev");
    const nextBtn = lightbox.querySelector(".site-image-next");
    const counter = lightbox.querySelector(".site-image-counter");

    let currentImages = [];
    let currentIndex = 0;
    let startX = 0;

    function getGroup(img) {
        if (img.matches(".home-img img")) {
            return [".home-img img"];
        }

        if (img.matches(".student-image")) {
            return [".student-image"];
        }

        return [".sketch-card img"];
    }

    function openImage(img) {
        const selectors = getGroup(img);

        currentImages = [...document.querySelectorAll(selectors[0])]
            .filter(image => image.src && image.naturalWidth > 0);

        currentIndex = currentImages.indexOf(img);

        if (currentIndex < 0) return;

        showImage();
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function showImage() {
        const img = currentImages[currentIndex];

        if (!img) return;

        preview.src = img.currentSrc || img.src;
        preview.alt = img.alt || "Artwork Preview";

        counter.textContent =
            `${currentIndex + 1} / ${currentImages.length}`;

        const multiple = currentImages.length > 1;

        prevBtn.style.display = multiple ? "block" : "none";
        nextBtn.style.display = multiple ? "block" : "none";
    }

    function closeImage() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        preview.src = "";
    }

    function previousImage() {
        if (currentImages.length < 2) return;

        currentIndex =
            (currentIndex - 1 + currentImages.length) %
            currentImages.length;

        showImage();
    }

    function nextImage() {
        if (currentImages.length < 2) return;

        currentIndex =
            (currentIndex + 1) % currentImages.length;

        showImage();
    }

    // Open only Home, Sketches and Testimonials images
    document.addEventListener("click", function (e) {

        const img = e.target.closest("img");

        if (!img) return;

        // Existing Gallery stays untouched
        if (img.closest("#gallery, .gallery")) return;

        if (
            img.matches(".home-img img") ||
            img.matches(".sketch-card img") ||
            img.matches(".student-image")
        ) {
            e.preventDefault();
            openImage(img);
        }
    });

    closeBtn.addEventListener("click", closeImage);
    prevBtn.addEventListener("click", previousImage);
    nextBtn.addEventListener("click", nextImage);

    lightbox.addEventListener("click", function(e) {
        if (e.target === lightbox) {
            closeImage();
        }
    });

    // Keyboard controls
    document.addEventListener("keydown", function(e) {

        if (!lightbox.classList.contains("active")) return;

        if (e.key === "Escape") closeImage();
        if (e.key === "ArrowLeft") previousImage();
        if (e.key === "ArrowRight") nextImage();

    });

    // Mobile swipe
    preview.addEventListener("touchstart", function(e) {
        startX = e.changedTouches[0].screenX;
    }, { passive: true });

    preview.addEventListener("touchend", function(e) {

        const endX = e.changedTouches[0].screenX;
        const difference = endX - startX;

        if (Math.abs(difference) > 50) {
            if (difference > 0) {
                previousImage();
            } else {
                nextImage();
            }
        }

    }, { passive: true });

    console.log("Gurujal Universal Image Lightbox Loaded!");

});
