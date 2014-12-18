describe('DX.Tmpl', function() {
	describe('#process()', function() {
		it('should replace keys in the string passed with fileds of the object passed', function() {
			var template = '{%= x %} equals 1, {%= y %} equals 0',
				data = {x: 'x', y: 'y'};

			expect(DX.Tmpl.process(template, data)).toBe('x equals 1, y equals 0');
		});

		it('should process multiple entries of the same key', function() {
			var template = '{%= x %} equals 1, or {%= x %} equals 0',
				data = {x: 'x', y: 'y'};

			expect(DX.Tmpl.process(template, data)).toBe('x equals 1, or x equals 0');
		});

		it('should leave the string passed as is, if there\'s no keys in it', function() {
			var template = 'x equals 1, y equals 0',
				data = {x: 'x', y: 'y'};

			expect(DX.Tmpl.process(template, data)).toBe(template);
		});

		it('should replace keys with empty string in the string passed as is, if there\'s no match', function() {
			var template = '{%= x %} equals 1, {%= y %} equals 0',
				data = {};

			expect(DX.Tmpl.process(template, data)).toBe(' equals 1,  equals 0');
		});
	});
});