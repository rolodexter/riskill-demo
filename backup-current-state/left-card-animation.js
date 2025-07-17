// Left Zone Card Animation Script
/**
 * Left Zone Card Animation Handler
 * 
 * This script handles animations for cards in the left zone.
 * Currently the left zone is empty, but this script will be used
 * when cards are added to the left zone in the future.
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Left zone card animation initialized');
    
    // Function to initialize card animations
    function initializeCardAnimations() {
        const leftCards = document.querySelectorAll('.left-zone .card');
        
        leftCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                anime({
                    targets: this,
                    translateY: -5,
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
            
            card.addEventListener('mouseleave', function() {
                anime({
                    targets: this,
                    translateY: 0,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
    }
    
    // This function will be called when new cards are added to the left zone
    window.initializeLeftZoneCards = function() {
        initializeCardAnimations();
        console.log('Left zone cards initialized');
    };
});
