/**
 * @copyright Devexperts
 * @requires DX.String
 */
(function(DX, window, document, undefined) {
	'use strict';

	function getSibling(direction, element) {
		var sibling = element[direction + 'ElementSibling'];

		if (!sibling) {
			sibling = element[direction + 'Sibling'];

			while (sibling && sibling.nodeType !== 1) {
				sibling = sibling[direction + 'Sibling'];
			}
		}

		return sibling;
	}

	/**
	 * @namespace
	 * @memberOf window.DX
	 */
	DX.Dom = {
		/**
		 * @param {String} tagName
		 * @param {Object} [options]
		 * @return {Element}
		 */
		createElement: function(tagName, options) {
			var element = document.createElement(tagName),
				newProp;

			for (var prop in options) {
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
		 * @param {Element} element
		 * @return {Element}
		 */
		getParent: function(element) {
			return element.parentElement || element.parentNode;
		},

		/**
		 * @param {Element} element
		 * @param {Function} filterFn
		 * @returns {Element|null}
		 */
		getAscendantByFilter: function(element, filterFn) {
			while (element && (element !== document) && !filterFn(element)) {
				element = DX.Dom.getParent(element);
			}

			return (element === document) ? null : element;
		},

		/**
		 * @param {Element} element
		 * @param {Element} targetElement
		 * @return {Boolean}
		 */
		isAscendant: function(element, targetElement) {
			return !!DX.Dom.getAscendantByFilter(targetElement, function(currentElement) {
				return currentElement === element;
			});
		},

		/**
		 * @param {Element} element
		 * @param {String} className
		 * @return {Element|null}
		 */
		getAscendantByClassName: function(element, className) {

			return DX.Dom.getAscendantByFilter(element, function(currentElement) {
				return currentElement.classList && currentElement.classList.contains(className);
			});
		},

		/**
		 * @param {Element} element
		 * @param {String} attrName
		 * @param {String} [attrValue]
		 * @return {Element}
		 */
		getAscendantByAttribute: function(element, attrName, attrValue) {
			return DX.Dom.getAscendantByFilter(element, function(currentElement) {
				return currentElement.hasAttribute(attrName) &&
					(!attrValue || (currentElement.getAttribute(attrName) === attrValue));
			});
		},

		/**
		 * @param {Element} element
		 * @return {Element|null}
		 */
		getNextSibling: function(element) {
			return getSibling('next', element);
		},

		/**
		 * @param {Element} element
		 * @return {Element|null}
		 */
		getPreviousSibling: function(element) {
			return getSibling('previous', element);
		},

		/**
		 * @param {Element} element
		 * @param {String} [namespace]
		 * @return {Object}
		 */
		getData: function(element, namespace) {
			var defaultMatcher = 'data-',
				matcher = (namespace) ? defaultMatcher + namespace + '-' : defaultMatcher,
				attrs = element.attributes,
				i = attrs.length,
				result = {},
				attrName;

			while (i--) {
				attrName = attrs[i].name;

				if (attrName.indexOf(matcher) === 0) {
					attrName = DX.String.camelize(attrName.slice(matcher.length));
					result[attrName] = attrs[i].value;
				}
			}

			return result;
		}
	};
})(DX, window, document);