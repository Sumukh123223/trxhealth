// Polyfill for At function and other modern JavaScript features
(function() {
    'use strict';
    
    // Polyfill for At function (likely Array.prototype.at)
    if (!Array.prototype.at) {
        Array.prototype.at = function(index) {
            // Convert negative indices to positive
            const actualIndex = index < 0 ? this.length + index : index;
            return this[actualIndex];
        };
    }
    
    // Polyfill for other potential missing functions
    if (!String.prototype.at) {
        String.prototype.at = function(index) {
            const actualIndex = index < 0 ? this.length + index : index;
            return this[actualIndex];
        };
    }
    
    // Global At function polyfill
    if (typeof window !== 'undefined' && !window.At) {
        window.At = function() {
            // Simple implementation or no-op
            console.log('At function called');
        };
    }
    
    console.log('Polyfills loaded successfully');
})();
