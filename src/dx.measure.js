'use strict';

/**
 * @copyright Devexperts
 */

import './dx.core';

export default window.DX.Measure = {

	/**
	 * Get element sizes
	 * @param {HTMLElement} element
	 * @param {Boolean} [isOuter]
	 * @return {{width: Number, height: Number}}
	 */
	getSize(element, isOuter) {
		return {
			width: isOuter ? element.offsetWidth : element.clientWidth,
			height: isOuter ? element.offsetHeight : element.clientHeight
		};
	},

	/**
	 * Get element positions
	 * @param {Element} element
	 * @return {{x:Number, y: Number}}
	 */
	getPosition (element) {
		let box = element.getBoundingClientRect();
		let docElement = document.documentElement;

		return {
			x: box.left + window.pageXOffset - docElement.clientLeft,
			y: box.top + window.pageYOffset - docElement.clientTop
		};
	}
};