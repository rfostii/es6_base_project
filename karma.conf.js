module.exports = function(config) {
  config.set({
  	browsers: ['Chrome'],
    frameworks: ['browserify', 'jasmine'],
    plugins: [
     'karma-jasmine',
     'karma-browserify',
     'karma-chrome-launcher',
     'karma-babel-preprocessor'
    ],
    "browserify": {
	  "transform": [
	    "babelify"
	  ]
	},
    files: [
      "bower_components/jquery/dist/jquery.min.js",
      "src/**/*.js",
      "test/**/*.spec.js"
    ],
    preprocessors: {
      "src/**/*.js": ["browserify", "babel"],
      "test/**/*.spec.js": ["browserify", "babel"]
    },
    "babelPreprocessor": {
      options: {
        sourceMap: 'inline'
      }
    }
  });
};
