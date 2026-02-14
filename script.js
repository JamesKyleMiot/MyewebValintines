// Floating hearts animation
function createFloatingHeart() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞'];
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 10000);
}

// Create hearts periodically
setInterval(createFloatingHeart, 500);

// Create initial batch of hearts
for (let i = 0; i < 10; i++) {
    setTimeout(createFloatingHeart, i * 200);
}

// Music button functionality
const musicBtn = document.getElementById('musicBtn');
let isPlaying = false;

musicBtn.addEventListener('click', function() {
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        musicBtn.classList.add('playing');
        musicBtn.querySelector('.btn-text').textContent = 'Music Playing';
        playRomanticSounds();
    } else {
        musicBtn.classList.remove('playing');
        musicBtn.querySelector('.btn-text').textContent = 'Play Music';
        stopSounds();
    }
});

// Audio context for romantic sounds (using Web Audio API)
let audioContext;
let oscillator;
let gainNode;

function playRomanticSounds() {
    // Create audio context
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Play a soothing melody
    playMelody();
}

function playMelody() {
    // Romantic melody notes (simplified)
    const melody = [
        { freq: 523.25, duration: 0.5 }, // C5
        { freq: 587.33, duration: 0.5 }, // D5
        { freq: 659.25, duration: 0.5 }, // E5
        { freq: 698.46, duration: 0.5 }, // F5
        { freq: 783.99, duration: 1.0 }, // G5
        { freq: 659.25, duration: 0.5 }, // E5
        { freq: 698.46, duration: 0.5 }, // F5
        { freq: 783.99, duration: 1.5 }, // G5
    ];
    
    let time = audioContext.currentTime;
    
    melody.forEach(note => {
        playNote(note.freq, time, note.duration);
        time += note.duration;
    });
    
    // Loop the melody
    if (isPlaying) {
        setTimeout(() => {
            if (isPlaying) playMelody();
        }, time * 1000 - audioContext.currentTime * 1000);
    }
}

function playNote(frequency, startTime, duration) {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    osc.frequency.value = frequency;
    osc.type = 'sine';
    
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.1, startTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
}

function stopSounds() {
    if (audioContext) {
        audioContext.close();
        audioContext = null;
    }
}

// Add sparkle effect on mouse move
document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.95) {
        createSparkle(e.pageX, e.pageY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.fontSize = '20px';
    sparkle.style.animation = 'sparkleAnimation 1s ease-out forwards';
    sparkle.style.zIndex = '1000';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleAnimation {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Add touch effect for mobile devices
document.addEventListener('touchstart', function(e) {
    const touch = e.touches[0];
    createSparkle(touch.pageX, touch.pageY);
});

// Scroll reveal animation for letter content
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Observe message paragraphs
document.querySelectorAll('.message p').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `all 0.6s ease ${index * 0.2}s`;
    observer.observe(el);
});

// Add click effect on hearts
document.querySelectorAll('.heart').forEach(heart => {
    heart.addEventListener('click', function() {
        this.style.transform = 'scale(2) rotate(360deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0deg)';
        }, 600);
    });
});

// Console message for the developer
console.log('%c💖 Happy Valentine\'s Day! 💖', 'color: #ff1493; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%cThis page was made with love 💕', 'color: #ff69b4; font-size: 16px; font-style: italic;');
