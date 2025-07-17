// Copilot Integration - Ultra Minimalist Design
document.addEventListener('DOMContentLoaded', function() {
    // Create the copilot modal
    const copilotModal = document.createElement('div');
    copilotModal.className = 'copilot-modal';
    copilotModal.innerHTML = `
        <div class="copilot-header">
            <div class="copilot-title">AI Copilot</div>
            <div class="copilot-close"></div>
        </div>
        <div class="copilot-content">
            <p>How can I help you with this information?</p>
        </div>
        <div class="copilot-input">
            <input type="text" placeholder="Ask a question..." />
            <div class="copilot-send"></div>
        </div>
    `;
    document.body.appendChild(copilotModal);

    // Add copilot triggers to all cards
    addCopilotTriggers('.stacked-card');
    addCopilotTriggers('.wireframe-card');
    addCopilotTriggers('.left-wireframe-card');
    addCopilotTriggers('.main-wireframe-card');

    // Close button functionality
    const closeButton = document.querySelector('.copilot-close');
    closeButton.addEventListener('click', function() {
        copilotModal.classList.remove('active');
    });

    // Send button functionality (placeholder)
    const sendButton = document.querySelector('.copilot-send');
    const inputField = document.querySelector('.copilot-input input');
    
    sendButton.addEventListener('click', function() {
        handleCopilotQuery();
    });
    
    inputField.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleCopilotQuery();
        }
    });

    function handleCopilotQuery() {
        const query = inputField.value.trim();
        if (query) {
            // Add user query to chat
            const userQuery = document.createElement('div');
            userQuery.style.marginBottom = '12px';
            userQuery.style.textAlign = 'right';
            userQuery.innerHTML = `<span style="background: rgba(0, 120, 212, 0.1); padding: 6px 12px; border-radius: 12px; display: inline-block;">${query}</span>`;
            document.querySelector('.copilot-content').appendChild(userQuery);
            
            // Clear input
            inputField.value = '';
            
            // Simulate response (would be replaced with actual AI response)
            setTimeout(() => {
                const response = document.createElement('div');
                response.style.marginBottom = '12px';
                response.innerHTML = `<span style="background: rgba(240, 240, 240, 0.6); padding: 6px 12px; border-radius: 12px; display: inline-block;">I'm analyzing this data for you...</span>`;
                document.querySelector('.copilot-content').appendChild(response);
                
                // Scroll to bottom
                const content = document.querySelector('.copilot-content');
                content.scrollTop = content.scrollHeight;
            }, 500);
        }
    }

    // Function to add copilot triggers to elements
    function addCopilotTriggers(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            const trigger = document.createElement('div');
            trigger.className = 'copilot-trigger';
            
            // Store context about the card
            const cardTitle = element.querySelector('h3')?.textContent || 'This card';
            trigger.dataset.context = cardTitle;
            
            element.style.position = 'relative';
            element.appendChild(trigger);
            
            trigger.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card click events
                
                // Set context in copilot
                const content = document.querySelector('.copilot-content');
                content.innerHTML = `<p>How can I help you with <strong>${this.dataset.context}</strong>?</p>`;
                
                // Show modal
                copilotModal.classList.add('active');
                
                // Focus input
                document.querySelector('.copilot-input input').focus();
            });
        });
    }
});
