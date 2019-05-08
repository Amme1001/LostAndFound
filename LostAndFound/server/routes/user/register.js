var express = require('express');
var router = express.Router();
var conn = require('../../core/conn');

/* GET home page. */
router.post('/', function(req, res, next) {
  var checksql = "Select * From user where Uname = '" + req.body.username +"'"
  conn.query(checksql, [], function(error, result, Fields) {
    if(result.length > 0) {
    	res.json({
    		data: 'failed',
			  code: 50002
    	})
  	}else {
  		var sql = "insert into user(Uname,Upassword,Usex,Uphone,Upermission) values (?,?,?,?,?)"
		  var params = [req.body.username,req.body.password,req.body.sex,req.body.phone,req.body.permission]
		  conn.query(sql, params, function(error, result, Fields) {
		  	if(error) {
	        console.log(error);
	        res.json({
        		data: 'failed',
						code: 50004
					})
	        return 
		    }
        res.json({
        	data: 'success',
					code: 20000
				})
		  })
		}
  })

  
});

module.exports = router;
