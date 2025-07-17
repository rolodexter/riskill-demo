// Entity Linking and Content-Aware Narrative System

// Entity types and their patterns
const entityTypes = {
    organization: {
        pattern: /([A-Z][a-z]+ (?:[A-Z][a-z]+ )*(?:Inc\.|LLC|Corp\.|Company|Group|Enterprises|Funeral Home|Hospital|Agency))/g,
        template: (entity) => `
            <div class="entity-card-header">
                <h4>Real-Time Snapshot: ${entity}</h4>
                <button class="back-to-previous">← Back</button>
            </div>
            <div class="entity-summary">
                <div class="entity-metrics">
                    <div class="metric">
                        <span class="metric-label">Account Health</span>
                        <span class="metric-value ${Math.random() > 0.5 ? 'negative' : 'positive'}">
                            ${Math.random() > 0.5 ? 'At Risk' : 'Healthy'}
                        </span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Last Contact</span>
                        <span class="metric-value">${Math.floor(Math.random() * 14) + 1} days ago</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Revenue YTD</span>
                        <span class="metric-value">$${(Math.random() * 500000 + 100000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                    </div>
                </div>
                <p class="entity-narrative">
                    ${entity} has shown ${Math.random() > 0.5 ? 'decreased' : 'increased'} engagement over the past 30 days. 
                    Their usage of our platform has ${Math.random() > 0.5 ? 'declined by' : 'grown by'} 
                    ${Math.floor(Math.random() * 40) + 5}% compared to the previous period.
                </p>
                <div class="entity-chart">
                    <div class="chart-header">Usage Trend (Last 30 Days)</div>
                    <div class="chart-bars">
                        ${generateRandomChartBars(10)}
                    </div>
                </div>
            </div>
            <div class="entity-contacts">
                <h5>Key Contacts</h5>
                <div class="contact-list">
                    ${generateRandomContacts(entity, 3)}
                </div>
            </div>
            <div class="entity-actions">
                <button class="entity-action-btn">View Full Profile</button>
                <button class="entity-action-btn">Schedule Follow-up</button>
                <button class="entity-action-btn">Send Message</button>
            </div>
        `
    },
    contact: {
        pattern: /([A-Z][a-z]+ [A-Z]\. [A-Z][a-z]+)/g,
        template: (entity) => `
            <div class="entity-card-header">
                <h4>Contact Profile: ${entity}</h4>
                <button class="back-to-previous">← Back</button>
            </div>
            <div class="entity-summary">
                <div class="contact-info">
                    <div class="contact-avatar">${entity.split(' ').map(name => name[0]).join('')}</div>
                    <div class="contact-details">
                        <div class="contact-role">${getRandomRole()}</div>
                        <div class="contact-company">${getRandomCompany()}</div>
                        <div class="contact-email">${entity.toLowerCase().replace(/\s/g, '.').replace(/\./g, '')}@${getRandomDomain()}</div>
                    </div>
                </div>
                <p class="entity-narrative">
                    ${entity} has been a ${Math.random() > 0.5 ? 'highly engaged' : 'moderately engaged'} contact, 
                    with ${Math.floor(Math.random() * 20) + 5} interactions in the past quarter. 
                    Their sentiment analysis shows ${Math.random() > 0.7 ? 'positive' : Math.random() > 0.4 ? 'neutral' : 'concerning'} trends.
                </p>
            </div>
            <div class="recent-communications">
                <h5>Recent Communications</h5>
                <div class="communication-timeline">
                    ${generateRandomCommunications(entity, 3)}
                </div>
            </div>
            <div class="entity-actions">
                <button class="entity-action-btn">Send Email</button>
                <button class="entity-action-btn">Schedule Meeting</button>
                <button class="entity-action-btn">View Activity History</button>
            </div>
        `
    },
    email: {
        pattern: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g,
        template: (entity) => `
            <div class="entity-card-header">
                <h4>Email Communications: ${entity}</h4>
                <button class="back-to-previous">← Back</button>
            </div>
            <div class="email-summary">
                <div class="email-metrics">
                    <div class="metric">
                        <span class="metric-label">Total Threads</span>
                        <span class="metric-value">${Math.floor(Math.random() * 50) + 10}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Response Rate</span>
                        <span class="metric-value">${Math.floor(Math.random() * 100)}%</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Avg Response Time</span>
                        <span class="metric-value">${Math.floor(Math.random() * 24) + 1} hours</span>
                    </div>
                </div>
            </div>
            <div class="recent-emails">
                <h5>Recent Email Threads</h5>
                <div class="email-list">
                    ${generateRandomEmails(entity, 3)}
                </div>
            </div>
            <div class="entity-actions">
                <button class="entity-action-btn">Compose New Email</button>
                <button class="entity-action-btn">View All Communications</button>
                <button class="entity-action-btn">Set Follow-up Reminder</button>
            </div>
        `
    }
};

// Helper functions for generating random content
function generateRandomChartBars(count) {
    let bars = '';
    for (let i = 0; i < count; i++) {
        const height = Math.floor(Math.random() * 80) + 20;
        bars += `<div class="chart-bar" style="height: ${height}%"></div>`;
    }
    return bars;
}

function generateRandomContacts(company, count) {
    const firstNames = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'David', 'Elizabeth'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];
    
    let contacts = '';
    for (let i = 0; i < count; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const role = getRandomRole();
        
        contacts += `
            <div class="contact-item">
                <div class="contact-name"><span class="entity-link contact">${firstName} ${lastName}</span></div>
                <div class="contact-role">${role}</div>
                <div class="contact-email">${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/\s/g, '').replace(/inc\.|llc|corp\.|company|group|enterprises|funeralhome|hospital|agency/gi, '')}.com</div>
            </div>
        `;
    }
    return contacts;
}

function getRandomRole() {
    const roles = ['CEO', 'CTO', 'CFO', 'COO', 'Director of Operations', 'IT Manager', 'Sales Manager', 'Account Executive', 'Customer Success Manager', 'VP of Marketing'];
    return roles[Math.floor(Math.random() * roles.length)];
}

function getRandomCompany() {
    const companies = ['Acme Corp', 'Globex Inc', 'Initech LLC', 'Massive Dynamic', 'Stark Industries', 'Wayne Enterprises', 'Umbrella Corporation', 'Cyberdyne Systems', 'Soylent Corp', 'Weyland-Yutani'];
    return companies[Math.floor(Math.random() * companies.length)];
}

function getRandomDomain() {
    const domains = ['company.com', 'enterprise.net', 'corp.co', 'group.io', 'team.com', 'business.org', 'global.com', 'systems.net', 'tech.co', 'solutions.com'];
    return domains[Math.floor(Math.random() * domains.length)];
}

function generateRandomCommunications(name, count) {
    const subjects = [
        'Quarterly Business Review',
        'Contract Renewal Discussion',
        'New Feature Announcement',
        'Support Request Follow-up',
        'Partnership Opportunity',
        'Upcoming Maintenance Notice',
        'Training Session Invitation',
        'Product Feedback Request',
        'Account Status Update',
        'Invoice Payment Confirmation'
    ];
    
    const timeframes = [
        '2 days ago',
        '1 week ago',
        '2 weeks ago',
        '3 weeks ago',
        'Last month',
        '45 days ago'
    ];
    
    let communications = '';
    for (let i = 0; i < count; i++) {
        const subject = subjects[Math.floor(Math.random() * subjects.length)];
        const timeframe = timeframes[Math.floor(Math.random() * timeframes.length)];
        const type = Math.random() > 0.7 ? 'Call' : Math.random() > 0.4 ? 'Email' : 'Meeting';
        const sentiment = Math.random() > 0.7 ? 'positive' : Math.random() > 0.3 ? 'neutral' : 'negative';
        
        communications += `
            <div class="communication-item ${sentiment}">
                <div class="communication-type">${type}</div>
                <div class="communication-subject">${subject}</div>
                <div class="communication-time">${timeframe}</div>
            </div>
        `;
    }
    return communications;
}

function generateRandomEmails(email, count) {
    const subjects = [
        'RE: Quarterly Business Review',
        'Contract Renewal Terms',
        'New Feature Feedback',
        'Support Ticket #4872',
        'Partnership Proposal',
        'Scheduled Maintenance',
        'Training Session Confirmation',
        'Product Feedback Survey',
        'Account Status Alert',
        'Invoice #INV-2023-0472'
    ];
    
    const timeframes = [
        '2 days ago',
        '1 week ago',
        '2 weeks ago',
        '3 weeks ago',
        'Last month',
        '45 days ago'
    ];
    
    let emails = '';
    for (let i = 0; i < count; i++) {
        const subject = subjects[Math.floor(Math.random() * subjects.length)];
        const timeframe = timeframes[Math.floor(Math.random() * timeframes.length)];
        const unread = Math.random() > 0.5;
        const hasAttachment = Math.random() > 0.7;
        
        emails += `
            <div class="email-item ${unread ? 'unread' : ''}">
                <div class="email-subject">${subject}</div>
                <div class="email-preview">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore...</div>
                <div class="email-meta">
                    <span class="email-time">${timeframe}</span>
                    ${hasAttachment ? '<span class="email-attachment">📎</span>' : ''}
                </div>
            </div>
        `;
    }
    return emails;
}

// Action handlers for card buttons
const actionHandlers = {
    "What's driving this?": (card, cardTitle, cardContent) => {
        return `
            <div class="action-card-header">
                <h4>Factors Driving ${cardTitle}</h4>
                <button class="back-to-previous">← Back</button>
            </div>
            <div class="action-analysis">
                <p class="analysis-summary">
                    After analyzing the data behind this insight, we've identified three key factors driving the observed trends:
                </p>
                <div class="factor-list">
                    <div class="factor-item">
                        <div class="factor-icon">🚀</div>
                        <div class="factor-content">
                            <h5>New Feature Adoption</h5>
                            <p>The launch of <span class="entity-link feature">Advanced Analytics Suite</span> has driven a 37% increase in user engagement, particularly among enterprise clients in the EU region.</p>
                            <div class="factor-metric">
                                <span class="metric-label">Impact Weight</span>
                                <span class="metric-value">42%</span>
                            </div>
                        </div>
                    </div>
                    <div class="factor-item">
                        <div class="factor-icon">📣</div>
                        <div class="factor-content">
                            <h5>Targeted Marketing Campaign</h5>
                            <p>The <span class="entity-link campaign">Q2 Enterprise Expansion</span> campaign resulted in 28 new enterprise trial signups and 14 conversions to paid plans.</p>
                            <div class="factor-metric">
                                <span class="metric-label">Impact Weight</span>
                                <span class="metric-value">35%</span>
                            </div>
                        </div>
                    </div>
                    <div class="factor-item">
                        <div class="factor-icon">🌍</div>
                        <div class="factor-content">
                            <h5>Regional Market Shift</h5>
                            <p>EU market conditions have improved following regulatory changes in <span class="entity-link organization">European Data Protection Board</span> guidelines, increasing demand for compliant SaaS solutions.</p>
                            <div class="factor-metric">
                                <span class="metric-label">Impact Weight</span>
                                <span class="metric-value">23%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="action-recommendations">
                <h5>Recommended Next Steps</h5>
                <ul class="recommendation-list">
                    <li>Expand marketing campaign to similar EU enterprise segments</li>
                    <li>Highlight compliance features in upcoming product communications</li>
                    <li>Schedule follow-up with recent conversions to ensure successful onboarding</li>
                </ul>
            </div>
        `;
    },
    
    "Compare to last month": (card, cardTitle, cardContent) => {
        return `
            <div class="action-card-header">
                <h4>${cardTitle}: Month-over-Month Comparison</h4>
                <button class="back-to-previous">← Back</button>
            </div>
            <div class="comparison-view">
                <div class="comparison-metrics">
                    <div class="comparison-period current">
                        <h5>Current Period</h5>
                        <div class="comparison-value">€1,427,300</div>
                        <div class="comparison-change positive">+42%</div>
                    </div>
                    <div class="comparison-period previous">
                        <h5>Previous Period</h5>
                        <div class="comparison-value">€1,004,400</div>
                        <div class="comparison-change positive">+5%</div>
                    </div>
                </div>
                <div class="comparison-chart">
                    <div class="chart-header">Weekly Trend Comparison</div>
                    <div class="chart-container">
                        <div class="chart-columns">
                            <div class="chart-column">
                                <div class="chart-bar current" style="height: 90%"></div>
                                <div class="chart-bar previous" style="height: 60%"></div>
                                <div class="column-label">Week 1</div>
                            </div>
                            <div class="chart-column">
                                <div class="chart-bar current" style="height: 95%"></div>
                                <div class="chart-bar previous" style="height: 65%"></div>
                                <div class="column-label">Week 2</div>
                            </div>
                            <div class="chart-column">
                                <div class="chart-bar current" style="height: 85%"></div>
                                <div class="chart-bar previous" style="height: 62%"></div>
                                <div class="column-label">Week 3</div>
                            </div>
                            <div class="chart-column">
                                <div class="chart-bar current" style="height: 100%"></div>
                                <div class="chart-bar previous" style="height: 68%"></div>
                                <div class="column-label">Week 4</div>
                            </div>
                        </div>
                        <div class="chart-legend">
                            <div class="legend-item">
                                <div class="legend-color current"></div>
                                <div class="legend-label">Current Period</div>
                            </div>
                            <div class="legend-item">
                                <div class="legend-color previous"></div>
                                <div class="legend-label">Previous Period</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="comparison-analysis">
                    <h5>Key Insights</h5>
                    <ul>
                        <li>Growth rate increased by <strong>8.4x</strong> compared to previous month</li>
                        <li>Largest gains seen in <span class="entity-link organization">Enterprise Healthcare</span> segment (+68%)</li>
                        <li>Average deal size increased from €24,400 to €31,200</li>
                        <li>New customer acquisition cost decreased by 18%</li>
                    </ul>
                </div>
            </div>
        `;
    },
    
    "View source data": null, // Already handled by existing code
    
    "Show account details": (card, cardTitle, cardContent) => {
        // Extract account name from content if possible
        const accountMatch = cardContent.match(/([A-Z][a-z]+ (?:[A-Z][a-z]+ )*(?:Inc\.|LLC|Corp\.|Company|Group|Enterprises|Funeral Home|Hospital|Agency))/);
        const accountName = accountMatch ? accountMatch[1] : "Dugan Family Funeral Home";
        
        return entityTypes.organization.template(accountName);
    }
};

// Initialize entity linking system
document.addEventListener('DOMContentLoaded', function() {
    // Process all insight cards for entity linking
    processEntityLinks();
    
    // Setup action button handlers (extending existing functionality)
    setupActionHandlers();
    
    // Setup card history navigation
    setupCardHistory();
});

// Process all cards to identify and link entities
function processEntityLinks() {
    const insightCards = document.querySelectorAll('.insight-card');
    
    insightCards.forEach(card => {
        const cardBody = card.querySelector('.card-body');
        if (!cardBody) return;
        
        // Check if this card already has entity links
        const existingLinks = cardBody.querySelectorAll('.entity-link');
        
        // If there are already entity links in the HTML, just add click handlers
        if (existingLinks.length > 0) {
            // Add click handlers to existing entity links
            existingLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent card click
                    const entity = this.dataset.entity || this.textContent;
                    const type = this.classList[1]; // Second class is the entity type
                    
                    if (entityTypes[type]) {
                        transformCard(card, entity, type);
                    }
                });
            });
            return; // Skip the rest of the processing for this card
        }
        
        // Process each paragraph in the card (only for cards without pre-defined entity links)
        const paragraphs = cardBody.querySelectorAll('p');
        paragraphs.forEach(paragraph => {
            // Store already processed entities to avoid duplicates
            const processedEntities = new Map();
            
            // Process each entity type
            Object.entries(entityTypes).forEach(([type, config]) => {
                // Use a special replacement function that checks for duplicates
                let html = paragraph.innerHTML;
                let match;
                let lastIndex = 0;
                let result = '';
                
                // Reset regex for each paragraph
                config.pattern.lastIndex = 0;
                
                while ((match = config.pattern.exec(html)) !== null) {
                    const entity = match[0];
                    const entityKey = `${type}:${entity.toLowerCase()}`;
                    
                    // Skip if we've already processed this entity in this paragraph
                    if (processedEntities.has(entityKey)) {
                        continue;
                    }
                    
                    // Add text before the match
                    result += html.substring(lastIndex, match.index);
                    
                    // Add the entity as a link
                    result += `<span class="entity-link ${type}" data-entity="${entity}">${entity}</span>`;
                    
                    // Update lastIndex to after this match
                    lastIndex = match.index + entity.length;
                    
                    // Mark this entity as processed
                    processedEntities.set(entityKey, true);
                }
                
                // Add any remaining text
                result += html.substring(lastIndex);
                paragraph.innerHTML = result;
            });
        });
        
        // Add click handlers to newly created entity links
        const entityLinks = card.querySelectorAll('.entity-link');
        entityLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card click
                const entity = this.dataset.entity || this.textContent;
                const type = this.classList[1]; // Second class is the entity type
                
                if (entityTypes[type]) {
                    transformCard(card, entity, type);
                }
            });
        });
    });
}

// Setup action button handlers
function setupActionHandlers() {
    const actionButtons = document.querySelectorAll('.prebuilt-actions button');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click
            
            const action = this.textContent;
            const card = this.closest('.insight-card');
            
            // Skip if this is the "View source data" button (already handled)
            if (action === "View source data") return;
            
            if (actionHandlers[action]) {
                const cardTitle = card.querySelector('h4')?.textContent || '';
                const cardContent = card.querySelector('p')?.textContent || '';
                
                // Transform card with action content
                const actionContent = actionHandlers[action](card, cardTitle, cardContent);
                transformCardWithContent(card, actionContent);
            }
        });
    });
}

// Setup card history navigation
function setupCardHistory() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('back-to-previous')) {
            const card = e.target.closest('.insight-card');
            if (card && card.dataset.originalContent) {
                // Restore original content
                card.innerHTML = card.dataset.originalContent;
                delete card.dataset.originalContent;
                
                // Re-initialize entity links in the restored content
                const entityLinks = card.querySelectorAll('.entity-link');
                entityLinks.forEach(link => {
                    link.addEventListener('click', function(e) {
                        e.stopPropagation();
                        const entity = this.dataset.entity || this.textContent;
                        const type = this.classList[1];
                        
                        if (entityTypes[type]) {
                            transformCard(card, entity, type);
                        }
                    });
                });
                
                // Re-initialize action buttons
                const actionButtons = card.querySelectorAll('.prebuilt-actions button');
                actionButtons.forEach(button => {
                    button.addEventListener('click', function(e) {
                        e.stopPropagation();
                        
                        const action = this.textContent;
                        if (action === "View source data") return;
                        
                        if (actionHandlers[action]) {
                            const cardTitle = card.querySelector('h4')?.textContent || '';
                            const cardContent = card.querySelector('p')?.textContent || '';
                            
                            const actionContent = actionHandlers[action](card, cardTitle, cardContent);
                            transformCardWithContent(card, actionContent);
                        }
                    });
                });
            }
        }
    });
}

// Transform card with entity content
function transformCard(card, entity, type) {
    // Save original content for back navigation
    if (!card.dataset.originalContent) {
        card.dataset.originalContent = card.innerHTML;
    }
    
    // Generate entity-specific content
    const entityContent = entityTypes[type].template(entity);
    
    // Apply transformation with animation
    card.classList.add('transforming');
    setTimeout(() => {
        card.innerHTML = entityContent;
        card.classList.remove('transforming');
        card.classList.add('transformed');
        
        // Process any new entity links in the transformed content
        const newEntityLinks = card.querySelectorAll('.entity-link');
        newEntityLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation();
                const newEntity = this.dataset.entity || this.textContent;
                const newType = this.classList[1];
                
                if (entityTypes[newType]) {
                    transformCard(card, newEntity, newType);
                }
            });
        });
    }, 300);
}

// Transform card with custom content
function transformCardWithContent(card, content) {
    // Save original content for back navigation
    if (!card.dataset.originalContent) {
        card.dataset.originalContent = card.innerHTML;
    }
    
    // Apply transformation with animation
    card.classList.add('transforming');
    setTimeout(() => {
        card.innerHTML = content;
        card.classList.remove('transforming');
        card.classList.add('transformed');
        
        // Process any new entity links in the transformed content
        const newEntityLinks = card.querySelectorAll('.entity-link');
        newEntityLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation();
                const newEntity = this.dataset.entity || this.textContent;
                const newType = this.classList[1];
                
                if (entityTypes[newType]) {
                    transformCard(card, newEntity, newType);
                }
            });
        });
    }, 300);
}
