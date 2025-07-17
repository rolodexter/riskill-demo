/**
 * Card Animation System
 * Enhances card interactions with fluid animations using Anime.js
 */
class CardAnimations {
    constructor() {
        this.activeAnimations = new Map();
        this.fanOutActive = false;
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupAnimations());
        } else {
            this.setupAnimations();
        }
    }

    setupAnimations() {
        // Check if anime.js is loaded
        if (!window.anime) {
            console.error('Anime.js is not loaded. Please make sure anime.min.js is included before card-animations.js');
            return;
        }
        
        // Set initialization flag
        this.initialized = true;
        
        // Setup magician-style fan-out animations for all stacks
        this.setupMagicianFanOutAnimations();
        
        // Add hover animations for cards
        this.setupCardHoverEffects();
        
        // Add card selection handlers
        this.setupCardSelectionHandlers();
        
        console.log('Card animations initialized successfully');
    }
    
    setupMagicianFanOutAnimations() {
        document.querySelectorAll('.card-stack-container').forEach(stack => {
            const cards = stack.querySelectorAll('.stacked-card');
            const stackSize = cards.length;
            
            // Add hover effect for all stacks
            stack.addEventListener('mouseenter', () => {
                if (!this.fanOutActive) {
                    this.animateMagicianFanOut(stack, cards);
                }
            });
            
            stack.addEventListener('mouseleave', () => {
                if (!this.fanOutActive) {
                    this.animateFanIn(stack, cards);
                }
            });
            
            // Add click effect for all stacks
            stack.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!this.fanOutActive) {
                    this.showFullFanOut(stack, cards);
                }
            });
        });
        
        // Add global click handler to close fan-out
        document.addEventListener('click', (e) => {
            if (this.fanOutActive && !e.target.closest('.stacked-card')) {
                this.closeAllFanOuts();
            }
        });
    }
    
    animateMagicianFanOut(stack, cards) {
        // Cancel any active animation
        if (this.activeAnimations.has(stack)) {
            this.activeAnimations.get(stack).pause();
        }
        
        // Calculate fan-out angles based on stack size
        const stackSize = cards.length;
        const maxAngle = Math.min(10, 40 / stackSize); // Limit max angle for subtle effect
        
        // Determine fan direction based on position in viewport
        const stackRect = stack.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const stackCenter = stackRect.left + (stackRect.width / 2);
        const positionRatio = stackCenter / viewportWidth;
        
        // Left side: fan right, Right side: fan left, Center: fan symmetrically
        let fanDirection = 0; // 0 = symmetric, -1 = fan left, 1 = fan right
        if (positionRatio < 0.3) fanDirection = 1;      // Left side - fan right
        else if (positionRatio > 0.7) fanDirection = -1; // Right side - fan left
        
        // Create animation
        const animation = anime({
            targets: Array.from(cards),
            rotate: (el, i) => {
                if (fanDirection === 0) {
                    // Symmetric fan
                    return (i - (stackSize - 1) / 2) * maxAngle;
                } else {
                    // Directional fan
                    return fanDirection * i * maxAngle;
                }
            },
            translateY: (el, i) => i * 5,
            translateX: (el, i) => {
                if (fanDirection === 0) {
                    // Symmetric fan
                    return (i - (stackSize - 1) / 2) * 5;
                } else {
                    // Directional fan
                    return fanDirection * i * -5; // Offset in opposite direction of rotation
                }
            },
            scale: 1.02,
            duration: 400,
            easing: 'spring(1, 80, 10, 0)'
        });
        
        // Store animation reference
        this.activeAnimations.set(stack, animation);
    }
    
    animateFanOut(stack, cards) {
        // Cancel any active animation
        if (this.activeAnimations.has(stack)) {
            this.activeAnimations.get(stack).pause();
        }
        
        const stackRect = stack.getBoundingClientRect();
        const fanWidth = stackRect.width * 0.8;
        const cardCount = cards.length;
        
        // Create fan-out animation
        const animation = anime.timeline({
            easing: 'spring(1, 80, 10, 0)',
            duration: 400
        });
        
        // Animate each card
        cards.forEach((card, index) => {
            // Calculate position in fan
            const angle = -15 + (30 * (index / (cardCount - 1 || 1)));
            const translateX = (index - (cardCount - 1) / 2) * (fanWidth / cardCount);
            const translateY = -10 - (index * 5);
            
            animation.add({
                targets: card,
                translateX: translateX,
                translateY: translateY,
                rotate: angle,
                scale: 0.95,
                opacity: 1,
                zIndex: 10 + index,
                boxShadow: [
                    '0 1px 2px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.04)',
                    '0 8px 16px rgba(0, 0, 0, 0.08), 0 16px 32px rgba(0, 0, 0, 0.06), 0 24px 48px rgba(0, 0, 0, 0.04)'
                ]
            }, index * 50); // Stagger the animations
        });
        
        // Store the animation
        this.activeAnimations.set(stack, animation);
    }
    
    animateFanIn(stack, cards) {
        // Cancel any active animation
        if (this.activeAnimations.has(stack)) {
            this.activeAnimations.get(stack).pause();
        }
        
        // Create fan-in animation
        const animation = anime.timeline({
            easing: 'spring(1, 80, 10, 0)',
            duration: 300
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
            }, index * 30); // Stagger the animations
        });
        
        // Store the animation
        this.activeAnimations.set(stack, animation);
    }
    
    showFullFanOut(stack, cards) {
        // Set flag to prevent hover animations while full fan-out is active
        this.fanOutActive = true;
        
        // Cancel any active animation
        if (this.activeAnimations.has(stack)) {
            this.activeAnimations.get(stack).pause();
        }
        
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
        const maxAngle = Math.min(15, 60 / stackSize); // Limit max angle
        const fanSpread = Math.min(30, 120 / stackSize); // Wider spread for better visibility
        
        // Create animation
        const animation = anime.timeline({
            easing: 'spring(1, 80, 10, 0)',
            duration: 500
        });
        
        // Add click handlers to each card
        cards.forEach((card, i) => {
            // Remove any existing click handlers
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
            cards[i] = newCard;
            
            // Add new click handler
            newCard.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectCard(stack, i);
            });
        });
        
        // Animate each card
        cards.forEach((card, i) => {
            let angle, translateX, translateY;
            
            if (fanDirection === 0) {
                // Symmetric fan
                angle = (i - (stackSize - 1) / 2) * maxAngle;
                translateX = (i - (stackSize - 1) / 2) * fanSpread;
                translateY = -20 - Math.abs(i - (stackSize - 1) / 2) * 5; // Arc effect
            } else {
                // Directional fan
                angle = fanDirection * i * maxAngle;
                translateX = fanDirection * i * fanSpread;
                translateY = -20 - i * 5; // Progressive lift
            }
            
            animation.add({
                targets: card,
                rotate: angle,
                translateX: translateX,
                translateY: translateY,
                scale: 1.05,
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08), 0 16px 32px rgba(0, 0, 0, 0.06)',
                zIndex: 100 + i,
                duration: 500
            }, i * 50); // Stagger the animations
        });
        
        // Store animation reference
        this.activeAnimations.set(stack, animation);
    }
    
    selectCard(stack, selectedIndex) {
        const cards = stack.querySelectorAll('.stacked-card');
        const selectedCard = cards[selectedIndex];
        
        // Cancel any active animation
        if (this.activeAnimations.has(stack)) {
            this.activeAnimations.get(stack).pause();
        }
        
        // Create animation to bring selected card to top
        const animation = anime.timeline({
            easing: 'spring(1, 80, 10, 0)',
            duration: 500,
            complete: () => {
                // Rearrange DOM to put selected card first
                const parent = selectedCard.parentNode;
                parent.insertBefore(selectedCard, parent.firstChild);
                
                // Reset all cards
                this.closeAllFanOuts();
            }
        });
        
        // Animate selected card to top
        animation.add({
            targets: selectedCard,
            rotate: 0,
            translateX: 0,
            translateY: -30,
            scale: 1.1,
            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.1), 0 32px 64px rgba(0, 0, 0, 0.08)',
            zIndex: 200
        });
        
        // Animate other cards back slightly
        const otherCards = Array.from(cards).filter((_, i) => i !== selectedIndex);
        animation.add({
            targets: otherCards,
            translateY: (el, i) => 10 + i * 5,
            translateX: 0,
            rotate: 0,
            scale: 0.95,
            opacity: 0.8,
            zIndex: (el, i) => 100 - i,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
            duration: 400
        }, '-=400');
        
        // Store animation reference
        this.activeAnimations.set(stack, animation);
    }
    
    closeAllFanOuts() {
        this.fanOutActive = false;
        
        // Find all card stacks
        document.querySelectorAll('.card-stack-container').forEach(stack => {
            const cards = stack.querySelectorAll('.stacked-card');
            this.animateFanIn(stack, cards);
        });
    }
    
    setupCardSelectionHandlers() {
        // Add global click handler to close fan-outs when clicking outside
        document.addEventListener('click', (e) => {
            if (this.fanOutActive && !e.target.closest('.card-stack-container')) {
                this.closeAllFanOuts();
            }
        });
        
        // Add escape key handler
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.fanOutActive) {
                this.closeAllFanOuts();
            }
        });
    }
    
    setupCardHoverEffects() {
        // Use event delegation for better performance and to ensure all cards get hover effects
        // even if they're added dynamically or not fully loaded when this method runs
        document.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.stacked-card');
            if (card && !this.fanOutActive) {
                // Only apply hover effect if we're not in fan-out mode
                const stack = card.closest('.card-stack-container');
                if (stack && !stack.classList.contains('fan-out-active')) {
                    anime({
                        targets: card,
                        scale: 1.02,
                        translateY: -5,
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08), 0 16px 32px rgba(0, 0, 0, 0.06)',
                        duration: 300,
                        easing: 'spring(1, 80, 10, 0)'
                    });
                }
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            const card = e.target.closest('.stacked-card');
            if (card && !this.fanOutActive) {
                const stack = card.closest('.card-stack-container');
                if (stack && !stack.classList.contains('fan-out-active')) {
                    anime({
                        targets: card,
                        scale: 1,
                        translateY: 0,
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.04)',
                        duration: 300,
                        easing: 'spring(1, 80, 10, 0)'
                    });
                }
            }
        });
        
        // Also apply specific hover effects to the first card in each stack
        document.querySelectorAll('.card-stack-container .stacked-card:first-child').forEach(firstCard => {
            firstCard.classList.add('first-card');
        });
    }
}

// Initialize the card animation system
window.cardAnimationSystem = new CardAnimations();
