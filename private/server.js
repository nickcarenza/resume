/* jshint node: true */
var optRequire = require('./lib/optional-require');
var path = require('path');
// var url = require('url');
var https = require('https');
var fs = require('fs');

var configPath = path.join(__dirname,'../config');

var config = {
	github: optRequire(path.join(configPath,'github.json')),
	stackexchange: optRequire(path.join(configPath,'stackexchange.json')),
	codewars: optRequire(path.join(configPath,'codewars.json'))
};

if(config.github) {
	var github = {};
	var githubUrl = 'api.github.com';
	var githubApi = function() {
		return {
			method: 'GET',
			port: 443,
			hostname: githubUrl,
			path: path.join.apply(null, arguments),
			headers: {
				'User-Agent': config.github.username
				// ,'Accept': 'application/vnd.github.v3+json'
			}
		};
	};
	var response;
	var req = https.request(githubApi('/users',config.github.username,'repos'), function(res) {
		// var doc = fs.createWriteStream('repos.json');
		response = new Buffer(res.header['content-length']);
		res.on('data', function (chunk) {
			response.write(chunk);
		});
	});
	req.end(function(){
		github.respositories = response.toJSON();
		console.log('github.respositories', github.respositories);
	});
	req.on('error', function(e) {
		console.error('Error',e);
	});
}

if(config.stackexchange) {
	console.log('stack exchange configured');
}

if(config.codewars) {
	console.log('code wars configured');
}