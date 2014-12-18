describe('DX.String', function() {
	describe('#hyphenate()', function() {
		it('should hyphenate the string in camel case', function() {
			expect(DX.String.hyphenate('fontSize')).toBe('font-size');
		});
		it('should hyphenate the string that starts with a capital letter correctly', function() {
			expect(DX.String.hyphenate('MozBoxSizing')).toBe('-moz-box-sizing');
		});
		it('should leave the string without camel case as is', function() {
			expect(DX.String.hyphenate('border-radius')).toBe('border-radius');
		});
	});
	describe('#camelize()', function() {
		it('should camelize the string with hyphens', function() {
			expect(DX.String.camelize('font-size')).toBe('fontSize');
		});
		it('should camelize the string that starts with hyphen correctly', function() {
			expect(DX.String.camelize('-moz-box-sizing')).toBe('MozBoxSizing');
		});
		it('should leave the string without hyphens as is', function() {
			expect(DX.String.camelize('DragAndDrop')).toBe('DragAndDrop');
		});
	});
	describe('#createRandomId()', function() {
		it('should generate random id without prefix or postfix passed', function() {
			expect(DX.String.createRandomId()).not.toBe(DX.String.createRandomId());
			expect(/^id_\d+_\d+$/.test(DX.String.createRandomId())).toBeTruthy();
		});

		it('should generate random id with prefix passed', function() {
			expect(/^rnd_\d+_\d+$/.test(DX.String.createRandomId('rnd'))).toBeTruthy();
		});

		it('should generate random id with postfix passed', function() {
			expect(/^id_\d+_\d+_rnd$/.test(DX.String.createRandomId(null, 'rnd'))).toBeTruthy();
		});
	});

	describe('#capitalize()', function() {
		it('should capitalize the string', function() {
			expect(DX.String.capitalize('capital')).toBe('Capital');
		});
		it('should capitalize the multi-words string', function() {
			expect(DX.String.capitalize('capital of russia is moscow')).toBe('Capital of russia is moscow');
		});
		it('should capitalize leave capital letters in the middle as is', function() {
			expect(DX.String.capitalize('capital of Russia is Moscow')).toBe('Capital of Russia is Moscow');
		});
		it('should work normally with strings starting with numbers, spaces, special symbols', function() {
			expect(DX.String.capitalize('1capital')).toBe('1capital');
			expect(DX.String.capitalize('_capital')).toBe('_capital');
			expect(DX.String.capitalize('$capital')).toBe('$capital');
			expect(DX.String.capitalize('&capital')).toBe('&capital');
			expect(DX.String.capitalize(' capital')).toBe(' capital');
		});
	});
});