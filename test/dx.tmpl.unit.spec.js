import dxTmpl from '../src/dx.tmpl';

describe('DX.Tmpl', function() {
	describe('#process()', function() {
		it('should replace keys in the string passed with fileds of the object passed', function() {
			const template = '{%= x %} equals 1, {%= y %} equals 0';
			const data = {x: 'x', y: 'y'};

			expect(dxTmpl.process(template, data)).toBe('x equals 1, y equals 0');
		});

		it('should process multiple entries of the same key', function() {
			const template = '{%= x %} equals 1, or {%= x %} equals 0';
			const data = {x: 'x', y: 'y'};

			expect(dxTmpl.process(template, data)).toBe('x equals 1, or x equals 0');
		});

		it('should leave the string passed as is, if there\'s no keys in it', function() {
			const template = 'x equals 1, y equals 0';
			const data = {x: 'x', y: 'y'};

			expect(dxTmpl.process(template, data)).toBe(template);
		});

		it('should replace keys with empty string in the string passed as is, if there\'s no match', function() {
			const template = '{%= x %} equals 1, {%= y %} equals 0';
			const data = {};

			expect(dxTmpl.process(template, data)).toBe(' equals 1,  equals 0');
		});
	});
});