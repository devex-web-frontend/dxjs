beforeEach(function() {
	this.addMatchers({
		/**
		 * @param {Array} array
		 * @returns {Boolean}
		 */
		toBeIn: function(array) {
			return array.indexOf(this.actual) !== -1;
		}
	});
});