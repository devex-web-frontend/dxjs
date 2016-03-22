import dxCore from '../src/dx.core';

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
			expect(dxCore.$('test')).not.toBeNull();
			expect(dxCore.$('test')).toBe(document.getElementById('test'));
		});

		it('should return null, it there\'s no element with the id passed', function() {
			expect(dxCore.$('test42')).toBeNull();
		});

		it('should return element if it\'s passed', function() {
			var element = document.getElementById('test');

			expect(dxCore.$(element)).toBe(element);
		});

		it('should return null, if argument is neither an element nor a string', function() {
			expect(dxCore.$({})).toBeNull();
			expect(dxCore.$([])).toBeNull();
			expect(dxCore.$(document.createComment(''))).toBeNull();
		});
	});

	describe('#$$()', function() {
		it('should return element that corresponds to the selector passed', function() {
			expect(dxCore.$$('div')).toBe(document.querySelector('div'));
			expect(dxCore.$$('#test1')).toBe(document.querySelector('#test1'));
			expect(dxCore.$$('.loki')).toBe(document.querySelector('.loki'));
			expect(dxCore.$$('.thor.shield')).toBe(document.querySelector('.thor.shield'));
			expect(dxCore.$$('[href]')).toBe(document.querySelector('[href]'));
			expect(dxCore.$$('[data-looks-like="Jekyll and Hyde"]')).toBe(
				document.querySelector('[data-looks-like="Jekyll and Hyde"]')
			);
		});

		it('should return null, if there\'s no element corresponding to the selector passed', function() {
			expect(dxCore.$$('input')).toBeNull();
			expect(dxCore.$$('#test42')).toBeNull();
			expect(dxCore.$$('.loki.shield')).toBeNull();
			expect(dxCore.$$('[data-href]')).toBeNull();
		});

		it('should return first element that corresponds to the selector passed', function() {
			expect(dxCore.$$('.shield')).toBe(document.getElementById('test2'));
		});

		it('should only search in root element if passed', function() {
			expect(dxCore.$$('div', document.querySelector('div'))).toBe(document.getElementById('test3'));
		});
	});

	describe('#$$$()', function() {
		it('should return list of nodes that correspond to the selector passed', function() {
			var list = dxCore.$$$('div');

			expect(list.length).toBeDefined();
			expect(list.length).toBe(2);
			expect(list[0]).toBe(document.getElementById('test'));
			expect(list[1]).toBe(document.getElementById('test3'));
		});

		it('should only search in root element if passed', function() {
			var list = dxCore.$$$('div', document.querySelector('div'));

			expect(list.length).toBe(1);
			expect(list[0]).toBe(document.getElementById('test3'));
		});
	});

	describe('#isDefined()', function() {
		it('should return false if arg is undefined or null', function() {
			(function(undefined) {
				let undef;
				const undef2 = undefined;
				const nul = null;
				const x = {
					a: 1
				};

				delete x.a;

				expect(dxCore.isDefined()).toBeFalsy('');
				expect(dxCore.isDefined(undefined)).toBeFalsy('undefined');
				expect(dxCore.isDefined(undef)).toBeFalsy('undef');
				expect(dxCore.isDefined(undef2)).toBeFalsy('undef2');
				expect(dxCore.isDefined(null)).toBeFalsy('null');
				expect(dxCore.isDefined(nul)).toBeFalsy('nul');
				expect(dxCore.isDefined(x.a)).toBeFalsy('x.a');
			})();
		});

		it('should return true in other cases', function() {
			expect(dxCore.isDefined('')).toBeTruthy('""');
			expect(dxCore.isDefined(0)).toBeTruthy('0');
			expect(dxCore.isDefined(false)).toBeTruthy('false');
			expect(dxCore.isDefined({})).toBeTruthy('{}');
			expect(dxCore.isDefined([])).toBeTruthy('[]');
		});
	});
});