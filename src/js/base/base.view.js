'use strict';

import templateLoader from '../utils/templateLoader';


/** 
 * @class BaseView 
 * @description base view class
 */
class BaseView {

	/**
    * @constructs
    * @param {object|string} element
    * @param {object} model
    */
	constructor(element, model) {
		this.element = $(element);
		this.model = model;
		this.widgets = {};
	}

	/**
    * @method $
    * @public    
    * @param {string} selector
    * @returns {object} jQuery object
    * @description search element in scope of parent element
    */
	$(selector) {
		return $(selector, this.element);
	}

	/**
    * @method getWidget
    * @public    
    * @param {string} widgetName
    * @returns {object} widget
    * @description returns registered widget
    */
    getWidget(widgetName) {
    	var widget = this.widgets[widgetName];
        
        if (!widget) {
            throw new Error(`Error: Widget ${widgetName} not registered`);
        }
        return this.widgets[widgetName];
    }
    
    /**
    * @method registerWidget
    * @public    
    * @param {string} widgetName
    * @param {object} widgetInstance    t
    * @description register widget
    */
    registerWidget(widgetName, widgetInstance) {
		this.widgets[widgetName] = widgetInstance;
	}
    
    /**
    * @method runWidget
    * @public    
    * @param {string} selector
    * @returns {object} params
    * @description run widget
    */
    runWidget(widgetName, params) {
    	var widget = this.getWidget(widgetName); 
        this.widgets[widgetName].start(params);
    }
    
    /**
    * @method stopWidget
    * @public    
    * @param {string} widgetName    
    * @description stop widget
    */
    stopWidget(widgetName) {
    	var widget = this.getWidget(widgetName);  
        this.widgets[widgetName].stop();
    }    

    /**
    * @method render
    * @public        
    * @returns {object} promise
    * @description load template and show view on page
    */
	render() {
		var self = this;

		if (!this.template) {
			throw `${this.constructor.name} view does not have template`;
		}
		this._preRender();
		return templateLoader(this.template).then(template => {			
			self.$el = $(self.element);
			self.element.html(template);			
			self._postRender();
			self._handleEvents();			
			self._handleModelEvents();
		});		
	}

	/**
    * @method destroy
    * @public        
    * @description destroy view and remove it from page
    */
	destroy() {
		if (this.model) {
			this.model.destroy();
		}		
		this.$el = null;
		this._detachEvents();
		this.element.empty();
	}


	/**
    * @method
    * @protected    
    */	
	_handleEvents() {

	}

	/**
    * @method
    * @protected    
    */	
	_handleModelEvents() {

	}

	/**
    * @method
    * @protected    
    */	
	_handleWidgetEvents() {
		
	}

	/**
    * @method
    * @protected    
    */	
	_preRender() {

	}

	/**
    * @method
    * @protected    
    */	
	_postRender() {

	}

	/**
    * @method
    * @protected    
    */	
	_detachEvents() {

	}
}

export default BaseView;