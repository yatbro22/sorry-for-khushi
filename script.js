let currentPage = 1;
const totalPages = 3;
const bgAudio = document.getElementById('bgAudio');
let audioPlaying = false;

// Initialize particle effects
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
let mouseX = 0;
let mouseY = 0;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = `rgba(255, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${this.opacity})`;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.002;
        
        if (this.opacity <= 0) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

// Create particles
for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Heart animation
function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '-50px';
    heart.style.fontSize = Math.random() * 20 + 20 + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '5';
    heart.style.animation = 'fall 3s ease-in-out forwards';
    
    document.getElementById('hearts-container').appendChild(heart);
    
    setTimeout(() => heart.remove(), 3000);
}

// Sparkle animation
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.fontSize = Math.random() * 15 + 15 + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '5';
    sparkle.style.animation = 'twinkle 1s ease-in-out forwards';
    
    document.getElementById('sparkles-container').appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

// Add CSS animations for hearts and sparkles
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(100vh) scale(0);
        }
    }
    
    @keyframes twinkle {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        50% {
            opacity: 0.5;
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(style);

// Create hearts and sparkles at intervals
setInterval(createHeart, 500);
setInterval(createSparkle, 300);

// Toggle audio
function toggleAudio() {
    if (!audioPlaying) {
        bgAudio.play();
        audioPlaying = true;
    }
}

// Next page functionality
function nextPage() {
    if (currentPage < totalPages) {
        document.getElementById('page' + currentPage).classList.remove('active');
        currentPage++;
        document.getElementById('page' + currentPage).classList.add('active');
        
        // Create extra effects on page 3
        if (currentPage === 3) {
            createConfetti();
            for (let i = 0; i < 10; i++) {
                setTimeout(createHeart, i * 100);
            }
        }
    }
}

// Confetti effect
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.innerHTML = ['🌷', '💕', '✨', '💐'][Math.floor(Math.random() * 4)];
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-50px';
        confetti.style.fontSize = Math.random() * 25 + 20 + 'px';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '5';
        confetti.style.animation = `fall ${Math.random() * 2 + 3}s ease-in-out forwards`;
        confetti.style.animationDelay = (i * 50) + 'ms';
        
        document.getElementById('hearts-container').appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Responsive canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Mouse move effect
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        createSparkle();
    }
});