import '../src/dx.event';

describe('DX.Event', function() {
	beforeEach(function() {});
	afterEach(function() {});

	describe('#trigger()', function() {
		var event = 'custom:event',
				test, spy;

		beforeEach(function() {
			document.body.innerHTML = '<span id="test"></span>';

			test = document.getElementById('test');
			spy = jasmine.createSpy('callback');
			event = 'custom:event';
		});
		afterEach(function() {
			document.body.innerHTML = '';

			test = spy = null;
		});

		it('should trigger custom event', function() {
			test.addEventListener(event, spy);
			DX.Event.trigger(test, event);

			expect(spy).toHaveBeenCalled();
			expect(spy.calls.length).toEqual(1);
		});

		it('should trigger event that not bubbles by default', function() {
			document.addEventListener(event, spy);
			DX.Event.trigger(test, event);

			expect(spy).not.toHaveBeenCalled();
		});

		it('should change bubbles according to e.bubbles', function() {
			document.addEventListener(event, spy);
			DX.Event.trigger(test, event, {bubbles: true});

			expect(spy).toHaveBeenCalled();
			expect(spy.calls.length).toEqual(1);
		});

		it('should pass info into e.detail', function() {
			var detailSent = {a: 1};

			test.addEventListener(event, spy);
			DX.Event.trigger(test, event, {detail: detailSent});

			expect(spy.mostRecentCall.args[0].detail).toBe(detailSent);
		});
	});

	describe('constants', function() {
		it('should provide public constants', function() {
			expect(DX.Event.CLICK).toBe('click');
			expect(DX.Event.TOUCH_CLICK).toBeIn(['click', 'touchstart']);
			expect(DX.Event.MOUSE_UP).toBe('mouseup');
			expect(DX.Event.MOUSE_DOWN).toBe('mousedown');
			expect(DX.Event.MOUSE_MOVE).toBe('mousemove');
			expect(DX.Event.MOUSE_WHEEL).toBeIn(['mousewheel', 'DOMMouseScroll', 'wheel']);
			expect(DX.Event.KEY_PRESS).toBe('keypress');
			expect(DX.Event.KEY_UP).toBe('keyup');
			expect(DX.Event.KEY_DOWN).toBe('keydown');
			expect(DX.Event.FOCUS).toBe('focus');
			expect(DX.Event.BLUR).toBe('blur');
			expect(DX.Event.CHANGE).toBe('change');
			expect(DX.Event.SUBMIT).toBe('submit');
			expect(DX.Event.RESIZE).toBe('resize');
			expect(DX.Event.SCROLL).toBe('scroll');
			expect(DX.Event.SELECT_START).toBe('selectstart');
		});
	});
});