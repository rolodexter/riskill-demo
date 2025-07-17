/**
 * Responsive Card System
 * Dynamically adjusts card dimensions based on container size and viewport
 */
class ResponsiveCardSystem {
    constructor() {
        this.zones = new Map();
        this.initialized = false;
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupSystem());
        } else {
            this.setupSystem();
        }
    }

    setupSystem() {
        if (this.initialized) return;
        this.initialized = true;
        
        // Initialize ResizeObserver if supported
        if (window.ResizeObserver) {
            this.resizeObserver = new ResizeObserver(entries => {
                entries.forEach(entry => {
                    this.handleZoneResize(entry.target);
                });
            });
            
            // Observe all zones
            document.querySelectorAll('.top-zone').forEach(zone => {
                this.resizeObserver.observe(zone);
                this.calculateZoneLayout(zone);
            });
        } else {
            // Fallback for browsers without ResizeObserver
            window.addEventListener('resize', this.handleWindowResize.bind(this));
            this.calculateAllLayouts();
        }
        
        // Add stack badges
        this.addStackBadges();
        
        // Setup stack interaction
        this.setupStackInteractions();
    }
    
    addStackBadges() {
        document.querySelectorAll('.card-stack-container').forEach(stack => {
            const cards = stack.querySelectorAll('.stacked-card');
            if (cards.length > 1) {
                // Only add badge if there are multiple cards
                const badge = document.createElement('div');
                badge.className = 'stack-badge';
                badge.textContent = cards.length;
                stack.appendChild(badge);
                
                // Store stack size as data attribute
                stack.dataset.stackSize = cards.length;
            }
        });
    }
    
    setupStackInteractions() {
        document.querySelectorAll('.card-stack-container').forEach(stack => {
            stack.addEventListener('click', () => {
                const stackSize = parseInt(stack.dataset.stackSize || '0');
                if (stackSize > 1) {
                    this.showStackInteraction(stack);
                }
            });
            
            stack.addEventListener('mouseenter', () => {
                stack.classList.add('hovered');
            });
            
            stack.addEventListener('mouseleave', () => {
                stack.classList.remove('hovered');
            });
        });
    }
    
    showStackInteraction(stack) {
        const stackSize = parseInt(stack.dataset.stackSize || '0');
        
        // Use different interaction patterns based on stack size
        if (stackSize <= 4) {
            // For small stacks (1-4 cards), use fan-out
            this.showFanOutInteraction(stack);
        } else {
            // For larger stacks (5+), use grid overlay
            this.showGridOverlay(stack);
        }
    }
    
    showFanOutInteraction(stack) {
        // Implementation will be added in Phase 3
        console.log('Fan-out interaction for small stack');
        // For now, fall back to grid overlay
        this.showGridOverlay(stack);
    }
    
    showGridOverlay(stack) {
        // Use the existing showStack function from stack-interaction.js
        if (typeof window.showStack === 'function') {
            window.showStack(stack);
        }
    }
    
    calculateAllLayouts() {
        document.querySelectorAll('.top-zone').forEach(zone => {
            this.calculateZoneLayout(zone);
        });
    }
    
    calculateZoneLayout(zone) {
        const rect = zone.getBoundingClientRect();
        const stacks = zone.querySelectorAll('.card-stack-container');
        
        stacks.forEach(stack => {
            this.adjustStackLayout(stack, rect);
        });
    }
    
    adjustStackLayout(stack, zoneRect) {
        const cards = stack.querySelectorAll('.stacked-card');
        const stackSize = cards.length;
        
        // Calculate optimal card dimensions based on zone size
        // Ensure cards never exceed the zone height by accounting for padding and stack offset
        const totalPadding = 32; // Top and bottom padding
        const stackOffset = stackSize > 1 ? (stackSize - 1) * 5 : 0; // Account for stacked card offsets
        const maxCardHeight = zoneRect.height - totalPadding - stackOffset;
        const optimalHeight = Math.min(maxCardHeight, Math.max(80, zoneRect.height * 0.8));
        
        // Apply dimensions to cards
        cards.forEach((card, index) => {
            // Adjust card dimensions
            card.style.height = `${optimalHeight}px`;
            card.style.maxHeight = `${maxCardHeight}px`;
            
            // Adjust stacking effect
            if (index > 0) {
                // Ensure stack offset doesn't push content outside container
                const offset = Math.min(5 + (index * 5), 20); // Cap the maximum offset
                card.style.transform = `translateY(${offset}px)`;
                card.style.zIndex = `${5 - index}`; // Decreasing z-index for stacked effect
            }
        });
    }
    
    handleWindowResize() {
        // Debounce resize events
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        
        this.resizeTimeout = setTimeout(() => {
            this.calculateAllLayouts();
        }, 250);
    }
    
    handleZoneResize(zone) {
        this.calculateZoneLayout(zone);
    }
}

// Initialize the responsive card system
window.responsiveCardSystem = new ResponsiveCardSystem();
