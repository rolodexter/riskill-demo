/**
 * Entity Drill-Down Animation System
 * Provides cinematic, meaningful animations for entity interactions
 * Each animation communicates purpose and context to the user
 */
class EntityDrillAnimations {
    constructor() {
        this.init();
        this.animationsEnabled = true;
        this.currentTransformations = new Map();
        this.isAnimating = false; // Flag to prevent multiple animations
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupAnimations());
        } else {
            this.setupAnimations();
        }
    }

    setupAnimations() {
        // Check if anime.js is loaded
        if (!window.anime) {
            console.error('Anime.js is not loaded. Please make sure anime.min.js is included before entity-drill-animations.js');
            return;
        }
        
        // Set initialization flag
        this.initialized = true;
        
        // Add enhanced click handlers to entity links in the first card
        this.setupEnhancedEntityLinks();
        
        console.log('Entity drill-down animations initialized');
    }
    
    setupEnhancedEntityLinks() {
        // Target only the first card in the main canvas for our showcase animation
        const firstMainCard = document.querySelector('.main-canvas .insight-card');
        if (!firstMainCard) return;
        
        // Find all entity links in the first card
        const entityLinks = firstMainCard.querySelectorAll('.entity-link');
        
        // Remove any existing entity-linking.js click handlers
        entityLinks.forEach(link => {
            // Create a fresh clone of the link to remove all event listeners
            const newLink = link.cloneNode(true);
            
            // Make sure the link text is clean (no duplicate text)
            if (link.textContent.includes(link.dataset.entity + link.dataset.entity)) {
                newLink.textContent = link.dataset.entity;
            }
            
            // Replace the old link with the clean one
            link.parentNode.replaceChild(newLink, link);
            
            // Add our cinematic click handler
            newLink.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Prevent card click
                
                // Prevent multiple animations from running simultaneously
                if (this.isAnimating) {
                    console.log('Animation already in progress, ignoring click');
                    return;
                }
                
                // Log the click for debugging
                console.log('Entity link clicked:', newLink.textContent);
                
                const entity = newLink.dataset.entity || newLink.textContent;
                const type = newLink.classList[1]; // Second class is the entity type
                
                // Perform cinematic drill-down animation
                this.cinematicDrillDown(firstMainCard, newLink, entity, type);
            });
        });
    }
    
    cinematicDrillDown(card, clickedLink, entity, entityType) {
        console.log('Starting cinematic drill-down for:', entity, entityType);
        
        // Set animation flag to prevent multiple animations
        this.isAnimating = true;
        
        // Store original card content for back button
        if (!this.currentTransformations.has(card)) {
            this.currentTransformations.set(card, {
                history: [{
                    content: card.innerHTML,
                    entity: null,
                    entityType: null
                }],
                currentIndex: 0
            });
        }
        
        const cardTransformation = this.currentTransformations.get(card);
        const cardRect = card.getBoundingClientRect();
        
        // Create a snapshot of the current card state
        const cardSnapshot = card.cloneNode(true);
        cardSnapshot.style.position = 'absolute';
        cardSnapshot.style.top = cardRect.top + 'px';
        cardSnapshot.style.left = cardRect.left + 'px';
        cardSnapshot.style.width = cardRect.width + 'px';
        cardSnapshot.style.height = cardRect.height + 'px';
        cardSnapshot.style.zIndex = '1000';
        cardSnapshot.style.pointerEvents = 'none';
        document.body.appendChild(cardSnapshot);
        
        // Get the clicked link's position for animation origin
        const linkRect = clickedLink.getBoundingClientRect();
        const linkCenterX = linkRect.left + linkRect.width / 2 - cardRect.left;
        const linkCenterY = linkRect.top + linkRect.height / 2 - cardRect.top;
        
        // Create animation overlay
        const overlay = document.createElement('div');
        overlay.className = 'entity-drill-overlay';
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = this.getEntityTypeColor(entityType, 0.05);
        overlay.style.borderRadius = '8px';
        overlay.style.transform = `scale(0)`;
        overlay.style.transformOrigin = `${linkCenterX}px ${linkCenterY}px`;
        card.appendChild(overlay);
        
        // Create ripple effect at click point
        const ripple = document.createElement('div');
        ripple.className = 'entity-ripple';
        ripple.style.position = 'absolute';
        ripple.style.top = linkCenterY + 'px';
        ripple.style.left = linkCenterX + 'px';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = this.getEntityTypeColor(entityType, 0.6);
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        card.appendChild(ripple);
        
        // Animate ripple
        anime({
            targets: ripple,
            scale: 20,
            opacity: [0.6, 0],
            easing: 'easeOutExpo',
            duration: 800,
            complete: () => {
                ripple.remove();
            }
        });
        
        // Animate overlay expansion
        anime({
            targets: overlay,
            scale: 1,
            easing: 'easeOutExpo',
            duration: 600
        });
        
        // Prepare new content based on entity type
        const newContent = this.generateEntityContent(entity, entityType);
        
        // Create new content container (initially invisible)
        const newContentContainer = document.createElement('div');
        newContentContainer.className = 'new-card-content';
        newContentContainer.innerHTML = newContent;
        newContentContainer.style.opacity = '0';
        newContentContainer.style.position = 'relative';
        newContentContainer.style.zIndex = '10';
        card.appendChild(newContentContainer);
        
        // Animate card content transition
        setTimeout(() => {
            // Fade out current content
            anime({
                targets: card.querySelectorAll('.card-header, .card-body, .card-footer'),
                opacity: 0,
                translateY: -20,
                easing: 'easeInOutQuad',
                duration: 400
            });
            
            // Animate card expansion if needed
            anime({
                targets: card,
                height: Math.max(cardRect.height, newContentContainer.scrollHeight + 40), // Ensure enough space
                easing: 'easeOutExpo',
                duration: 800
            });
            
            // Fade in new content with appropriate animation based on entity type
            setTimeout(() => {
                // Remove old content
                const elementsToRemove = card.querySelectorAll('.card-header, .card-body, .card-footer');
                elementsToRemove.forEach(el => {
                    if (el.parentNode === card) {
                        card.removeChild(el);
                    }
                });
                
                // Show new content with entity-specific animation
                newContentContainer.style.display = 'block';
                
                let animation;
                switch(entityType) {
                    case 'organization':
                        // Organizations slide up (business layer reveal)
                        animation = anime({
                            targets: newContentContainer,
                            opacity: [0, 1],
                            translateY: [50, 0],
                            easing: 'easeOutExpo',
                            duration: 600
                        });
                        break;
                        
                    case 'contact':
                        // Contacts slide in from left (personal insight)
                        animation = anime({
                            targets: newContentContainer,
                            opacity: [0, 1],
                            translateX: [50, 0],
                            easing: 'easeOutExpo',
                            duration: 600
                        });
                        break;
                        
                    default:
                        // Default fade in
                        animation = anime({
                            targets: newContentContainer,
                            opacity: [0, 1],
                            easing: 'easeOutExpo',
                            duration: 600
                        });
                }
                
                // Remove the overlay after animation completes
                setTimeout(() => {
                    overlay.remove();
                    cardSnapshot.remove();
                    
                    // Add to transformation history
                    cardTransformation.history.push({
                        content: newContent,
                        entity: entity,
                        entityType: entityType
                    });
                    cardTransformation.currentIndex = cardTransformation.history.length - 1;
                    
                    // Setup new entity links in the transformed card
                    this.setupEntityLinksInTransformedCard(card);
                    
                    // Add back button if not already present
                    this.addBackButtonIfNeeded(card);
                    
                    // Reset animation flag
                    this.isAnimating = false;
                    console.log('Animation completed, ready for next interaction');
                }, 600);
            }, 300);
        }, 300);
    }
    
    getEntityTypeColor(entityType, alpha = 1) {
        switch(entityType) {
            case 'organization':
                return `rgba(0, 120, 212, ${alpha})`; // Blue
            case 'contact':
                return `rgba(16, 124, 16, ${alpha})`; // Green
            case 'campaign':
                return `rgba(170, 0, 170, ${alpha})`; // Purple
            default:
                return `rgba(0, 120, 212, ${alpha})`; // Default blue
        }
    }
    
    setupEntityLinksInTransformedCard(card) {
        // Find all entity links in the transformed card
        const entityLinks = card.querySelectorAll('.entity-link');
        
        // Add our cinematic click handler to each link
        entityLinks.forEach(link => {
            // Remove existing click handlers by cloning the node
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            // Add our cinematic click handler
            newLink.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click
                
                const entity = newLink.dataset.entity || newLink.textContent;
                const type = newLink.classList[1]; // Second class is the entity type
                
                // Perform cinematic drill-down animation
                this.cinematicDrillDown(card, newLink, entity, type);
            });
        });
    }
    
    addBackButtonIfNeeded(card) {
        // Check if back button already exists
        if (card.querySelector('.entity-back-button')) return;
        
        const cardTransformation = this.currentTransformations.get(card);
        if (!cardTransformation || cardTransformation.history.length <= 1) return;
        
        // Create back button
        const backButton = document.createElement('button');
        backButton.className = 'entity-back-button';
        backButton.innerHTML = '← Back';
        backButton.style.position = 'absolute';
        backButton.style.top = '10px';
        backButton.style.left = '10px';
        backButton.style.padding = '5px 10px';
        backButton.style.background = 'rgba(255, 255, 255, 0.9)';
        backButton.style.border = '1px solid rgba(0, 0, 0, 0.1)';
        backButton.style.borderRadius = '4px';
        backButton.style.fontSize = '12px';
        backButton.style.cursor = 'pointer';
        backButton.style.zIndex = '50';
        backButton.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
        
        // Add click handler
        backButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.navigateBack(card);
        });
        
        // Add to card
        card.appendChild(backButton);
        
        // Animate button entrance
        anime({
            targets: backButton,
            opacity: [0, 1],
            translateY: [-10, 0],
            easing: 'easeOutExpo',
            duration: 400
        });
    }
    
    navigateBack(card) {
        // Prevent multiple animations
        if (this.isAnimating) {
            console.log('Animation already in progress, ignoring back navigation');
            return;
        }
        
        // Set animation flag
        this.isAnimating = true;
        
        const cardTransformation = this.currentTransformations.get(card);
        if (!cardTransformation || cardTransformation.currentIndex <= 0) {
            this.isAnimating = false;
            return;
        }
        
        // Go back one step in history
        cardTransformation.currentIndex--;
        const previousState = cardTransformation.history[cardTransformation.currentIndex];
        
        // Create reverse animation
        const overlay = document.createElement('div');
        overlay.className = 'entity-drill-overlay';
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        overlay.style.borderRadius = '8px';
        overlay.style.zIndex = '5';
        card.appendChild(overlay);
        
        // Fade out current content
        anime({
            targets: card.querySelector('.new-card-content'),
            opacity: 0,
            translateY: 20,
            easing: 'easeInOutQuad',
            duration: 300,
            complete: () => {
                // Remove current content
                const currentContent = card.querySelector('.new-card-content');
                if (currentContent) currentContent.remove();
                
                // Create new content container with previous state
                const newContentContainer = document.createElement('div');
                newContentContainer.className = 'new-card-content';
                newContentContainer.innerHTML = previousState.content;
                newContentContainer.style.opacity = '0';
                card.appendChild(newContentContainer);
                
                // Fade in previous content
                anime({
                    targets: newContentContainer,
                    opacity: 1,
                    translateY: [20, 0],
                    easing: 'easeOutExpo',
                    duration: 500,
                    complete: () => {
                        // Remove overlay
                        overlay.remove();
                        
                        // Setup entity links in the restored card
                        this.setupEntityLinksInTransformedCard(card);
                        
                        // Remove back button if we're at the first state
                        if (cardTransformation.currentIndex === 0) {
                            const backButton = card.querySelector('.entity-back-button');
                            if (backButton) {
                                anime({
                                    targets: backButton,
                                    opacity: 0,
                                    translateY: -10,
                                    easing: 'easeInQuad',
                                    duration: 300,
                                    complete: () => {
                                        backButton.remove();
                                    }
                                });
                            }
                        }
                        
                        // Reset animation flag
                        this.isAnimating = false;
                        console.log('Back navigation completed, ready for next interaction');
                    }
                });
            }
        });
    }
    
    generateEntityContent(entity, entityType) {
        // Generate appropriate content based on entity type
        let content = '';
        switch(entityType) {
            case 'organization':
                content = this.generateOrganizationContent(entity);
                break;
            case 'contact':
                content = this.generateContactContent(entity);
                break;
            default:
                content = this.generateDefaultContent(entity, entityType);
                break;
        }
        
        // Always append Copilot prompt at the bottom
        return content + this.generateCopilotPrompt();
    }
    
    // Helper method to generate the Copilot prompt HTML
    generateCopilotPrompt() {
        return `
            <div class="card-actions">
                <input class="quick-reply" placeholder="Ask Copilot…" />
                <div class="prebuilt-actions">
                    <button>View Details</button>
                    <button>Analyze Trends</button>
                    <button>Generate Insights</button>
                </div>
            </div>
        `;
    }
    
    generateOrganizationContent(organization) {
        // Clean up organization name (remove trailing period if present)
        const cleanOrgName = organization.replace(/\.$/, '');
        console.log('Generating content for organization:', cleanOrgName);
        
        // Sample organization profiles
        const orgProfiles = {
            'Globex Corp': {
                industry: 'Technology',
                founded: '1997',
                employees: '2,450',
                revenue: '$342M',
                growth: '+18.5% YoY',
                ceo: 'Patricia L. Johnson',
                headquarters: 'Seattle, WA',
                description: 'Leading provider of enterprise software solutions with focus on AI and automation.',
                recentNews: 'Recently launched new ML platform with 42% improved performance metrics.'
            },
            'Massive Dynamic Inc': {
                industry: 'Technology & Research',
                founded: '2002',
                employees: '5,120',
                revenue: '$1.2B',
                growth: '+42% YoY',
                ceo: 'Sarah J. Reynolds',
                headquarters: 'Boston, MA',
                description: 'Cutting-edge research and development firm specializing in emerging technologies.',
                recentNews: 'New feature launch drove 42% subscription growth in SaaS division.'
            },
            'Dugan Family Funeral Home': {
                industry: 'Funeral Services',
                founded: '1978',
                employees: '28',
                revenue: '$3.2M',
                growth: '-5.3% YoY',
                ceo: 'Robert Dugan',
                headquarters: 'Portland, OR',
                description: 'Family-owned funeral services provider serving the greater Portland area.',
                recentNews: 'Showing decreased engagement patterns over the last 30 days.'
            },
            'Initech LLC': {
                industry: 'Enterprise Software',
                founded: '1999',
                employees: '415',
                revenue: '$78M',
                growth: '+2.1% YoY',
                ceo: 'William Lumbergh',
                headquarters: 'Austin, TX',
                description: 'Enterprise resource planning and management software solutions.',
                recentNews: 'Recent customer churn risk identified with three enterprise accounts.'
            },
            'Stark Industries': {
                industry: 'Defense & Technology',
                founded: '1940',
                employees: '8,750',
                revenue: '$3.8B',
                growth: '+7.2% YoY',
                ceo: 'Anthony Stark',
                headquarters: 'Malibu, CA',
                description: 'Advanced weapons and technology development with recent pivot to clean energy.',
                recentNews: 'Decreased engagement from three enterprise accounts in the last quarter.'
            },
            'Wayne Enterprises': {
                industry: 'Conglomerate',
                founded: '1939',
                employees: '12,300',
                revenue: '$4.7B',
                growth: '+3.4% YoY',
                ceo: 'Bruce Wayne',
                headquarters: 'Gotham City',
                description: 'Diversified multinational with holdings in technology, healthcare, and manufacturing.',
                recentNews: '78% of enterprise users now utilizing the new risk assessment module.'
            },
            'Nakatomi Trading Group': {
                industry: 'Financial Services',
                founded: '1975',
                employees: '342',
                revenue: '$890M',
                growth: '+5.8% YoY',
                ceo: 'Joseph Takagi',
                headquarters: 'Los Angeles, CA',
                description: 'International trading and investment firm specializing in Asian markets.',
                recentNews: 'Security anomaly detected with unusual login patterns from 5 user accounts.'
            },
            'Soylent Corp': {
                industry: 'Food Processing',
                founded: '1995',
                employees: '1,840',
                revenue: '$520M',
                growth: '+15.2% YoY',
                ceo: 'Richard Simonson',
                headquarters: 'Chicago, IL',
                description: 'Innovative food processing and nutritional supplement manufacturer.',
                recentNews: 'Leading adoption implementation of new risk assessment module.'
            },
            'Acme Marketing Agency': {
                industry: 'Marketing Services',
                founded: '2008',
                employees: '175',
                revenue: '$28M',
                growth: '+27% YoY',
                ceo: 'Jessica Martinez',
                headquarters: 'Miami, FL',
                description: 'Full-service digital marketing agency specializing in performance marketing.',
                recentNews: 'Q2 digital campaign outperforming projections by 27%.'
            },
            'Cyberdyne Systems': {
                industry: 'Robotics & AI',
                founded: '1984',
                employees: '780',
                revenue: '$210M',
                growth: '+32.5% YoY',
                ceo: 'Miles Bennett Dyson',
                headquarters: 'Sunnyvale, CA',
                description: 'Advanced robotics and artificial intelligence research and development.',
                recentNews: 'Successfully authenticated unusual login attempts outside normal business hours.'
            }
        };
        
        // Find profile or generate default
        const profile = orgProfiles[cleanOrgName] || {
            industry: 'Unknown',
            founded: 'Unknown',
            employees: 'Unknown',
            revenue: 'Unknown',
            growth: 'Unknown',
            ceo: 'Unknown',
            headquarters: 'Unknown',
            description: 'Information not available for this organization.',
            recentNews: 'No recent news available.'
        };
        
        console.log('Found profile:', profile);
        
        // Generate HTML for organization profile
        return `
            <div class="card-header">
                <h3>${cleanOrgName}</h3>
                <span class="card-subtitle">${profile.industry} • Founded ${profile.founded}</span>
            </div>
            <div class="card-body">
                <div class="org-metrics">
                    <div class="metric">
                        <div class="metric-value">${profile.employees}</div>
                        <div class="metric-label">Employees</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">${profile.revenue}</div>
                        <div class="metric-label">Revenue</div>
                    </div>
                    <div class="metric">
                        <div class="metric-value">${profile.growth}</div>
                        <div class="metric-label">Growth</div>
                    </div>
                </div>
                
                <div class="org-details">
                    <p><strong>CEO:</strong> <span class="entity-link contact" data-entity="${profile.ceo}">${profile.ceo}</span></p>
                    <p><strong>Headquarters:</strong> ${profile.headquarters}</p>
                    <p><strong>Description:</strong> ${profile.description}</p>
                </div>
                
                <div class="org-news">
                    <h4>Recent Activity</h4>
                    <p>${profile.recentNews}</p>
                </div>
                
                <div class="action-buttons">
                    <button class="action-button">View Financial Details</button>
                    <button class="action-button">Analyze Risk Profile</button>
                    <button class="action-button">Compare to Competitors</button>
                </div>
            </div>
        `;
    }
    
    generateContactContent(contact) {
        // Sample contact profiles
        const contactProfiles = {
            'Sarah J. Reynolds': {
                title: 'Chief Executive Officer',
                organization: 'Massive Dynamic Inc',
                email: 'sreynolds@massivedynamic.com',
                phone: '(617) 555-0142',
                location: 'Boston, MA',
                department: 'Executive',
                joined: 'March 2015',
                lastContact: '2 days ago',
                bio: 'Visionary leader with 15+ years in technology innovation and business transformation.',
                recentActivity: 'Led new feature launch that drove 42% subscription growth.'
            },
            'Michael B. Thompson': {
                title: 'VP of Operations',
                organization: 'Initech LLC',
                email: 'mthompson@initech.com',
                phone: '(512) 555-8976',
                location: 'Austin, TX',
                department: 'Operations',
                joined: 'June 2018',
                lastContact: '23 days ago',
                bio: 'Operations executive specializing in process optimization and team efficiency.',
                recentActivity: 'Not logged in for 23 days. Usage metrics indicate potential churn risk.'
            },
            'Patricia L. Johnson': {
                title: 'Chief Executive Officer',
                organization: 'Wayne Enterprises',
                email: 'pjohnson@waynetech.com',
                phone: '(201) 555-7890',
                location: 'Gotham City',
                department: 'Executive',
                joined: 'January 2017',
                lastContact: '5 days ago',
                bio: 'Strategic leader with background in technology innovation and organizational growth.',
                recentActivity: 'Leading implementation of the new risk assessment module.'
            },
            'Jennifer K. Martinez': {
                title: 'Security Director',
                organization: 'Nakatomi Trading Group',
                email: 'jmartinez@nakatomi.com',
                phone: '(213) 555-3456',
                location: 'Los Angeles, CA',
                department: 'Security',
                joined: 'August 2019',
                lastContact: '1 day ago',
                bio: 'Cybersecurity expert with focus on threat detection and incident response.',
                recentActivity: 'Detected unusual login patterns from 5 user accounts across APAC region.'
            },
            'Robert T. Wilson': {
                title: 'IT Manager',
                organization: 'Nakatomi Trading Group',
                email: 'rwilson@nakatomi.com',
                phone: '(213) 555-9012',
                location: 'Los Angeles, CA',
                department: 'Information Technology',
                joined: 'March 2020',
                lastContact: '3 days ago',
                bio: 'IT professional with expertise in network security and infrastructure management.',
                recentActivity: 'Involved in security anomaly investigation with unusual login patterns.'
            },
            'David P. Anderson': {
                title: 'Marketing Director',
                organization: 'Acme Marketing Agency',
                email: 'danderson@acmemarketing.com',
                phone: '(305) 555-6789',
                location: 'Miami, FL',
                department: 'Marketing',
                joined: 'September 2016',
                lastContact: '1 day ago',
                bio: 'Digital marketing strategist with focus on performance-driven campaigns.',
                recentActivity: 'Reports cost per acquisition decreased by 18% while conversion rate increased 12%.'
            },
            'Mary Jones': {
                title: 'VP of Marketing',
                organization: 'Dugan Family Funeral Home',
                email: 'maryjones@duganfuneral.com',
                phone: '(503) 555-4321',
                location: 'Portland, OR',
                department: 'Marketing',
                joined: 'May 2019',
                lastContact: '4 days ago',
                bio: 'Marketing professional with experience in local business promotion and community outreach.',
                recentActivity: 'Working on new community engagement initiative to address declining metrics.'
            },
            'Patricia Smith': {
                title: 'CEO',
                organization: 'Dugan Family Funeral Home',
                email: 'patricia.smith@duganfuneral.com',
                phone: '(503) 555-8765',
                location: 'Portland, OR',
                department: 'Executive',
                joined: 'January 2010',
                lastContact: '6 days ago',
                bio: 'Second-generation funeral home director with focus on compassionate service and community relations.',
                recentActivity: 'Reviewing engagement metrics and developing retention strategy.'
            },
            'David Miller': {
                title: 'COO',
                organization: 'Dugan Family Funeral Home',
                email: 'david.miller@duganfuneral.com',
                phone: '(503) 555-9876',
                location: 'Portland, OR',
                department: 'Operations',
                joined: 'March 2015',
                lastContact: '3 days ago',
                bio: 'Operations specialist with background in healthcare administration and service optimization.',
                recentActivity: 'Implementing new service protocols to improve customer satisfaction metrics.'
            }
        };
        
        // Get profile for this contact or generate generic one
        const profile = contactProfiles[contact] || {
            title: 'Unknown Position',
            organization: 'Unknown Organization',
            email: 'email@example.com',
            phone: 'Not available',
            location: 'Unknown',
            department: 'Unknown',
            joined: 'Unknown',
            lastContact: 'Unknown',
            bio: 'Information not available for this contact.',
            recentActivity: 'No recent activity available.'
        };
        
        // Generate HTML for contact profile
        return `
            <div class="card-header">
                <h3>${contact}</h3>
                <span class="card-subtitle">${profile.title} at <span class="entity-link organization" data-entity="${profile.organization}">${profile.organization}</span></span>
            </div>
            <div class="card-body">
                <div class="contact-details">
                    <p><strong>Email:</strong> ${profile.email}</p>
                    <p><strong>Phone:</strong> ${profile.phone}</p>
                    <p><strong>Location:</strong> ${profile.location}</p>
                    <p><strong>Department:</strong> ${profile.department}</p>
                    <p><strong>Joined:</strong> ${profile.joined}</p>
                    <p><strong>Last Contact:</strong> ${profile.lastContact}</p>
                </div>
                
                <div class="contact-bio">
                    <h4>Biography</h4>
                    <p>${profile.bio}</p>
                </div>
                
                <div class="contact-activity">
                    <h4>Recent Activity</h4>
                    <p>${profile.recentActivity}</p>
                </div>
                
                <div class="action-buttons">
                    <button class="action-button">View Activity Timeline</button>
                    <button class="action-button">Send Message</button>
                    <button class="action-button">Schedule Meeting</button>
                </div>
            </div>
        `;
    }
    
    generateDefaultContent(entity, entityType) {
        // Generic content for other entity types
        return `
            <div class="card-header">
                <h3>${entity}</h3>
                <span class="card-subtitle">${entityType.charAt(0).toUpperCase() + entityType.slice(1)}</span>
            </div>
            <div class="card-body">
                <p>Detailed information about ${entity} is being compiled.</p>
                <p>This entity was identified as a ${entityType} in our system.</p>
                
                <div class="action-buttons">
                    <button class="action-button">View Related Data</button>
                    <button class="action-button">Analyze Trends</button>
                </div>
            </div>
        `;
    }
}

// Initialize when the script loads
document.addEventListener('DOMContentLoaded', () => {
    window.entityDrillAnimations = new EntityDrillAnimations();
});
