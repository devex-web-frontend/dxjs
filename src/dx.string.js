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
		string = this.decamelize(string).replace(/[ _]/gm, '-');
		if (lower) {
			string = string.toLowerCase();
		}
		return string;
	},

	/**
	 * Converts a camelized string into all lower case separated by underscores.
	 * @param {String} string
	 */
	decamelize (string) {
		return string.replace(/([a-z\d])([A-Z])/g, '$1_$2');
	},

	/**
	 * Camelizes given string,
	 * @param {String} string
	 * @returns {String}
	 */
	camelize (string) {
		string = string.replace(/[-_\s]+(.)?/g, (match, c) => c ? c.toUpperCase() : '');
		return string;
	},

	/**
	 * Generate a unique integer id
	 * @param {string|number} prefix
	 * @param {string|number} postfix
	 * @returns {string}
	 */
	 createRandomId(prefix, postfix) {
		let id = ++uniqueIdCounter;
		prefix = prefix || 'id';
		postfix = postfix ? ('_' + postfix) : '';

		return (prefix + '_' + id + postfix);
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
