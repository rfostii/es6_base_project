'use strict';


/** 
 * @class HttpService
 * @description service that provide base functionality for working with backend
 */
class HttpService {

	/**
	* @constructs
	*/
	constructor() {

	}

	/**
	* @method
	* @protected
	* @param {string} method
	* @param {string} url
	* @param {object} data
	* @returns {object} promise
	*/
	_makeXMLHttpRequest(method, url, data) {	
		var xhr = new XMLHttpRequest();

		xhr.open(method, url, true);
		xhr.send(data);

		return new Promise((resolve, reject) => {
			xhr.onreadystatechange = () => {
					if (xhr.readyState === 4 && xhr.status === 200) {
						resolve(xhr.responseText);
					}
			};
			xhr.onerror = reject;
		});	
	}

	/**
	* @method
	* @public	
	* @param {string} url	
	* @returns {object} promise
	*/
	doGet(url) {
		return this._makeXMLHttpRequest('GET', url);
	}

	/**
	* @method
	* @public	
	* @param {string} url
	* @param {object} data
	* @returns {object} promise
	*/
	doPost(url, data) {
		return this._makeXMLHttpRequest('POST', url, data);
	}
}

export default HttpService;