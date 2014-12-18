/**
 * @copyright Devexperts
 */
(function(DX, window, document, undefined) {
	'use strict';

	/**
	 *
	 * @namespace
	 * @memberOf window.DX
	 */
	DX.Measure = {
		/**
		 * @param {HTMLElement} element
		 * @param {Boolean} [isOuter]
		 * @return {Object} - {Number:width, Number:height}
		 */
		getSize: function(element, isOuter) {
			return {
				width: isOuter ? element.offsetWidth : element.clientWidth,
				height: isOuter ? element.offsetHeight : element.clientHeight
			};
		},

		/**
		 * @param {Element} element
		 * @return {Object} - {Number:x, Number:y}
		 */
		getPosition: function(element) {
			var box = element.getBoundingClientRect(),
				docElement = document.documentElement;

			return {
				x: box.left + window.pageXOffset - docElement.clientLeft,
				y: box.top + window.pageYOffset - docElement.clientTop
			};
		}
	};
})(DX, window, document);