'use strict';

/**
 * @copyright Devexperts
 */

export default window.DX =  {

	/**
	 * Shorthand for document.getElementById()
	 * @param {String | Element | Node} id
	 * @return {Node}
	 */
	$(id) {
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
	$$(selector, root) {
		return (root || document).querySelector(selector);
	},

	/**
	 * Shorthand for document.querySelectorAll()
	 * @param {String} selector
	 * @param {Element | Node} [root]
	 * @return {NodeList}
	 */
	$$$(selector, root) {
		return (root || document).querySelectorAll(selector);
	},

	/**
	 * @param {Any} variable
	 * @returns {Boolean}
	 */
	isDefined (variable) {
		return !(typeof variable === 'undefined' || variable === null);
	},

	/**
	 * @returns {Boolean}
	 */
	isTouchAvailable () {
		return ('ontouchstart' in window);
	}
};
