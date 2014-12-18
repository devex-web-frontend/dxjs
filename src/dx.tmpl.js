/**
 * @copyright Devexperts
 */
(function(DX, window, document, undefined) {
	'use strict';

	/**
	 * @namespace
	 * @memberOf window.DX
	 */
	DX.Tmpl = {
		/**
		 * Gets template and data and returns processed string (all vars in template replaced with values from data)
		 * @param {String} template
		 * @param {Object} data
		 * @return {String}
		 */
		process: function(template, data) {
			var constructs,
				constructName,
				result;

			result = template;
			constructs = result.match(/{%=\s*[\w-]+\s*%}/g);

			if (constructs) {
				constructs.forEach(function(construct) {
					constructName = construct.replace(/^{%=\s*|\s*%}$/g, '');
					result = result.replace(new RegExp(construct, 'g'), (data[constructName] || ''));
				});
			}

			return result;
		}
	};
})(DX, window, document);