'use strict';


/** 
 * @class EventEmitter 
 * @description provide functionality that allow working with events
 */
class EventEmitter {

	/**
	* @constructs
	*/
	constructor() {
		this._handlers = {};
	}

	/**
    * @method subscribe    
    * @public    
    * @param {string} event
    * @param {function} handler
    * @description subscribe on event
    */
	subscribe(event, handler) {
		if (!this._handlers[event]) {
			this._handlers[event] = [];
		}
		if (typeof handler === 'function') {
			this._handlers[event].push(handler);
		}
	}

	/**
    * @method unsubscribe    
    * @public    
    * @param {string} event
    * @param {function} handler
    * @description unsubscribe from event
    */
	unsubscribe(event, handler) {
		if (typeof handler === 'function') {
			let indexToRemove = this._handlers[event].indexOf(handler);

			if (indexToRemove > -1) {
				this._handlers[event].splice(indexToRemove, 1);
			}
		}
	}

	/**
    * @method unsubscribeAll
    * @public    
    * @param {string} event    
    * @description unsubscribe all handlers from event
    */
	unsubscribeAll(event) {
		this._handlers[event] = [];
	}

	/**
    * @method trigger
    * @public    
    * @param {string} event    
    * @param args
    * @description trigger event
    */
	trigger(event, ...args) {
		if (event in this._handlers) {
			this._handlers[event].forEach(handler => {
				handler.apply(null, args);
			});
		}
	}
}

export default EventEmitter;