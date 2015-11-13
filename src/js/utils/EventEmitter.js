'use strict';


class EventEmitter {
	
	constructor() {
		this._handlers = [];
	}
	
	subscribe(event, handler) {
		if (!this._handlers[event]) {
			this._handlers[event] = [];
		}
		if (typeof handler === 'function') {
			this._handlers[event].push(handler);
		}
	}

	unsubscribe(event, handler) {
		if (event in this._handlers && typeof handler === 'function') {
			let indexToRemove = this._handlers[event].indexOf(handler);

			if (indexToRemove > -1) {
				this._handlers[event].splice(indexToRemove, 1);
			}
		}
	}

	trigger(event, ...args) {
		if (event in this._handlers) {
			this._handlers[event].forEach(handler => {
				handler.apply(null, args);
			});
		}
	}
}

export default EventEmitter;