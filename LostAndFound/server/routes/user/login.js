var express = require('express');
var router = express.Router();
var conn = require('../../core/conn');

/* GET home page. */
router.post('/', function(req, res, next) {
  var checksql = "Select * From user where Uname = '" + req.body.username +"' and Upassword = '" +req.body.password +"'"
  conn.query(checksql, [], function(error, result, Fields) {
	  if(result.length > 0) {
			res.json({
				data: 'success',
				code: 20000
			})
		} else {
			res.json({
			data:'Failed', 
			code: 50006
			})
		}
	});
});

module.exports = router;