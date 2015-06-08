import '../src/dx.core';

describe('DX', function() {
	beforeEach(function() {
		document.body.innerHTML = [
			'<div id="test">',
				'<span id="test1" class="loki evil"></span>',
				'<a href="#" id="test2" class="thor shield"></span>',
				'<div id="test3" data-looks-like="Jekyll and Hyde" class="hulk shield"></div>',
			'</div>'
		].join('');
	});
	afterEach(function() {
		document.body.innerHTML = '';
	});

	describe('#$()', function() {
		it('should select element by the id passed', function() {
			expect(DX.$('test')).not.toBeNull();
			expect(DX.$('test')).toBe(document.getElementById('test'));
		});

		it('should return null, it there\'s no element with the id passed', function() {
			expect(DX.$('test42')).toBeNull();
		});

		it('should return element if it\'s passed', function() {
			var element = document.getElementById('test');

			expect(DX.$(element)).toBe(element);
		});

		it('should return null, if argument is neither an element nor a string', function() {
			expect(DX.$({})).toBeNull();
			expect(DX.$([])).toBeNull();
			expect(DX.$(document.createComment(''))).toBeNull();
		});
	});

	describe('#$$()', function() {
		it('should return element that corresponds to the selector passed', function() {
			expect(DX.$$('div')).toBe(document.querySelector('div'));
			expect(DX.$$('#test1')).toBe(document.querySelector('#test1'));
			expect(DX.$$('.loki')).toBe(document.querySelector('.loki'));
			expect(DX.$$('.thor.shield')).toBe(document.querySelector('.thor.shield'));
			expect(DX.$$('[href]')).toBe(document.querySelector('[href]'));
			expect(DX.$$('[data-looks-like="Jekyll and Hyde"]')).toBe(document.querySelector('[data-looks-like="Jekyll and Hyde"]'));
		});

		it('should return null, if there\'s no element corresponding to the selector passed', function() {
			expect(DX.$$('input')).toBeNull();
			expect(DX.$$('#test42')).toBeNull();
			expect(DX.$$('.loki.shield')).toBeNull();
			expect(DX.$$('[data-href]')).toBeNull();
		});

		it('should return first element that corresponds to the selector passed', function() {
			expect(DX.$$('.shield')).toBe(document.getElementById('test2'));
		});

		it('should only search in root element if passed', function() {
			expect(DX.$$('div', document.querySelector('div'))).toBe(document.getElementById('test3'));
		});
	});

	describe('#$$$()', function() {
		it('should return list of nodes that correspond to the selector passed', function() {
			var list = DX.$$$('div');

			expect(list.length).toBeDefined();
			expect(list.length).toBe(2);
			expect(list[0]).toBe(document.getElementById('test'));
			expect(list[1]).toBe(document.getElementById('test3'));
		});


		it('should only search in root element if passed', function() {
			var list = DX.$$$('div', document.querySelector('div'));

			expect(list.length).toBe(1);
			expect(list[0]).toBe(document.getElementById('test3'));
		});
	});

	describe('#isDefined()', function() {
		it('should return false if arg is undefined or null', function() {
			(function(undefined) {
				var undef,
						undef2 = undefined,
						nul = null,
						x = {
							a: 1
						};

				delete x.a;

				expect(DX.isDefined()).toBeFalsy('');
				expect(DX.isDefined(undefined)).toBeFalsy('undefined');
				expect(DX.isDefined(undef)).toBeFalsy('undef');
				expect(DX.isDefined(undef2)).toBeFalsy('undef2');
				expect(DX.isDefined(null)).toBeFalsy('null');
				expect(DX.isDefined(nul)).toBeFalsy('nul');
				expect(DX.isDefined(x.a)).toBeFalsy('x.a');
			})();
		});

		it('should return true in other cases', function() {
			expect(DX.isDefined('')).toBeTruthy('""');
			expect(DX.isDefined(0)).toBeTruthy('0');
			expect(DX.isDefined(false)).toBeTruthy('false');
			expect(DX.isDefined({})).toBeTruthy('{}');
			expect(DX.isDefined([])).toBeTruthy('[]');
		});
	});
});