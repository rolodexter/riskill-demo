// Card Stack Interaction System using Anime.js
// This file is kept for compatibility but most functionality has been moved to test-animations.js
// Only minimal stack badge functionality remains

document.addEventListener('DOMContentLoaded', function() {
    initializeCardStacks();
});

function initializeCardStacks() {
    // Find all card stacks in the document
    const cardStacks = document.querySelectorAll('.card-stack-container');
    
    cardStacks.forEach(stack => {
        // Count the cards in the stack
        const stackSize = stack.querySelectorAll('.stacked-card').length;
        
        // Skip if no cards or only one card
        if (stackSize <= 1) return;
        
        // Add stack badge to show card count
        const stackBadge = document.createElement('div');
        stackBadge.className = 'stack-badge';
        stackBadge.textContent = stackSize;
        stack.appendChild(stackBadge);
        
        // Set data attribute for stack size
        stack.setAttribute('data-stack-size', stackSize);
    });
}

// These functions are kept as empty stubs for compatibility
// The actual functionality is now in test-animations.js
function showStack() {}
function closeStack() {}
function selectCard() {}
