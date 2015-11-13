'use strict';


/** 
 * @class BaseModule 
 * @description base module class
 */
class BaseModule {

  /**
  * @constructs
  * @param {object} element
  * @desc dom element that will be contain module
  */
  constructor(element) {
    this.element = element;
  }

  /**
  * @method start    
  * @public    
  * @description start module
  */
  start() {
  	
  }

  /**
  * @method stop
  * @public    
  * @description stop module
  */
  stop() {
  	this.view.destroy();  	
  }

  /**
  * @method getView    
  * @public    
  * @returns {object} view instance
  * @description returns view instance
  */
  getView() {
  	return this.view;
  }

  /**
  * @method getModel
  * @public    
  * @returns {object} model instance
  * @description returns model instance
  */
  getModel() {
  	return this.model;
  }

  /**
  * @method setModel
  * @param {object} model
  * @public    
  * @description set model to module
  */
  setModel(model) {
    this.model = model;
  }
}

export default BaseModule;