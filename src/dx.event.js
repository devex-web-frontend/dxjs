/**
 * @copyright Devexperts
 */
(function(DX, window, document, undefined) {
	'use strict';

	/**
	 * @namespace
	 * @memberOf window.DX
	 */
	DX.Event = {
		/**
		 * @param {Element} element
		 * @param {String} eventType
		 * @param {Object} [params] - {Boolean:bubbles, Any:detail}
		 */
		trigger: function(element, eventType, params) {
			var event;

			params = params || {};
			params.cancelable = true;

			try {
				event = new CustomEvent(eventType, params);
			} catch (e) {
				event = document.createEvent('CustomEvent');
				event.initCustomEvent(eventType, params.bubbles, params.cancelable, params.detail);
			}

			element.dispatchEvent(event);
		},

		/* CONSTANTS ================================================================================================ */
		/* Mouse */
		CLICK: 'click',
		TOUCH_CLICK: DX.isTouchAvailable() ? 'touchstart' : 'click',
		MOUSE_UP: 'mouseup',
		MOUSE_DOWN: 'mousedown',
		MOUSE_MOVE: 'mousemove',
		MOUSE_WHEEL: (function getMouseWheelEventName() {
			var event = ('onmousewheel' in document.documentElement) ? 'mousewheel' : 'DOMMouseScroll';

			try {
				new WheelEvent('wheel');
				event = 'wheel';
			} catch (e) {}

			return event;
		})(),

		/* Keyboard */
		KEY_PRESS: 'keypress',
		KEY_UP: 'keyup',
		KEY_DOWN: 'keydown',

		/* Forms */
		FOCUS: 'focus',
		BLUR: 'blur',
		CHANGE: 'change',
		SUBMIT: 'submit',

		/* Browser */
		RESIZE: 'resize',
		SCROLL: 'scroll',
		SELECT_START: 'selectstart'
	};

})(DX, window, document);