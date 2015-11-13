'use strict';

import EventEmitter from './eventEmitter';


/** 
 * @class Router
 * @lends EventEmitter
 * @description base router class
 */
class Router extends EventEmitter {
	
	/**
	* @constructs
	*/
	constructor() {
		super();
		this.routes = {};				
	}	

	/**
    * @method start    
    * @public    
    * @fires Router#start
    * @description start router
    */
	start() {
		this.trigger('start');
		window.onhashchange = () => {
			this._routeChanged();		
		};
		this._routeChanged();
	}

	/**
    * @method stop
    * @public    
    * @fires Router#destroy
    * @description stop router
    */
	stop() {
		this.trigger('destroy');
		window.onhashchange = null;
	}		

	/**
    * @method registerRoute
    * @public    
    * @param {string} route
    * @param {object} moduleInstance
    * @description register router and module to start after vist this route
    */
	registerRoute(route, moduleInstance) {
		this.routes[route] = moduleInstance;
	}

	/**
	* @method
	* @fires Router#route:changed
	* @protected
	*/
	_routeChanged() {
		var route = location.hash;
		var module = this.routes[route];

		if (this.currentModule) {
			this.currentModule.stop();
		}

		if (module) {
			this.currentModule = module;
			module.start();
		}
		this.trigger('route:changed', route, module);
	}
}

export default Router;