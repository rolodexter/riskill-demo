// Copilot Chat Panel Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get references to elements
    const copilotPanel = document.querySelector('.copilot-chat-panel');
    const closeButton = document.querySelector('.close-copilot');
    const revenueCard = document.querySelector('.insight-card:first-child');
    const copilotMessages = document.querySelector('.copilot-messages');
    const sendButton = document.querySelector('.send-button');
    const inputField = document.querySelector('.copilot-input');
    
    // Function to open the Copilot panel
    function openCopilotPanel() {
        copilotPanel.classList.add('active');
        
        // Clone the card and add it to the chat
        const cardClone = revenueCard.cloneNode(true);
        cardClone.classList.add('card-in-chat');
        
        // Remove any hidden elements from the cloned card
        const hiddenElements = cardClone.querySelectorAll('.hidden');
        hiddenElements.forEach(el => el.remove());
        
        // Insert the card at the beginning of the messages
        copilotMessages.insertBefore(cardClone, copilotMessages.firstChild);
    }
    
    // Function to close the Copilot panel
    function closeCopilotPanel() {
        copilotPanel.classList.remove('active');
        
        // Remove the card from chat when closing
        const cardInChat = document.querySelector('.card-in-chat');
        if (cardInChat) {
            cardInChat.remove();
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
