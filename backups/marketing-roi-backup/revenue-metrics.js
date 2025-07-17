// Revenue Metrics Animation Script
document.addEventListener('DOMContentLoaded', function() {
    // Reference to the first stack in the top row
    const revenueStack = document.getElementById('topStack1');
    if (!revenueStack) return;
    
    // Get the first card (top card) in the stack
    const topRevenueCard = revenueStack.querySelector('.stacked-card:first-child');
    if (!topRevenueCard) return;
    
    // Clear existing content in the top card
    topRevenueCard.innerHTML = '';
    
    // Create revenue metrics elements
    createRevenueMetricsUI(topRevenueCard);
    
    // Start the real-time updates
    startRevenueUpdates(topRevenueCard);
    
    // Update other cards in the stack with related metrics
    updateStackCards(revenueStack);
});

// Create the UI elements for revenue metrics
function createRevenueMetricsUI(card) {
    // Clear any existing content and set base styles
    card.innerHTML = '';
    card.style.padding = 'clamp(8px, 3%, 16px)';
    
    // Create a wrapper to contain all content
    const wrapper = document.createElement('div');
    wrapper.className = 'revenue-metrics-wrapper';
    wrapper.style.height = '100%';
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.justifyContent = 'space-between';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'revenue-header';
    
    // Adapt title based on screen size
    const title = getResponsiveTitle();
    header.innerHTML = `<h3>${title}</h3><div class="update-indicator">Updating...</div>`;
    wrapper.appendChild(header);
    
    // Create main KPI
    const kpiContainer = document.createElement('div');
    kpiContainer.className = 'revenue-kpi-container';
    
    const kpi = document.createElement('div');
    kpi.className = 'revenue-kpi';
    kpi.id = 'revenue-main-kpi';
    kpi.textContent = '$0';
    kpiContainer.appendChild(kpi);
    
    // Only show trend if there's enough space
    if (window.innerWidth > 400 || window.innerHeight > 300) {
        const kpiTrend = document.createElement('div');
        kpiTrend.className = 'revenue-trend';
        kpiTrend.id = 'revenue-trend';
        kpiTrend.innerHTML = '<span class="trend-arrow">→</span> <span class="trend-value">0%</span>';
        kpiContainer.appendChild(kpiTrend);
    }
    
    wrapper.appendChild(kpiContainer);
    
    // Create secondary metrics - only if there's enough vertical space
    if (window.innerHeight > 250) {
        const secondaryMetrics = document.createElement('div');
        secondaryMetrics.className = 'revenue-secondary-metrics';
        
        const ytd = document.createElement('div');
        ytd.className = 'revenue-secondary-item';
        ytd.innerHTML = '<div class="secondary-label">YTD</div><div class="secondary-value" id="revenue-ytd">$0</div>';
        secondaryMetrics.appendChild(ytd);
        
        const target = document.createElement('div');
        target.className = 'revenue-secondary-item';
        target.innerHTML = '<div class="secondary-label">Target</div><div class="secondary-value" id="revenue-target">$0</div>';
        secondaryMetrics.appendChild(target);
        
        wrapper.appendChild(secondaryMetrics);
    }
    
    // Only show last update if there's enough vertical space
    if (window.innerHeight > 220) {
        const lastUpdate = document.createElement('div');
        lastUpdate.className = 'revenue-last-update';
        lastUpdate.id = 'revenue-last-update';
        lastUpdate.textContent = 'Last update: Just now';
        wrapper.appendChild(lastUpdate);
    }
    
    // Add the wrapper to the card
    card.appendChild(wrapper);
    
    // Add resize listener to adapt content
    window.addEventListener('resize', function() {
        adaptContentToSize(card);
    });
}

// Get appropriate title based on screen size
function getResponsiveTitle() {
    if (window.innerWidth < 350) {
        return 'Q3 Revenue';
    } else {
        return 'Q3 Revenue Forecast';
    }
}

// Adapt content based on available space
function adaptContentToSize(card) {
    // Update title based on screen width
    const titleElement = card.querySelector('.revenue-header h3');
    if (titleElement) {
        titleElement.textContent = getResponsiveTitle();
    }
    
    // Show/hide trend based on width
    const trendElement = card.querySelector('#revenue-trend');
    if (trendElement) {
        trendElement.style.display = (window.innerWidth > 400 || window.innerHeight > 300) ? 'flex' : 'none';
    }
    
    // Show/hide secondary metrics based on height
    const secondaryMetrics = card.querySelector('.revenue-secondary-metrics');
    if (secondaryMetrics) {
        secondaryMetrics.style.display = (window.innerHeight > 250) ? 'flex' : 'none';
    }
    
    // Show/hide last update based on height
    const lastUpdate = card.querySelector('#revenue-last-update');
    if (lastUpdate) {
        lastUpdate.style.display = (window.innerHeight > 220) ? 'block' : 'none';
    }
}

// Start real-time updates for revenue metrics
function startRevenueUpdates(card) {
    // Initial values
    const initialRevenue = 4250000;
    const targetRevenue = 5000000;
    const ytdRevenue = 3800000;
    
    let currentRevenue = initialRevenue;
    let lastTrend = 0;
    
    // Update function
    function updateRevenue() {
        // Generate a random fluctuation (-2% to +2%)
        const fluctuation = (Math.random() * 4 - 2) / 100;
        
        // Calculate new revenue with fluctuation
        currentRevenue = currentRevenue * (1 + fluctuation);
        
        // Calculate trend (percentage change from initial)
        const trend = ((currentRevenue - initialRevenue) / initialRevenue) * 100;
        
        // Format numbers
        const formattedRevenue = formatCurrency(currentRevenue);
        const formattedTarget = formatCurrency(targetRevenue);
        const formattedYTD = formatCurrency(ytdRevenue);
        const formattedTrend = trend.toFixed(2);
        
        // Update UI elements
        const kpiElement = document.getElementById('revenue-main-kpi');
        const trendElement = document.getElementById('revenue-trend');
        const ytdElement = document.getElementById('revenue-ytd');
        const targetElement = document.getElementById('revenue-target');
        const lastUpdateElement = document.getElementById('revenue-last-update');
        
        if (kpiElement) {
            kpiElement.textContent = formattedRevenue;
            
            // Apply color coding based on performance
            if (currentRevenue >= targetRevenue) {
                kpiElement.style.color = '#2e7d32'; // Green for exceeding target
            } else if (currentRevenue >= initialRevenue) {
                kpiElement.style.color = '#1976d2'; // Blue for positive but below target
            } else if (currentRevenue >= initialRevenue * 0.9) {
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
            
            trendValue.textContent = `${formattedTrend}%`;
            if (trend >= 0) {
                trendValue.style.color = '#2e7d32'; // Green for positive
            } else {
                trendValue.style.color = '#c62828'; // Red for negative
            }
            
            lastTrend = trend;
        }
        
        if (ytdElement) ytdElement.textContent = formattedYTD;
        if (targetElement) targetElement.textContent = formattedTarget;
        
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
    
    // Format currency
    function formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    }
    
    // Initial update
    updateRevenue();
    
    // Set interval for updates (every 3 seconds)
    setInterval(updateRevenue, 3000);
}

// Update other cards in the stack with related metrics
function updateStackCards(stack) {
    const cards = stack.querySelectorAll('.stacked-card');
    
    // Skip the first card (already handled)
    for (let i = 1; i < cards.length; i++) {
        const card = cards[i];
        
        // Clear existing content
        card.innerHTML = '';
        
        // Create content based on card position
        switch(i) {
            case 1:
                createRevenueBreakdownCard(card, "Revenue Breakdown");
                break;
            case 2:
                createRevenueBreakdownCard(card, "Regional Performance");
                break;
            case 3:
                createRevenueBreakdownCard(card, "Product Line Analysis");
                break;
            case 4:
                createRevenueBreakdownCard(card, "Customer Segment");
                break;
            default:
                createRevenueBreakdownCard(card, "Revenue Metrics");
        }
    }
}

// Create a revenue breakdown card
function createRevenueBreakdownCard(card, title) {
    // Clear existing content and set padding
    card.innerHTML = '';
    card.style.padding = 'clamp(8px, 3%, 16px)';
    
    // Create content based on card title
    switch(title) {
        case "Revenue Breakdown":
            createRevenueBreakdownContent(card, title);
            break;
        case "Regional Performance":
            createRegionalPerformanceContent(card, title);
            break;
        case "Product Line Analysis":
            createProductLineContent(card, title);
            break;
        case "Customer Segment":
            createCustomerSegmentContent(card, title);
            break;
        default:
            createDefaultContent(card, title);
    }
}

// Create revenue breakdown content
function createRevenueBreakdownContent(card, title) {
    const content = document.createElement('div');
    content.className = 'revenue-card-content';
    content.innerHTML = `
        <h3 class="revenue-card-title">${title}</h3>
        <div class="revenue-chart-container">
            <div class="revenue-chart-bar" style="height: 60%; background-color: rgba(0, 120, 212, 0.7);" title="Subscription: 60%"></div>
            <div class="revenue-chart-bar" style="height: 25%; background-color: rgba(0, 188, 242, 0.7);" title="Services: 25%"></div>
            <div class="revenue-chart-bar" style="height: 15%; background-color: rgba(122, 195, 246, 0.7);" title="One-time: 15%"></div>
        </div>
        <div class="revenue-chart-legend">
            <div class="legend-item">
                <span class="legend-color" style="background-color: rgba(0, 120, 212, 0.7);"></span>
                <span class="legend-text">Subscription</span>
            </div>
            <div class="legend-item">
                <span class="legend-color" style="background-color: rgba(0, 188, 242, 0.7);"></span>
                <span class="legend-text">Services</span>
            </div>
            <div class="legend-item">
                <span class="legend-color" style="background-color: rgba(122, 195, 246, 0.7);"></span>
                <span class="legend-text">One-time</span>
            </div>
        </div>
    `;
    card.appendChild(content);
    
    // Add styles
    addCardStyles(card);
}

// Create regional performance content
function createRegionalPerformanceContent(card, title) {
    const content = document.createElement('div');
    content.className = 'revenue-card-content';
    content.innerHTML = `
        <h3 class="revenue-card-title">${title}</h3>
        <div class="revenue-metrics-grid">
            <div class="region-metric">
                <div class="region-name">North America</div>
                <div class="region-value">$1.8M</div>
                <div class="region-trend positive">+4.2%</div>
            </div>
            <div class="region-metric">
                <div class="region-name">Europe</div>
                <div class="region-value">$1.2M</div>
                <div class="region-trend positive">+2.8%</div>
            </div>
            <div class="region-metric">
                <div class="region-name">Asia Pacific</div>
                <div class="region-value">$0.9M</div>
                <div class="region-trend negative">-1.5%</div>
            </div>
            <div class="region-metric">
                <div class="region-name">LATAM</div>
                <div class="region-value">$0.4M</div>
                <div class="region-trend positive">+6.3%</div>
            </div>
        </div>
    `;
    card.appendChild(content);
    
    // Add styles
    addCardStyles(card);
}

// Create product line content
function createProductLineContent(card, title) {
    const content = document.createElement('div');
    content.className = 'revenue-card-content';
    content.innerHTML = `
        <h3 class="revenue-card-title">${title}</h3>
        <table class="product-table">
            <tr>
                <th>Product</th>
                <th>Revenue</th>
                <th>Growth</th>
            </tr>
            <tr>
                <td>Enterprise Suite</td>
                <td>$1.45M</td>
                <td class="positive">+8.2%</td>
            </tr>
            <tr>
                <td>Security Pro</td>
                <td>$1.05M</td>
                <td class="positive">+3.7%</td>
            </tr>
            <tr>
                <td>Analytics Platform</td>
                <td>$0.85M</td>
                <td class="negative">-2.1%</td>
            </tr>
            <tr>
                <td>Cloud Services</td>
                <td>$0.65M</td>
                <td class="positive">+12.4%</td>
            </tr>
        </table>
    `;
    card.appendChild(content);
    
    // Add styles
    addCardStyles(card);
}

// Create customer segment content
function createCustomerSegmentContent(card, title) {
    const content = document.createElement('div');
    content.className = 'revenue-card-content';
    content.innerHTML = `
        <h3 class="revenue-card-title">${title}</h3>
        <div class="segment-container">
            <div class="segment-item">
                <div class="segment-circle" style="background-color: rgba(0, 120, 212, 0.2); border: 2px solid rgba(0, 120, 212, 0.7);">
                    <span>45%</span>
                </div>
                <div class="segment-label">Enterprise</div>
            </div>
            <div class="segment-item">
                <div class="segment-circle" style="background-color: rgba(0, 188, 242, 0.2); border: 2px solid rgba(0, 188, 242, 0.7);">
                    <span>30%</span>
                </div>
                <div class="segment-label">Mid-Market</div>
            </div>
            <div class="segment-item">
                <div class="segment-circle" style="background-color: rgba(122, 195, 246, 0.2); border: 2px solid rgba(122, 195, 246, 0.7);">
                    <span>25%</span>
                </div>
                <div class="segment-label">SMB</div>
            </div>
        </div>
        <div class="segment-insight">
            <span class="insight-icon">💡</span>
            <span class="insight-text">Enterprise segment growing fastest at 8.3% YoY</span>
        </div>
    `;
    card.appendChild(content);
    
    // Add styles
    addCardStyles(card);
}

// Create default content
function createDefaultContent(card, title) {
    const content = document.createElement('div');
    content.className = 'revenue-card-content';
    content.innerHTML = `
        <h3 class="revenue-card-title">${title}</h3>
        <div class="default-content">
            <div class="card-line" style="width: 100%;"></div>
            <div class="card-line" style="width: 85%;"></div>
            <div class="card-line" style="width: 70%;"></div>
        </div>
    `;
    card.appendChild(content);
    
    // Add styles
    addCardStyles(card);
}

// Add common styles to revenue cards
function addCardStyles(card) {
    // Add responsive styles
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.height = '100%';
    card.style.boxSizing = 'border-box';
    card.style.overflow = 'hidden';
    
    // Add CSS classes for styling
    card.classList.add('revenue-detail-card');
}
