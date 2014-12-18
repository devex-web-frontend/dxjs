describe('DX.Dom', function() {
	describe('#createElement()', function() {
		beforeEach(function() {});
		afterEach(function() {
			document.body.innerHTML = '';
		});

		it('should create element with given tagName', function() {
			document.body.appendChild(DX.Dom.createElement('div'));

			expect(document.querySelectorAll('div').length).toBe(1);
		});

		it('should create element with given tagName and ID', function() {
			var testEl = DX.Dom.createElement('span', {
				id: 'lib'
			});

			document.body.appendChild(testEl);

			expect(document.querySelectorAll('span#lib').length).toBe(1);
			expect(document.getElementById('lib')).toBe(testEl);
		});

		it('should create element with given tagName and className', function() {
			document.body.appendChild(DX.Dom.createElement('span', {
				className: 'jquery'
			}));

			expect(document.querySelectorAll('span.jquery').length).toBe(1);
		});

		it('should create element with given tagName and className (className passed as "class")', function() {
			document.body.appendChild(DX.Dom.createElement('span', {
				'class': 'jquery'
			}));

			expect(document.querySelectorAll('span.jquery').length).toBe(1);
		});

		it('should create element with given tagName and className (className passed as an array)', function() {
			document.body.appendChild(DX.Dom.createElement('span', {
				className: [
					'jquery',
					'spine'
				]
			}));

			expect(document.querySelectorAll('span.jquery.spine').length).toBe(1);
		});

		it('should create element with given tagName and innerHTML', function() {
			var testHtml = '<b>aaaa <i>bbb</i></b>',
				testEl = DX.Dom.createElement('span', {
					innerHTML: testHtml
				});

			document.body.appendChild(testEl);

			expect(testEl.innerHTML).toBe(testHtml);
		});

		it('should create element with given tagName and innerHTML (innerHTML passed as "html")', function() {
			var testHtml = '<b>aaaa <i>bbb</i></b>',
				testEl = DX.Dom.createElement('span', {
					'html': testHtml
				});

			document.body.appendChild(testEl);

			expect(testEl.innerHTML).toBe(testHtml);
		});

		it('should create element with given tagName and innerHTML (innerHTML passed as an array)', function() {
			var testHtml = [
					'<b>aaaa',
					'<i>bbb</i>',
					'</b>'
				],
				testEl = DX.Dom.createElement('span', {
					'html': testHtml
				});

			document.body.appendChild(testEl);

			expect(testEl.innerHTML).toBe(testHtml.join(''));
		});

		it('should create element with given tagName and htmlFor', function() {
			document.body.appendChild(DX.Dom.createElement('label', {
				htmlFor: 'SomeID'
			}));

			expect(document.querySelectorAll('label[for="SomeID"]').length).toBe(1);
		});

		it('should create element with given tagName and htmlFor (htmlFor passed as "for")', function() {
			document.body.appendChild(DX.Dom.createElement('label', {
				'for': 'SomeID'
			}));

			expect(document.querySelectorAll('label[for="SomeID"]').length).toBe(1);
		});

		/* Required for old IE and Chrome versions */
		it('should use setAttribute() for setting type of button and input elements', function() {
			var args;
			(function(origMethod) {
				HTMLInputElement.prototype.setAttribute = function (key, value) {
					args = arguments;
					return origMethod.call(this, key, value);
				};
			})(HTMLInputElement.prototype.setAttribute);

			document.body.appendChild(DX.Dom.createElement('input', {
				'type': 'checkbox'
			}));

			expect(args).toEqual(['type', 'checkbox']);
			expect(document.querySelectorAll('input[type="checkbox"]').length).toBe(1);
		});
	});
	
	describe('#getParent', function() {
		var parent = document.createElement('div'),
			child = document.createElement('span');

		parent.appendChild(child);

		expect(DX.Dom.getParent(child)).toEqual(parent);
		expect(DX.Dom.getParent(parent)).toBeNull();
	});

	describe('ascendant searching', function() {
		var wrapper, firstContainer, secondContainer,
			firstStartElement, secondStartElement, searchableElementByClassName,
			searchableElementByAttribute;


		beforeEach(function() {

			wrapper = document.createElement('div');
			firstContainer = document.createElement('div');
			secondContainer = document.createElement('div');
			firstStartElement = document.createElement('span');
			secondStartElement = document.createElement('span');
			searchableElementByClassName = document.createElement('div');
			searchableElementByAttribute = document.createElement('div');

			searchableElementByClassName.classList.add('thatElement');
			searchableElementByAttribute.setAttribute('thatElement', 'thatValue');
			wrapper.setAttribute('thatElement', 'wrapperValue');

			firstContainer.appendChild(searchableElementByClassName);
			searchableElementByClassName.appendChild(firstStartElement);

			secondContainer.appendChild(searchableElementByAttribute);
			searchableElementByAttribute.appendChild(secondStartElement);

			wrapper.appendChild(firstContainer);
			wrapper.appendChild(secondContainer);

			document.body.appendChild(wrapper);

		});

		afterEach(function() {
			wrapper = null;
			firstContainer = null;
			secondContainer = null;
			firstStartElement = null;
			secondStartElement = null;
			searchableElementByClassName = null;

			document.body.innerHTML = '';

		});

		describe('#getAscendantByFilter', function() {

			it('should alternately pass all ascendant elements to function and first passed element should be element it-self', function() {
				var filter = jasmine.createSpy('filter'),
					elements = [];

				filter.andCallFake(function(element) {
					elements.push(element);
					return false;
				});

				DX.Dom.getAscendantByFilter(firstStartElement, filter);

				expect(elements[0]).toEqual(firstStartElement);
				expect(elements[5]).toEqual(document.querySelector('html'));
			});

			it('return null if filter did not match any element', function() {
				var filter = function() {return false};

				expect(DX.Dom.getAscendantByFilter(secondStartElement, filter)).not.toEqual(document);
				expect(DX.Dom.getAscendantByFilter(secondStartElement, filter)).toBeNull();
			});


			it('should return element matched by filter condition', function() {
				var filter = jasmine.createSpy('filter');

				filter.andCallFake(function() {
					return filter.calls.length === 4
				});

				expect(DX.Dom.getAscendantByFilter(firstStartElement, filter)).toEqual(wrapper);
			});
		});

		describe('#getAscendantByClassName', function() {

			it('should return parent element with passed class name', function() {
				expect(DX.Dom.getAscendantByClassName(firstStartElement, 'thatElement')).toEqual(searchableElementByClassName);
			});

			it('should return null if element not found', function() {
				expect(DX.Dom.getAscendantByClassName(secondStartElement, 'thatElement')).toBeNull();
			});
		});

		describe('#getAscendantByAttribute', function() {

			it('should return closest parent with passed attribute name', function() {
				expect(DX.Dom.getAscendantByAttribute(secondStartElement, 'thatElement')).toEqual(searchableElementByAttribute);
				expect(DX.Dom.getAscendantByAttribute(firstStartElement, 'thatElement')).toEqual(wrapper);
			});

			it('should return null if there\'s no searchable element and one of the parents has searchable attribute, but with wrong value', function() {
				expect(DX.Dom.getAscendantByAttribute(secondStartElement, 'thatElement', 'wrongValue')).toBeNull();
			});

			it('should not throw error if document is reached', function() {
				var reachDocument = function() {
					return DX.Dom.getAscendantByAttribute(secondStartElement, 'thatElement', 'wrongValue');
				}
				expect(reachDocument).not.toThrow();
			});

			it('should return element with passed attribute and passed attribute value', function() {
				expect(DX.Dom.getAscendantByAttribute(secondStartElement, 'thatElement', 'wrapperValue')).toEqual(wrapper);
			});
		});

		describe('#isAscendant', function() {
			it('should return true if element contents targetElement', function() {
				expect(DX.Dom.isAscendant(wrapper, firstStartElement)).toBe(true);
				expect(DX.Dom.isAscendant(wrapper, secondStartElement)).toBe(true);
			});

			it('should return false if element not ascendant of targetElement', function() {
				expect(DX.Dom.isAscendant(searchableElementByClassName, secondStartElement)).toBe(false);
				expect(DX.Dom.isAscendant(searchableElementByAttribute, firstStartElement)).toBe(false);
			});
		});
	});

	describe('siblings', function() {
		beforeEach(function() {
			document.body.innerHTML = '<div class="photo">' +
					'<span class="father"></span>' +
					'<span class="mother"></span>' +
					'<span class="me"></span>' +
					'<span class="sister"></span>' +
					'<span class="brother"></span>' +
				'</div>';
		});

		afterEach(function() {
			document.body.innerHTML = '';
		});

		describe('#getNextSibling', function() {
			it('should return next element', function() {
				var me = document.querySelector('.me'),
					sister = document.querySelector('.sister');

				expect(DX.Dom.getNextSibling(me)).toBe(sister);
			});

			it('should return null if trying to get next sibling of last element', function() {
				var brother = document.querySelector('.brother');

				expect(DX.Dom.getNextSibling(brother)).toBeNull();
			});
		});

		describe('#getPreviousSibling', function() {
			it('should return previous element', function() {
				var me = document.querySelector('.me'),
					mother = document.querySelector('.mother');

				expect(DX.Dom.getPreviousSibling(me)).toBe(mother);
			});

			it('should return null if trying to get previous sibling of first element', function() {
				var father = document.querySelector('.father');

				expect(DX.Dom.getPreviousSibling(father)).toBeNull();
			});
		});
	});

	describe('#getData', function() {
		beforeEach(function() {
			document.body.innerHTML = '<div class="justiceLeague">' +
				'<span class="batman"' +
					' data-real-first-name="Bruce"' +
					' data-real-last-name="Wayne"' +
					' data-hero-pseudonym="Batman"' +
					' data-hero-city="Gotham"' +
				'>Batman</span>' +
				'<span class="superman"' +
					' data-real-first-name="Clark"' +
					' data-real-last-name="Kent"' +
					' data-hero-pseudonym="Superman"' +
					' data-hero-city="Metropolis"' +
					' data-super-power-ability-fly' +
				'>Superman</span>' +
				'<span class="martianManhunter">Martian Manhunter</span>' +
			'</div>>'
		});
		afterEach(function() {
			document.body.innerHTML = '';
		});

		it('should return all data attributes as object if namespace argument not provided', function() {
			var batman = document.querySelector('.batman'),
				superman = document.querySelector('.superman');

			expect(Object.keys(DX.Dom.getData(batman)).length).toBe(4);
			expect(Object.keys(DX.Dom.getData(superman)).length).toBe(5);
		});

		it('should transform attribute names to camelCase', function() {
			var batman = document.querySelector('.batman');

			expect(DX.Dom.getData(batman).realFirstName).toBe('Bruce');
		});

		it('should return only namespaced data attributes if namespace argument provided', function() {
			var superman = document.querySelector('.superman');

			expect(Object.keys(DX.Dom.getData(superman, 'real')).length).toBe(2);
			expect(Object.keys(DX.Dom.getData(superman, 'hero')).length).toBe(2);
		});

		it('should return empty object if element doesn`t contains any data attributes', function() {
			var martian =  document.querySelector('.martianManhunter'),
				result = DX.Dom.getData(martian);

			expect(typeof result).toBe('object');
			expect(Object.keys(result).length).toBe(0);
		});

		it ('should work fine with complex namespaces', function() {
			var superman =  document.querySelector('.superman'),
				result = DX.Dom.getData(superman, 'super-power-ability');

			expect(result.fly).toBeDefined();
		});

		it('should return empty object if element doesn`t contains data attributes in provided namespace', function() {
			var batman =  document.querySelector('.batman'),
				result = DX.Dom.getData(batman, 'super-power');

			expect(typeof result).toBe('object');
			expect(Object.keys(result).length).toBe(0);
		});

	});
});