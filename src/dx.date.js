/**
 * @copyright Devexperts
 */
(function(DX, window, document, undefined) {
	'use strict';

	/**
	 * @namespace
	 * @memberOf window.DX
	 */
	DX.Date = {
		/**
		 * @param {Date} date
		 * @returns {boolean}
		 */
		isDate: function(date) {
			return (date instanceof Date) && !isNaN(date.valueOf());
		},

		/**
		 * @param {Date} date
		 * @returns {Date}
		 */
		clone: function(date) {
			return new Date(date);
		},

		/**
		 * @param {Date} date1
		 * @param {Date} date2
		 * @returns {boolean}
		 */
		isEqualYear: function(date1, date2) {
			return date1.getFullYear() === date2.getFullYear();
		},

		/**
		 * @param {Date} date1
		 * @param {Date} date2
		 * @returns {boolean}
		 */
		isEqualMonth: function(date1, date2) {
			return DX.Date.isEqualYear(date1, date2) && date1.getMonth() === date2.getMonth();
		},

		/**
		 * @param {Date} date1
		 * @param {Date} date2
		 * @returns {boolean}
		 */
		isEqual: function(date1, date2) {
			return DX.Date.isEqualMonth(date1, date2) &&
				DX.Date.isEqualYear(date1, date2) &&
				date1.getDate() === date2.getDate();
		},

		/**
		 * @param {Date} date1
		 * @param {Date} date2
		 * @returns {boolean}
		 */
		isGreaterYear: function(date1, date2) {
			return date1.getFullYear() >  date2.getFullYear();
		},

		/**
		 * @param {Date} date1
		 * @param {Date} date2
		 * @returns {boolean}
		 */
		isLessYear: function(date1, date2) {
			return DX.Date.isGreaterYear(date2, date1);
		},

		/**
		 * @param {Date} date1
		 * @param {Date} date2
		 * @returns {boolean}
		 */
		isGreaterMonth: function(date1, date2) {
			var year1 = date1.getFullYear(),
				year2 = date2.getFullYear();

			return (year1 > year2) ||
				(year1 === year2 && date1.getMonth() > date2.getMonth());
		},

		/**
		 * @param {Date} date1
		 * @param {Date} date2
		 * @returns {boolean}
		 */
		isLessMonth: function(date1, date2) {
			return DX.Date.isGreaterMonth(date2, date1);
		},

		/**
		 * @param {Date} date1
		 * @param {Date} date2
		 * @returns {boolean}
		 */
		isGreater: function(date1, date2) {
			date1 = DX.Date.clone(date1);
			date2 = DX.Date.clone(date2);

			DX.Date.setMidnight(date1);
			DX.Date.setMidnight(date2);

			return date1.getTime() > date2.getTime();
		},

		/**
		 * @param {Date} date1
		 * @param {Date} date2
		 * @returns {boolean}
		 */
		isLess: function(date1, date2) {
			return DX.Date.isGreater(date2, date1);
		},

		/**
		 * @param {Date} date
		 * @returns {Date}
		 */
		decrementMonth: function(date) {
			date = DX.Date.clone(date);
			date.setMonth(date.getMonth() - 1);

			return date;
		},

		/**
		 * @param {Date} date
		 * @returns {Date}
		 */
		incrementMonth: function(date) {
			date = DX.Date.clone(date);

			date.setMonth(date.getMonth() + 1);

			return date;
		},

		/**
		 * @param {Date} date
		 */
		setMidnight: function(date) {
			date.setHours(0);
			date.setMinutes(0);
			date.setSeconds(0);
			date.setMilliseconds(0);
		},

		/**
		 * @param {Date} date
		 * @returns {String}
		 */
		toShortISOString: function(date) {
			var hours,
				offsetHours;

			date = DX.Date.clone(date);
			hours = date.getHours();
			offsetHours = date.getTimezoneOffset() / 60;

			date.setHours(hours - offsetHours);

			return date.toISOString().substr(0,10);
		},

		weekDay: {
			SUNDAY: 0,
			MONDAY: 1,
			TUESDAY: 2,
			WEDNESDAY: 3,
			THURSDAY: 4,
			FRIDAY: 5,
			SATURDAY: 6
		},

		month: {
			JANUARY: 0,
			FEBRUARY: 1,
			MARCH: 2,
			APRIL: 3,
			MAY: 4,
			JUNE: 5,
			JULY: 6,
			AUGUST: 7,
			SEPTEMBER: 8,
			OCTOBER: 9,
			NOVEMBER: 10,
			DECEMBER: 11
		}
	};
})(DX, window, document);