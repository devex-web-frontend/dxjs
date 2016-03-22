/**
 * @copyright Devexperts
 */

import './dx.core';

export default {

	/**
	 * @deprecated
	 * Gets template and data and returns processed string (all vars in template replaced with values from data)
	 * @param {String} template
	 * @param {Object} data
	 * @return {String}
	 */

	process(template, data) {
		let constructs;
		let constructName;
		let result;

		result = template;
		constructs = result.match(/{%=\s*[\w-]+\s*%}/g);

		if (constructs) {
			constructs.forEach(construct => {
				constructName = construct.replace(/^{%=\s*|\s*%}$/mg, '');
				result = result.replace(new RegExp(construct, 'g'), (data[constructName] || ''));
			});
		}

		return result;
	}
};