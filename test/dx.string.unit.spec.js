import dxString from '../src/dx.string';

describe('DX.String', function() {
	describe('#hyphenate()', function() {
		it('should hyphenate the string in camel case', function() {
			expect(dxString.hyphenate('fontSize')).toBe('font-size');
		});
		it('should hyphenate the string that starts with a capital letter correctly', function() {
			expect(dxString.hyphenate('MozBoxSizing')).toBe('-moz-box-sizing');
		});
		it('should leave the string without camel case as is', function() {
			expect(dxString.hyphenate('border-radius')).toBe('border-radius');
		});
	});

	describe('#dasherize', function() {
		it('should dasherize the string in camel case', function() {
			expect(dxString.dasherize('fontSize')).toBe('font-size');
		});
		it('should dasherize the string that starts with a capital letter correctly', function() {
			expect(dxString.hyphenate('MozBoxSizing')).toBe('-moz-box-sizing');
		});
		it('should leave the string without camel case as is', function() {
			expect(dxString.dasherize('border-radius')).toBe('border-radius');
		});
	});

	describe('#camelize()', function() {
		it('should camelize the string with hyphens', function() {
			expect(dxString.camelize('font-size')).toBe('fontSize');
		});
		it('should camelize the string that starts with hyphen correctly', function() {
			expect(dxString.camelize('-moz-box-sizing', false)).toBe('MozBoxSizing');
		});
		it('should leave the string without hyphens as is', function() {
			expect(dxString.camelize('DragAndDrop', false)).toBe('DragAndDrop');
		});
	});
	describe('#createRandomId()', function() {
		it('should generate random id without prefix or postfix passed', function() {
			expect(dxString.createRandomId()).not.toBe(dxString.createRandomId());
			expect(/^\d+$/.test(dxString.createRandomId())).toBeTruthy();
		});

		it('should generate random id with prefix passed', function() {
			expect(/^rnd\d+$/.test(dxString.createRandomId('rnd'))).toBeTruthy();
		});

		it('should generate random id with postfix passed', function() {
			expect(/^\d+rnd$/.test(dxString.createRandomId('', 'rnd'))).toBeTruthy();
		});
	});

	describe('#capitalize()', function() {
		it('should capitalize the string', function() {
			expect(dxString.capitalize('capital')).toBe('Capital');
		});
		it('should capitalize the multi-words string', function() {
			expect(dxString.capitalize('capital of russia is moscow')).toBe('Capital of russia is moscow');
		});
		it('should capitalize leave capital letters in the middle as is', function() {
			expect(dxString.capitalize('capital of Russia is Moscow')).toBe('Capital of Russia is Moscow');
		});
		it('should work normally with strings starting with numbers, spaces, special symbols', function() {
			expect(dxString.capitalize('1capital')).toBe('1capital');
			expect(dxString.capitalize('_capital')).toBe('_capital');
			expect(dxString.capitalize('$capital')).toBe('$capital');
			expect(dxString.capitalize('&capital')).toBe('&capital');
			expect(dxString.capitalize(' capital')).toBe(' capital');
		});
	});
});