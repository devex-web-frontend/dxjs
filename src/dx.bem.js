/**
 * @copyright Devexperts
 */
(function(DX, window, document, undefined) {
	'use strict';

	function filter(collection, fn) {
		return Array.prototype.filter.call(collection, fn);
	}

	function some(collection, fn) {
		return Array.prototype.some.call(collection, fn);
	}

	function isModified(className, modifier) {
		return (new RegExp('[^-]+-' + (modifier || '\\w+') + '$')).test(className);
	}

	/**
	 * @namespace
	 * @memberOf window.DX
	 */
	DX.Bem = {
		/**
		 * Make string for className attribute
		 * @param {String} baseClassName
		 * @param {Array|String} [modifiers]
		 * @return {String}
		 */
		createModifiedClassName: function(baseClassName, modifiers) {
			var classNameParts = [];

			modifiers = modifiers || [];
			classNameParts = classNameParts.concat(baseClassName, modifiers);

			return classNameParts.join(' ' + baseClassName + '-');
		},

		/**
		 * @param {Element} element
		 * @param {String} modifier
		 * @param {String} [baseClassName]
		 */
		addModifier: function(element, modifier, baseClassName) {
			var classList = element.classList,
				classListToModify;

			function addModifiedClass(baseClassName) {
				classList.add(baseClassName + '-' + modifier);
			}

			if (baseClassName) {
				classList.add(baseClassName);
				addModifiedClass(baseClassName);
			} else {
				classListToModify = filter(classList, function(className) {
					return !isModified(className);
				});
				classListToModify.forEach(addModifiedClass);
			}
		},

		/**
		 * @param {Element} element
		 * @param {String} modifier
		 * @param {String} [baseClassName]
		 */
		removeModifier: function(element, modifier, baseClassName) {
			var classList = element.classList,
				classListToRemove;

			function removeClassName(className) {
				classList.remove(className);
			}

			if (baseClassName) {
				removeClassName(baseClassName + '-' + modifier);
			} else {
				classListToRemove = filter(classList, function(className) {
					return isModified(className, modifier);
				});
				classListToRemove.forEach(removeClassName);
			}
		},

		/**
		 * @param {Element} element
		 * @param {String} modifier
		 * @param {String} [baseClassName]
		 */
		hasModifier: function(element, modifier, baseClassName) {
			var hasModifier,
				classList = element.classList;

			if (baseClassName) {
				hasModifier = classList.contains(baseClassName + '-' + modifier);
			} else {
				hasModifier = some(classList, function(className) {
					return isModified(className, modifier);
				});
			}

			return hasModifier;
		}
	};
})(DX, window, document);