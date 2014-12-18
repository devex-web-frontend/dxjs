describe('DX.Date', function() {
	describe('#isEqualYear', function() {
		it('should return true if arguments are dates of one year', function() {
			var date1 = new Date('2013/01/01'),
				date2 = new Date('2013/12/31'),
				date3 = new Date('2012/12/31');

			expect(DX.Date.isEqualYear(date1, date2)).toBe(true);
			expect(DX.Date.isEqualYear(date1, date3)).toBe(false);
			expect(DX.Date.isEqualYear(date3, date2)).toBe(false);
		});
	});

	it('should return true if arguments are dates of one month', function() {
		var date1 = new Date('2013/12/01'),
			date2 = new Date('2013/12/31'),
			date3 = new Date('2012/12/31'),
			date4 = new Date('2013/11/30');

		expect(DX.Date.isEqualMonth(date1, date2)).toBe(true);
		expect(DX.Date.isEqualMonth(date1, date3)).toBe(false);
		expect(DX.Date.isEqualMonth(date3, date2)).toBe(false);
		expect(DX.Date.isEqualMonth(date1, date4)).toBe(false);
		expect(DX.Date.isEqualMonth(date2, date4)).toBe(false);
		expect(DX.Date.isEqualMonth(date3, date4)).toBe(false);
	});

	describe('#isEqual', function() {
		it('should return true if arguments are equal dates', function() {
			var date1 = new Date('2013/12/01 00:00'),
				date2 = new Date('2013/12/01 13:30'),
				date3 = new Date('2012/11/30 23:59'),
				date4 = new Date('2013/12/02 00:01');

			expect(date1).not.toBe(date2);
			expect(DX.Date.isEqual(date1, date2)).toBe(true);

			expect(DX.Date.isEqual(date1, date3)).toBe(false);
			expect(DX.Date.isEqual(date3, date2)).toBe(false);
			expect(DX.Date.isEqual(date1, date4)).toBe(false);
			expect(DX.Date.isEqual(date2, date4)).toBe(false);
			expect(DX.Date.isEqual(date3, date4)).toBe(false);
		});
	});

	describe('#clone', function() {
		it('should clone date object', function() {
			var date = new Date(new Date('2012/02/01 18:00')),
				clone = DX.Date.clone(date);

			date.setMonth(3);

			expect(clone.getMonth()).toBe(1);
		});
	});

	describe('#decrementMonth', function() {
		it('should decrement month', function() {
			var date = new Date('2013/12/01'),
				prevMonthDate;

			prevMonthDate = DX.Date.decrementMonth(date);

			expect(prevMonthDate.getMonth()).toBe(10);
		});

		it('should decrement year if current month is january', function() {
			var date = new Date('2013/01/01'),
				prevMonthDate;

			prevMonthDate = DX.Date.decrementMonth(date);

			expect(prevMonthDate.getFullYear()).toBe(2012);
		});
	});

	describe('#incrementMonth', function() {
		it('should increment month', function() {
			var date = new Date('2013/01/01'),
				nextMonthDate;

			nextMonthDate = DX.Date.incrementMonth(date);

			expect(nextMonthDate.getMonth()).toBe(1);
		});

		it('should increment year if current month is december', function() {
			var date = new Date('2013/12/10'),
				nextMonthDate;

			nextMonthDate = DX.Date.incrementMonth(date);

			expect(nextMonthDate.getFullYear()).toBe(2014);
		});
	});

	describe('#isGreaterYear', function() {
		it('should return true if year contains in first argument follows after year contains in second argument', function() {
			var date1 = new Date('2012/12/31 23:59'),
				date2 = new Date('2013/01/01 00:00'),
				date3 = new Date('2011/01/15 00:00');

			expect(DX.Date.isGreaterYear(date1, date2)).toBe(false);
			expect(DX.Date.isGreaterYear(date2, date3)).toBe(true);
		});
	});

	describe('#isLessYear', function() {
		it('should return true if year contains in second argument follows after year contains in first argument', function() {
			var date1 = new Date('2012/12/31 23:59'),
				date2 = new Date('2013/01/01 00:00'),
				date3 = new Date('2011/01/15 00:00');

			expect(DX.Date.isLessYear(date3, date1)).toBe(true);
			expect(DX.Date.isLessYear(date2, date3)).toBe(false);
		});
	});

	describe('#isGreaterMonth', function() {
		it('should return true if month contains in first argument follows after month contains in second argument', function() {
			var date1 = new Date('2012/02/15 15:00'),
				date2 = new Date('2012/01/16 15:00'),
				date3 = new Date('2011/01/15 00:00');

			expect(DX.Date.isGreaterMonth(date1, date2)).toBe(true);
			expect(DX.Date.isGreaterMonth(date3, date2)).toBe(false);
		});
	});

	describe('#isLessMonth', function() {
		it('should return true if month contains in second argument follows after month contains in first argument', function() {
			var date1 = new Date('2012/02/15 15:00'),
				date2 = new Date('2012/01/16 15:00'),
				date3 = new Date('2012/01/15 00:00');

			expect(DX.Date.isLessMonth(date2, date1)).toBe(true);
			expect(DX.Date.isLessMonth(date3, date2)).toBe(false);
		});
	});

	describe('#isGreater', function() {
		it('should return true if date contains in first argument follows after date contains in second argument', function() {
			var date1 = new Date('2012/01/02 00:00'),
				date2 = new Date('2012/01/01 23:59'),
				date3 = new Date('2012/01/02 00:05');

			expect(DX.Date.isGreater(date1, date2)).toBe(true);
			expect(DX.Date.isGreater(date1, date3)).toBe(false);
		});
	});

	describe('#isLess', function() {
		it('should return true if date contains in second argument follows before date contains in first argument', function() {
			var date1 = new Date('2012/01/02 00:00'),
				date2 = new Date('2012/01/01 23:59'),
				date3 = new Date('2012/01/02 00:05');

			expect(DX.Date.isLess(date2, date1)).toBe(true);
			expect(DX.Date.isLess(date1, date3)).toBe(false);
		});
	});

	describe('#setMidnight', function() {
		it('should reset date to day start time (00:00:00:000)', function() {
			var date = new Date();

			DX.Date.setMidnight(date);

			expect(date.getHours()).toBe(0);
			expect(date.getMinutes()).toBe(0);
			expect(date.getSeconds()).toBe(0);
			expect(date.getMilliseconds()).toBe(0);
		})
	});

	describe('#toShortISOString', function() {
		it('should convert and return short ISO string of date provided', function() {
			var date = new Date('2012/08/16');

			expect(DX.Date.toShortISOString(date)).toBe('2012-08-16');
		})
	});

	describe('#isDate', function() {
		it('should return true only if argument instance of Date', function() {
			expect(DX.Date.isDate('asd')).toBe(false);
			expect(DX.Date.isDate(12)).toBe(false);
			expect(DX.Date.isDate({})).toBe(false);
			expect(DX.Date.isDate([])).toBe(false);
			expect(DX.Date.isDate(function(){})).toBe(false);
			expect(DX.Date.isDate(null)).toBe(false);
			expect(DX.Date.isDate(undefined)).toBe(false);
			expect(DX.Date.isDate(new Date())).toBe(true);
			expect(DX.Date.isDate(new Date(1961, 3, 12))).toBe(true);
		});
	});

	describe('Constants', function() {
		describe('Week says', function() {
			expect(DX.Date.weekDay.SUNDAY).toBe(0);
			expect(DX.Date.weekDay.MONDAY).toBe(1);
			expect(DX.Date.weekDay.TUESDAY).toBe(2);
			expect(DX.Date.weekDay.WEDNESDAY).toBe(3);
			expect(DX.Date.weekDay.THURSDAY).toBe(4);
			expect(DX.Date.weekDay.FRIDAY).toBe(5);
			expect(DX.Date.weekDay.SATURDAY).toBe(6);
		});

		describe('Months', function() {
			expect(DX.Date.month.JANUARY).toBe(0);
			expect(DX.Date.month.FEBRUARY).toBe(1);
			expect(DX.Date.month.MARCH).toBe(2);
			expect(DX.Date.month.APRIL).toBe(3);
			expect(DX.Date.month.MAY).toBe(4);
			expect(DX.Date.month.JUNE).toBe(5);
			expect(DX.Date.month.JULY).toBe(6);
			expect(DX.Date.month.AUGUST).toBe(7);
			expect(DX.Date.month.SEPTEMBER).toBe(8);
			expect(DX.Date.month.OCTOBER).toBe(9);
			expect(DX.Date.month.NOVEMBER).toBe(10);
			expect(DX.Date.month.DECEMBER).toBe(11);
		});
	});
});