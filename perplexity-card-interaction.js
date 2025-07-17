// Perplexity-style Card Interaction System

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all insight cards
    initializeInsightCards();
    
    // Setup text selection handling for highlight triggers
    setupTextSelectionHandling();
});

// Initialize all insight cards with interaction behaviors
function initializeInsightCards() {
    const insightCards = document.querySelectorAll('.insight-card');
    
    insightCards.forEach(card => {
        // Add click handler to toggle card actions
        card.addEventListener('click', function(e) {
            // Don't toggle if clicking on buttons or input
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') {
                return;
            }
            
            const actions = this.querySelector('.card-actions');
            if (actions) {
                actions.classList.toggle('hidden');
                
                // Focus the input if actions are visible
                if (!actions.classList.contains('hidden')) {
                    const input = actions.querySelector('.quick-reply');
                    if (input) {
                        setTimeout(() => input.focus(), 100);
                    }
                }
            }
        });
        
        // Setup quick reply input
        const quickReply = card.querySelector('.quick-reply');
        if (quickReply) {
            quickReply.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleQuickReply(this, card);
                }
            });
        }
        
        // Setup prebuilt action buttons
        const actionButtons = card.querySelectorAll('.prebuilt-actions button');
        actionButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                handlePrebuiltAction(this, card);
            });
        });
    });
}

// Handle quick reply input submission
function handleQuickReply(input, card) {
    const query = input.value.trim();
    if (query) {
        // Show loading indicator
        const loadingIndicator = card.querySelector('.card-loading') || createLoadingIndicator(card);
        loadingIndicator.classList.add('visible');
        
        // Clear input
        input.value = '';
        
        // Get card context
        const cardTitle = card.querySelector('h4')?.textContent || 'This insight';
        const cardContent = card.querySelector('p')?.textContent || '';
        
        // Simulate Copilot response (would be replaced with actual AI call)
        setTimeout(() => {
            // Hide loading indicator
            loadingIndicator.classList.remove('visible');
            
            // Create or show response area
            let responseArea = card.querySelector('.copilot-response');
            if (!responseArea) {
                responseArea = document.createElement('div');
                responseArea.className = 'copilot-response';
                card.appendChild(responseArea);
            }
            
            // Generate response based on query and card context
            const response = generateCopilotResponse(query, cardTitle, cardContent);
            responseArea.innerHTML = response;
            
            // Show response with animation
            setTimeout(() => {
                responseArea.classList.add('visible');
            }, 50);
            
            // Potentially generate a new card based on the interaction
            if (Math.random() > 0.5) { // 50% chance to generate a new card
                setTimeout(() => {
                    createNewInsightCard(query, cardTitle);
                }, 1000);
            }
        }, 1500);
    }
}

// Handle prebuilt action button clicks
function handlePrebuiltAction(button, card) {
    const action = button.textContent;
    
    // Special handling for "View source data" to prevent glitchy behavior
    if (action === "View source data") {
        // Prevent default card expansion behavior
        event.stopPropagation();
        
        // Create or show source data view
        let sourceDataView = card.querySelector('.source-data-view');
        if (!sourceDataView) {
            sourceDataView = document.createElement('div');
            sourceDataView.className = 'source-data-view';
            
            // Create sample source data content
            sourceDataView.innerHTML = `
                <div class="source-data-header">
                    <h5>Source Data</h5>
                    <button class="close-source-data">×</button>
                </div>
                <div class="source-data-content">
                    <div class="data-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Week</th>
                                    <th>Region</th>
                                    <th>Revenue</th>
                                    <th>% Change</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Current</td>
                                    <td>EU</td>
                                    <td>€1,427,300</td>
                                    <td class="positive">+42%</td>
                                </tr>
                                <tr>
                                    <td>Previous</td>
                                    <td>EU</td>
                                    <td>€1,004,400</td>
                                    <td class="positive">+5%</td>
                                </tr>
                                <tr>
                                    <td>2 Weeks Ago</td>
                                    <td>EU</td>
                                    <td>€956,600</td>
                                    <td class="positive">+3%</td>
                                </tr>
                                <tr>
                                    <td>3 Weeks Ago</td>
                                    <td>EU</td>
                                    <td>€928,700</td>
                                    <td class="neutral">0%</td>
                                </tr>
                                <tr>
                                    <td>4 Weeks Ago</td>
                                    <td>EU</td>
                                    <td>€929,100</td>
                                    <td class="negative">-2%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            
            // Add to card
            card.appendChild(sourceDataView);
            
            // Add close button handler
            const closeButton = sourceDataView.querySelector('.close-source-data');
            if (closeButton) {
                closeButton.addEventListener('click', function(e) {
                    e.stopPropagation();
                    sourceDataView.classList.remove('visible');
                });
            }
        }
        
        // Show source data with animation
        setTimeout(() => {
            sourceDataView.classList.add('visible');
        }, 50);
        
        return;
    }
    
    // Normal handling for other buttons
    const quickReply = card.querySelector('.quick-reply');
    if (quickReply) {
        quickReply.value = action;
        handleQuickReply(quickReply, card);
    }
}

// Create loading indicator for a card
function createLoadingIndicator(card) {
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'card-loading';
    card.prepend(loadingIndicator);
    return loadingIndicator;
}

// Setup text selection handling for highlight triggers
function setupTextSelectionHandling() {
    let highlightTrigger = null;
    
    // Create highlight trigger element
    function createHighlightTrigger() {
        const trigger = document.createElement('div');
        trigger.className = 'highlight-trigger';
        trigger.textContent = 'Ask Copilot about this?';
        document.body.appendChild(trigger);
        
        trigger.addEventListener('click', function() {
            const selection = window.getSelection();
            const text = selection.toString().trim();
            
            if (text) {
                // Find the closest card containing the selection
                const range = selection.getRangeAt(0);
                const container = range.commonAncestorContainer;
                const card = container.closest('.insight-card');
                
                if (card) {
                    // Create highlighted span
                    const span = document.createElement('span');
                    span.className = 'highlight-text';
                    span.textContent = text;
                    
                    try {
                        // Replace selected text with highlighted span
                        range.deleteContents();
                        range.insertNode(span);
                        
                        // Clear selection
                        selection.removeAllRanges();
                        
                        // Show card actions
                        const actions = card.querySelector('.card-actions');
                        if (actions) {
                            actions.classList.remove('hidden');
                        }
                        
                        // Set quick reply value to ask about highlighted text
                        const quickReply = card.querySelector('.quick-reply');
                        if (quickReply) {
                            quickReply.value = `Tell me more about "${text}"`;
                            quickReply.focus();
                        }
                    } catch (e) {
                        console.error('Error highlighting text:', e);
                    }
                }
            }
            
            // Hide trigger
            this.classList.remove('visible');
        });
        
        return trigger;
    }
    
    // Handle text selection
    document.addEventListener('selectionchange', function() {
        const selection = window.getSelection();
        const text = selection.toString().trim();
        
        // Create highlight trigger if it doesn't exist
        if (!highlightTrigger) {
            highlightTrigger = createHighlightTrigger();
        }
        
        if (text && text.length > 5) {
            // Get selection coordinates
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            
            // Position trigger below selection
            highlightTrigger.style.left = `${rect.left + window.scrollX}px`;
            highlightTrigger.style.top = `${rect.bottom + window.scrollY + 10}px`;
            
            // Show trigger
            highlightTrigger.classList.add('visible');
        } else if (highlightTrigger) {
            // Hide trigger if no text is selected
            highlightTrigger.classList.remove('visible');
        }
    });
    
    // Hide trigger when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (highlightTrigger && !e.target.closest('.highlight-trigger')) {
            highlightTrigger.classList.remove('visible');
        }
    });
}

// Generate Copilot response based on query and context
function generateCopilotResponse(query, cardTitle, cardContent) {
    // This would be replaced with actual AI response generation
    const responses = [
        `Based on the ${cardTitle.toLowerCase()}, I can see that there are several factors at play. The data suggests a correlation between recent events and the metrics you're seeing.`,
        `Looking at this more closely, the ${cardTitle.toLowerCase()} shows a pattern that's worth investigating further. Would you like me to analyze the underlying data sources?`,
        `I've analyzed the ${cardTitle.toLowerCase()} and found that there are three primary factors driving these results: market conditions, operational changes, and customer behavior shifts.`,
        `The ${cardTitle.toLowerCase()} indicates a significant shift from previous trends. This appears to be driven by recent changes in your business strategy.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// Create a new insight card based on interaction
function createNewInsightCard(query, relatedCardTitle) {
    // This would be replaced with actual AI-generated card content
    const cardTitles = [
        "Related Factor Analysis 🔍",
        "Trend Correlation Found 📈",
        "Root Cause Identified 🎯",
        "Strategic Opportunity 💡"
    ];
    
    const cardContents = [
        "Analysis of related factors shows a strong correlation between customer engagement and revenue growth in this segment.",
        "The system has detected a significant correlation between recent marketing campaigns and the metrics in question.",
        "After analyzing the data, three primary factors appear to be driving this trend: operational efficiency improvements, market expansion, and product enhancements.",
        "Based on this analysis, there's a strategic opportunity to optimize resource allocation and improve overall performance."
    ];
    
    // Create new card element
    const newCard = document.createElement('div');
    newCard.className = 'insight-card new-card stacked-insight';
    
    // Random title and content
    const titleIndex = Math.floor(Math.random() * cardTitles.length);
    const contentIndex = Math.floor(Math.random() * cardContents.length);
    
    // Build card HTML
    newCard.innerHTML = `
        <div class="card-body">
            <h4>${cardTitles[titleIndex]}</h4>
            <p>${cardContents[contentIndex]}</p>
        </div>
        <div class="card-actions hidden">
            <input class="quick-reply" placeholder="Ask Copilot…" />
            <div class="prebuilt-actions">
                <button>Tell me more</button>
                <button>Why is this important?</button>
                <button>Show related data</button>
            </div>
        </div>
    `;
    
    // Add to main canvas
    const mainCardContainer = document.querySelector('.main-card-container');
    if (mainCardContainer) {
        // Insert at the top
        mainCardContainer.insertBefore(newCard, mainCardContainer.firstChild);
        
        // Initialize the new card
        initializeInsightCards();
        
        // Scroll to the new card
        newCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
