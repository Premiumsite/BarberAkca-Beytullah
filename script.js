/* ==========================================================================
   CYBERPUNK STUDIO ENGINE INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. SİSTEM INITIALIZING PRELOADER
    const preloader = document.getElementById('cyber-preloader');
    const progressBar = document.getElementById('load-progress');
    const counter = document.getElementById('status-counter');
    let progress = 0;

    const loaderInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 12) + 4;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loaderInterval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => preloader.style.display = 'none', 500);
            }, 400);
        }
        progressBar.style.width = `${progress}%`;
        counter.innerText = `${progress}%`;
    }, 60);

    // 2. MATRIX / SİBER YAĞMURA BAĞLI ARKA PLAN MATRİSİ
    const canvas = document.getElementById('cyber-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const maxParticles = 45;

    class CyberParticle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -50 - Math.random() * 100;
            this.speed = Math.random() * 4 + 2;
            this.length = Math.random() * 40 + 20;
            this.opacity = Math.random() * 0.25 + 0.05;
        }
        update() {
            this.y += this.speed;
            if (this.y > canvas.height) { this.reset(); }
        }
        draw() {
            ctx.beginPath();
            let gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.length);
            gradient.addColorStop(0, 'transparent');
            gradient.addColorStop(1, `rgba(0, 240, 255, ${this.opacity})`);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + this.length);
            ctx.stroke();
        }
    }

    for (let i = 0; i < maxParticles; i++) { particles.push(new CyberParticle()); }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // 3. SEKMELİ FİLTRE MOTORU
    const tabButtons = document.querySelectorAll('.tab-btn');
    const priceItems = document.querySelectorAll('.price-item');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const target = btn.getAttribute('data-target');

            priceItems.forEach(item => {
                if (target === 'all') {
                    item.style.display = 'flex';
                } else {
                    if (item.getAttribute('data-category') === target) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });

    // 4. AKORDİYON SSS KONTROLÜ
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
            if (!isActive) { item.classList.add('active'); }
        });
    });

    // 5. CANLI DÜKKAN DURUM ANALİZ MOTORU
    function checkShopStatus() {
        const statusBadge = document.getElementById('live-status');
        const statusText = statusBadge.querySelector('.status-text');
        const now = new Date();
        const currentDay = now.getDay();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        
        const currentTimeInMinutes = (currentHour * 60) + currentMinute;
        const openTimeInMinutes = (8 * 60) + 30; // 08:30
        const closeTimeInMinutes = (24 * 60);    // 00:00

        statusBadge.classList.remove('status-open', 'status-closed');

        if (currentDay === 0) {
            statusBadge.classList.add('status-closed');
            statusText.innerText = "SİSTEM DURUMU: OFFLINE // BUGÜN KAPALIYIZ";
        } else {
            if (currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes) {
                statusBadge.classList.add('status-open');
                statusText.innerText = "SİSTEM DURUMU: ONLINE // KOLTUKLAR AKTİF";
            } else {
                statusBadge.classList.add('status-closed');
                statusText.innerText = "SİSTEM DURUMU: OFFLINE // MESAİ DIŞI";
            }
        }
    }

    checkShopStatus();
    setInterval(checkShopStatus, 60000);
});