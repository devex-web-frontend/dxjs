import dxEvent from '../src/dx.event';

describe('DX.Event', function() {
	beforeEach(function() {
	});
	afterEach(function() {
	});

	describe('#trigger()', function() {
		let event = 'custom:event';
		let test;
		let spy;

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
			dxEvent.trigger(test, event);

			expect(spy).toHaveBeenCalled();
			expect(spy.calls.length).toEqual(1);
		});

		it('should trigger event that not bubbles by default', function() {
			document.addEventListener(event, spy);
			dxEvent.trigger(test, event);

			expect(spy).not.toHaveBeenCalled();
		});

		it('should change bubbles according to e.bubbles', function() {
			document.addEventListener(event, spy);
			dxEvent.trigger(test, event, {bubbles: true});

			expect(spy).toHaveBeenCalled();
			expect(spy.calls.length).toEqual(1);
		});

		it('should pass info into e.detail', function() {
			var detailSent = {a: 1};

			test.addEventListener(event, spy);
			dxEvent.trigger(test, event, {detail: detailSent});

			expect(spy.mostRecentCall.args[0].detail).toBe(detailSent);
		});
	});

	describe('constants', function() {
		it('should provide public constants', function() {
			expect(dxEvent.CLICK).toBe('click');
			expect(dxEvent.TOUCH_CLICK).toBeIn(['click', 'touchstart']);
			expect(dxEvent.MOUSE_UP).toBe('mouseup');
			expect(dxEvent.MOUSE_DOWN).toBe('mousedown');
			expect(dxEvent.MOUSE_MOVE).toBe('mousemove');
			expect(dxEvent.MOUSE_WHEEL).toBeIn(['mousewheel', 'DOMMouseScroll', 'wheel']);
			expect(dxEvent.KEY_PRESS).toBe('keypress');
			expect(dxEvent.KEY_UP).toBe('keyup');
			expect(dxEvent.KEY_DOWN).toBe('keydown');
			expect(dxEvent.FOCUS).toBe('focus');
			expect(dxEvent.BLUR).toBe('blur');
			expect(dxEvent.CHANGE).toBe('change');
			expect(dxEvent.SUBMIT).toBe('submit');
			expect(dxEvent.RESIZE).toBe('resize');
			expect(dxEvent.SCROLL).toBe('scroll');
			expect(dxEvent.SELECT_START).toBe('selectstart');
		});
	});
});