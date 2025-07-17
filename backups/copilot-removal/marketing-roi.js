// Marketing ROI Theme JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the marketing ROI card
    initMarketingROICard();
});

function initMarketingROICard() {
    // Get the top stack container for marketing ROI
    const topStack4 = document.getElementById('topStack4');
    if (!topStack4) return;

    // Get the first card in the stack
    const mainCard = topStack4.querySelector('.stacked-card:first-child');
    if (!mainCard) return;

    // Set up the main card content
    setupMainMarketingCard(mainCard);
    
    // Set up the detail cards
    setupMarketingDetailCards(topStack4);

    // Start the data update simulation
    startMarketingDataUpdates(mainCard);
}

function setupMainMarketingCard(card) {
    // Create the HTML structure for the main marketing ROI card
    card.innerHTML = `
        <div class="marketing-header">
            <h3>Marketing ROI</h3>
            <div class="marketing-trend">
                <span class="status-indicator status-green"></span>
                <span>Healthy</span>
            </div>
        </div>
        
        <div class="marketing-kpi-container">
            <div class="marketing-kpi">3.7x</div>
            <div class="marketing-trend positive">
                <span>+0.4x vs target</span>
            </div>
        </div>
        
        <div class="marketing-secondary-metrics">
            <div class="marketing-secondary-item">
                <div class="secondary-label">CAC</div>
                <div class="secondary-value">$842</div>
            </div>
            <div class="marketing-secondary-item">
                <div class="secondary-label">LTV:CAC</div>
                <div class="secondary-value">5.2:1</div>
            </div>
            <div class="marketing-secondary-item">
                <div class="secondary-label">Payback</div>
                <div class="secondary-value">4.8 mo</div>
            </div>
        </div>
        
        <div class="marketing-insight-box">
            <div class="insight-icon">💡</div>
            <div class="insight-text">Google Ads ROAS fell 27% week-over-week. Pausing campaign set.</div>
        </div>
        
        <div class="marketing-last-update">
            Updated <span class="update-time">just now</span>
        </div>
    `;
}

function setupMarketingDetailCards(container) {
    // Get all cards except the first one
    const detailCards = container.querySelectorAll('.stacked-card:not(:first-child)');
    
    // Card templates based on the screenshot
    const cardTemplates = [
        // Transaction → AdSpend Card
        `
        <div class="marketing-detail-card">
            <div class="marketing-card-title">Transaction → AdSpend</div>
            <div class="marketing-card-content">
                <div class="marketing-insight-box">
                    <div class="insight-icon">📊</div>
                    <div class="insight-text">ROAS = Revenue / AdSpend, alert if ± 20% vs 14-day avg</div>
                </div>
                
                <div class="roas-comparison">
                    <div class="roas-item">
                        <div class="roas-value positive">4.2x</div>
                        <div class="roas-label">Overall ROAS</div>
                        <div class="roas-trend positive">+8% vs avg</div>
                    </div>
                    <div class="roas-item">
                        <div class="roas-value negative">1.7x</div>
                        <div class="roas-label">Google Ads</div>
                        <div class="roas-trend negative">-27% vs avg</div>
                    </div>
                </div>
                
                <div class="channel-distribution">
                    <div class="performance-label">Channel ROAS Distribution</div>
                    <div class="distribution-bars">
                        <div class="distribution-bar highlight">
                            <div class="bar-value">5.8x</div>
                            <div class="bar-fill" style="height: 90%;"></div>
                            <div class="bar-label">Organic</div>
                        </div>
                        <div class="distribution-bar">
                            <div class="bar-value">3.9x</div>
                            <div class="bar-fill" style="height: 60%;"></div>
                            <div class="bar-label">Email</div>
                        </div>
                        <div class="distribution-bar">
                            <div class="bar-value">3.2x</div>
                            <div class="bar-fill" style="height: 50%;"></div>
                            <div class="bar-label">Social</div>
                        </div>
                        <div class="distribution-bar">
                            <div class="bar-value">2.4x</div>
                            <div class="bar-fill" style="height: 37%;"></div>
                            <div class="bar-label">Display</div>
                        </div>
                        <div class="distribution-bar warning">
                            <div class="bar-value">1.7x</div>
                            <div class="bar-fill" style="height: 26%;"></div>
                            <div class="bar-label">Google</div>
                        </div>
                    </div>
                </div>
                
                <div class="marketing-insight-box warning">
                    <div class="insight-icon">⚠️</div>
                    <div class="insight-text">ROAS for Google Ads fell 27% week-over-week; pausing campaign set.</div>
                </div>
            </div>
        </div>
        `,
        
        // Campaign → Transaction Card
        `
        <div class="marketing-detail-card">
            <div class="marketing-card-title">Campaign → Transaction</div>
            <div class="marketing-card-content">
                <div class="marketing-insight-box">
                    <div class="insight-icon">📊</div>
                    <div class="insight-text">Conversion delta after email push, uplift < 1% = campaign underperforms</div>
                </div>
                
                <div class="conversion-funnel">
                    <div class="performance-label">Spring Flash Email Campaign</div>
                    <div class="funnel-container">
                        <div class="funnel-step">
                            <div class="funnel-bar" style="width: 100%;">42,500 Sent</div>
                            <div class="funnel-label">Recipients</div>
                        </div>
                        <div class="funnel-step">
                            <div class="funnel-bar" style="width: 85%;">36,125 Opens</div>
                            <div class="funnel-label">Open Rate (85%)</div>
                        </div>
                        <div class="funnel-step">
                            <div class="funnel-bar" style="width: 32%;">13,600 Clicks</div>
                            <div class="funnel-label">CTR (32%)</div>
                        </div>
                        <div class="funnel-step">
                            <div class="funnel-bar" style="width: 0.8%;">340 Purchases</div>
                            <div class="funnel-label">Conversion (0.8%)</div>
                        </div>
                    </div>
                </div>
                
                <div class="marketing-metrics-container">
                    <div class="marketing-metric">
                        <div class="metric-label">Conversion Rate</div>
                        <div class="metric-value">0.8%</div>
                        <div class="metric-trend negative">-0.7% vs target</div>
                    </div>
                    <div class="marketing-metric">
                        <div class="metric-label">Revenue</div>
                        <div class="metric-value">$68,340</div>
                        <div class="metric-trend negative">-22% vs forecast</div>
                    </div>
                </div>
                
                <div class="marketing-insight-box warning">
                    <div class="insight-icon">⚠️</div>
                    <div class="insight-text">Yesterday's 'Spring Flash' email converted at 0.8% (-0.7% vs target audience or offer).</div>
                </div>
            </div>
        </div>
        `,
        
        // Order → AdSpend Card
        `
        <div class="marketing-detail-card">
            <div class="marketing-card-title">Order → AdSpend</div>
            <div class="marketing-card-content">
                <div class="marketing-insight-box">
                    <div class="insight-icon">📊</div>
                    <div class="insight-text">CAC = AdSpend / New Orders; alert top percentile rise</div>
                </div>
                
                <div class="cac-trend-container">
                    <div class="performance-label">CAC Trend (Last 30 Days)</div>
                    <div class="cac-trend-chart">
                        <div class="cac-trend-point">
                            <div class="cac-trend-dot" style="margin-top: 40px;"></div>
                            <div class="cac-trend-line"></div>
                            <div class="cac-trend-label">Jun 15</div>
                        </div>
                        <div class="cac-trend-point">
                            <div class="cac-trend-dot" style="margin-top: 35px;"></div>
                            <div class="cac-trend-line"></div>
                            <div class="cac-trend-label">Jun 20</div>
                        </div>
                        <div class="cac-trend-point">
                            <div class="cac-trend-dot" style="margin-top: 45px;"></div>
                            <div class="cac-trend-line"></div>
                            <div class="cac-trend-label">Jun 25</div>
                        </div>
                        <div class="cac-trend-point">
                            <div class="cac-trend-dot" style="margin-top: 30px;"></div>
                            <div class="cac-trend-line"></div>
                            <div class="cac-trend-label">Jun 30</div>
                        </div>
                        <div class="cac-trend-point">
                            <div class="cac-trend-dot" style="margin-top: 25px;"></div>
                            <div class="cac-trend-line"></div>
                            <div class="cac-trend-label">Jul 5</div>
                        </div>
                        <div class="cac-trend-point highlight">
                            <div class="cac-trend-dot" style="margin-top: 10px;"></div>
                            <div class="cac-trend-line"></div>
                            <div class="cac-trend-label">Jul 10</div>
                        </div>
                        <div class="cac-trend-point highlight">
                            <div class="cac-trend-dot" style="margin-top: 0px;"></div>
                            <div class="cac-trend-label">Today</div>
                        </div>
                    </div>
                </div>
                
                <div class="marketing-metrics-container">
                    <div class="marketing-metric">
                        <div class="metric-label">TikTok CAC</div>
                        <div class="metric-value">$42</div>
                        <div class="metric-trend positive">+31% vs LM</div>
                    </div>
                    <div class="marketing-metric">
                        <div class="metric-label">Overall CAC</div>
                        <div class="metric-value">$842</div>
                        <div class="metric-trend negative">+12% vs LM</div>
                    </div>
                </div>
                
                <div class="marketing-insight-box">
                    <div class="insight-icon">💡</div>
                    <div class="insight-text">TikTok CAC climbed to $42 (+31% vs. last month) with new creative set.</div>
                </div>
            </div>
        </div>
        `,
        
        // Product Usage Card
        `
        <div class="marketing-detail-card">
            <div class="marketing-card-title">Product Usage</div>
            <div class="marketing-card-content">
                <div class="marketing-insight-box">
                    <div class="insight-icon">📊</div>
                    <div class="insight-text">Expansion propensity ↑ when new feature used ≥ N times</div>
                </div>
                
                <div class="marketing-metrics-container">
                    <div class="marketing-metric">
                        <div class="metric-label">Feature Adoption</div>
                        <div class="metric-value">68%</div>
                        <div class="metric-trend positive">+12% vs target</div>
                    </div>
                    <div class="marketing-metric">
                        <div class="metric-label">Usage Frequency</div>
                        <div class="metric-value">4.2x</div>
                        <div class="metric-trend positive">+0.7x vs avg</div>
                    </div>
                </div>
                
                <div class="channel-distribution">
                    <div class="performance-label">Feature X Usage Distribution</div>
                    <div class="distribution-bars">
                        <div class="distribution-bar">
                            <div class="bar-value">32%</div>
                            <div class="bar-fill" style="height: 32%;"></div>
                            <div class="bar-label">0 times</div>
                        </div>
                        <div class="distribution-bar">
                            <div class="bar-value">18%</div>
                            <div class="bar-fill" style="height: 18%;"></div>
                            <div class="bar-label">1-2 times</div>
                        </div>
                        <div class="distribution-bar">
                            <div class="bar-value">22%</div>
                            <div class="bar-fill" style="height: 22%;"></div>
                            <div class="bar-label">3-4 times</div>
                        </div>
                        <div class="distribution-bar highlight">
                            <div class="bar-value">28%</div>
                            <div class="bar-fill" style="height: 28%;"></div>
                            <div class="bar-label">5+ times</div>
                        </div>
                    </div>
                </div>
                
                <div class="marketing-insight-box">
                    <div class="insight-icon">💡</div>
                    <div class="insight-text">Accounts that tried Feature X 5+ times upgraded 18% more often than other users.</div>
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
                <div class="marketing-detail-card">
                    <div class="marketing-card-title">Marketing Metrics</div>
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

function startMarketingDataUpdates(card) {
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
        updateMarketingMetrics(card);
    }, Math.random() * 5000 + 5000);
}

function updateMarketingMetrics(card) {
    // Get the main KPI element
    const kpiElement = card.querySelector('.marketing-kpi');
    if (!kpiElement) return;
    
    // Current value
    let currentValue = parseFloat(kpiElement.textContent.replace('x', ''));
    
    // Generate a small random change
    const change = (Math.random() - 0.5) * 0.2;
    let newValue = Math.max(2.8, Math.min(4.2, currentValue + change)).toFixed(1);
    
    // Update the KPI value with animation
    kpiElement.textContent = `${newValue}x`;
    kpiElement.classList.add('value-change');
    
    // Update trend indicator
    const trendElement = card.querySelector('.marketing-trend');
    const targetValue = 3.3;
    const difference = (newValue - targetValue).toFixed(1);
    
    if (difference > 0) {
        trendElement.innerHTML = `<span>+${difference}x vs target</span>`;
        trendElement.classList.add('positive');
        trendElement.classList.remove('negative');
    } else if (difference < 0) {
        trendElement.innerHTML = `<span>${difference}x vs target</span>`;
        trendElement.classList.add('negative');
        trendElement.classList.remove('positive');
    }
    
    // Update status indicator
    const statusIndicator = card.querySelector('.status-indicator');
    if (newValue >= 3.5) {
        statusIndicator.className = 'status-indicator status-green';
        card.querySelector('.marketing-trend span:last-child').textContent = 'Healthy';
    } else if (newValue >= 3.0) {
        statusIndicator.className = 'status-indicator status-yellow';
        card.querySelector('.marketing-trend span:last-child').textContent = 'Stable';
    } else {
        statusIndicator.className = 'status-indicator status-red';
        card.querySelector('.marketing-trend span:last-child').textContent = 'At Risk';
    }
    
    // Remove animation class after animation completes
    setTimeout(() => {
        kpiElement.classList.remove('value-change');
    }, 500);
}
