/**
 * Masonry Layout for Riskill Demo
 * Implements a Pinterest-style responsive layout for cards in the main canvas
 * Cards will automatically reflow and reposition based on their content height
 */

class MasonryLayout {
    constructor(containerSelector, itemSelector) {
        this.container = document.querySelector(containerSelector);
        this.itemSelector = itemSelector;
        this.items = Array.from(this.container.querySelectorAll(itemSelector));
        this.columnCount = 2; // Default starting point, will be calculated based on container width
        this.columnWidth = 0;
        this.columns = [];
        
        // Initialize the layout
        this.init();
        
        // Add resize listener
        window.addEventListener('resize', this.debounce(() => {
            this.updateLayout();
        }, 200));
        
        // Add mutation observer to detect content changes
        this.observer = new MutationObserver(this.debounce(() => {
            this.updateLayout();
        }, 200));
        
        this.observer.observe(this.container, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true
        });
    }
    
    init() {
        // Set initial styles for container
        this.container.style.position = 'relative';
        
        // Set initial styles for items
        this.items.forEach(item => {
            item.style.position = 'absolute';
            item.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            item.style.width = '100%'; // Will be adjusted in updateLayout
            
            // Initialize parallax custom properties if not already set
            if (!item.style.getPropertyValue('--parallax-x')) {
                item.style.setProperty('--parallax-x', '0px');
            }
            if (!item.style.getPropertyValue('--parallax-y')) {
                item.style.setProperty('--parallax-y', '0px');
            }
        });
        
        this.updateLayout();
    }
    
    updateLayout() {
        // Calculate number of columns based on container width
        const containerWidth = this.container.offsetWidth;
        const minColumnWidth = 300; // Minimum width for a column
        
        // Calculate how many columns can fit based on container width
        // Allow for more columns if the browser width permits
        let calculatedColumns = Math.floor(containerWidth / minColumnWidth);
        this.columnCount = Math.max(1, calculatedColumns);
        
        this.columnWidth = containerWidth / this.columnCount;
        
        // Reset columns array
        this.columns = Array(this.columnCount).fill(0);
        
        // Position each item
        this.items.forEach(item => {
            // Reset any previous width/transform to get accurate height
            item.style.width = `${this.columnWidth - 20}px`; // 20px for gap
            
            // Find the shortest column
            const shortestColumnIndex = this.columns.indexOf(Math.min(...this.columns));
            
            // Calculate position
            const x = shortestColumnIndex * this.columnWidth + 10; // 10px margin
            const y = this.columns[shortestColumnIndex];
            
            // Apply position with parallax effect using CSS custom properties
            item.style.transform = `translate(calc(${x}px + var(--parallax-x, 0px)), calc(${y}px + var(--parallax-y, 0px)))`;
            
            // Update column height
            this.columns[shortestColumnIndex] += item.offsetHeight + 20; // 20px for gap
        });
        
        // Update container height to match tallest column
        this.container.style.height = `${Math.max(...this.columns)}px`;
    }
    
    // Add a new item to the layout
    addItem(item) {
        item.style.position = 'absolute';
        item.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        this.items.push(item);
        this.updateLayout();
    }
    
    // Remove an item from the layout
    removeItem(item) {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
            this.updateLayout();
        }
    }
    
    // Refresh the layout (useful when content changes)
    refresh() {
        this.items = Array.from(this.container.querySelectorAll(this.itemSelector));
        this.updateLayout();
    }
    
    // Utility function to debounce frequent events
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize masonry layout for main canvas cards
    window.masonryLayout = new MasonryLayout('.main-card-container', '.insight-card, .main-wireframe-card');
    
    // Listen for entity drill-down animations to refresh layout
    document.addEventListener('entityDrillAnimationComplete', () => {
        if (window.masonryLayout) {
            setTimeout(() => {
                window.masonryLayout.refresh();
            }, 300); // Small delay to ensure content has settled
        }
    });
    
    // Add animation for the strategic narrative section
    const narrativeSection = document.querySelector('.strategic-narrative');
    if (narrativeSection) {
        // Add subtle entrance animation
        setTimeout(() => {
            narrativeSection.style.opacity = '0';
            narrativeSection.style.transform = 'translateY(20px)';
            
            // Add transition properties
            narrativeSection.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            
            // Trigger animation after a brief delay
            setTimeout(() => {
                narrativeSection.style.opacity = '1';
                narrativeSection.style.transform = 'translateY(0)';
            }, 100);
        }, 0);
    }
});
