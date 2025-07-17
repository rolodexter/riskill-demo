// Churn Metrics Animation Script
document.addEventListener('DOMContentLoaded', function() {
    // Reference to the third stack in the top row
    const churnStack = document.getElementById('topStack3');
    if (!churnStack) return;
    
    // Get the first card (top card) in the stack
    const topChurnCard = churnStack.querySelector('.stacked-card:first-child');
    if (!topChurnCard) return;
    
    // Clear existing content in the top card
    topChurnCard.innerHTML = '';
    
    // Create churn metrics elements
    createChurnMetricsUI(topChurnCard);
    
    // Start the real-time updates
    startChurnUpdates(topChurnCard);
    
    // Update other cards in the stack with related metrics
    updateChurnStackCards(churnStack);
});

// Create the UI elements for churn metrics
function createChurnMetricsUI(card) {
    // Clear any existing content and set base styles
    card.innerHTML = '';
    card.style.padding = 'clamp(8px, 3%, 16px)';
    
    // Create a wrapper to contain all content
    const wrapper = document.createElement('div');
    wrapper.className = 'churn-metrics-wrapper';
    wrapper.style.height = '100%';
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.justifyContent = 'space-between';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'churn-header';
    
    // Adapt title based on screen size
    const title = getResponsiveChurnTitle();
    header.innerHTML = `<h3>${title}</h3><div class="update-indicator">Updating...</div>`;
    wrapper.appendChild(header);
    
    // Create main KPI
    const kpiContainer = document.createElement('div');
    kpiContainer.className = 'churn-kpi-container';
    
    const kpi = document.createElement('div');
    kpi.className = 'churn-kpi';
    kpi.id = 'churn-main-kpi';
    kpi.textContent = '0%';
    kpiContainer.appendChild(kpi);
    
    // Only show trend if there's enough space
    if (window.innerWidth > 400 || window.innerHeight > 300) {
        const kpiTrend = document.createElement('div');
        kpiTrend.className = 'churn-trend';
        kpiTrend.id = 'churn-trend';
        kpiTrend.innerHTML = '<span class="trend-arrow">→</span> <span class="trend-value">0%</span>';
        kpiContainer.appendChild(kpiTrend);
    }
    
    wrapper.appendChild(kpiContainer);
    
    // Create churn risk visualization
    const riskContainer = document.createElement('div');
    riskContainer.className = 'churn-risk-container';
    riskContainer.innerHTML = `
        <div class="risk-label">Churn Risk Level</div>
        <div class="risk-indicator">
            <div class="risk-segment low" id="risk-low"></div>
            <div class="risk-segment medium" id="risk-medium"></div>
            <div class="risk-segment high" id="risk-high"></div>
        </div>
        <div class="risk-status" id="risk-status">Moderate</div>
    `;
    wrapper.appendChild(riskContainer);
    
    // Create secondary metrics - only if there's enough vertical space
    if (window.innerHeight > 250) {
        const secondaryMetrics = document.createElement('div');
        secondaryMetrics.className = 'churn-secondary-metrics';
        
        const previousPeriod = document.createElement('div');
        previousPeriod.className = 'churn-secondary-item';
        previousPeriod.innerHTML = '<div class="secondary-label">Previous</div><div class="secondary-value" id="churn-previous">0%</div>';
        secondaryMetrics.appendChild(previousPeriod);
        
        const target = document.createElement('div');
        target.className = 'churn-secondary-item';
        target.innerHTML = '<div class="secondary-label">Target</div><div class="secondary-value" id="churn-target">< 5%</div>';
        secondaryMetrics.appendChild(target);
        
        wrapper.appendChild(secondaryMetrics);
    }
    
    // Only show last update if there's enough vertical space
    if (window.innerHeight > 220) {
        const lastUpdate = document.createElement('div');
        lastUpdate.className = 'churn-last-update';
        lastUpdate.id = 'churn-last-update';
        lastUpdate.textContent = 'Last update: Just now';
        wrapper.appendChild(lastUpdate);
    }
    
    // Add the wrapper to the card
    card.appendChild(wrapper);
    
    // Add resize listener to adapt content
    window.addEventListener('resize', function() {
        adaptChurnContentToSize(card);
    });
}

// Get appropriate title based on screen size
function getResponsiveChurnTitle() {
    if (window.innerWidth < 350) {
        return 'Churn Rate';
    } else {
        return 'Customer Churn Rate';
    }
}

// Adapt content based on available space
function adaptChurnContentToSize(card) {
    // Update title based on screen width
    const titleElement = card.querySelector('.churn-header h3');
    if (titleElement) {
        titleElement.textContent = getResponsiveChurnTitle();
    }
    
    // Show/hide trend based on width
    const trendElement = card.querySelector('#churn-trend');
    if (trendElement) {
        trendElement.style.display = (window.innerWidth > 400 || window.innerHeight > 300) ? 'flex' : 'none';
    }
    
    // Show/hide secondary metrics based on height
    const secondaryMetrics = card.querySelector('.churn-secondary-metrics');
    if (secondaryMetrics) {
        secondaryMetrics.style.display = (window.innerHeight > 250) ? 'flex' : 'none';
    }
    
    // Show/hide last update based on height
    const lastUpdate = card.querySelector('#churn-last-update');
    if (lastUpdate) {
        lastUpdate.style.display = (window.innerHeight > 220) ? 'block' : 'none';
    }
}

// Start real-time updates for churn metrics
function startChurnUpdates(card) {
    // Initial values for negative scenario
    const initialChurn = 12.8;
    const targetChurn = 5.0;
    const previousChurn = 8.5;
    
    let currentChurn = initialChurn;
    let lastTrend = 0;
    
    // Update function
    function updateChurn() {
        // Generate a random fluctuation that tends to stay high or increase
        // Weighted towards positive fluctuations (more likely to increase than decrease)
        const fluctuation = (Math.random() * 0.8 - 0.2);
        
        // Calculate new churn with fluctuation, keeping it in the concerning range (10-15%)
        currentChurn = Math.min(15, Math.max(10, currentChurn + fluctuation));
        
        // Calculate trend (percentage change from initial)
        const trend = currentChurn - initialChurn;
        
        // Format numbers
        const formattedChurn = currentChurn.toFixed(1) + '%';
        const formattedTrend = (trend >= 0 ? '+' : '') + trend.toFixed(1) + '%';
        
        // Update UI elements
        const kpiElement = document.getElementById('churn-main-kpi');
        const trendElement = document.getElementById('churn-trend');
        const previousElement = document.getElementById('churn-previous');
        const lastUpdateElement = document.getElementById('churn-last-update');
        const riskLow = document.getElementById('risk-low');
        const riskMedium = document.getElementById('risk-medium');
        const riskHigh = document.getElementById('risk-high');
        const riskStatus = document.getElementById('risk-status');
        
        if (kpiElement) {
            kpiElement.textContent = formattedChurn;
            
            // Apply color coding based on performance
            if (currentChurn <= targetChurn) {
                kpiElement.style.color = '#2e7d32'; // Green for below target
            } else if (currentChurn <= previousChurn) {
                kpiElement.style.color = '#1976d2'; // Blue for below previous
            } else if (currentChurn <= previousChurn * 1.05) {
                kpiElement.style.color = '#000000'; // Black for slight increase
            } else {
                kpiElement.style.color = '#c62828'; // Red for significant increase
            }
        }
        
        if (trendElement) {
            const trendArrow = trendElement.querySelector('.trend-arrow');
            const trendValue = trendElement.querySelector('.trend-value');
            
            if (trend > lastTrend) {
                trendArrow.textContent = '↑';
                trendArrow.style.color = '#c62828'; // Red for up (bad for churn)
            } else if (trend < lastTrend) {
                trendArrow.textContent = '↓';
                trendArrow.style.color = '#2e7d32'; // Green for down (good for churn)
            } else {
                trendArrow.textContent = '→';
                trendArrow.style.color = '#000000'; // Black for no change
            }
            
            trendValue.textContent = formattedTrend;
            if (trend >= 0) {
                trendValue.style.color = '#c62828'; // Red for positive (bad for churn)
            } else {
                trendValue.style.color = '#2e7d32'; // Green for negative (good for churn)
            }
            
            lastTrend = trend;
        }
        
        if (previousElement) previousElement.textContent = previousChurn.toFixed(1) + '%';
        
        // Update risk indicators
        if (riskLow && riskMedium && riskHigh && riskStatus) {
            // Reset all indicators
            riskLow.classList.remove('active');
            riskMedium.classList.remove('active');
            riskHigh.classList.remove('active');
            
            // Set active indicator based on churn rate
            if (currentChurn < 5) {
                riskLow.classList.add('active');
                riskStatus.textContent = 'Low';
                riskStatus.style.color = '#2e7d32';
            } else if (currentChurn < 10) {
                riskMedium.classList.add('active');
                riskStatus.textContent = 'Moderate';
                riskStatus.style.color = '#ff9800';
            } else {
                riskHigh.classList.add('active');
                riskStatus.textContent = 'High';
                riskStatus.style.color = '#c62828';
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
    updateChurn();
    
    // Set interval for updates (every 3 seconds)
    setInterval(updateChurn, 3000);
}

// Update other cards in the stack with related metrics
function updateChurnStackCards(stack) {
    const cards = stack.querySelectorAll('.stacked-card');
    
    // Skip the first card (already handled)
    for (let i = 1; i < cards.length; i++) {
        const card = cards[i];
        
        // Clear existing content
        card.innerHTML = '';
        
        // Create content based on card position
        switch(i) {
            case 1:
                createSubscriptionChurnCard(card, "Subscription → Ticket");
                break;
            case 2:
                createCSATChurnCard(card, "CSAT ↔ Churn");
                break;
            case 3:
                createSegmentChurnCard(card, "Segment ↔ Churn");
                break;
            case 4:
                createTimesheetChurnCard(card, "Support Labor Cost");
                break;
            default:
                createDefaultChurnCard(card, "Churn Metrics");
        }
    }
}

// Create a subscription to ticket churn card
function createSubscriptionChurnCard(card, title) {
    const content = document.createElement('div');
    content.className = 'churn-card-content';
    content.innerHTML = `
        <h3 class="churn-card-title">${title}</h3>
        <div class="churn-insight-box">
            <div class="insight-icon">⚠️</div>
            <div class="insight-text">Churn risk when active tickets > 2 or CSAT < 3</div>
        </div>
        <div class="churn-metrics-container">
            <div class="churn-metric">
                <div class="metric-label">Accounts at Risk</div>
                <div class="metric-value">42</div>
                <div class="metric-trend negative">+8% vs last week</div>
            </div>
            <div class="churn-metric">
                <div class="metric-label">Avg. Open Tickets</div>
                <div class="metric-value">2.4</div>
                <div class="metric-trend negative">+0.3 vs target</div>
            </div>
        </div>
        <div class="ticket-distribution">
            <div class="distribution-label">Ticket Distribution</div>
            <div class="distribution-bars">
                <div class="distribution-bar">
                    <div class="bar-fill" style="height: 40%"></div>
                    <div class="bar-label">0</div>
                </div>
                <div class="distribution-bar">
                    <div class="bar-fill" style="height: 70%"></div>
                    <div class="bar-label">1</div>
                </div>
                <div class="distribution-bar">
                    <div class="bar-fill" style="height: 50%"></div>
                    <div class="bar-label">2</div>
                </div>
                <div class="distribution-bar warning">
                    <div class="bar-fill" style="height: 30%"></div>
                    <div class="bar-label">3+</div>
                </div>
            </div>
        </div>
    `;
    card.appendChild(content);
    
    // Add styles
    addChurnCardStyles(card);
}

// Create a CSAT to churn card
function createCSATChurnCard(card, title) {
    const content = document.createElement('div');
    content.className = 'churn-card-content';
    content.innerHTML = `
        <h3 class="churn-card-title">${title}</h3>
        <div class="churn-insight-box">
            <div class="insight-icon">📊</div>
            <div class="insight-text">CSAT detractor → churn within 60 days probability</div>
        </div>
        <div class="csat-probability-container">
            <div class="csat-gauge-container">
                <div class="csat-gauge">
                    <div class="gauge-value">68%</div>
                    <svg viewBox="0 0 100 50" class="gauge-svg">
                        <path d="M 10 50 A 40 40 0 0 1 90 50" class="gauge-bg" />
                        <path d="M 10 50 A 40 40 0 0 1 90 50" class="gauge-fill" style="stroke-dasharray: 126; stroke-dashoffset: 40;" />
                    </svg>
                </div>
                <div class="gauge-label">Churn Probability</div>
            </div>
        </div>
        <div class="churn-insight-box secondary">
            <div class="insight-icon">💡</div>
            <div class="insight-text">Customers scoring CSAT ≤ 2 last week have 37% pre-emptive outreach</div>
        </div>
    `;
    card.appendChild(content);
    
    // Add styles
    addChurnCardStyles(card);
}

// Create a segment churn card
function createSegmentChurnCard(card, title) {
    const content = document.createElement('div');
    content.className = 'churn-card-content';
    content.innerHTML = `
        <h3 class="churn-card-title">${title}</h3>
        <div class="churn-insight-box">
            <div class="insight-icon">📈</div>
            <div class="insight-text">Churn spike in Mid-Tier Self-Serve cohort</div>
        </div>
        <div class="segment-churn-container">
            <div class="segment-item">
                <div class="segment-name">Enterprise</div>
                <div class="segment-bar-container">
                    <div class="segment-bar" style="width: 30%;">3.2%</div>
                </div>
            </div>
            <div class="segment-item">
                <div class="segment-name">Mid-Market</div>
                <div class="segment-bar-container">
                    <div class="segment-bar" style="width: 55%;">5.8%</div>
                </div>
            </div>
            <div class="segment-item warning">
                <div class="segment-name">Mid-Tier Self-Serve</div>
                <div class="segment-bar-container">
                    <div class="segment-bar" style="width: 85%;">12.4%</div>
                </div>
            </div>
            <div class="segment-item">
                <div class="segment-name">Small Business</div>
                <div class="segment-bar-container">
                    <div class="segment-bar" style="width: 70%;">7.5%</div>
                </div>
            </div>
        </div>
        <div class="churn-insight-box secondary">
            <div class="insight-icon">💡</div>
            <div class="insight-text">Mid-tier users in the 'High Touch' segment are 3× more likely to receive outreach</div>
        </div>
    `;
    card.appendChild(content);
    
    // Add styles
    addChurnCardStyles(card);
}

// Create a timesheet transaction card
function createTimesheetChurnCard(card, title) {
    const content = document.createElement('div');
    content.className = 'churn-card-content';
    content.innerHTML = `
        <h3 class="churn-card-title">${title}</h3>
        <div class="churn-insight-box">
            <div class="insight-icon">💰</div>
            <div class="insight-text">Labor efficiency = Payroll / Gross Profit; flag upper quartile</div>
        </div>
        <div class="labor-efficiency-container">
            <div class="efficiency-value">42%</div>
            <div class="efficiency-label">of gross profit</div>
            <div class="efficiency-trend negative">+7% vs target</div>
        </div>
        <div class="labor-distribution">
            <div class="labor-item">
                <div class="labor-name">Customer Support</div>
                <div class="labor-value">18%</div>
            </div>
            <div class="labor-item warning">
                <div class="labor-name">Implementation</div>
                <div class="labor-value">14%</div>
            </div>
            <div class="labor-item">
                <div class="labor-name">Account Management</div>
                <div class="labor-value">10%</div>
            </div>
        </div>
        <div class="churn-insight-box secondary">
            <div class="insight-icon">⚠️</div>
            <div class="insight-text">Support labor cost hit 42% of gross profit yesterday (review shift scheduling)</div>
        </div>
    `;
    card.appendChild(content);
    
    // Add styles
    addChurnCardStyles(card);
}

// Create default content
function createDefaultChurnCard(card, title) {
    const content = document.createElement('div');
    content.className = 'churn-card-content';
    content.innerHTML = `
        <h3 class="churn-card-title">${title}</h3>
        <div class="default-content">
            <div class="card-line" style="width: 100%;"></div>
            <div class="card-line" style="width: 85%;"></div>
            <div class="card-line" style="width: 70%;"></div>
        </div>
    `;
    card.appendChild(content);
    
    // Add styles
    addChurnCardStyles(card);
}

// Add common styles to churn cards
function addChurnCardStyles(card) {
    // Add responsive styles
    card.style.padding = 'clamp(8px, 3%, 16px)';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.height = '100%';
    card.style.boxSizing = 'border-box';
    card.style.overflow = 'hidden';
    
    // Add CSS classes for styling
    card.classList.add('churn-detail-card');
}
