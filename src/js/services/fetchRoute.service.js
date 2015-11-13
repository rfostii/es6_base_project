'use strict';

import HttpService from '../core/http.service';


/** 
 * @class FetchRouteService
 * @lends HttpService
 * @description service class responsive for fetching routes from backend.
 */
class FetchRouteService extends HttpService {

    /**
    * @constructs
    * @inheritdoc
    */
	constructor() {
		super();
	}

    /**
    * @method getRoutes
    * @public
    * @param {object} points
    * @returns {object} promise or thenable object
    * @description to get routes from backend
    */
	getRoutes(points) {
		//TODO: use real url
		//return this.doPost(url, points);
		return {
            then: function(callback) {                
                callback({ 
                    start: {
                        address: 'ВУЛ.БАЛКІВСЬКА буд.13',
                        longitude: 30.70596, 
                        latitude: 46.45784
                    },
                    end: {                                            
                        address: 'ДОРОГА ДНІПРОПЕТРОВСЬКА буд.93А',
                        longitude: 30.7969, 
                        latitude: 46.57731
                    }, 
                    dangerous: {
                        color: 'red',
                        incidences: [
                            {
                                date: '9/18/2015 21:50',
                                event: 'ДТП З ПОТЕРПIЛИМИ',
                                address: 'ВУЛ. ЧОРНОМОРСЬКОГО КОЗАЦТВА буд.199',
                                longitude: 30.72919, 
                                latitude: 46.52673
                            },
                            {
                                date: '9/18/2015 21:31',
                                event: 'ДТП З ПОТЕРПIЛИМИ',
                                address: 'ПРОСП. ДОБРОВОЛЬСЬКОГО',
                                longitude: 30.78547, 
                                latitude: 46.58232
                            }
                        ] 
                    },
                    warn: {
                        color: 'yellow',                        
                        incidences: [
                            {
                                date: '8/27/2015 14:23',
                                event: 'ДТП З ПОТЕРПIЛИМИ',
                                address: 'ВУЛ. БАБЕЛЯ',
                                longitude: 30.70599, 
                                latitude: 46.46793
                            }
                        ]
                        
                    },
                    safe: {
                        color: 'green',
                        incidences: [
                            {
                                date: '8/27/2015 16:29',
                                event: 'ДТП З ПОТЕРПIЛИМИ',
                                address: 'ВУЛ.БУГАЇВСЬКА',
                                longitude: 30.70111, 
                                latitude: 46.47297
                            }
                        ]
                    },
                });
            }
        };
	}	
}

export default new FetchRouteService();