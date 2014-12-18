/**
 * @copyright Devexperts
 */
(function(window, document, undefined) {
	'use strict';

	/**
	 * @namespace
	 */
	window.DX = {
		/**
		 * Shorthand for document.getElementById()
		 * @param {String | Element | Node} id
		 * @return {Node}
		 */
		$: function(id) {
			if (typeof id === 'string') {
				return document.getElementById(id);
			} else if (id.nodeType && id.nodeType === 1) {
				return id;
			}

			return null;
		},

		/**
		 * Shorthand for document.querySelector()
		 * @param {String} selector
		 * @param {Element | Node} [root]
		 * @return {Node}
		 */
		$$: function(selector, root) {
			return (root || document).querySelector(selector);
		},

		/**
		 * Shorthand for document.querySelectorAll()
		 * @param {String} selector
		 * @param {Element | Node} [root]
		 * @return {NodeList}
		 */
		$$$: function(selector, root) {
			return (root || document).querySelectorAll(selector);
		},

		/**
		 * @param {Any} variable
		 * @returns {Boolean}
		 */
		isDefined: function(variable) {
			return !(typeof variable === 'undefined' || variable === null);
		},

		/**
		 * @returns {Boolean}
		 */
		isTouchAvailable: function() {
			return ('ontouchstart' in window);
		}
	};
})(window, document);