'use strict';

/**
 * @copyright Devexperts
 */

import './dx.core';

export default window.DX.String = {

	/**
	 * @param {String} string
	 * @returns {String}
	 */
	hyphenate (string) {
		return string.replace(/[A-Z]/g, str => '-' + str.toLowerCase());
	},

	/**
	 * @param {String} string
	 * @returns {String}
	 */
	camelize (string) {
		return string.replace(/-([a-z])/g, (str, p1) => p1.toUpperCase());
	},

	/**
	 * @param {String} [prefix]
	 * @param {String} [postfix]
	 * @returns {String}
	 */
	createRandomId (prefix, postfix) {
		let rnd = Math.floor(Math.random() * 100000);

		prefix = prefix || 'id';
		postfix = postfix ? ('_' + postfix) : '';

		return (prefix + '_' + new Date().valueOf() + '_' + rnd + postfix);
	},

	/**
	 * @param {String} string
	 * @returns {string}
	 */
	capitalize (string) {
		return string.slice(0, 1).toUpperCase() + string.slice(1);
	}
};
