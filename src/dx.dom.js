'use strict';

/**
 * @copyright Devexperts
 */

import './dx.core';
import DxString from './dx.string';

export default window.DX.Dom = {

	/**
	 * Make element from tag and options
	 * @param {String} tagName
	 * @param {Object} [options]
	 * @return {Element}
	 */
	createElement(tagName, options) {
		let element = document.createElement(tagName);
		let newProp;

		for (let prop in options) {
			if (Object.prototype.hasOwnProperty.call(options, prop)) {
				if (prop === 'for') {
					newProp = 'htmlFor';
				} else if (prop === 'class') {
					newProp = 'className';
				} else if (prop === 'html') {
					newProp = 'innerHTML';
				} else {
					newProp = prop;
				}

				if (newProp === 'className' && Array.isArray(options[prop])) {
					element[newProp] = options[prop].join(' ');
				} else if (newProp === 'innerHTML' && Array.isArray(options[prop])) {
					element[newProp] = options[prop].join('');
				} else if (newProp === 'type') {
					element.setAttribute(newProp, options[prop]);
				} else {
					element[newProp] = options[prop];
				}
			}
		}

		return element;
	},

	/**
	 * Get the parent for specified element
	 * @param {Element} element
	 * @return {Element}
	 */
	getParent(element) {
		return element.parentElement || element.parentNode;
	},

	/**
	 * Get the parent  for specified element matches filterFn
	 * @param {Element | HTMLDocument} element
	 * @param {Function} filterFn
	 * @returns {Element | null}
	 */
	getAscendantByFilter(element, filterFn) {
		while (element && (element !== document) && !filterFn(element)) {
			element = this.getParent(element);
		}

		return (element === document) ? null : element;
	},

	/**
	 * Checks if element is accendant
	 * @param {Element} element
	 * @param {Element} targetElement
	 * @return {Boolean}
	 */
	isAscendant(element, targetElement) {
		return !!this.getAscendantByFilter(targetElement, function(currentElement) {
			return currentElement === element;
		});
	},

	/**
	 * Get ascendant element by className
	 * @param {Element} element
	 * @param {String} className
	 * @return {Element|null}
	 */
	getAscendantByClassName(element, className) {
		return this.getAscendantByFilter(element, function(currentElement) {
			return currentElement.classList && currentElement.classList.contains(className);
		});
	},

	/**
	 * Get ascendant element by attribute
	 * @param {Element} element
	 * @param {String} attrName
	 * @param {String} [attrValue]
	 * @return {Element}
	 */
	getAscendantByAttribute(element, attrName, attrValue) {
		return this.getAscendantByFilter(element, function(currentElement) {
			return currentElement.hasAttribute(attrName) &&
				(!attrValue || (currentElement.getAttribute(attrName) === attrValue));
		});
	},

	/**
	 * Get next sibling for specified element
	 * @param {Element} element
	 * @return {Element|null}
	 */
	getNextSibling(element) {
		return getSibling('next', element);
	},

	/**
	 * Get previous sibling for specified element
	 * @param {Element} element
	 * @return {Element|null}
	 */
	getPreviousSibling(element) {
		return getSibling('previous', element);
	},

	/**
	 * Get arbitrary data associated with the specified element
	 * @param {Element} element
	 * @param {String} [namespace]
	 * @return {Object}
	 */
	getData(element, namespace) {
		let defaultMatcher = 'data-';
		let matcher = (namespace) ? defaultMatcher + namespace + '-' : defaultMatcher;
		let attrs = element.attributes;
		let i = attrs.length;
		let result = {};
		let attrName;

		while (i--) {
			attrName = attrs[i].name;

			if (attrName.indexOf(matcher) === 0) {
				attrName = DxString.camelize(attrName.slice(matcher.length));
				result[attrName] = attrs[i].value;
			}
		}

		return result;
	}
};

function getSibling(direction, element) {
	let sibling = element[direction + 'ElementSibling'];

	if (!sibling) {
		sibling = element[direction + 'Sibling'];

		while (sibling && sibling.nodeType !== 1) {
			sibling = sibling[direction + 'Sibling'];
		}
	}

	return sibling;
}