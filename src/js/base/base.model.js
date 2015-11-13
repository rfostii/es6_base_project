'use strict';

import EventEmitter from './eventEmitter';


const MODEL_EVENTS = {
	CHANGE: 'change',
	INVALID: 'invalid'
};

/** 
 * @class BaseModel
 * @lends EventEmitter
 * @description base model class
 */
class BaseModel extends EventEmitter {

	/**
	* @constructs
	*/
	constructor() {
		super();
		this.defaults = {};
		this._handlers = {
			[MODEL_EVENTS.CHANGE]: [],
			[MODEL_EVENTS.INVALID]: []
		};
	}

	/**
    * @method set
    * @param {string} routes 
    * @param value
    * @param {boolean} silent
    * @public
    * @returns {boolean} true if set else false
    * @description set value into model
    */
	set(key, value, silent) {
		var prevValue = this.defaults[key],
			isValid = this.validate(key, value);

		if (isValid) {
			this.defaults[key] = value;

			if (!silent) {
				this.trigger(MODEL_EVENTS.CHANGE, key, value, prevValue);
			}			
			return true;
		}
		this.trigger(MODEL_EVENTS.INVALID, key, value);
		return false;
	}

	/**
    * @method get
    * @param {string} key 
    * @public
    * @returns value
    * @description get value from model
    */
	get(key) {
		return this.defaults[key];
	}

	/**
    * @method validate
    * @param {string} key 
    * @param value
    * @returns {boolean} true if value is valid else false
    * @public
    * @description validate data that going to be set
    */
	validate(key, value) {		
		return true;
	}

	/**
    * @method showRoutes    
    * @public
    * @description destroy model
    */
	destroy() {
		
	}
}

export default BaseModel;