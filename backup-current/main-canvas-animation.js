// Main Canvas Animation Script
document.addEventListener('DOMContentLoaded', function() {
    // Get all main canvas cards
    const mainCards = document.querySelectorAll('.main-wireframe-card');
    
    // Add titles to cards if they don't already have them
    const cardTitles = [
        'Risk Analysis Dashboard',
        'Compliance Overview',
        'Security Metrics',
        'Threat Intelligence',
        'Vulnerability Assessment',
        'Incident Response',
        'Data Protection',
        'Access Management'
    ];
    
    // Add titles and enhance cards
    mainCards.forEach((card, index) => {
        // Check if card already has a title
        if (!card.querySelector('.main-card-title')) {
            // Create title element
            const titleDiv = document.createElement('div');
            titleDiv.className = 'main-card-title';
            titleDiv.textContent = cardTitles[index % cardTitles.length]; // Use modulo to cycle through titles
            
            // Insert title at the beginning of the card
            card.insertBefore(titleDiv, card.firstChild);
        }
        
        // Add subtle entrance animation for each card
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 50)); // Staggered entrance
    });
    
    // Add subtle parallax effect on mouse move
    const mainCanvas = document.querySelector('.main-canvas');
    if (mainCanvas) {
        mainCanvas.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            mainCards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardCenterX = rect.left + rect.width / 2;
                const cardCenterY = rect.top + rect.height / 2;
                
                // Calculate distance from mouse to card center
                const distX = mouseX - cardCenterX;
                const distY = mouseY - cardCenterY;
                
                // Only apply effect if mouse is relatively close to the card
                const distance = Math.sqrt(distX * distX + distY * distY);
                const maxDistance = 300; // Maximum distance for effect
                
                if (distance < maxDistance) {
                    // Calculate effect strength based on distance (closer = stronger)
                    const strength = 1 - (distance / maxDistance);
                    
                    // Apply subtle transform using a different property to avoid conflicts with masonry layout
                    // Instead of overriding transform, we'll use a CSS custom property that can be used in conjunction with the masonry layout
                    const moveX = distX * 0.01 * strength;
                    const moveY = distY * 0.01 * strength;
                    
                    // Store the parallax offset in CSS custom properties
                    card.style.setProperty('--parallax-x', `${moveX}px`);
                    card.style.setProperty('--parallax-y', `${moveY}px`);
                } else {
                    // Reset parallax offset if mouse is far away
                    card.style.setProperty('--parallax-x', '');
                    card.style.setProperty('--parallax-y', '');
                }
            });
        });
        
        // Reset parallax offsets when mouse leaves the canvas
        mainCanvas.addEventListener('mouseleave', function() {
            mainCards.forEach(card => {
                card.style.setProperty('--parallax-x', '0px');
                card.style.setProperty('--parallax-y', '0px');
            });
        });
    }
});
