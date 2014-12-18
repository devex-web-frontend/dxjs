describe('DX.Measure', function() {
	beforeEach(function() {
	});
	afterEach(function() {
		document.body.innerHTML = '';
	});

	describe('#size()', function() {
		describe('1 argument', function() {
			it('should return correct size of empty element', function() {
				document.body.innerHTML = [
					'<style>* {margin: 0; padding: 0}</style>',
					'<span id="test"></span>'
				].join('');

				expect(DX.Measure.getSize(document.getElementById('test')).width).toBe(0);
				expect(DX.Measure.getSize(document.getElementById('test')).height).toBe(0);
			});

			it('should return correct size of element with fixed size', function() {
				document.body.innerHTML = [
					'<style>',
					'* {margin: 0; padding: 0}',
					'span {display: inline-block; width: 100px; height: 100px;}',
					'</style>',
					'<span id="test"></span>'
				].join('');

				expect(DX.Measure.getSize(document.getElementById('test')).width).toBe(100);
				expect(DX.Measure.getSize(document.getElementById('test')).height).toBe(100);
			});

			it('should return correct size of element with size defined by inner element', function() {
				document.body.innerHTML = [
					'<style>',
					'* {margin: 0; padding: 0}',
					'span {display: inline-block;}',
					'h1 {width: 100px; height: 100px;}',
					'</style>',
					'<span id="test"><h1></h1></span>'
				].join('');

				expect(DX.Measure.getSize(document.getElementById('test')).width).toBe(100);
				expect(DX.Measure.getSize(document.getElementById('test')).height).toBe(100);
			});

			it('should return correct height of element with size defined by content', function() {
				document.body.innerHTML = [
					'<style>',
					'* {margin: 0; padding: 0}',
					'span {display: inline-block; font: 10px/100px Arial;}',
					'</style>',
					'<span id="test">Hello, world!</span>'
				].join('');

				expect(DX.Measure.getSize(document.getElementById('test')).height).toBe(100);
			});
		});

		describe('2 arguments', function() {
			it('should add paddings', function() {
				document.body.innerHTML = [
					'<style>',
					'* {margin: 0; padding: 0}',
					'span {display: inline-block; padding: 5px 10px 15px 20px;}',
					'</style>',
					'<span id="test"></span>'
				].join('');

				expect(DX.Measure.getSize(document.getElementById('test'), true).width).toBe(30);
				expect(DX.Measure.getSize(document.getElementById('test'), true).height).toBe(20);
			});

			it('should add borders', function() {
				document.body.innerHTML = [
					'<style>',
					'* {margin: 0; padding: 0}',
					'span {display: inline-block; border: solid 1px; border-width: 1px 2px 3px 4px;}',
					'</style>',
					'<span id="test"></span>'
				].join('');

				expect(DX.Measure.getSize(document.getElementById('test'), true).width).toBe(6);
				expect(DX.Measure.getSize(document.getElementById('test'), true).height).toBe(4);
			});
		});
	});

	describe('#getPosition', function() {
		var scrollable,
			spacer,
			element;

		beforeEach(function() {
			scrollable = document.createElement('div');
			spacer = document.createElement('div');
			element = document.createElement('div');

			document.body.style.padding = '0px';
			document.body.style.margin = '0px';

			scrollable.style.width = '100px';
			scrollable.style.height = '100px';
			scrollable.style.overflow = 'scroll';

			scrollable.style.position = 'absolute';
			scrollable.style.top = '100px';
			scrollable.style.left = '100px';

			spacer.style.width = '200px';
			spacer.style.height = '200px';

			element.style.position = 'absolute';
			element.style.top = '100px';
			element.style.left = '100px';

			scrollable.appendChild(spacer);
			scrollable.appendChild(element);
			document.body.appendChild(scrollable);
		});

		afterEach(function() {
			scrollable = null;
			spacer = null;
			element = null;
			document.body.style.padding = '';
			document.body.style.margin = '';
		});

		it('should correctly calculate vertical position', function() {
			var pos = DX.Measure.getPosition(element);

			expect(pos.y).toBe(200);
		});

		it('should correctly calculate vertical position if target element placed in scrollable parent', function() {
			scrollable.scrollTop = 100;

			var pos = DX.Measure.getPosition(element);

			expect(pos.y).toBe(100);
		});

		it('should correctly calculate horizontal position', function() {
			var pos = DX.Measure.getPosition(element);

			expect(pos.x).toBe(200);
		});

		it('should correctly calculate vertical position if target element placed in scrollable parent', function() {
			scrollable.scrollLeft = 100;

			var pos = DX.Measure.getPosition(element);

			expect(pos.x).toBe(100);
		});

		it('should correctly calculate position if one of offset parents have border and overflow', function() {
			var pos;

			scrollable.style.border = '1px solid yellow';

			pos = DX.Measure.getPosition(element);

			expect(pos.x).toBe(201);
		});
	});
});