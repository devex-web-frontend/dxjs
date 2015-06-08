'use strict';

/**
 * @copyright Devexperts
 */

import './dx.core';

export default window.DX.Date = {
	/**
	 * Check is passed variable is date object
	 * @param {Date} date
	 * @returns {boolean}
	 */
	isDate (date) {
		return (date instanceof Date) && !isNaN(date.valueOf());
	},

	/**
	 * Clones passed date and return new date object
	 * @param {Date} date
	 * @returns {Date}
	 */
	clone (date) {
		return new Date(date);
	},

	/**
	 * Compare years two dates
	 * @param {Date} date1
	 * @param {Date} date2
	 * @returns {boolean}
	 */
	isEqualYear (date1, date2) {
		return date1.getFullYear() === date2.getFullYear();
	},

	/**
	 * Compare month passed dates
	 * @param {Date} date1
	 * @param {Date} date2
	 * @returns {boolean}
	 */
	isEqualMonth (date1, date2) {
		return this.isEqualYear(date1, date2) && date1.getMonth() === date2.getMonth();
	},

	/**
	 * Compare passed dates
	 * @param {Date} date1
	 * @param {Date} date2
	 * @returns {boolean}
	 */
	isEqual (date1, date2) {
		return this.isEqualMonth(date1, date2) &&
			this.isEqualYear(date1, date2) &&
			date1.getDate() === date2.getDate();
	},

	/**
	 * Check if the year first date  greater than a year the second date
	 * @param {Date} date1
	 * @param {Date} date2
	 * @returns {boolean}
	 */
	isGreaterYear (date1, date2) {
		return date1.getFullYear() > date2.getFullYear();
	},
	/**
	 * Check if the year first date  less than a year the second date
	 * @param {Date} date1
	 * @param {Date} date2
	 * @returns {boolean}
	 */
	isLessYear (date1, date2) {
		return this.isGreaterYear(date2, date1);
	},

	/**
	 * Check if the month first date greater than a month the second date
	 * @param {Date} date1
	 * @param {Date} date2
	 * @returns {boolean}
	 */
	isGreaterMonth (date1, date2) {
		let year1 = date1.getFullYear();
		let year2 = date2.getFullYear();

		return (year1 > year2) ||
			(year1 === year2 && date1.getMonth() > date2.getMonth());
	},

	/**
	 * Check if the month first date less than a month the second date
	 * @param {Date} date1
	 * @param {Date} date2
	 * @returns {boolean}
	 */
	isLessMonth (date1, date2) {
		return this.isGreaterMonth(date2, date1);
	},

	/**
	 * Check if the first date greater the second date
	 * @param {Date} date1
	 * @param {Date} date2
	 * @returns {boolean}
	 */
	isGreater (date1, date2) {
		date1 = this.clone(date1);
		date2 = this.clone(date2);

		this.setMidnight(date1);
		this.setMidnight(date2);

		return date1.getTime() > date2.getTime();
	},

	/**
	 * Check if the first date less the second date
	 * @param {Date} date1
	 * @param {Date} date2
	 * @returns {boolean}
	 */
	isLess (date1, date2) {
		return this.isGreater(date2, date1);
	},

	/**
	 * Decreases specified date by one month
	 * @param {Date} date
	 * @returns {Date}
	 */
	decrementMonth (date) {
		date = this.clone(date);
		date.setMonth(date.getMonth() - 1);

		return date;
	},

	/**
	 * Increases specified date by one month
	 * @param {Date} date
	 * @returns {Date}
	 */
	incrementMonth (date) {
		date = this.clone(date);

		date.setMonth(date.getMonth() + 1);

		return date;
	},

	/**
	 * Sets midnight for specified date
	 * @param {Date} date
	 */
	setMidnight (date) {
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
	},

	/**
	 * Convert date to string in iso format
	 * @param {Date} date
	 * @returns {String}
	 */
	toShortISOString (date) {
		let hours;
		let offsetHours;

		date = this.clone(date);
		hours = date.getHours();
		offsetHours = date.getTimezoneOffset() / 60;

		date.setHours(hours - offsetHours);

		return date.toISOString().substr(0, 10);
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
