describe('DX.Bem', function() {
	describe('#createModifiedClassName()', function() {
		it('should work with array of modifiers', function() {
			var className = DX.Bem.createModifiedClassName('base', ['mod1', 'mod2']);
			expect(className.replace(/[\s]+/g, ' ')).toBe('base base-mod1 base-mod2')
		});

		it('should work with one modifier (passed as string)', function() {
			var className = DX.Bem.createModifiedClassName('base', 'mod1');

			expect(className.replace(/[\s]+/g, ' ')).toBe('base base-mod1')
		});

		it('should work when second argument omitted', function() {
			var className = DX.Bem.createModifiedClassName('base');

			expect(className).toBe('base')
		})
	});

	describe('#addModifier()', function() {
		it('should add modifier with provided baseClassName and modifier', function() {
			var element = document.createElement("div");

			DX.Bem.addModifier(element, 'mod1', 'base');

			expect(element.classList.contains('base-mod1')).toBe(true);

		});

		it('should check if block has baseClassName and add it if doesn\'t exist', function() {
			var element = document.createElement("div");

			DX.Bem.addModifier(element, 'mod1', 'base');

			expect(element.classList.contains('base')).toBe(true);

		});

		it('should check if baseClassName is passed, if not add modifier to block baseClassNames', function() {
			var element = document.createElement("div");
			element.classList.add('base');
			element.classList.add('base2');

			DX.Bem.addModifier(element, 'mod1');

			expect(element.classList.contains('base-mod1')).toBe(true);
			expect(element.classList.contains('base2-mod1')).toBe(true);
		});

		it('should not add modifier to classes with modifier', function() {
			var element = document.createElement("div");
			element.classList.add('base');
			element.classList.add('base-mod2');

			DX.Bem.addModifier(element, 'mod1');

			expect(element.classList.contains('base-mod1')).toBe(true);
			expect(element.classList.contains('base-mod2-mod1')).toBe(false);

		});

		it('should add modifier to element', function() {
			var element = document.createElement("div");

			DX.Bem.addModifier(element, 'mod1', 'base--element');

			expect(element.classList.contains('base--element-mod1')).toBe(true);
		});

		it('should add modifier to element if baseClassName is omitted', function() {
			var element = document.createElement("div");
			element.classList.add('base--element');

			DX.Bem.addModifier(element, 'mod1');

			expect(element.classList.contains('base--element-mod1')).toBe(true);
		});
	});
	describe('#removeModifier()', function() {
		it('should remove className with provided baseClassName and modifier', function() {
			var element = document.createElement("div");
			element.classList.add('base');
			element.classList.add('base-mod1');

			DX.Bem.removeModifier(element, 'mod1', 'base');

			expect(element.classList.contains('base')).toBe(true);
			expect(element.classList.contains('base-mod1')).toBe(false);
		});

		it('should remove all classNames with provided modifier', function() {
			var element = document.createElement("div");
			element.classList.add('base');
			element.classList.add('base-mod1');
			element.classList.add('base2');
			element.classList.add('base2-mod1');
			element.classList.add('base2-mod2');

			DX.Bem.removeModifier(element, 'mod1');

			expect(element.classList.contains('base')).toBe(true);
			expect(element.classList.contains('base-mod1')).toBe(false);
			expect(element.classList.contains('base2-mod1')).toBe(false);
			expect(element.classList.contains('base2-mod2')).toBe(true);
		});

		it('should remove modifier from element', function() {
			var element = document.createElement("div");
			element.classList.add('base--element-mod1');

			DX.Bem.removeModifier(element, 'mod1', 'base--element');

			expect(element.classList.contains('base--element-mod1')).toBe(false);
		});

		it('should remove modifier from element if baseClassName is omitted', function() {
			var element = document.createElement("div");
			element.classList.add('base--element-mod1');

			DX.Bem.removeModifier(element, 'mod1');

			expect(element.classList.contains('base--element-mod1')).toBe(false);
		});


		it('should remove className which ends exactly with modifier, if there\'s no baseClassName provided', function() {
			var element = document.createElement("div");
			element.classList.add('base--element-mod123');

			DX.Bem.removeModifier(element, 'mod1');

			expect(element.classList.contains('base--element-mod123')).toBe(true);
		})
	});
	describe('#hasModifier()', function() {
		it('should test if block has className with provided modifier and baseClassName', function() {
			var element = document.createElement("div");
			element.classList.add('base-mod1');

			expect(DX.Bem.hasModifier(element, 'mod1', 'base')).toBe(true);
			expect(DX.Bem.hasModifier(element, 'mod1', 'base2')).toBe(false);
		});

		it('should test if any block\'s className has provided modifier', function() {
			var element = document.createElement("div");
			element.classList.add('base');
			element.classList.add('base-mod1');
			element.classList.add('base2-mod1');
			element.classList.add('base2-mod2');

			expect(DX.Bem.hasModifier(element, 'mod1')).toBe(true);
			expect(DX.Bem.hasModifier(element, 'mod3')).toBe(false);
		});

		it('should test if element has className with provided modifier and baseClassName', function() {
			var element = document.createElement("div");
			element.classList.add('base--element-mod1');

			expect(DX.Bem.hasModifier(element, 'mod1', 'base--element')).toBe(true);
		});

		it('should test if element has className with provided modifier if baseClassName is omitted', function() {
			var element = document.createElement("div");
			element.classList.add('base--element-mod1');

			expect(DX.Bem.hasModifier(element, 'mod1')).toBe(true);
		});

		it('should test that className ends with modifier, if there\'s no className', function() {
			var element = document.createElement("div");
			element.classList.add('base--element-mod123');

			expect(DX.Bem.hasModifier(element, 'mod1')).toBe(false);
		})
	});
});