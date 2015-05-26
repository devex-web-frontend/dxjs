'use strict';

/**
 * @copyright Devexperts
 */

import './dx.core';

export default window.DX.Measure = {

	/**
	 * @param {HTMLElement} element
	 * @param {Boolean} [isOuter]
	 * @return {Object} - {Number:width, Number:height}
	 */
	getSize(element, isOuter) {
		return {
			width: isOuter ? element.offsetWidth : element.clientWidth,
			height: isOuter ? element.offsetHeight : element.clientHeight
		};
	},

	/**
	 * @param {Element} element
	 * @return {Object} - {Number:x, Number:y}
	 */
	getPosition (element) {
		let box = element.getBoundingClientRect();
		var docElement = document.documentElement;

		return {
			x: box.left + window.pageXOffset - docElement.clientLeft,
			y: box.top + window.pageYOffset - docElement.clientTop
		};
	}
};