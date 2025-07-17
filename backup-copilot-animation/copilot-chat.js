// Copilot Chat Panel Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get references to elements
    const copilotPanel = document.querySelector('.copilot-chat-panel');
    const closeButton = document.querySelector('.close-copilot');
    const revenueCard = document.querySelector('.insight-card:first-child');
    const copilotMessages = document.querySelector('.copilot-messages');
    const sendButton = document.querySelector('.send-button');
    const inputField = document.querySelector('.copilot-input');
    const appContainer = document.querySelector('.app-container');
    
    // Function to open the Copilot panel with enhanced animation
    function openCopilotPanel() {
        // First make panel visible but with opacity 0
        copilotPanel.style.opacity = '0';
        copilotPanel.style.right = '-380px';
        copilotPanel.style.transform = 'translateY(-50%) translateX(10px)';
        copilotPanel.classList.add('active');
        
        // Get the title from the card
        const cardTitle = revenueCard.querySelector('h4').textContent;
        
        // Check if a card reference already exists
        const existingCardReference = copilotMessages.querySelector('.card-reference');
        
        // Only create and insert a new card reference if one doesn't already exist
        if (!existingCardReference) {
            // Create a simplified card reference with just the title
            const cardReference = document.createElement('div');
            cardReference.className = 'card-reference';
            cardReference.innerHTML = `<div class="card-title">${cardTitle}</div>`;
            cardReference.style.opacity = '0';
            cardReference.style.transform = 'translateY(10px)';
            
            // Insert the card reference at the beginning of the messages
            copilotMessages.insertBefore(cardReference, copilotMessages.firstChild);
        }
        
        // Animate the panel sliding in
        setTimeout(() => {
            copilotPanel.style.opacity = '1';
            copilotPanel.style.right = '0';
            copilotPanel.style.transform = 'translateY(-50%) translateX(0)';
            
            // Animate the card reference fading in after panel appears
            setTimeout(() => {
                cardReference.style.opacity = '1';
                cardReference.style.transform = 'translateY(0)';
            }, 200);
            
            // Animate the welcome message
            const welcomeMessage = document.querySelector('.copilot-message');
            if (welcomeMessage) {
                welcomeMessage.style.opacity = '0';
                welcomeMessage.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    welcomeMessage.style.opacity = '1';
                    welcomeMessage.style.transform = 'translateY(0)';
                }, 300);
            }
        }, 50);
    }
    
    // Function to close the Copilot panel with enhanced animation
    function closeCopilotPanel() {
        // Animate the card reference fading out
        const cardReference = document.querySelector('.card-reference');
        if (cardReference) {
            cardReference.style.opacity = '0';
            cardReference.style.transform = 'translateY(10px)';
        }
        
        // Animate the welcome message fading out
        const welcomeMessage = document.querySelector('.copilot-message');
        if (welcomeMessage) {
            welcomeMessage.style.opacity = '0';
            welcomeMessage.style.transform = 'translateY(10px)';
        }
        
        // Animate the panel sliding out
        copilotPanel.style.opacity = '0';
        copilotPanel.style.right = '-380px';
        copilotPanel.style.transform = 'translateY(-50%) translateX(10px)';
        
        // Remove the panel after animation completes
        setTimeout(() => {
            copilotPanel.classList.remove('active');
            
            // Remove the card reference
            if (cardReference) {
                cardReference.remove();
            }
            
            // Reset panel styles for next opening
            setTimeout(() => {
                if (!copilotPanel.classList.contains('active')) {
                    copilotPanel.style.opacity = '';
                    copilotPanel.style.right = '';
                    copilotPanel.style.transform = '';
                }
            }, 50);
        }, 300);
    }
    
    // Add click event to the Revenue Spike card
    if (revenueCard) {
        revenueCard.addEventListener('click', function(event) {
            // Prevent triggering if clicking on buttons inside the card
            if (!event.target.closest('.card-actions')) {
                openCopilotPanel();
            }
        });
    }
    
    // Add click event to close button
    if (closeButton) {
        closeButton.addEventListener('click', closeCopilotPanel);
    }
    
    // Add click event to app container to close panel when clicking outside
    if (appContainer) {
        appContainer.addEventListener('click', function(event) {
            // Only close if panel is active and click is outside the panel
            if (copilotPanel.classList.contains('active') && 
                !copilotPanel.contains(event.target) && 
                !event.target.closest('.insight-card:first-child')) {
                closeCopilotPanel();
            }
        });
    }
    
    // Handle send button click (just for wireframe demonstration)
    if (sendButton) {
        sendButton.addEventListener('click', function() {
            const text = inputField.value.trim();
            if (text) {
                // Create user message
                const userMessage = document.createElement('div');
                userMessage.className = 'message user-message';
                userMessage.innerHTML = `<p>${text}</p>`;
                copilotMessages.appendChild(userMessage);
                
                // Clear input
                inputField.value = '';
                
                // Scroll to bottom
                copilotMessages.scrollTop = copilotMessages.scrollHeight;
            }
        });
    }
    
    // Allow pressing Enter to send message
    if (inputField) {
        inputField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendButton.click();
            }
        });
    }
});
