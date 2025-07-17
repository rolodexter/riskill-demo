// Card Stack Interaction System using Anime.js
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
        
        // Add click event to show stack
        stack.addEventListener('click', function(e) {
            // Prevent click from propagating to parent elements
            e.stopPropagation();
            showStack(this);
        });
    });
    
    // Create overlay if it doesn't exist
    if (!document.getElementById('stackOverlay')) {
        createStackOverlay();
    }
}

function createStackOverlay() {
    // Create overlay container
    const overlay = document.createElement('div');
    overlay.className = 'stack-overlay';
    overlay.id = 'stackOverlay';
    
    // Create background
    const background = document.createElement('div');
    background.className = 'overlay-background';
    background.onclick = closeStack;
    
    // Create overlay title
    const title = document.createElement('div');
    title.className = 'overlay-title';
    title.id = 'overlayTitle';
    title.textContent = 'Select a card';
    
    // Create card grid
    const grid = document.createElement('div');
    grid.className = 'card-grid';
    grid.id = 'cardGrid';
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-button';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = closeStack;
    closeBtn.setAttribute('aria-label', 'Close');
    
    // Assemble overlay
    overlay.appendChild(background);
    overlay.appendChild(title);
    overlay.appendChild(grid);
    overlay.appendChild(closeBtn);
    
    // Add to document
    document.body.appendChild(overlay);
    
    // Add keyboard event listener for Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.style.display === 'block') {
            closeStack();
        }
    });
}

function showStack(stackElement) {
    const stackSize = parseInt(stackElement.dataset.stackSize);
    const cards = stackElement.querySelectorAll('.stacked-card');
    const overlay = document.getElementById('stackOverlay');
    const grid = document.getElementById('cardGrid');
    const title = document.getElementById('overlayTitle');
    
    // Get stack title from first card if available
    let stackTitle = 'Select a card';
    const firstCardTitle = cards[0].querySelector('h3');
    if (firstCardTitle) {
        stackTitle = `Select a ${firstCardTitle.textContent.split(' ')[0]} Card`;
    }
    title.textContent = stackTitle;
    
    // Store reference to the original stack for later use
    overlay.setAttribute('data-source-stack', stackElement.id || '');
    
    // Determine interaction pattern based on stack size
    if (stackSize <= 3) {
        // Use simple fan-out for small stacks (1-3 cards)
        showSmallStackFanOut(stackElement);
        return;
    }
    
    // Set grid layout class based on stack size
    grid.className = stackSize <= 6 ? 'card-grid compact' : 'card-grid full';
    
    // Clone cards to grid
    grid.innerHTML = '';
    cards.forEach((card, index) => {
        const clone = card.cloneNode(true);
        clone.style.transform = 'none';
        clone.style.opacity = '1';
        clone.style.position = 'relative';
        clone.style.animationDelay = `${index * 0.1}s`;
        clone.setAttribute('data-original-index', index);
        clone.setAttribute('tabindex', '0'); // Make focusable for keyboard navigation
        
        // Add click and keyboard event handlers
        clone.onclick = (e) => {
            e.stopPropagation();
            selectCard(stackElement, index);
        };
        
        clone.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectCard(stackElement, index);
            }
        };
        
        grid.appendChild(clone);
    });
    
    // Show overlay with animation
    overlay.style.display = 'block';
    anime({
        targets: overlay,
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
    
    // Animate cards in
    anime({
        targets: '.card-grid .stacked-card',
        scale: [0.7, 1],
        opacity: [0, 1],
        duration: 400,
        delay: anime.stagger(100),
        easing: 'easeOutBack'
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Focus first card after animation completes
    setTimeout(() => {
        const firstCard = grid.querySelector('.stacked-card');
        if (firstCard) firstCard.focus();
    }, 500);
}

function showSmallStackFanOut(stackElement) {
    const cards = stackElement.querySelectorAll('.stacked-card');
    
    // Add a class to indicate fan-out mode
    stackElement.classList.add('fan-out-active');
    
    // Fan out the cards
    cards.forEach((card, index) => {
        anime({
            targets: card,
            translateY: index * 40, // Fan out vertically
            translateX: index * 5,  // Slight horizontal offset
            rotate: (index - 1) * 2, // Slight rotation
            opacity: 1,
            duration: 300,
            easing: 'easeOutQuad'
        });
        
        // Add click event to select card
        card.addEventListener('click', function selectCardEvent(e) {
            e.stopPropagation();
            
            // Remove fan-out class
            stackElement.classList.remove('fan-out-active');
            
            // Select this card
            selectCard(stackElement, index);
            
            // Remove this event listener
            card.removeEventListener('click', selectCardEvent);
        }, { once: true });
    });
    
    // Add event listener to collapse fan-out when clicked outside
    document.addEventListener('click', function collapseStack(e) {
        if (!stackElement.contains(e.target) && stackElement.classList.contains('fan-out-active')) {
            // Remove fan-out class
            stackElement.classList.remove('fan-out-active');
            
            // Reset cards to original position
            cards.forEach((card, index) => {
                if (index === 0) return; // Skip the top card
                
                anime({
                    targets: card,
                    translateY: index === 1 ? -15 : index === 2 ? -30 : index === 3 ? -45 : -60,
                    translateX: index === 1 ? 3 : index === 2 ? 6 : index === 3 ? 9 : 12,
                    rotate: 0,
                    opacity: index === 1 ? 0.92 : index === 2 ? 0.84 : index === 3 ? 0.76 : 0.68,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
            
            // Remove this event listener
            document.removeEventListener('click', collapseStack);
        }
    });
}

function selectCard(stackElement, cardIndex) {
    const cards = Array.from(stackElement.querySelectorAll('.stacked-card'));
    const selectedCard = cards[cardIndex];
    
    // Close overlay first if it's open
    if (document.getElementById('stackOverlay').style.display === 'block') {
        closeStack();
    }
    
    // Wait for overlay to close before rearranging cards
    setTimeout(() => {
        // Remove the selected card
        selectedCard.remove();
        
        // Insert it at the beginning (top of stack)
        stackElement.insertBefore(selectedCard, stackElement.firstChild);
        
        // Reset all card positions and styles
        cards.forEach((card) => {
            // Reset inline styles that might have been applied
            card.style.transform = '';
            card.style.opacity = '';
            card.style.zIndex = '';
        });
        
        // Add selected animation to the card
        anime({
            targets: selectedCard,
            scale: [1.05, 1],
            duration: 400,
            easing: 'easeOutElastic(1, .6)'
        });
    }, 300);
}

function closeStack() {
    const overlay = document.getElementById('stackOverlay');
    
    // Remove keyboard navigation
    document.removeEventListener('keydown', handleKeyboardNavigation);
    
    anime({
        targets: overlay,
        opacity: [1, 0],
        duration: 200,
        easing: 'easeInQuad',
        complete: () => {
            overlay.style.display = 'none';
        }
    });
}

function handleKeyboardNavigation(e) {
    const overlay = document.getElementById('stackOverlay');
    if (overlay.style.display !== 'block') return;
    
    const grid = document.getElementById('cardGrid');
    const cards = grid.querySelectorAll('.stacked-card');
    const currentFocus = document.activeElement;
    let currentIndex = -1;
    
    // Find current focused card index
    if (currentFocus && currentFocus.classList.contains('stacked-card')) {
        currentIndex = Array.from(cards).indexOf(currentFocus);
    }
    
    switch (e.key) {
        case 'Escape':
            closeStack();
            break;
        case 'ArrowRight':
            focusCard(currentIndex + 1);
            break;
        case 'ArrowLeft':
            focusCard(currentIndex - 1);
            break;
        case 'ArrowUp':
            // Move up one row (assuming grid layout)
            focusCard(currentIndex - 2); // Adjust based on your grid columns
            break;
        case 'ArrowDown':
            // Move down one row (assuming grid layout)
            focusCard(currentIndex + 2); // Adjust based on your grid columns
            break;
        case 'Enter':
            if (currentFocus && currentFocus.classList.contains('stacked-card')) {
                currentFocus.click();
            }
            break;
    }
    
    function focusCard(index) {
        if (index >= 0 && index < cards.length) {
            cards[index].focus();
            e.preventDefault();
        }
    }
}
