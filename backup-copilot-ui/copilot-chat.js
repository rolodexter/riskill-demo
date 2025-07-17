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
    
    // Function to open the Copilot panel
    function openCopilotPanel() {
        copilotPanel.classList.add('active');
        
        // Get the title from the card
        const cardTitle = revenueCard.querySelector('h4').textContent;
        
        // Create a simplified card reference with just the title
        const cardReference = document.createElement('div');
        cardReference.className = 'card-reference';
        cardReference.innerHTML = `<div class="card-title">${cardTitle}</div>`;
        
        // Insert the card reference at the beginning of the messages
        copilotMessages.insertBefore(cardReference, copilotMessages.firstChild);
    }
    
    // Function to close the Copilot panel
    function closeCopilotPanel() {
        copilotPanel.classList.remove('active');
        
        // Remove the card reference from chat when closing
        const cardReference = document.querySelector('.card-reference');
        if (cardReference) {
            cardReference.remove();
        }
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
