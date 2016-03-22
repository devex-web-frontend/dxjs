'use strict';

/**
 * @copyright Devexperts
 */

import './dx.core';

export default window.DX.Bem = {
	/**
	 * Make string for className attribute
	 * @param {String} baseClassName
	 * @param {Array|String} [modifiers]
	 * @return {String}
	 */
	createModifiedClassName(baseClassName, modifiers) {
		let classNameParts = [];

		modifiers = modifiers || [];
		classNameParts = classNameParts.concat(baseClassName, modifiers);

		return classNameParts.join(' ' + baseClassName + '-');
	},

	/**
	 * Add modifier to element
	 * @param {Element} element
	 * @param {String} modifier
	 * @param {String} [baseClassName]
	 */
	addModifier(element, modifier, baseClassName) {
		let classList = element.classList;
		let classListToModify;

		function addModifiedClass(baseClassName) {
			classList.add(baseClassName + '-' + modifier);
		}

		if (baseClassName) {
			classList.add(baseClassName);
			addModifiedClass(baseClassName);
		} else {
			classListToModify = filter(classList, className => !isModified(className));
			classListToModify.forEach(addModifiedClass);
		}
	},

	/**
	 * Remove modifier from element
	 * @param {Element} element
	 * @param {String} modifier
	 * @param {String} [baseClassName]
	 */
	removeModifier(element, modifier, baseClassName) {
		let classList = element.classList;
		let	classListToRemove;

		function removeClassName(className) {
			classList.remove(className);
		}

		if (baseClassName) {
			removeClassName(baseClassName + '-' + modifier);
		} else {
			classListToRemove = filter(classList, className => isModified(className, modifier));
			classListToRemove.forEach(removeClassName);
		}
	},

	/**
	 * Check the existence modifier for element
	 * @param {Element} element
	 * @param {String} modifier
	 * @param {String} [baseClassName]
	 * @returns {boolean}
	 */
	hasModifier(element, modifier, baseClassName) {
		let hasModifier;
		let classList = element.classList;

		if (baseClassName) {
			hasModifier = classList.contains(baseClassName + '-' + modifier);
		} else {
			hasModifier = some(classList, className => isModified(className, modifier));
		}

		return hasModifier;
	}

};

function filter(collection, fn) {
	return Array.prototype.filter.call(collection, fn);
}

function some(collection, fn) {
	return Array.prototype.some.call(collection, fn);
}

function isModified(className, modifier) {
	return (new RegExp('[^-]+-' + (modifier || '\\w+') + '$')).test(className);
}
