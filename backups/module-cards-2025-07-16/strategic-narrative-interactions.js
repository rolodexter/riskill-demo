/**
 * Strategic Insight Summary Interactive Features
 * Adds hover effects, metric highlighting, and click interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeStrategicNarrativeInteractions();
});

function initializeStrategicNarrativeInteractions() {
    const narrativeCard = document.querySelector('.strategic-narrative');
    if (!narrativeCard) return;
    
    // Add click interaction to toggle active state
    narrativeCard.addEventListener('click', function() {
        this.classList.toggle('active');
    });
    
    // Find and highlight metrics in the content
    highlightMetrics();
    
    // Add subtle entrance animation
    animateEntrance(narrativeCard);
}

function highlightMetrics() {
    const narrativeContent = document.querySelector('.narrative-content');
    if (!narrativeContent) return;
    
    // Find all paragraphs in the narrative content
    const paragraphs = narrativeContent.querySelectorAll('p');
    
    paragraphs.forEach(paragraph => {
        // Find percentage metrics (e.g., 42%, 27%)
        const text = paragraph.innerHTML;
        const highlightedText = text.replace(/(\d+)%/g, '<span data-metric="percentage">$1%</span>');
        
        // Update the paragraph content with highlighted metrics
        paragraph.innerHTML = highlightedText;
    });
    
    // Add tooltip event listeners to metrics
    const metricSpans = narrativeContent.querySelectorAll('span[data-metric]');
    metricSpans.forEach(span => {
        span.addEventListener('mouseenter', function() {
            const metric = this.textContent;
            const tooltip = document.createElement('div');
            tooltip.className = 'metric-tooltip';
            tooltip.textContent = `Key Metric: ${metric}`;
            
            // Position the tooltip
            const rect = this.getBoundingClientRect();
            tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
            tooltip.style.left = `${rect.left + window.scrollX}px`;
            
            document.body.appendChild(tooltip);
            
            // Store reference to the tooltip
            this.dataset.tooltipId = Date.now();
            tooltip.dataset.id = this.dataset.tooltipId;
        });
        
        span.addEventListener('mouseleave', function() {
            const tooltipId = this.dataset.tooltipId;
            if (tooltipId) {
                const tooltip = document.querySelector(`.metric-tooltip[data-id="${tooltipId}"]`);
                if (tooltip) {
                    tooltip.remove();
                }
            }
        });
    });
}

function animateEntrance(element) {
    // Only animate if anime.js is available
    if (typeof anime !== 'undefined') {
        // Reset initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(10px)';
        
        // Animate entrance
        setTimeout(() => {
            anime({
                targets: element,
                opacity: 1,
                translateY: 0,
                easing: 'easeOutCubic',
                duration: 800
            });
        }, 300);
    } else {
        // Fallback if anime.js is not available
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }
}
