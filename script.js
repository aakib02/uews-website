document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark Mode System
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('uews-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('uews-theme', newTheme);
        });
    }

    // 2. Mobile Nav Hamburger Controls
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if(navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
// 3. Optimized Counter Animation Engine (Smooth & Precise)
    const counters = document.querySelectorAll('.stat-counter');
    if(counters.length > 0) {
        const startCounterAnimation = (counter) => {
            const target = +counter.getAttribute('data-target');
            const speed = 40; // एनीमेशन की स्पीड (जितना कम नंबर, उतना तेज़)
            const increment = target / speed;

            const updateCount = () => {
                const currentCount = +counter.innerText;
                if (currentCount < target) {
                    counter.innerText = Math.ceil(currentCount + increment);
                    setTimeout(updateCount, 25); // हर 25ms में नंबर बढ़ेगा
                } else {
                    counter.innerText = target; // अंत में सटीक नंबर सेट करें
                }
            };
            updateCount();
        };

        // Intersection Observer: जब स्क्रीन स्क्रॉल होकर नीचे आएगी तब शुरू होगा
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    // सभी काउंटर्स को एक-एक करके चालू करें
                    counters.forEach(counter => startCounterAnimation(counter));
                    observer.disconnect(); // एनीमेशन सिर्फ एक बार चलाने के लिए
                }
            });
        }, { threshold: 0.2 }); // 20% सेक्शन दिखते ही एनीमेशन शुरू हो जाएगा
        
        const statsSec = document.querySelector('.stats-section');
        if(statsSec) observer.observe(statsSec);
    }

    // 4. Client Side Pipeline Logic / Local Data Engine// 4. Client Side & Server Submit Pipeline Logic
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const form = e.target;
            const button = form.querySelector('button');
            const statusMessage = document.getElementById('contactStatus');
            
            button.innerText = "Sending...";
            button.disabled = true;

            const formData = new FormData(form);
            
            // Local Backup Engine
            const leadObject = {
                id: 'INQUIRY_' + Date.now(),
                timestamp: new Date().toISOString(),
                source: window.location.pathname
            };
            formData.forEach((value, key) => { leadObject[key] = value; });
            let database = JSON.parse(localStorage.getItem('uews_leads') || '[]');
            database.push(leadObject);
            localStorage.setItem('uews_leads', JSON.stringify(database));

            // Server Transmission
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if(response.ok) {
                    statusMessage.style.display = "block";
                    form.reset();
                    setTimeout(() => { statusMessage.style.display = "none"; }, 5000);
                } else {
                    alert("Submission failed. Please try again.");
                }
                button.innerText = "Transmit Secure Message";
                button.disabled = false;
            })
            .catch(error => {
                alert("Connection error. Please check your internet.");
                button.innerText = "Transmit Secure Message";
                button.disabled = false;
            });
        });
    }

    // 5. Masonry Gallery Lightbox Controller
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');

    if(lightbox && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').getAttribute('src');
                lightboxImg.setAttribute('src', imgSrc);
                lightbox.classList.add('active');
            });
        });

        lightbox.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }

    // 6. Gallery Filtering Engine
    const filterButtons = document.querySelectorAll('.filter-btn');
    if(filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if(filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});