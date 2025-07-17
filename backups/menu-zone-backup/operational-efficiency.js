// Operational Efficiency Animation Script
document.addEventListener('DOMContentLoaded', function() {
    // Reference to the second stack in the top row
    const efficiencyStack = document.getElementById('topStack2');
    if (!efficiencyStack) return;
    
    // Get the first card (top card) in the stack
    const topEfficiencyCard = efficiencyStack.querySelector('.stacked-card:first-child');
    if (!topEfficiencyCard) return;
    
    // Clear existing content in the top card
    topEfficiencyCard.innerHTML = '';
    
    // Create efficiency metrics elements
    createEfficiencyMetricsUI(topEfficiencyCard);
    
    // Start the real-time updates
    startEfficiencyUpdates(topEfficiencyCard);
    
    // Update other cards in the stack with related metrics
    updateEfficiencyStackCards(efficiencyStack);
});

// Create the UI elements for efficiency metrics
function createEfficiencyMetricsUI(card) {
    // Clear any existing content and set base styles
    card.innerHTML = '';
    card.style.padding = 'clamp(8px, 3%, 16px)';
    
    // Create a wrapper to contain all content
    const wrapper = document.createElement('div');
    wrapper.className = 'efficiency-metrics-wrapper';
    wrapper.style.height = '100%';
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.justifyContent = 'space-between';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'efficiency-header';
    
    // Adapt title based on screen size
    const title = getResponsiveEfficiencyTitle();
    header.innerHTML = `<h3>${title}</h3><div class="update-indicator">Updating...</div>`;
    wrapper.appendChild(header);
    
    // Create main KPI
    const kpiContainer = document.createElement('div');
    kpiContainer.className = 'efficiency-kpi-container';
    
    const kpi = document.createElement('div');
    kpi.className = 'efficiency-kpi';
    kpi.id = 'efficiency-main-kpi';
    kpi.textContent = '0%';
    kpiContainer.appendChild(kpi);
    
    // Only show trend if there's enough space
    if (window.innerWidth > 400 || window.innerHeight > 300) {
        const kpiTrend = document.createElement('div');
        kpiTrend.className = 'efficiency-trend';
        kpiTrend.id = 'efficiency-trend';
        kpiTrend.innerHTML = '<span class="trend-arrow">→</span> <span class="trend-value">0%</span>';
        kpiContainer.appendChild(kpiTrend);
    }
    
    wrapper.appendChild(kpiContainer);
    
    // Create gauge visualization
    const gaugeContainer = document.createElement('div');
    gaugeContainer.className = 'efficiency-gauge-container';
    gaugeContainer.innerHTML = `
        <div class="efficiency-gauge">
            <div class="gauge-fill" id="efficiency-gauge-fill"></div>
        </div>
        <div class="gauge-labels">
            <span>0%</span>
            <span>Target: 85%</span>
            <span>100%</span>
        </div>
    `;
    wrapper.appendChild(gaugeContainer);
    
    // Create secondary metrics - only if there's enough vertical space
    if (window.innerHeight > 250) {
        const secondaryMetrics = document.createElement('div');
        secondaryMetrics.className = 'efficiency-secondary-metrics';
        
        const previousPeriod = document.createElement('div');
        previousPeriod.className = 'efficiency-secondary-item';
        previousPeriod.innerHTML = '<div class="secondary-label">Previous</div><div class="secondary-value" id="efficiency-previous">0%</div>';
        secondaryMetrics.appendChild(previousPeriod);
        
        const target = document.createElement('div');
        target.className = 'efficiency-secondary-item';
        target.innerHTML = '<div class="secondary-label">Target</div><div class="secondary-value" id="efficiency-target">85%</div>';
        secondaryMetrics.appendChild(target);
        
        wrapper.appendChild(secondaryMetrics);
    }
    
    // Only show last update if there's enough vertical space
    if (window.innerHeight > 220) {
        const lastUpdate = document.createElement('div');
        lastUpdate.className = 'efficiency-last-update';
        lastUpdate.id = 'efficiency-last-update';
        lastUpdate.textContent = 'Last update: Just now';
        wrapper.appendChild(lastUpdate);
    }
    
    // Add the wrapper to the card
    card.appendChild(wrapper);
    
    // Add resize listener to adapt content
    window.addEventListener('resize', function() {
        adaptEfficiencyContentToSize(card);
    });
}

// Get appropriate title based on screen size
function getResponsiveEfficiencyTitle() {
    if (window.innerWidth < 350) {
        return 'Efficiency';
    } else {
        return 'Operational Efficiency';
    }
}

// Adapt content based on available space
function adaptEfficiencyContentToSize(card) {
    // Update title based on screen width
    const titleElement = card.querySelector('.efficiency-header h3');
    if (titleElement) {
        titleElement.textContent = getResponsiveEfficiencyTitle();
    }
    
    // Show/hide trend based on width
    const trendElement = card.querySelector('#efficiency-trend');
    if (trendElement) {
        trendElement.style.display = (window.innerWidth > 400 || window.innerHeight > 300) ? 'flex' : 'none';
    }
    
    // Show/hide secondary metrics based on height
    const secondaryMetrics = card.querySelector('.efficiency-secondary-metrics');
    if (secondaryMetrics) {
        secondaryMetrics.style.display = (window.innerHeight > 250) ? 'flex' : 'none';
    }
    
    // Show/hide last update based on height
    const lastUpdate = card.querySelector('#efficiency-last-update');
    if (lastUpdate) {
        lastUpdate.style.display = (window.innerHeight > 220) ? 'block' : 'none';
    }
}

// Start real-time updates for efficiency metrics
function startEfficiencyUpdates(card) {
    // Initial values
    const initialEfficiency = 78;
    const targetEfficiency = 85;
    const previousEfficiency = 72;
    
    let currentEfficiency = initialEfficiency;
    let lastTrend = 0;
    
    // Update function
    function updateEfficiency() {
        // Generate a random fluctuation (-1% to +1%)
        const fluctuation = (Math.random() * 2 - 1);
        
        // Calculate new efficiency with fluctuation
        currentEfficiency = Math.min(100, Math.max(0, currentEfficiency + fluctuation));
        
        // Calculate trend (percentage change from initial)
        const trend = currentEfficiency - initialEfficiency;
        
        // Format numbers
        const formattedEfficiency = currentEfficiency.toFixed(1) + '%';
        const formattedTrend = (trend >= 0 ? '+' : '') + trend.toFixed(1) + '%';
        
        // Update UI elements
        const kpiElement = document.getElementById('efficiency-main-kpi');
        const trendElement = document.getElementById('efficiency-trend');
        const previousElement = document.getElementById('efficiency-previous');
        const targetElement = document.getElementById('efficiency-target');
        const lastUpdateElement = document.getElementById('efficiency-last-update');
        const gaugeFill = document.getElementById('efficiency-gauge-fill');
        
        if (kpiElement) {
            kpiElement.textContent = formattedEfficiency;
            
            // Apply color coding based on performance
            if (currentEfficiency >= targetEfficiency) {
                kpiElement.style.color = '#2e7d32'; // Green for exceeding target
            } else if (currentEfficiency >= previousEfficiency) {
                kpiElement.style.color = '#1976d2'; // Blue for positive but below target
            } else if (currentEfficiency >= previousEfficiency * 0.95) {
                kpiElement.style.color = '#000000'; // Black for slight decrease
            } else {
                kpiElement.style.color = '#c62828'; // Red for significant decrease
            }
        }
        
        if (trendElement) {
            const trendArrow = trendElement.querySelector('.trend-arrow');
            const trendValue = trendElement.querySelector('.trend-value');
            
            if (trend > lastTrend) {
                trendArrow.textContent = '↑';
                trendArrow.style.color = '#2e7d32'; // Green for up
            } else if (trend < lastTrend) {
                trendArrow.textContent = '↓';
                trendArrow.style.color = '#c62828'; // Red for down
            } else {
                trendArrow.textContent = '→';
                trendArrow.style.color = '#000000'; // Black for no change
            }
            
            trendValue.textContent = formattedTrend;
            if (trend >= 0) {
                trendValue.style.color = '#2e7d32'; // Green for positive
            } else {
                trendValue.style.color = '#c62828'; // Red for negative
            }
            
            lastTrend = trend;
        }
        
        if (previousElement) previousElement.textContent = previousEfficiency + '%';
        if (targetElement) targetElement.textContent = targetEfficiency + '%';
        
        if (gaugeFill) {
            gaugeFill.style.width = currentEfficiency + '%';
            
            // Color the gauge based on performance
            if (currentEfficiency >= targetEfficiency) {
                gaugeFill.style.backgroundColor = '#2e7d32'; // Green
            } else if (currentEfficiency >= previousEfficiency) {
                gaugeFill.style.backgroundColor = '#1976d2'; // Blue
            } else {
                gaugeFill.style.backgroundColor = '#c62828'; // Red
            }
        }
        
        if (lastUpdateElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            lastUpdateElement.textContent = `Last update: ${timeString}`;
        }
        
        // Update indicator blink effect
        const updateIndicator = card.querySelector('.update-indicator');
        if (updateIndicator) {
            updateIndicator.style.opacity = '1';
            setTimeout(() => {
                updateIndicator.style.opacity = '0.5';
            }, 500);
        }
    }
    
    // Initial update
    updateEfficiency();
    
    // Set interval for updates (every 3 seconds)
    setInterval(updateEfficiency, 3000);
}

// Update other cards in the stack with related metrics
function updateEfficiencyStackCards(stack) {
    const cards = stack.querySelectorAll('.stacked-card');
    
    // Skip the first card (already handled)
    for (let i = 1; i < cards.length; i++) {
        const card = cards[i];
        
        // Clear existing content
        card.innerHTML = '';
        
        // Create content based on card position
        switch(i) {
            case 1:
                createProcessEfficiencyCard(card, "Process Efficiency");
                break;
            case 2:
                createResourceUtilizationCard(card, "Resource Utilization");
                break;
            case 3:
                createCostOptimizationCard(card, "Cost Optimization");
                break;
            case 4:
                createAutomationMetricsCard(card, "Automation Metrics");
                break;
            default:
                createDefaultEfficiencyCard(card, "Efficiency Metrics");
        }
    }
}

// Create a process efficiency card
function createProcessEfficiencyCard(card, title) {
    const content = document.createElement('div');
    content.className = 'efficiency-card-content';
    content.innerHTML = `
        <h3 class="efficiency-card-title">${title}</h3>
        <div class="process-metrics-container">
            <div class="process-metric">
                <div class="process-name">Order Processing</div>
                <div class="process-bar-container">
                    <div class="process-bar" style="width: 92%;"></div>
                </div>
                <div class="process-value">92%</div>
            </div>
            <div class="process-metric">
                <div class="process-name">Customer Onboarding</div>
                <div class="process-bar-container">
                    <div class="process-bar" style="width: 78%;"></div>
                </div>
                <div class="process-value">78%</div>
            </div>
            <div class="process-metric">
                <div class="process-name">Support Resolution</div>
                <div class="process-bar-container">
                    <div class="process-bar" style="width: 85%;"></div>
                </div>
                <div class="process-value">85%</div>
            </div>
            <div class="process-metric">
                <div class="process-name">Deployment</div>
                <div class="process-bar-container">
                    <div class="process-bar" style="width: 89%;"></div>
                </div>
                <div class="process-value">89%</div>
            </div>
        </div>
    `;
    card.appendChild(content);
    
    // Add styles
    addEfficiencyCardStyles(card);
}

// Create a resource utilization card
function createResourceUtilizationCard(card, title) {
    const content = document.createElement('div');
    content.className = 'efficiency-card-content';
    content.innerHTML = `
        <h3 class="efficiency-card-title">${title}</h3>
        <div class="utilization-container">
            <div class="utilization-item">
                <div class="utilization-circle" style="background: conic-gradient(#2e7d32 0% 82%, #f5f5f5 82% 100%);">
                    <span>82%</span>
                </div>
                <div class="utilization-label">Staff</div>
            </div>
            <div class="utilization-item">
                <div class="utilization-circle" style="background: conic-gradient(#1976d2 0% 76%, #f5f5f5 76% 100%);">
                    <span>76%</span>
                </div>
                <div class="utilization-label">Equipment</div>
            </div>
            <div class="utilization-item">
                <div class="utilization-circle" style="background: conic-gradient(#ff9800 0% 91%, #f5f5f5 91% 100%);">
                    <span>91%</span>
                </div>
                <div class="utilization-label">Systems</div>
            </div>
        </div>
        <div class="utilization-insight">
            <span class="insight-icon">💡</span>
            <span class="insight-text">System utilization approaching capacity limits</span>
        </div>
    `;
    card.appendChild(content);
    
    // Add styles
    addEfficiencyCardStyles(card);
}

// Create a cost optimization card
function createCostOptimizationCard(card, title) {
    const content = document.createElement('div');
    content.className = 'efficiency-card-content';
    content.innerHTML = `
        <h3 class="efficiency-card-title">${title}</h3>
        <table class="cost-table">
            <tr>
                <th>Category</th>
                <th>Savings</th>
                <th>Target</th>
            </tr>
            <tr>
                <td>Infrastructure</td>
                <td class="positive">$245K</td>
                <td>$200K</td>
            </tr>
            <tr>
                <td>Operations</td>
                <td class="positive">$182K</td>
                <td>$175K</td>
            </tr>
            <tr>
                <td>Procurement</td>
                <td class="negative">$98K</td>
                <td>$150K</td>
            </tr>
            <tr>
                <td>Total</td>
                <td class="positive">$525K</td>
                <td>$525K</td>
            </tr>
        </table>
    `;
    card.appendChild(content);
    
    // Add styles
    addEfficiencyCardStyles(card);
}

// Create an automation metrics card
function createAutomationMetricsCard(card, title) {
    const content = document.createElement('div');
    content.className = 'efficiency-card-content';
    content.innerHTML = `
        <h3 class="efficiency-card-title">${title}</h3>
        <div class="automation-metrics-grid">
            <div class="automation-metric">
                <div class="automation-value">68%</div>
                <div class="automation-label">Tasks Automated</div>
                <div class="automation-trend positive">+12%</div>
            </div>
            <div class="automation-metric">
                <div class="automation-value">4.2K</div>
                <div class="automation-label">Hours Saved</div>
                <div class="automation-trend positive">+8%</div>
            </div>
            <div class="automation-metric">
                <div class="automation-value">$380K</div>
                <div class="automation-label">Cost Savings</div>
                <div class="automation-trend positive">+15%</div>
            </div>
            <div class="automation-metric">
                <div class="automation-value">94%</div>
                <div class="automation-label">Accuracy</div>
                <div class="automation-trend positive">+2%</div>
            </div>
        </div>
    `;
    card.appendChild(content);
    
    // Add styles
    addEfficiencyCardStyles(card);
}

// Create default content
function createDefaultEfficiencyCard(card, title) {
    const content = document.createElement('div');
    content.className = 'efficiency-card-content';
    content.innerHTML = `
        <h3 class="efficiency-card-title">${title}</h3>
        <div class="default-content">
            <div class="card-line" style="width: 100%;"></div>
            <div class="card-line" style="width: 85%;"></div>
            <div class="card-line" style="width: 70%;"></div>
        </div>
    `;
    card.appendChild(content);
    
    // Add styles
    addEfficiencyCardStyles(card);
}

// Add common styles to efficiency cards
function addEfficiencyCardStyles(card) {
    // Add responsive styles
    card.style.padding = 'clamp(8px, 3%, 16px)';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.height = '100%';
    card.style.boxSizing = 'border-box';
    card.style.overflow = 'hidden';
    
    // Add CSS classes for styling
    card.classList.add('efficiency-detail-card');
}
