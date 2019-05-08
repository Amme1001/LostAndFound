var express = require('express');
var router = express.Router();
var conn = require('../../core/conn');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs')
var uuid = require('uuid')
var moment = require('moment')

// 招领模块
// 书籍列表数据
router.get('/found/get', function(req, res, next) {
  var sql = "Select * From fbook"
  var list = []
  var li = {}
  conn.query(sql, [], function(error, result, Fields) {
  	if(!result.length) {
  		res.json({
			data:'Failed', 
			code: 50006
			})
			return
  	}
  	for(var i=0; i<result.length; i++){
  		
  		li = {
  			id: result[i]['FBid'],
  			name: result[i]['FBname'],
  		 	author: result[i]['FBauthor'],
  		 	date: moment(result[i]['FBdate']).add('8', 'hours'),
  		 	descript: result[i]['FBdescript'],
			  image: result[i]['FBimage'],
			  publicer: result[i]['publicer'],
			  state: result[i]['FBstate']}
			list.push(li) 
		}
		console.log(list)
  	res.send({
			data: { 
				list: list ,
	    	token: 'admin-token'},
	    code: 20000
	  })
  })
})

// 书籍编辑功能
router.post('/found/edit', multipartMiddleware, function(req, res, next) {

 	if(JSON.stringify(req.files) != "{}") {
 		// 随机生成文件名
		var fileName = uuid.v4()
		fs.readFile(req.files.file.path, function (err, data) {
		  fs.writeFile('./public/images/' + fileName + '.png', data, function (err) {

		  })
		})
		var sql = "Update fbook Set FBname = '" +req.body.name + 
			"', FBauthor = '" + req.body.author + 
			"', FBdate = '" + req.body.date + 
			"', FBdescript = '" + req.body.descript + 
			"', FBimage = '" + fileName + 
			".png', publicer = '" + req.body.publicer +
			"', FBstate = '" + req.body.state +
			"' Where FBid = '" + req.body.id +"'"

		conn.query(sql, [], function(error, result, Fields) {
		})
 	} else {
 		 	var sql = "Update fbook Set FBname = '" +req.body.name + 
			"', FBauthor = '" + req.body.author + 
			"', FBdate = '" + req.body.date + 
			"', FBdescript = '" + req.body.descript + 
			"', publicer = '" + req.body.publicer +
			"', FBstate = '" + req.body.state +
			"' Where FBid = '" + req.body.id +"'"
		conn.query(sql, [], function(error, result, Fields) {

		})
	}
	res.send({
		data: { 
    	token: 'admin-token'},
    code: 20000
  })
})

// 书籍删除功能
router.get('/found/delete', function(req, res, next) {
  var sql = "Delete From fbook Where FBid = '" + req.query.id +"'"
  conn.query(sql, [], function(error, result, Fields) {
		console.log(result)
  	res.send({
			data: { 
	    	token: 'admin-token'},
	    code: 20000
	  })
  })
})

// 书籍添加功能
router.post('/found/add', multipartMiddleware, function(req, res, next) {
	// 随机生成文件名
	var fileName = uuid.v4() + '.png'
	fs.readFile(req.files.file.path, function (err, data) {
	  fs.writeFile('./public/images/' + fileName, data, function (err) {

	  })
	})
	var sql = "Insert Into fbook(FBname,FBauthor,FBdate,FBdescript,publicer,FBstate,FBimage) Values (?, ?, ?, ?, ?, ?, ?)"
	var params = [req.body.name, req.body.author, req.body.date, req.body.descript, req.body.publicer, req.body.state, fileName]

	conn.query(sql, params, function(error, result, Fields) {
		if(error){
			console.log(result)
			console.log(result)
			res.send({
				data: { 
			  	token: 'admin-token'},
			  code: 20000
			})
		} else {
			console.log(result)
			console.log(result)
			res.send({
				data: { 
			  	token: 'admin-token'},
			  code: 20000
			})
		}
	})
})


// 丢失模块
// 书籍列表数据
router.get('/lost/get', function(req, res, next) {
  var sql = "Select * From lbook"
  var list = []
  var li = {}
  conn.query(sql, [], function(error, result, Fields) {
  	if(!result.length) {
  		res.json({
			data:'Failed', 
			code: 50006
			})
			return
  	}
  	for(var i=0; i<result.length; i++){
  		
  		li = {
  			id: result[i]['LBid'],
  			name: result[i]['LBname'],
  		 	author: result[i]['LBauthor'],
  		 	date: moment(result[i]['LBdate']).add('8', 'hours'),
  		 	descript: result[i]['LBdescript'],
			  image: result[i]['LBimage'],
			  publicer: result[i]['publicer'],
			  state: result[i]['LBstate']}
			list.push(li) 
		}
		console.log(list)
  	res.send({
			data: { 
				list: list ,
	    	token: 'admin-token'},
	    code: 20000
	  })
  })
})

// 书籍编辑功能
router.post('/lost/edit', multipartMiddleware, function(req, res, next) {

 	if(JSON.stringify(req.files) != "{}") {
 		// 随机生成文件名
		var fileName = uuid.v4()
		fs.readFile(req.files.file.path, function (err, data) {
		  fs.writeFile('./public/images/' + fileName + '.png', data, function (err) {

		  })
		})
		var sql = "Update lbook Set LBname = '" +req.body.name + 
			"', LBauthor = '" + req.body.author + 
			"', LBdate = '" + req.body.date + 
			"', LBdescript = '" + req.body.descript + 
			"', LBimage = '" + fileName + 
			".png', publicer = '" + req.body.publicer +
			"', LBstate = '" + req.body.state +
			"' Where LBid = '" + req.body.id +"'"

		conn.query(sql, [], function(error, result, Fields) {
		})
 	} else {
 		 	var sql = "Update lbook Set LBname = '" +req.body.name + 
			"', LBauthor = '" + req.body.author + 
			"', LBdate = '" + req.body.date + 
			"', LBdescript = '" + req.body.descript + 
			"', publicer = '" + req.body.publicer +
			"', LBstate = '" + req.body.state +
			"' Where LBid = '" + req.body.id +"'"
		conn.query(sql, [], function(error, result, Fields) {

		})
	}
	res.send({
		data: { 
    	token: 'admin-token'},
    code: 20000
  })
})

// 书籍删除功能
router.get('/lost/delete', function(req, res, next) {
  var sql = "Delete From lbook Where LBid = '" + req.query.id +"'"
  conn.query(sql, [], function(error, result, Fields) {
		console.log(result)
  	res.send({
			data: { 
	    	token: 'admin-token'},
	    code: 20000
	  })
  })
})

// 书籍添加功能
router.post('/lost/add', multipartMiddleware, function(req, res, next) {
		// 随机生成文件名
	var fileName = uuid.v4() + '.png'
	fs.readFile(req.files.file.path, function (err, data) {
	  fs.writeFile('./public/images/' + fileName, data, function (err) {

	  })
	})
	var sql = "Insert Into lbook(LBname,LBauthor,LBdate,LBdescript,publicer,LBstate,LBimage) Values (?, ?, ?, ?, ?, ?, ?)"
	var params = [req.body.name, req.body.author, req.body.date, req.body.descript, req.body.publicer, req.body.state, fileName]

	conn.query(sql, params, function(error, result, Fields) {
		if(error){
			console.log(result)
			console.log(result)
			res.send({
				data: { 
			  	token: 'admin-token'},
			  code: 20000
			})
		} else {
			console.log(result)
			console.log(result)
			res.send({
				data: { 
			  	token: 'admin-token'},
			  code: 20000
			})
		}
	})
})

module.exports = router