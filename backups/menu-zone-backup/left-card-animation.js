// Left Zone Card Animation Script
document.addEventListener('DOMContentLoaded', function() {
    // Get all left zone cards
    const leftCards = document.querySelectorAll('.left-wireframe-card');
    
    // Add titles to cards if they don't already have them
    const cardTitles = [
        'Risk Assessment',
        'Compliance Framework',
        'Security Controls',
        'Threat Intelligence',
        'Vulnerability Management',
        'Incident Response',
        'Data Protection',
        'Access Management'
    ];
    
    // Add titles and enhance cards
    leftCards.forEach((card, index) => {
        // Check if card already has a title
        if (!card.querySelector('.left-card-title')) {
            // Create title element
            const titleDiv = document.createElement('div');
            titleDiv.className = 'left-card-title';
            titleDiv.textContent = cardTitles[index % cardTitles.length]; // Use modulo to cycle through titles
            
            // Insert title at the beginning of the card
            card.insertBefore(titleDiv, card.firstChild);
        }
        
        // Add enhanced hover effects
        card.addEventListener('mouseenter', function() {
            // Apply enhanced hover effect
            this.style.transform = 'translateX(8px) scale(1.02)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.04), 0 8px 16px rgba(0, 0, 0, 0.06), 0 12px 24px rgba(0, 0, 0, 0.08)';
            this.style.zIndex = '10';
            
            // Animate card lines
            const lines = this.querySelectorAll('.left-card-line');
            lines.forEach((line, i) => {
                setTimeout(() => {
                    line.style.transform = 'translateX(4px)';
                    line.style.background = 'linear-gradient(90deg, rgba(67, 160, 71, 0.2), rgba(67, 160, 71, 0.15))';
                }, i * 20); // Staggered animation
            });
            
            // Animate title if exists
            const title = this.querySelector('.left-card-title');
            if (title) {
                title.style.transform = 'translateX(4px)';
                title.style.opacity = '1';
            }
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', function() {
            // Reset card styles
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.zIndex = '';
            
            // Reset card lines
            const lines = this.querySelectorAll('.left-card-line');
            lines.forEach(line => {
                line.style.transform = '';
                line.style.background = '';
            });
            
            // Reset title if exists
            const title = this.querySelector('.left-card-title');
            if (title) {
                title.style.transform = '';
                title.style.opacity = '';
            }
        });
    });
});
