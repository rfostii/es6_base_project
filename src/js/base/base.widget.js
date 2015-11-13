'use strict';

import EventEmitter from './eventEmitter';
import templateLoader from '../utils/templateLoader';


/** 
 * @class Widget
 * @lends EventEmitter
 * @description base widget class
 */
class Widget extends EventEmitter {
	
    /**
    * @constructs
    * @param {object|string} element
    */
    constructor(element) { 
    	super();
    	this.element = element;
    	this.template = null;
    }

    /**
    * @method $
    * @public    
    * @param {string} selector
    * @returns {object} jQuery object
    * @description search element in scope of parent element
    */
    $(selector) {
		return $(selector, $(this.element));
	}
    
    /**
    * @method start    
    * @public        
    * @description start widget
    */
    start(params) {
    
    }    
    
    /**
    * @method stop
    * @public        
    * @description stop router
    */
    stop() {
    
    }

    /**
    * @method
    * @protected
    * @returns {object} promise    
    * @description load widget template
    */
    _loadTemplate() {
        return templateLoader(this.template);
    }
}

export default Widget;