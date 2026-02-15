// Initialize Lucide icons
lucide.createIcons();

// Mouse Spotlight Logic
const spotlight = document.getElementById('cursor-spotlight');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;
let velocity = 0;
let timestamp = 0;

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    const dt = now - timestamp;
    timestamp = now;

    const dx = e.clientX - mouseX;
    const dy = e.clientY - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Instantaneous velocity (pixels per ms), smoothed
    const instantVel = Math.min(dist / (dt || 1), 50); // Cap velocity
    velocity = velocity * 0.8 + instantVel * 0.2;

    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    if (spotlight) {
        // Smooth interpolation for position
        currentX += (mouseX - currentX) * 0.15;
        currentY += (mouseY - currentY) * 0.15;

        // Decay velocity
        velocity *= 0.92;

        const opacity = Math.min(velocity * 0.5, 1); // Map velocity to opacity
        const size = Math.min(400 + velocity * 50, 800); // Map velocity to size, capped at 800px

        spotlight.style.setProperty('--mouse-x', `${currentX}px`);
        spotlight.style.setProperty('--mouse-y', `${currentY}px`);
        spotlight.style.setProperty('--spotlight-opacity', opacity.toFixed(3));
        spotlight.style.setProperty('--spotlight-size', `${size}px`);
    }
    requestAnimationFrame(animate);
}

animate();
