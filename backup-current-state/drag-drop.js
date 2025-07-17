// Drag and drop functionality for left zone cards
document.addEventListener('DOMContentLoaded', function() {
    const leftZone = document.querySelector('.left-zone');
    
    if (leftZone) {
        // Initialize Sortable.js on the left zone
        new Sortable(leftZone, {
            animation: 150,
            ghostClass: 'card-ghost',
            chosenClass: 'card-chosen',
            dragClass: 'card-drag',
            handle: '.card-header',  // Drag using the header as handle
            onEnd: function(evt) {
                // Optional: Add logic here to save the new order
                console.log('Card reordered:', evt.oldIndex, 'to', evt.newIndex);
                
                // Re-initialize animations after reordering
                if (typeof initializeLeftZoneCards === 'function') {
                    initializeLeftZoneCards();
                }
            }
        });
    }
});
