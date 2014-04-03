/* jshint node: true */
module.exports = function(path, elseValue) {
	var mod;
	try {
		mod = require(path);
	} catch(e) {
		console.error(e);
		mod = null;
	}
	return mod;
};