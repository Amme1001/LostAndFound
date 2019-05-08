var express = require('express');
var router = express.Router();
var conn = require('../../core/conn');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/info', (req, res) => {
	var checksql = "Select * From user where Uname = '" + req.query.username +"'"
  conn.query(checksql, [], function(error, result, Fields) {
  	if(!result.length) {
  		res.json({
			data:'Failed', 
			code: 50006
			})
			return
  	}
		res.json({
			data: { roles: ['admin'],
	    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
	    username: result[0]['Uname'],
	    sex: result[0]['Usex'],
	    phone: result[0]['Uphone'],
	    permission: result[0]['Upermission'],
	    token: 'admin-token'},
	    code: 20000
	  })
	})
})

router.post('/logout', (req, res) => {
	res.json({
		data:'success', 
		code: 20000
	})
})

module.exports = router;
