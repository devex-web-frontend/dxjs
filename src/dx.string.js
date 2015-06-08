'use strict';

/**
 * @copyright Devexperts
 */

import './dx.core';

let uniqueIdCounter = 0;

export default window.DX.String = {

	/**
	 * @deprecated
	 * Hyphenate given string
	 * @param {String} string
	 * @returns {String}
	 */
	hyphenate (string) {
		return string.replace(/[A-Z]/g, str => '-' + str.toLowerCase());
	},

	/**
	 * Replaces underscores, spaces, or camelCase with dashes.
	 * @param {String} string
	 * @param {Boolean} lower
	 */
	dasherize (string, lower = true) {
		string = string.replace(/([a-z])(?=[A-Z])/g, '$1-');
		if (lower) {
			string = string.toLowerCase();
		}
		return string;
	},

	/**
	 * Camelizes given string,
	 * @param {String} string
	 * @returns {String}
	 */
	camelize (string, lower = true) {
		//camelize
		string = string.replace(/[-_\s]+(.)?/g, (match, c) => c ? c.toUpperCase() : '');
		if (lower) {
			//decapitalize
			string = string[0].toLowerCase() + string.slice(1);
		} else {
			string = string[0].toUpperCase() + string.slice(1);
		}
		return string;
	},

	/**
	 * Generate a unique id
	 * @param {string|number} prefix
	 * @param {string|number} postfix
	 * @returns {string}
	 */
	 createRandomId(prefix = '', postfix = '') {
		let id = ++uniqueIdCounter;
		return prefix + id + postfix;
	},

	/**
	 * Capitalizes given string
	 * @param {String} string
	 * @returns {string}
	 */
	capitalize (string) {
		return string.slice(0, 1).toUpperCase() + string.slice(1);
	}
};
