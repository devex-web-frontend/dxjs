/**
 * @copyright Devexperts
 */
(function(DX, window, document, undefined) {
	'use strict';

	/**
	 * @namespace
	 * @memberOf window.DX
	 */
	DX.String = {
		/**
		 *
		 * @param {String} string
		 * @returns {String}
		 */
		hyphenate: function(string) {
			return string.replace(/[A-Z]/g, function(str) {
				return '-' + str.toLowerCase();
			});
		},

		/**
		 * @param {String} string
		 * @returns {String}
		 */
		camelize: function(string) {
			return string.replace(/-([a-z])/g, function(str, p1) {
				return p1.toUpperCase();
			});
		},

		/**
		 * @param {String} [prefix]
		 * @param {String} [postfix]
		 * @returns {String}
		 */
		createRandomId: function(prefix, postfix) {
			var rnd = Math.floor(Math.random() * 100000);

			prefix = prefix || 'id';
			postfix = postfix ? ('_' + postfix) : '';

			return (prefix + '_' + new Date().valueOf() + '_' + rnd + postfix);
		},

		/**
		 * @param {String} string
		 * @returns {string}
		 */
		capitalize: function(string) {
			return string.slice(0, 1).toUpperCase() + string.slice(1);
		}
	};
})(DX, window, document);