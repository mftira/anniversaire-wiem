// Security Gate Functionality
function initSecurityGate() {
    const gateElement = document.getElementById('security-gate');
    const mainContent = document.getElementById('main-content');
    const answerInput = document.getElementById('gate-answer');
    const submitButton = document.getElementById('gate-submit');
    const errorElement = document.getElementById('gate-error');
    
    const correctAnswer = 'taha';
    const correctAnswerArabic = 'طه';
    
    function checkAnswer() {
        const userAnswer = answerInput.value.trim().toLowerCase();
        
        if (userAnswer === correctAnswer || answerInput.value.trim() === correctAnswerArabic) {
            // Correct answer - show success and reveal content
            showSuccessAnimation();
            
            setTimeout(() => {
                gateElement.style.animation = 'fadeOut 1s ease-out forwards';
                setTimeout(() => {
                    gateElement.style.display = 'none';
                    mainContent.style.display = 'block';
                    setTimeout(() => {
                        mainContent.classList.add('show');
                        // Initialize main website functionality
                        initMainWebsite();
                    }, 100);
                }, 1000);
            }, 1500);
            
        } else {
            // Wrong answer - show error
            errorElement.style.display = 'block';
            errorElement.style.animation = 'shake 0.5s ease-in-out';
            answerInput.value = '';
            answerInput.style.animation = 'shake 0.5s ease-in-out';
            
            // Haptic feedback on mobile
            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100]);
            }
            
            setTimeout(() => {
                errorElement.style.display = 'none';
                answerInput.style.animation = '';
                answerInput.focus();
            }, 2000);
        }
    }
    
    function showSuccessAnimation() {
        // Create celebration hearts
        const gateContent = document.querySelector('.gate-content');
        createWelcomeHearts(gateContent);
        
        // Update gate content to show success
        const gateTitle = document.querySelector('.gate-title');
        const gateQuestion = document.querySelector('.gate-question');
        
        gateTitle.innerHTML = 'mar7ba ya 7abibti! 💕';
        gateQuestion.innerHTML = '7adher rouhek lel moufej2a hhh...';
        
        // Hide input and button
        document.querySelector('.gate-input-container').style.display = 'none';
        document.querySelector('.gate-hint').style.display = 'none';
        errorElement.style.display = 'none';
    }
    
    function createWelcomeHearts(container) {
        const hearts = ['💖', '💕', '💗', '💘', '💝', '💓'];
        const rect = container.getBoundingClientRect();
        
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.style.position = 'fixed';
                heart.style.left = rect.left + rect.width / 2 + 'px';
                heart.style.top = rect.top + rect.height / 2 + 'px';
                heart.style.fontSize = '25px';
                heart.style.pointerEvents = 'none';
                heart.style.userSelect = 'none';
                heart.style.zIndex = '10001';
                heart.style.transition = 'all 2s ease-out';
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    heart.style.transform = `translate(${(Math.random() - 0.5) * 300}px, ${-Math.random() * 200 - 100}px) scale(0)`;
                    heart.style.opacity = '0';
                }, 100);
                
                setTimeout(() => {
                    if (heart.parentElement) {
                        heart.remove();
                    }
                }, 2100);
            }, i * 150);
        }
    }
    
    // Event listeners
    submitButton.addEventListener('click', checkAnswer);
    
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
    
    // Focus on input when page loads
    setTimeout(() => {
        answerInput.focus();
    }, 1000);
}

// Main website initialization (moved from DOMContentLoaded)
function initMainWebsite() {
    const isMobile = window.innerWidth <= 768;
    
    // Optimize loading for mobile
    if (isMobile) {
        document.body.style.animation = 'fadeIn 0.5s ease-out';
    }
    
    createFloatingHearts();
    addBirthdayInteractions();
    addInteractiveEffects();
    
    // Delay heavy animations on mobile for better performance
    setTimeout(() => {
        showBirthdayMessage();
        addSparkleEffect();
        addSparkleAnimation();
    }, isMobile ? 1000 : 0);
    
    // Add the birthday song button
    addBirthdayMusicButton();
}
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    const hearts = ['💖', '💕', '💗', '💘', '💝', '💓', '💞', '💟', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤍', '🖤'];
    
    // Reduce frequency on mobile
    const isMobile = window.innerWidth <= 768;
    const heartInterval = isMobile ? 1200 : 800;
    const maxHearts = isMobile ? 3 : 5;
    let activeHearts = 0;
    
    function createHeart() {
        if (activeHearts >= maxHearts) return;
        
        const heart = document.createElement('div');
        heart.style.position = 'absolute';
        heart.style.fontSize = (Math.random() * (isMobile ? 15 : 20) + (isMobile ? 8 : 10)) + 'px';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animation = `floatUp ${Math.random() * 2 + (isMobile ? 3 : 4)}s linear infinite`;
        heart.style.pointerEvents = 'none';
        heart.style.userSelect = 'none';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        heartsContainer.appendChild(heart);
        activeHearts++;
        
        setTimeout(() => {
            if (heart.parentElement) {
                heart.remove();
                activeHearts--;
            }
        }, isMobile ? 5000 : 7000);
    }
    
    // Create hearts periodically
    setInterval(createHeart, heartInterval);
}

// Birthday Celebration Interactions (Mobile Optimized)
function addBirthdayInteractions() {
    const birthdayItems = document.querySelectorAll('.birthday-item');
    const isMobile = window.innerWidth <= 768;
    
    birthdayItems.forEach(item => {
        // Use both click and touch events for better mobile support
        const handleInteraction = (e) => {
            e.preventDefault();
            
            // Create celebration effect
            createCelebrationHearts(item);
            
            // Add temporary glow effect
            item.style.transform = 'scale(1.1)';
            item.style.boxShadow = '0 5px 25px rgba(255, 107, 157, 0.8), 0 0 50px rgba(255, 107, 157, 0.4)';
            
            // Haptic feedback on mobile
            if (isMobile && navigator.vibrate) {
                navigator.vibrate(50);
            }
            
            setTimeout(() => {
                item.style.transform = '';
                item.style.boxShadow = '0 5px 15px rgba(255, 107, 157, 0.4)';
            }, 300);
        };
        
        item.addEventListener('click', handleInteraction);
        item.addEventListener('touchstart', handleInteraction, { passive: false });
    });
}

// Love Notes Interaction (Mobile Optimized)
function revealNote(noteElement) {
    const isMobile = window.innerWidth <= 768;
    
    noteElement.classList.toggle('flipped');
    
    // Add haptic feedback on mobile
    if (isMobile && navigator.vibrate && noteElement.classList.contains('flipped')) {
        navigator.vibrate(30);
    }
    
    // Add a little celebration effect
    if (noteElement.classList.contains('flipped')) {
        createCelebrationHearts(noteElement);
    }
}

function createCelebrationHearts(element) {
    const rect = element.getBoundingClientRect();
    const hearts = ['💖', '💕', '💗', '💘'];
    const isMobile = window.innerWidth <= 768;
    const heartCount = isMobile ? 3 : 5;
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.style.position = 'fixed';
            heart.style.left = rect.left + rect.width / 2 + 'px';
            heart.style.top = rect.top + rect.height / 2 + 'px';
            heart.style.fontSize = isMobile ? '16px' : '20px';
            heart.style.pointerEvents = 'none';
            heart.style.userSelect = 'none';
            heart.style.zIndex = '1000';
            heart.style.transition = 'all 1s ease-out';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            
            document.body.appendChild(heart);
            
            // Animate the heart
            setTimeout(() => {
                const moveDistance = isMobile ? 100 : 200;
                heart.style.transform = `translate(${(Math.random() - 0.5) * moveDistance}px, ${-Math.random() * 50 - 30}px) scale(0)`;
                heart.style.opacity = '0';
            }, 100);
            
            setTimeout(() => {
                if (heart.parentElement) {
                    heart.remove();
                }
            }, 1100);
        }, i * 100);
    }
}

// Scroll animations
function handleScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('[style*="animation"]');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Interactive hover effects (Mobile Optimized)
function addInteractiveEffects() {
    const isMobile = window.innerWidth <= 768;
    
    // Add hover effect to memory cards
    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach(card => {
        if (!isMobile) {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        }
        
        // Touch interaction for mobile
        card.addEventListener('touchstart', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        }, { passive: true });
        
        card.addEventListener('touchend', () => {
            setTimeout(() => {
                card.style.transform = 'translateY(0) scale(1)';
            }, 200);
        }, { passive: true });
    });
    
    // Add click effect to wish items
    const wishItems = document.querySelectorAll('.wish-item');
    wishItems.forEach(item => {
        const handleInteraction = (e) => {
            if (e.type === 'touchstart') {
                e.preventDefault();
            }
            
            item.style.transform = isMobile ? 'translateX(10px) scale(1.02)' : 'translateX(20px) scale(1.05)';
            
            // Haptic feedback on mobile
            if (isMobile && navigator.vibrate) {
                navigator.vibrate(30);
            }
            
            setTimeout(() => {
                item.style.transform = isMobile ? 'translateX(5px) scale(1)' : 'translateX(10px) scale(1)';
            }, 200);
            
            // Create small celebration
            createCelebrationHearts(item);
        };
        
        item.addEventListener('click', handleInteraction);
        if (isMobile) {
            item.addEventListener('touchstart', handleInteraction, { passive: false });
        }
    });
}

// Birthday message that appears after a delay
function showBirthdayMessage() {
    setTimeout(() => {
        const message = document.createElement('div');
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.background = 'rgba(255, 107, 157, 0.95)';
        message.style.color = 'white';
        message.style.padding = '30px';
        message.style.borderRadius = '20px';
        message.style.textAlign = 'center';
        message.style.fontSize = '1.2rem';
        message.style.fontFamily = "'Dancing Script', cursive";
        message.style.zIndex = '10000';
        message.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        message.style.maxWidth = '90%';
        message.style.width = '400px';
        message.style.opacity = '0';
        message.style.transform = 'translate(-50%, -50%) scale(0.8)';
        message.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        message.innerHTML = `
            <h3 style="font-size: 2rem; margin-bottom: 15px;">🎉 moufej2a! 🎉</h3>
            <p>nchallah l site he4a yaamellik dhe7ka aala wejhek ya mezyenti!</p>
            <p style="margin-top: 10px; font-style: italic;">b'kol 7obi 💕</p>
            <button onclick="closeMessage(this.parentElement)" style="margin-top: 20px; padding: 10px 20px; background: white; color: #ff6b9d; border: none; border-radius: 10px; cursor: pointer; font-weight: bold; transition: all 0.3s ease;">saker 💖</button>
        `;
        
        document.body.appendChild(message);
        
        // Trigger animation after element is added to DOM
        setTimeout(() => {
            message.style.opacity = '1';
            message.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);
        
        // Auto remove after 10 seconds
        setTimeout(() => {
            if (message.parentElement) {
                closeMessage(message);
            }
        }, 10000);
    }, 3000);
}

// Function to close message with animation
function closeMessage(messageElement) {
    messageElement.style.opacity = '0';
    messageElement.style.transform = 'translate(-50%, -50%) scale(0.8)';
    setTimeout(() => {
        if (messageElement.parentElement) {
            messageElement.remove();
        }
    }, 500);
}

// Add sparkle effect on mouse move (Disabled on Mobile)
function addSparkleEffect() {
    const isMobile = window.innerWidth <= 768;
    
    // Disable sparkle effect on mobile to improve performance
    if (isMobile) return;
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create sparkle occasionally
        if (Math.random() < 0.1) {
            createSparkle(mouseX, mouseY);
        }
    });
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.background = '#fff';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'sparkle 1s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle animation to CSS dynamically
function addSparkleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1) rotate(180deg);
                opacity: 1;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Start with security gate
    initSecurityGate();
});

// Move the birthday music button to a separate function
function addBirthdayMusicButton() {
    // Add a special birthday song button (optional)
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    const musicButton = document.createElement('button');
    musicButton.innerHTML = '🎵 a3mel ghnaya 3id milad';
    musicButton.style.cssText = `
        background: linear-gradient(135deg, #ff6b9d, #c44569);
        color: white;
        border: none;
        padding: 15px 30px;
        border-radius: 25px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        margin-top: 20px;
        box-shadow: 0 5px 15px rgba(255, 107, 157, 0.4);
        transition: all 0.3s ease;
    `;
    
    musicButton.addEventListener('mouseenter', () => {
        musicButton.style.transform = 'translateY(-2px)';
        musicButton.style.boxShadow = '0 8px 20px rgba(255, 107, 157, 0.6)';
    });
    
    musicButton.addEventListener('mouseleave', () => {
        musicButton.style.transform = 'translateY(0)';
        musicButton.style.boxShadow = '0 5px 15px rgba(255, 107, 157, 0.4)';
    });
    
    musicButton.addEventListener('click', () => {
        // Create a fun birthday song using Web Audio API
        playBirthdaySong();
        musicButton.textContent = '🎵 9a3da nel3ab...';
        setTimeout(() => {
            musicButton.innerHTML = '🎵 a3mel ghnaya 3id milad';
        }, 5000);
    });
    
    heroSection.appendChild(musicButton);
}

// Simple birthday song using Web Audio API
function playBirthdaySong() {
    if (!window.AudioContext && !window.webkitAudioContext) {
        alert('🎵 3id miladek sa3id ya wiem! 🎵\n(l audio mech supported fil browser hedha)');
        return;
    }
    
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    
    // Happy Birthday melody (simplified)
    const notes = [
        { freq: 261.63, duration: 0.4 }, // C
        { freq: 261.63, duration: 0.2 }, // C
        { freq: 293.66, duration: 0.4 }, // D
        { freq: 261.63, duration: 0.4 }, // C
        { freq: 349.23, duration: 0.4 }, // F
        { freq: 329.63, duration: 0.8 }, // E
    ];
    
    let currentTime = audioContext.currentTime;
    
    notes.forEach(note => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(note.freq, currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + note.duration);
        
        oscillator.start(currentTime);
        oscillator.stop(currentTime + note.duration);
        
        currentTime += note.duration;
    });
}
