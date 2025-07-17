/**
 * Enhanced fan animation script with faster, smoother animations
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Enhanced fan animation script loaded');
    
    // Check if anime.js is loaded
    if (!window.anime) {
        console.error('Anime.js is not loaded!');
        return;
    }
    
    // Initialize all card stacks
    document.querySelectorAll('.card-stack-container').forEach(stack => {
        initializeStackAnimation(stack);
    });
    
    console.log('Fan animations setup complete');
});

/**
 * Initialize fan animation for a card stack
 */
function initializeStackAnimation(stack) {
    const cards = stack.querySelectorAll('.stacked-card');
    if (!cards || cards.length === 0) return;
    
    console.log(`Initializing fan animation for stack with ${cards.length} cards`);
    
    // Track animation state
    let isFannedOut = false;
    let currentAnimation = null;
    
    // Add hover handler to the stack
    stack.addEventListener('mouseenter', () => {
        if (!isFannedOut) {
            fanOut(stack, cards);
        }
    });
    
    stack.addEventListener('mouseleave', () => {
        if (isFannedOut) {
            fanIn(stack, cards);
        }
    });
    
    // Add click handlers to each card
    cards.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isFannedOut) {
                bringCardToTop(stack, cards, index);
            }
        });
    });
    
    /**
     * Fan out the cards in the stack
     */
    function fanOut(stack, cards) {
        // Cancel any current animation
        if (currentAnimation) currentAnimation.pause();
        
        // Determine fan direction based on position in viewport
        const stackRect = stack.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const stackCenter = stackRect.left + (stackRect.width / 2);
        const positionRatio = stackCenter / viewportWidth;
        
        // Left side: fan right, Right side: fan left, Center: fan symmetrically
        let fanDirection = 0; // 0 = symmetric, -1 = fan left, 1 = fan right
        if (positionRatio < 0.3) fanDirection = 1;      // Left side - fan right
        else if (positionRatio > 0.7) fanDirection = -1; // Right side - fan left
        
        // Calculate fan parameters
        const stackSize = cards.length;
        const maxAngle = Math.min(12, 40 / stackSize); // Limit max angle
        const fanSpread = Math.min(25, 100 / stackSize); // Wider spread for better visibility
        
        // Create animation timeline
        const animation = anime.timeline({
            easing: 'cubicBezier(0.25, 0.1, 0.25, 1)', // Smooth easing
            duration: 250, // Faster animation
            complete: () => {
                isFannedOut = true;
            }
        });
        
        // Animate each card
        cards.forEach((card, i) => {
            let angle, translateX, translateY;
            
            if (fanDirection === 0) {
                // Symmetric fan
                angle = (i - (stackSize - 1) / 2) * maxAngle;
                translateX = (i - (stackSize - 1) / 2) * fanSpread;
                translateY = -15 - Math.abs(i - (stackSize - 1) / 2) * 3; // Arc effect
            } else {
                // Directional fan
                angle = fanDirection * i * maxAngle;
                translateX = fanDirection * i * fanSpread;
                translateY = -15 - i * 3; // Progressive lift
            }
            
            animation.add({
                targets: card,
                rotate: angle,
                translateX: translateX,
                translateY: translateY,
                scale: 1.02,
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08), 0 16px 32px rgba(0, 0, 0, 0.06)',
                zIndex: 100 + i,
                duration: 250
            }, i * 20); // Faster staggering
        });
        
        currentAnimation = animation;
    }
    
    /**
     * Fan in the cards back to the stack
     */
    function fanIn(stack, cards) {
        // Cancel any current animation
        if (currentAnimation) currentAnimation.pause();
        
        // Create animation timeline
        const animation = anime.timeline({
            easing: 'cubicBezier(0.25, 0.1, 0.25, 1)', // Smooth easing
            duration: 200, // Even faster return animation
            complete: () => {
                isFannedOut = false;
            }
        });
        
        // Animate each card back to original position
        cards.forEach((card, index) => {
            animation.add({
                targets: card,
                translateX: 0,
                translateY: index > 0 ? 10 + (index * 5) : 0,
                rotate: 0,
                scale: 1,
                opacity: index === 0 ? 1 : 0.95 - (index * 0.05),
                zIndex: 5 - index,
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.04)'
            }, index * 15); // Faster staggering
        });
        
        currentAnimation = animation;
    }
    
    /**
     * Bring a selected card to the top of the stack
     */
    function bringCardToTop(stack, cards, selectedIndex) {
        // Cancel any current animation
        if (currentAnimation) currentAnimation.pause();
        
        // Create animation timeline
        const animation = anime.timeline({
            easing: 'cubicBezier(0.25, 0.1, 0.25, 1)', // Smooth easing
            complete: () => {
                // Rearrange DOM to match visual order
                const selectedCard = cards[selectedIndex];
                stack.prepend(selectedCard);
                fanIn(stack, stack.querySelectorAll('.stacked-card'));
            }
        });
        
        // First move selected card up and forward
        animation.add({
            targets: cards[selectedIndex],
            translateY: -30,
            scale: 1.05,
            zIndex: 200,
            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.1), 0 32px 64px rgba(0, 0, 0, 0.08)',
            duration: 200
        });
        
        // Then move it back to the top position
        animation.add({
            targets: cards[selectedIndex],
            translateX: 0,
            translateY: 0,
            rotate: 0,
            duration: 250
        });
        
        currentAnimation = animation;
    }
}
