'use strict';

/**
 * @copyright Devexperts
 */

import DxCore from './dx.core';

export default window.DX.Event = {

	/**
	 * Execute all handlers attached to element for the given event type.
	 * @param {Element} element
	 * @param {String} eventType
	 * @param {{bubbles: Boolean, detail: *}} [params]
	 */

	trigger(element, eventType, params) {
		let event;

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

	CLICK: 'click',
	TOUCH_CLICK: DxCore.isTouchAvailable() ? 'touchstart' : 'click',
	MOUSE_UP: 'mouseup',
	MOUSE_DOWN: 'mousedown',
	MOUSE_MOVE: 'mousemove',
	MOUSE_WHEEL: (function getMouseWheelEventName() {
		let event = ('onmousewheel' in document.documentElement) ? 'mousewheel' : 'DOMMouseScroll';

		try {
			new WheelEvent('wheel');
			event = 'wheel';
		} catch (e) {
			/*empty block*/
		}

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