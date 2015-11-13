'use strict';

import BaseModule from './core/base.module';
import HomePageModule from './home/homepage.module';
import MapModule from './map/map.module';
import AppRouter from './app.router';


/** 
 * @class Application
 * @lends BaseModule 
 * @description application module
 */
class Application extends BaseModule {

	/**
	* @constructs
	* @inheritdoc
	*/
	constructor(element) {
		super(element);
	}

	/**	
	* @inheritdoc
	*/
	start() {
		var mapModule = new MapModule(this.element);
		var homePageModule = new HomePageModule(this.element);

		this.appRouter = new AppRouter();
		
		this.appRouter.registerRoute('#map', mapModule);

		homePageModule.setModel(mapModule.getModel());
		this.appRouter.registerRoute('', homePageModule);		
		this.appRouter.start();		
	}

	/**	
	* @inheritdoc
	*/
	stop() {
		this.appRouter.stop();
	}
}

var app = new Application($('#app'));

app.start();
