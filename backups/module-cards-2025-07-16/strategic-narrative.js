/**
 * Strategic Narrative Generator
 * Synthesizes insights from cards to create a strategic narrative for the front page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Narrative generator disabled - using static content only
    console.log('Strategic narrative auto-generation disabled');
    
    // No longer listening for card data updates
    // document.addEventListener('cardDataUpdated', function() {
    //     updateStrategicNarrative();
    // });
});

/**
 * Initialize the strategic narrative
 */
function initStrategicNarrative() {
    // Get the narrative content container
    const narrativeContent = document.querySelector('.narrative-content');
    
    if (!narrativeContent) return;
    
    // Check if custom content already exists
    if (narrativeContent.innerHTML.trim() !== '') {
        console.log('Custom narrative content detected - preserving it');
        // Just add animation effect without overwriting content
        narrativeContent.style.opacity = '0';
        narrativeContent.style.transform = 'translateY(10px)';
        narrativeContent.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        setTimeout(() => {
            narrativeContent.style.opacity = '1';
            narrativeContent.style.transform = 'translateY(0)';
        }, 300);
        return;
    }
    
    // Add animation effect to the narrative
    narrativeContent.style.opacity = '0';
    narrativeContent.style.transform = 'translateY(10px)';
    narrativeContent.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    
    setTimeout(() => {
        narrativeContent.style.opacity = '1';
        narrativeContent.style.transform = 'translateY(0)';
    }, 300);
    
    // Narrative generation disabled
    console.log('Strategic narrative generation disabled');
}

/**
 * Update the strategic narrative based on card data
 */
function updateStrategicNarrative() {
    console.log('Strategic narrative update disabled - preserving existing content');
    // All functionality disabled to preserve custom content
    return;
}

/**
 * Extract key insights from cards
 * @param {NodeList} cards - The insight cards
 * @returns {Object} - Extracted insights
 */
function extractInsightsFromCards(cards) {
    const insights = {
        metrics: [],
        organizations: [],
        trends: [],
        people: []
    };
    
    cards.forEach(card => {
        const cardText = card.textContent;
        
        // Extract metrics (numbers followed by %)
        const metricMatches = cardText.match(/\d+%/g);
        if (metricMatches) {
            insights.metrics = insights.metrics.concat(metricMatches);
        }
        
        // Extract organizations (entity links with organization class)
        const orgElements = card.querySelectorAll('.entity-link.organization');
        orgElements.forEach(org => {
            if (org.dataset.entity && !insights.organizations.includes(org.dataset.entity)) {
                insights.organizations.push(org.dataset.entity);
            }
        });
        
        // Extract people (entity links with contact class)
        const peopleElements = card.querySelectorAll('.entity-link.contact');
        peopleElements.forEach(person => {
            if (person.dataset.entity && !insights.people.includes(person.dataset.entity)) {
                insights.people.push(person.dataset.entity);
            }
        });
        
        // Extract trends (look for words like "increased", "decreased", "growth", etc.)
        const trendWords = ['increased', 'decreased', 'growth', 'decline', 'improvement', 'reduction'];
        trendWords.forEach(word => {
            if (cardText.toLowerCase().includes(word)) {
                // Get the sentence containing the trend word
                const sentences = cardText.split('.');
                const relevantSentence = sentences.find(s => s.toLowerCase().includes(word));
                if (relevantSentence && !insights.trends.includes(relevantSentence.trim())) {
                    insights.trends.push(relevantSentence.trim());
                }
            }
        });
    });
    
    return insights;
}

/**
 * Generate narrative paragraphs from insights
 * @param {Object} insights - The extracted insights
 * @returns {Array} - Array of paragraph strings
 */
function generateNarrativeParagraphs(insights) {
    const paragraphs = [];
    
    // First paragraph - Overall performance and key metrics
    let firstParagraph = "Analysis of current risk metrics indicates ";
    
    // Add a trend if available
    if (insights.trends.length > 0) {
        // Use the first trend, but clean it up to be part of a sentence
        let trend = insights.trends[0].toLowerCase()
            .replace(/^[,.;:\s]+/, '') // Remove leading punctuation and whitespace
            .replace(/^(that|a|an|the)\s+/i, ''); // Remove leading articles
        
        firstParagraph += trend;
    } else {
        firstParagraph += "significant changes in overall security posture across the enterprise";
    }
    
    // Add organizations if available
    if (insights.organizations.length > 0) {
        firstParagraph += `, with particularly strong performance in key accounts including ${insights.organizations.slice(0, 2).join(' and ')}`;
    }
    
    firstParagraph += ". ";
    
    // Add metrics if available
    if (insights.metrics.length > 0) {
        firstParagraph += `Key metrics show improvements of ${insights.metrics.slice(0, 2).join(' and ')} in critical areas, `;
        firstParagraph += "suggesting a positive trajectory for enterprise risk management.";
    } else {
        firstParagraph += "Ongoing monitoring of key metrics indicates a positive trajectory for enterprise risk management.";
    }
    
    paragraphs.push(firstParagraph);
    
    // Second paragraph - Strategic recommendations and people
    let secondParagraph = "Strategic recommendations focus on ";
    
    // Add another trend if available
    if (insights.trends.length > 1) {
        let trend = insights.trends[1].toLowerCase()
            .replace(/^[,.;:\s]+/, '')
            .replace(/^(that|a|an|the)\s+/i, '');
        
        secondParagraph += "leveraging " + trend;
    } else {
        secondParagraph += "capitalizing on current performance gains while addressing emerging risk vectors";
    }
    
    // Add people if available
    if (insights.people.length > 0) {
        secondParagraph += `. Coordination with ${insights.people.slice(0, 2).join(' and ')} is recommended `;
        secondParagraph += "to ensure alignment between security initiatives and business objectives.";
    } else {
        secondParagraph += ". Cross-functional coordination is recommended to ensure alignment between security initiatives and business objectives.";
    }
    
    // Add final strategic note
    secondParagraph += " Continued investment in proactive risk management capabilities will further strengthen the organization's security posture and competitive advantage.";
    
    paragraphs.push(secondParagraph);
    
    return paragraphs;
}

/**
 * Update the narrative content with generated paragraphs
 * @param {Array} paragraphs - Array of paragraph strings
 */
function updateNarrativeContent(paragraphs) {
    console.log('DISABLED: Narrative content update prevented to preserve custom content');
    // Function completely disabled to prevent any DOM modifications
    return;
}
