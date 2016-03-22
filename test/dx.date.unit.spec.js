import dxDate from '../src/dx.date';

describe('DX.Date', function() {
	describe('#isEqualYear', function() {
		it('should return true if arguments are dates of one year', function() {
			const date1 = new Date('2013/01/01');
			const date2 = new Date('2013/12/31');
			const date3 = new Date('2012/12/31');

			expect(dxDate.isEqualYear(date1, date2)).toBe(true);
			expect(dxDate.isEqualYear(date1, date3)).toBe(false);
			expect(dxDate.isEqualYear(date3, date2)).toBe(false);
		});
	});

	it('should return true if arguments are dates of one month', function() {
		const date1 = new Date('2013/12/01');
		const date2 = new Date('2013/12/31');
		const date3 = new Date('2012/12/31');
		const date4 = new Date('2013/11/30');

		expect(dxDate.isEqualMonth(date1, date2)).toBe(true);
		expect(dxDate.isEqualMonth(date1, date3)).toBe(false);
		expect(dxDate.isEqualMonth(date3, date2)).toBe(false);
		expect(dxDate.isEqualMonth(date1, date4)).toBe(false);
		expect(dxDate.isEqualMonth(date2, date4)).toBe(false);
		expect(dxDate.isEqualMonth(date3, date4)).toBe(false);
	});

	describe('#isEqual', function() {
		it('should return true if arguments are equal dates', function() {
			const date1 = new Date('2013/12/01 00:00');
			const date2 = new Date('2013/12/01 13:30');
			const date3 = new Date('2012/11/30 23:59');
			const date4 = new Date('2013/12/02 00:01');

			expect(date1).not.toBe(date2);
			expect(dxDate.isEqual(date1, date2)).toBe(true);

			expect(dxDate.isEqual(date1, date3)).toBe(false);
			expect(dxDate.isEqual(date3, date2)).toBe(false);
			expect(dxDate.isEqual(date1, date4)).toBe(false);
			expect(dxDate.isEqual(date2, date4)).toBe(false);
			expect(dxDate.isEqual(date3, date4)).toBe(false);
		});
	});

	describe('#clone', function() {
		it('should clone date object', function() {
			const date = new Date(new Date('2012/02/01 18:00'));
			const clone = dxDate.clone(date);

			date.setMonth(3);

			expect(clone.getMonth()).toBe(1);
		});
	});

	describe('#decrementMonth', function() {
		it('should decrement month', function() {
			const date = new Date('2013/12/01');
			let prevMonthDate;

			prevMonthDate = dxDate.decrementMonth(date);

			expect(prevMonthDate.getMonth()).toBe(10);
		});

		it('should decrement year if current month is january', function() {
			const date = new Date('2013/01/01');
			let prevMonthDate;

			prevMonthDate = dxDate.decrementMonth(date);

			expect(prevMonthDate.getFullYear()).toBe(2012);
		});
	});

	describe('#incrementMonth', function() {
		it('should increment month', function() {
			const date = new Date('2013/01/01');
			let nextMonthDate;

			nextMonthDate = dxDate.incrementMonth(date);

			expect(nextMonthDate.getMonth()).toBe(1);
		});

		it('should increment year if current month is december', function() {
			const date = new Date('2013/12/10');
			let nextMonthDate;

			nextMonthDate = dxDate.incrementMonth(date);

			expect(nextMonthDate.getFullYear()).toBe(2014);
		});
	});

	describe('#isGreaterYear', function() {
		it('should return true if year contains in first argument follows after year contains in second argument',
			function() {
				const date1 = new Date('2012/12/31 23:59');
				const date2 = new Date('2013/01/01 00:00');
				const date3 = new Date('2011/01/15 00:00');

				expect(dxDate.isGreaterYear(date1, date2)).toBe(false);
				expect(dxDate.isGreaterYear(date2, date3)).toBe(true);
			});
	});

	describe('#isLessYear', function() {
		it('should return true if year contains in second argument follows after year contains in first argument',
			function() {
				const date1 = new Date('2012/12/31 23:59');
				const date2 = new Date('2013/01/01 00:00');
				const date3 = new Date('2011/01/15 00:00');

				expect(dxDate.isLessYear(date3, date1)).toBe(true);
				expect(dxDate.isLessYear(date2, date3)).toBe(false);
			});
	});

	describe('#isGreaterMonth', function() {
		it('should return true if month contains in first argument follows after month contains in second argument',
			function() {
				const date1 = new Date('2012/02/15 15:00');
				const date2 = new Date('2012/01/16 15:00');
				const date3 = new Date('2011/01/15 00:00');

				expect(dxDate.isGreaterMonth(date1, date2)).toBe(true);
				expect(dxDate.isGreaterMonth(date3, date2)).toBe(false);
			});
	});

	describe('#isLessMonth', function() {
		it('should return true if month contains in second argument follows after month contains in first argument',
			function() {
				const date1 = new Date('2012/02/15 15:00');
				const date2 = new Date('2012/01/16 15:00');
				const date3 = new Date('2012/01/15 00:00');

				expect(dxDate.isLessMonth(date2, date1)).toBe(true);
				expect(dxDate.isLessMonth(date3, date2)).toBe(false);
			});
	});

	describe('#isGreater', function() {
		it('should return true if date contains in first argument follows after date contains in second argument',
			function() {
				const date1 = new Date('2012/01/02 00:00');
				const date2 = new Date('2012/01/01 23:59');
				const date3 = new Date('2012/01/02 00:05');

				expect(dxDate.isGreater(date1, date2)).toBe(true);
				expect(dxDate.isGreater(date1, date3)).toBe(false);
			});
	});

	describe('#isLess', function() {
		it('should return true if date contains in second argument follows before date contains in first argument',
			function() {
				const date1 = new Date('2012/01/02 00:00');
				const date2 = new Date('2012/01/01 23:59');
				const date3 = new Date('2012/01/02 00:05');

				expect(dxDate.isLess(date2, date1)).toBe(true);
				expect(dxDate.isLess(date1, date3)).toBe(false);
			});
	});

	describe('#setMidnight', function() {
		it('should reset date to day start time (00:00:00:000)', function() {
			var date = new Date();

			dxDate.setMidnight(date);

			expect(date.getHours()).toBe(0);
			expect(date.getMinutes()).toBe(0);
			expect(date.getSeconds()).toBe(0);
			expect(date.getMilliseconds()).toBe(0);
		});
	});

	describe('#toShortISOString', function() {
		it('should convert and return short ISO string of date provided', function() {
			var date = new Date('2012/08/16');

			expect(dxDate.toShortISOString(date)).toBe('2012-08-16');
		});
	});

	describe('#isDate', function() {
		it('should return true only if argument instance of Date', function() {
			expect(dxDate.isDate('asd')).toBe(false);
			expect(dxDate.isDate(12)).toBe(false);
			expect(dxDate.isDate({})).toBe(false);
			expect(dxDate.isDate([])).toBe(false);
			expect(dxDate.isDate(function() {
			})).toBe(false);
			expect(dxDate.isDate(null)).toBe(false);
			expect(dxDate.isDate(undefined)).toBe(false);
			expect(dxDate.isDate(new Date())).toBe(true);
			expect(dxDate.isDate(new Date(1961, 3, 12))).toBe(true);
		});
	});

	describe('Constants', function() {
		describe('Week says', function() {
			expect(dxDate.weekDay.SUNDAY).toBe(0);
			expect(dxDate.weekDay.MONDAY).toBe(1);
			expect(dxDate.weekDay.TUESDAY).toBe(2);
			expect(dxDate.weekDay.WEDNESDAY).toBe(3);
			expect(dxDate.weekDay.THURSDAY).toBe(4);
			expect(dxDate.weekDay.FRIDAY).toBe(5);
			expect(dxDate.weekDay.SATURDAY).toBe(6);
		});

		describe('Months', function() {
			expect(dxDate.month.JANUARY).toBe(0);
			expect(dxDate.month.FEBRUARY).toBe(1);
			expect(dxDate.month.MARCH).toBe(2);
			expect(dxDate.month.APRIL).toBe(3);
			expect(dxDate.month.MAY).toBe(4);
			expect(dxDate.month.JUNE).toBe(5);
			expect(dxDate.month.JULY).toBe(6);
			expect(dxDate.month.AUGUST).toBe(7);
			expect(dxDate.month.SEPTEMBER).toBe(8);
			expect(dxDate.month.OCTOBER).toBe(9);
			expect(dxDate.month.NOVEMBER).toBe(10);
			expect(dxDate.month.DECEMBER).toBe(11);
		});
	});
});