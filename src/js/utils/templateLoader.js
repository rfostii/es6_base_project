'use strict';

import Settings from '../config';


export default function(templateUrl) {
	var basePath = Settings.templateBasePath;
	var fullPath = `${basePath}/${templateUrl}`;
	var xhr = new XMLHttpRequest();

	xhr.open('GET', fullPath, true);
	xhr.send();

	return new Promise((resolve, reject) => {
	  xhr.onreadystatechange = () => {
	  		if (xhr.readyState === 4 && xhr.status === 200) {
	  			resolve(xhr.responseText);
	  		}
	  };
	  xhr.onerror = reject;
	});	
};