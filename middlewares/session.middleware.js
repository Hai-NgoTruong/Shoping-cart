const mongoose = require('mongoose');

module.exports = function(req, res, next){

	if(!req.signedCookies.sessionId){
		res.cookie('sessionId', sessionId,{
	 	signed :true	
	 });
	const session = MyModel.startSession();
	const doc = await MyModel.findOne().session(session);
	doc.$session() === session; // true
	doc.$session(null);
	doc.$session() === null; // true
	next();
	}
}