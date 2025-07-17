// Copilot Chat Panel Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get references to elements
    const copilotPanel = document.querySelector('.copilot-chat-panel');
    const revenueCard = document.querySelector('.module-card.card-urgent'); // Updated selector
    const adamCard = document.getElementById('adam-draper-card');
    const copilotMessages = document.querySelector('.copilot-messages');
    const inputField = document.querySelector('.copilot-input');
    const appContainer = document.querySelector('.app-container');
    const micIcon = document.querySelector('.mic-icon');
    
    // Function to animate Adam's card when sending a message
    function animateAdamCard() {
        if (!adamCard) return;
        
        // Add a class to indicate Adam is sending a message
        adamCard.classList.add('adam-sending');
        
        // Create and add a subtle pulse animation
        const pulseAnimation = adamCard.animate([
            { boxShadow: '0 2px 8px rgba(66, 133, 244, 0.1)', transform: 'translateY(0)' },
            { boxShadow: '0 4px 12px rgba(66, 133, 244, 0.25)', transform: 'translateY(-2px)' },
            { boxShadow: '0 2px 8px rgba(66, 133, 244, 0.1)', transform: 'translateY(0)' }
        ], {
            duration: 1800,
            iterations: 2,
            easing: 'ease-in-out'
        });
        
        // Create and add a subtle glow effect
        const glowOverlay = document.createElement('div');
        glowOverlay.className = 'adam-glow-overlay';
        glowOverlay.style.position = 'absolute';
        glowOverlay.style.top = '0';
        glowOverlay.style.left = '0';
        glowOverlay.style.width = '100%';
        glowOverlay.style.height = '100%';
        glowOverlay.style.borderRadius = '8px';
        glowOverlay.style.background = 'radial-gradient(circle at center, rgba(66, 133, 244, 0.15), transparent 70%)';
        glowOverlay.style.opacity = '0';
        glowOverlay.style.pointerEvents = 'none';
        glowOverlay.style.transition = 'opacity 0.5s ease-in-out';
        
        adamCard.style.position = 'relative';
        adamCard.appendChild(glowOverlay);
        
        // Animate the glow effect
        setTimeout(() => {
            glowOverlay.style.opacity = '1';
            
            setTimeout(() => {
                glowOverlay.style.opacity = '0';
                
                setTimeout(() => {
                    glowOverlay.remove();
                    adamCard.classList.remove('adam-sending');
                }, 500);
            }, 3000);
        }, 100);
        
        return pulseAnimation.finished;
    }
    
    // Function to open the Copilot panel with macOS-style animation
    function openCopilotPanel(source = 'revenue') {
        // First make panel visible but with opacity 0 and scaled down slightly
        copilotPanel.style.opacity = '0';
        copilotPanel.style.right = '-380px';
        copilotPanel.style.transform = 'translateY(-50%) translateX(10px) scale(0.95)';
        copilotPanel.classList.add('active');
        
        // Get the title from the card based on source
        let cardTitle = '';
        let message = '';
        
        if (source === 'revenue') {
            cardTitle = revenueCard.querySelector('h4').textContent;
            message = 'I can help you analyze this insight. What would you like to know?';
        } else if (source === 'adam') {
            cardTitle = 'Adam Draper';
            message = 'How can I assist you with your SaaS connections today?';
        }
        
        // Check if a card reference already exists
        const existingCardReference = copilotMessages.querySelector('.card-reference');
        let cardReference;
        
        // Only create and insert a new card reference if one doesn't already exist
        if (!existingCardReference) {
            // Create a simplified card reference with just the title
            cardReference = document.createElement('div');
            cardReference.className = 'card-reference';
            cardReference.innerHTML = `<div class="card-title">${cardTitle}</div>`;
            cardReference.style.opacity = '0';
            cardReference.style.transform = 'translateY(10px) scale(0.98)';
            
            // Insert the card reference at the beginning of the messages
            copilotMessages.insertBefore(cardReference, copilotMessages.firstChild);
        } else {
            cardReference = existingCardReference;
            cardReference.querySelector('.card-title').textContent = cardTitle;
            cardReference.style.opacity = '0';
            cardReference.style.transform = 'translateY(10px) scale(0.98)';
        }
        
        // Update or create the welcome message
        let welcomeMessage = document.querySelector('.copilot-message');
        if (!welcomeMessage) {
            welcomeMessage = document.createElement('div');
            welcomeMessage.className = 'message copilot-message';
            welcomeMessage.innerHTML = `<p>${message}</p>`;
            welcomeMessage.style.opacity = '0';
            welcomeMessage.style.transform = 'translateY(10px) scale(0.98)';
            copilotMessages.appendChild(welcomeMessage);
        } else {
            welcomeMessage.querySelector('p').textContent = message;
            welcomeMessage.style.opacity = '0';
            welcomeMessage.style.transform = 'translateY(10px) scale(0.98)';
        }
        
        // Animate the panel sliding in with macOS-style animation
        setTimeout(() => {
            copilotPanel.style.opacity = '1';
            copilotPanel.style.right = '0';
            copilotPanel.style.transform = 'translateY(-50%) translateX(0) scale(1)';
            copilotPanel.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            
            // Animate the card reference fading in with spring effect
            setTimeout(() => {
                cardReference.style.opacity = '1';
                cardReference.style.transform = 'translateY(0) scale(1)';
                cardReference.style.transition = 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1.2)';
            }, 150);
            
            // Animate the welcome message with spring effect
            const welcomeMessage = document.querySelector('.copilot-message');
            if (welcomeMessage) {
                welcomeMessage.style.opacity = '0';
                welcomeMessage.style.transform = 'translateY(10px) scale(0.98)';
                welcomeMessage.style.transition = 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1.2)';
                setTimeout(() => {
                    welcomeMessage.style.opacity = '1';
                    welcomeMessage.style.transform = 'translateY(0) scale(1)';
                }, 250);
            }
        }, 50);
    }
    
    // Function to close the Copilot panel with macOS-style animation
    function closeCopilotPanel() {
        // Animate the card reference fading out with scale effect
        const cardReference = document.querySelector('.card-reference');
        if (cardReference) {
            cardReference.style.opacity = '0';
            cardReference.style.transform = 'translateY(10px) scale(0.95)';
            cardReference.style.transition = 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
        }
        
        // Animate the welcome message fading out with scale effect
        const welcomeMessage = document.querySelector('.copilot-message');
        if (welcomeMessage) {
            welcomeMessage.style.opacity = '0';
            welcomeMessage.style.transform = 'translateY(10px) scale(0.95)';
            welcomeMessage.style.transition = 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
        }
        
        // Animate the panel sliding out with macOS-style minimize effect
        copilotPanel.style.opacity = '0';
        copilotPanel.style.right = '-380px';
        copilotPanel.style.transform = 'translateY(-50%) translateX(10px) scale(0.95)';
        copilotPanel.style.transition = 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
        
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
                    copilotPanel.style.transition = '';
                }
            }, 50);
        }, 350);
    }
    
    // Add event listeners to revenue card and Adam Draper card
    if (revenueCard) {
        revenueCard.addEventListener('click', function(event) {
            // Prevent click on integration items from triggering copilot
            if (!event.target.closest('.integration-item')) {
                openCopilotPanel('revenue');
            }
        });
    }
    
    if (adamCard) {
        adamCard.addEventListener('click', function(event) {
            // Prevent click on integration items from triggering copilot
            if (!event.target.closest('.integration-item')) {
                openCopilotPanel('adam');
            }
        });
    }
    
    // Add Enter key event listener for input field
    if (inputField) {
        inputField.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
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
            }
        });
    }
    
    // Add click event to app container to close panel when clicking outside
    if (appContainer) {
        appContainer.addEventListener('click', function(event) {
            // Only close if panel is active and click is outside the panel
            if (copilotPanel.classList.contains('active') && 
                !copilotPanel.contains(event.target) && 
                !event.target.closest('.module-card.card-urgent') && 
                !event.target.closest('#adam-draper-card')) {
                closeCopilotPanel();
            }
        });
    }
    
    // Add click event to microphone icon (for future implementation)
    if (micIcon) {
        micIcon.addEventListener('click', function() {
            // Placeholder for future voice functionality
            const pulseAnimation = micIcon.animate([
                { opacity: 0.4, transform: 'scale(1)' },
                { opacity: 0.7, transform: 'scale(1.1)' },
                { opacity: 0.4, transform: 'scale(1)' }
            ], {
                duration: 1000,
                iterations: 2
            });
            
            // Show a subtle tooltip or message
            const tooltip = document.createElement('div');
            tooltip.className = 'mic-tooltip';
            tooltip.textContent = 'Voice input coming soon';
            tooltip.style.position = 'absolute';
            tooltip.style.bottom = '60px';
            tooltip.style.right = '20px';
            tooltip.style.background = 'rgba(0,0,0,0.7)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '8px 12px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '12px';
            tooltip.style.opacity = '0';
            tooltip.style.transition = 'opacity 0.3s ease';
            
            copilotPanel.appendChild(tooltip);
            setTimeout(() => tooltip.style.opacity = '1', 10);
            
            setTimeout(() => {
                tooltip.style.opacity = '0';
                setTimeout(() => tooltip.remove(), 300);
            }, 2000);
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
