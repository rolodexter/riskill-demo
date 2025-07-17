// Growth Opportunities Theme JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the growth opportunities card
    initGrowthOpportunitiesCard();
});

function initGrowthOpportunitiesCard() {
    // Get the top stack container for growth opportunities
    const topStack5 = document.getElementById('topStack5');
    if (!topStack5) return;

    // Get the first card in the stack
    const mainCard = topStack5.querySelector('.stacked-card:first-child');
    if (!mainCard) return;

    // Set up the main card content
    setupMainGrowthCard(mainCard);
    
    // Set up the detail cards
    setupGrowthDetailCards(topStack5);

    // Start the data update simulation
    startGrowthDataUpdates(mainCard);
}

function setupMainGrowthCard(card) {
    // Create the HTML structure for the main growth opportunities card
    card.innerHTML = `
        <div class="growth-header">
            <h3>Growth Opportunities</h3>
            <div class="growth-trend">
                <span class="status-indicator status-green"></span>
                <span>Healthy</span>
            </div>
        </div>
        
        <div class="growth-kpi-container">
            <div class="growth-kpi">+18.4%</div>
            <div class="growth-trend positive">
                <span>+3.2% vs target</span>
            </div>
        </div>
        
        <div class="growth-secondary-metrics">
            <div class="growth-secondary-item">
                <div class="secondary-label">Expansion</div>
                <div class="secondary-value">+12.8%</div>
            </div>
            <div class="growth-secondary-item">
                <div class="secondary-label">New Accounts</div>
                <div class="secondary-value">+5.6%</div>
            </div>
            <div class="growth-secondary-item">
                <div class="secondary-label">Forecast</div>
                <div class="secondary-value">+21.2%</div>
            </div>
        </div>
        
        <div class="growth-insight-box">
            <div class="insight-icon">💡</div>
            <div class="insight-text">23 accounts hit 'usage threshold' for Tier-2 — nudge campaign ready.</div>
        </div>
        
        <div class="growth-last-update">
            Updated <span class="update-time">just now</span>
        </div>
    `;
}

function setupGrowthDetailCards(container) {
    // Get all cards except the first one
    const detailCards = container.querySelectorAll('.stacked-card:not(:first-child)');
    
    // Card templates based on the screenshot
    const cardTemplates = [
        // Expansion Engine Card
        `
        <div class="growth-detail-card">
            <div class="growth-card-title">Expansion Engine</div>
            <div class="growth-card-content">
                <div class="growth-insight-box">
                    <div class="insight-icon">📊</div>
                    <div class="insight-text">Usage vs. potential for account-level upsage threshold alerts</div>
                </div>
                
                <div class="feature-usage-chart">
                    <div class="usage-bars">
                        <div class="usage-bar-container">
                            <div class="usage-label">API Calls</div>
                            <div class="usage-bar-wrapper">
                                <div class="usage-bar" style="width: 87%;"></div>
                            </div>
                            <div class="usage-value">87%</div>
                        </div>
                        <div class="usage-bar-container">
                            <div class="usage-label">Storage</div>
                            <div class="usage-bar-wrapper">
                                <div class="usage-bar" style="width: 76%;"></div>
                            </div>
                            <div class="usage-value">76%</div>
                        </div>
                        <div class="usage-bar-container">
                            <div class="usage-label">Users</div>
                            <div class="usage-bar-wrapper">
                                <div class="usage-bar" style="width: 92%;"></div>
                            </div>
                            <div class="usage-value">92%</div>
                        </div>
                        <div class="usage-bar-container">
                            <div class="usage-label">Integrations</div>
                            <div class="usage-bar-wrapper">
                                <div class="usage-bar" style="width: 64%;"></div>
                            </div>
                            <div class="usage-value">64%</div>
                        </div>
                    </div>
                </div>
                
                <div class="expansion-propensity">
                    <div class="propensity-container">
                        <div class="propensity-item">
                            <div class="propensity-value">23</div>
                            <div class="propensity-label">Accounts at Threshold</div>
                        </div>
                        <div class="propensity-item highlight">
                            <div class="propensity-value">$148K</div>
                            <div class="propensity-label">Expansion Opportunity</div>
                        </div>
                    </div>
                </div>
                
                <div class="growth-insight-box">
                    <div class="insight-icon">💡</div>
                    <div class="insight-text">23 accounts hit 'usage threshold' for Tier-2 — nudge campaign ready.</div>
                </div>
            </div>
        </div>
        `,
        
        // Growth Pulse - Event → Subscription Card
        `
        <div class="growth-detail-card">
            <div class="growth-card-title">Growth Pulse</div>
            <div class="growth-card-content">
                <div class="growth-insight-box">
                    <div class="insight-icon">📊</div>
                    <div class="insight-text">Expansion propensity ↑ when new feature used ≥ N times</div>
                </div>
                
                <div class="usage-frequency">
                    <div class="metric-label">Feature X Usage Frequency</div>
                    <div class="frequency-distribution">
                        <div class="frequency-bar">
                            <div class="frequency-value">32%</div>
                            <div class="frequency-fill" style="height: 32%;"></div>
                            <div class="frequency-label">0 times</div>
                        </div>
                        <div class="frequency-bar">
                            <div class="frequency-value">24%</div>
                            <div class="frequency-fill" style="height: 24%;"></div>
                            <div class="frequency-label">1-2 times</div>
                        </div>
                        <div class="frequency-bar">
                            <div class="frequency-value">26%</div>
                            <div class="frequency-fill" style="height: 26%;"></div>
                            <div class="frequency-label">3-4 times</div>
                        </div>
                        <div class="frequency-bar highlight">
                            <div class="frequency-value">18%</div>
                            <div class="frequency-fill" style="height: 18%;"></div>
                            <div class="frequency-label">5+ times</div>
                        </div>
                    </div>
                </div>
                
                <div class="growth-metrics-container">
                    <div class="growth-metric">
                        <div class="metric-label">Upgrade Rate</div>
                        <div class="metric-value">18%</div>
                        <div class="metric-trend positive">+5% vs avg</div>
                    </div>
                    <div class="growth-metric">
                        <div class="metric-label">Avg. Expansion</div>
                        <div class="metric-value">$6,420</div>
                        <div class="metric-trend positive">+12% vs avg</div>
                    </div>
                </div>
                
                <div class="growth-insight-box">
                    <div class="insight-icon">💡</div>
                    <div class="insight-text">Accounts that tried Feature X 5+ times upgraded 18% more than other users.</div>
                </div>
            </div>
        </div>
        `,
        
        // Growth Pulse - NPS Comment → Feature Usage Card
        `
        <div class="growth-detail-card">
            <div class="growth-card-title">Growth Pulse</div>
            <div class="growth-card-content">
                <div class="growth-insight-box">
                    <div class="insight-icon">📊</div>
                    <div class="insight-text">Sentiment vs frequency of usage — low usage, positive feedback = opportunity</div>
                </div>
                
                <div class="nps-sentiment">
                    <div class="metric-label">NPS Comment Sentiment by Usage Frequency</div>
                    <div class="sentiment-container">
                        <div class="sentiment-row">
                            <div class="sentiment-label">Low Usage</div>
                            <div class="sentiment-bar-container">
                                <div class="sentiment-bar positive" style="width: 65%;"></div>
                            </div>
                            <div class="sentiment-value">65%</div>
                        </div>
                        <div class="sentiment-row">
                            <div class="sentiment-label">Medium Usage</div>
                            <div class="sentiment-bar-container">
                                <div class="sentiment-bar positive" style="width: 78%;"></div>
                            </div>
                            <div class="sentiment-value">78%</div>
                        </div>
                        <div class="sentiment-row">
                            <div class="sentiment-label">High Usage</div>
                            <div class="sentiment-bar-container">
                                <div class="sentiment-bar positive" style="width: 92%;"></div>
                            </div>
                            <div class="sentiment-value">92%</div>
                        </div>
                    </div>
                </div>
                
                <div class="growth-metrics-container">
                    <div class="growth-metric">
                        <div class="metric-label">Performance Mentions</div>
                        <div class="metric-value">42%</div>
                        <div class="metric-trend positive">+8% vs last month</div>
                    </div>
                    <div class="growth-metric">
                        <div class="metric-label">Feature Requests</div>
                        <div class="metric-value">28%</div>
                        <div class="metric-trend negative">-3% vs last month</div>
                    </div>
                </div>
                
                <div class="growth-insight-box">
                    <div class="insight-icon">💡</div>
                    <div class="insight-text">Users mentioning 'performance' in NPS comments use product 2.4x more and prioritize optimization.</div>
                </div>
            </div>
        </div>
        `,
        
        // Inventory Sentinel Card
        `
        <div class="growth-detail-card">
            <div class="growth-card-title">Inventory Sentinel</div>
            <div class="growth-card-content">
                <div class="growth-insight-box">
                    <div class="insight-icon">📊</div>
                    <div class="insight-text">Stock-out risk if OnHand < forecast 7-day demand</div>
                </div>
                
                <div class="inventory-status">
                    <table class="inventory-table">
                        <thead>
                            <tr>
                                <th>SKU</th>
                                <th>On Hand</th>
                                <th>7-Day Forecast</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>A-102</td>
                                <td>1,200</td>
                                <td>1,250</td>
                                <td class="warning">At Risk</td>
                            </tr>
                            <tr>
                                <td>B-205</td>
                                <td>3,450</td>
                                <td>1,800</td>
                                <td>Healthy</td>
                            </tr>
                            <tr>
                                <td>C-310</td>
                                <td>780</td>
                                <td>1,500</td>
                                <td class="critical">Critical</td>
                            </tr>
                            <tr>
                                <td>D-422</td>
                                <td>2,100</td>
                                <td>1,350</td>
                                <td>Healthy</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="growth-metrics-container">
                    <div class="growth-metric">
                        <div class="metric-label">Stock-out Risk</div>
                        <div class="metric-value">2 SKUs</div>
                        <div class="metric-trend negative">+1 vs yesterday</div>
                    </div>
                    <div class="growth-metric">
                        <div class="metric-label">Expedite Orders</div>
                        <div class="metric-value">1</div>
                        <div class="metric-trend">Urgent</div>
                    </div>
                </div>
                
                <div class="growth-insight-box warning">
                    <div class="insight-icon">⚠️</div>
                    <div class="insight-text">SKU A-102 will stock out in 3 days; expedite 1.2k units from warehouse.</div>
                </div>
            </div>
        </div>
        `
    ];
    
    // Apply templates to cards
    detailCards.forEach((card, index) => {
        if (index < cardTemplates.length) {
            card.innerHTML = cardTemplates[index];
        } else {
            // Default content for any extra cards
            card.innerHTML = `
                <div class="growth-detail-card">
                    <div class="growth-card-title">Growth Metrics</div>
                    <div class="default-content">
                        <div class="card-line" style="width: 80%;"></div>
                        <div class="card-line" style="width: 60%;"></div>
                        <div class="card-line" style="width: 70%;"></div>
                    </div>
                </div>
            `;
        }
    });
}

function startGrowthDataUpdates(card) {
    // Update the timestamp
    const updateTimeElement = card.querySelector('.update-time');
    
    // Update the timestamp every minute
    setInterval(() => {
        const now = new Date();
        const minutes = Math.floor((now - startTime) / 60000);
        
        if (minutes < 1) {
            updateTimeElement.textContent = 'just now';
        } else if (minutes === 1) {
            updateTimeElement.textContent = '1 minute ago';
        } else {
            updateTimeElement.textContent = `${minutes} minutes ago`;
        }
    }, 60000);
    
    // Store the start time
    const startTime = new Date();
    
    // Simulate data updates every 5-10 seconds
    setInterval(() => {
        updateGrowthMetrics(card);
    }, Math.random() * 5000 + 5000);
}

function updateGrowthMetrics(card) {
    // Get the main KPI element
    const kpiElement = card.querySelector('.growth-kpi');
    if (!kpiElement) return;
    
    // Current value
    let currentValue = parseFloat(kpiElement.textContent.replace('+', '').replace('%', ''));
    
    // Generate a small random change
    const change = (Math.random() - 0.5) * 1.2;
    let newValue = Math.max(14.0, Math.min(22.0, currentValue + change)).toFixed(1);
    
    // Update the KPI value with animation
    kpiElement.textContent = `+${newValue}%`;
    kpiElement.classList.add('value-change');
    
    // Update trend indicator
    const trendElement = card.querySelector('.growth-trend');
    const targetValue = 15.2;
    const difference = (newValue - targetValue).toFixed(1);
    
    if (difference > 0) {
        trendElement.innerHTML = `<span>+${difference}% vs target</span>`;
        trendElement.classList.add('positive');
        trendElement.classList.remove('negative');
    } else if (difference < 0) {
        trendElement.innerHTML = `<span>${difference}% vs target</span>`;
        trendElement.classList.add('negative');
        trendElement.classList.remove('positive');
    }
    
    // Update status indicator
    const statusIndicator = card.querySelector('.status-indicator');
    if (newValue >= 18.0) {
        statusIndicator.className = 'status-indicator status-green';
        card.querySelector('.growth-trend span:last-child').textContent = 'Healthy';
    } else if (newValue >= 15.0) {
        statusIndicator.className = 'status-indicator status-yellow';
        card.querySelector('.growth-trend span:last-child').textContent = 'Stable';
    } else {
        statusIndicator.className = 'status-indicator status-red';
        card.querySelector('.growth-trend span:last-child').textContent = 'At Risk';
    }
    
    // Remove animation class after animation completes
    setTimeout(() => {
        kpiElement.classList.remove('value-change');
    }, 500);
}
