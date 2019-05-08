var express = require('express')
var router = express.Router()
var conn = require('../../core/conn')
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()
var fs = require('fs')
var uuid = require('uuid')
var moment = require('moment')

// 其他物件列表数据
router.get('/found/get', function(req, res, next) {
  var sql = "Select * From fother"
  var list = []
  var li = {}
  conn.query(sql, [], function(error, result, Fields) {
  	console.log(result.length)
  	if(!result.length) {
  		res.json({
			data:'Failed', 
			code: 50006
			})
			return
  	}
  	for(var i=0; i<result.length; i++){
  		
  		li = {
  			name: result[i]['FOname'],
  		 	date: moment(result[i]['FOdate']).add('8', 'hours'),
  		 	descript: result[i]['FOdescript'],
			  image: result[i]['FOimage'],
			  publicer: result[i]['publicer'],
			  state: result[i]['FOstate'],
				id: result[i]['FOid']}
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

// 其他物件编辑数据
router.post('/found/edit', multipartMiddleware, function(req, res, next) {

 	if(JSON.stringify(req.files) != "{}") {
 		// 随机生成文件名
		var fileName = uuid.v4()
		fs.readFile(req.files.file.path, function (err, data) {
		  fs.writeFile('./public/images/' + fileName + '.png', data, function (err) {

		  })
		})
		var sql = "Update fother Set FOname = '" +req.body.name + 
			"', FOdate = '" + req.body.date + 
			"', FOdescript = '" + req.body.descript + 
			"', FOimage = '" + fileName + 
			".png', publicer = '" + req.body.publicer +
			"', FOstate = '" + req.body.state +
			"' Where FOid = '" + req.body.id +"'"

		conn.query(sql, [], function(error, result, Fields) {
			console.log("img")
			console.log(result)
			console.log(error + 'error')
		})
 	} else {
 		 	var sql = "Update fother Set FOname = '" +req.body.name + 
			"', FOdate = '" + req.body.date + 
			"', FOdescript = '" + req.body.descript + 
			"', publicer = '" + req.body.publicer +
			"', FOstate = '" + req.body.state +
			"' Where FOid = '" + req.body.id +"'"
		conn.query(sql, [], function(error, result, Fields) {
			console.log(result)
		})
	}
	res.send({
		data: { 
    	token: 'admin-token'},
    code: 20000
  })
})

// 其他物件删除数据
router.get('/found/delete', function(req, res, next) {
  var sql = "Delete From fother Where FOid = '" + req.query.id +"'"
  conn.query(sql, [], function(error, result, Fields) {
		console.log(result)
  	res.send({
			data: { 
	    	token: 'admin-token'},
	    code: 20000
	  })
  })
})

// 其他物件添加功能
router.post('/found/add', multipartMiddleware, function(req, res, next) {
		// 随机生成文件名
	var fileName = uuid.v4() + '.png'
	fs.readFile(req.files.file.path, function (err, data) {
	  fs.writeFile('./public/images/' + fileName, data, function (err) {

	  })
	})
	var sql = "Insert Into fother(FOname,FOdate,FOdescript,publicer,FOstate,FOimage) Values (?, ?, ?, ?, ?, ?)"
	var params = [req.body.name, req.body.date, req.body.descript, req.body.publicer, req.body.state, fileName]

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


// 其他物件列表数据
router.get('/lost/get', function(req, res, next) {
  var sql = "Select * From lother"
  var list = []
  var li = {}
  conn.query(sql, [], function(error, result, Fields) {
    console.log(result.length)
    if(!result.length) {
      res.json({
      data:'Failed', 
      code: 50006
      })
      return
    }
    for(var i=0; i<result.length; i++){
      
      li = {
        name: result[i]['LOname'],
        date: moment(result[i]['LOdate']).add('8', 'hours'),
        descript: result[i]['LOdescript'],
        image: result[i]['LOimage'],
        publicer: result[i]['publicer'],
        state: result[i]['LOstate'],
        id: result[i]['LOid']}
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

// 丢失模块
// 其他物件编辑数据
router.post('/lost/edit', multipartMiddleware, function(req, res, next) {

  if(JSON.stringify(req.files) != "{}") {
    // 随机生成文件名
    var fileName = uuid.v4()
    fs.readFile(req.files.file.path, function (err, data) {
      fs.writeFile('./public/images/' + fileName + '.png', data, function (err) {

      })
    })
    var sql = "Update lother Set LOname = '" +req.body.name + 
      "', LOdate = '" + req.body.date + 
      "', LOdescript = '" + req.body.descript + 
      "', LOimage = '" + fileName + 
      ".png', publicer = '" + req.body.publicer +
      "', LOstate = '" + req.body.state +
      "' Where LOid = '" + req.body.id +"'"

    conn.query(sql, [], function(error, result, Fields) {
      console.log("img")
      console.log(result)
      console.log(error + 'error')
    })
  } else {
      var sql = "Update lother Set LOname = '" +req.body.name + 
      "', LOdate = '" + req.body.date + 
      "', LOdescript = '" + req.body.descript + 
      "', publicer = '" + req.body.publicer +
      "', LOstate = '" + req.body.state +
      "' Where LOid = '" + req.body.id +"'"
    conn.query(sql, [], function(error, result, Fields) {
      console.log(result)
    })
  }
  res.send({
    data: { 
      token: 'admin-token'},
    code: 20000
  })
})

// 其他物件删除数据
router.get('/lost/delete', function(req, res, next) {
  var sql = "Delete From lother Where LOid = '" + req.query.id +"'"
  conn.query(sql, [], function(error, result, Fields) {
    console.log(result)
    res.send({
      data: { 
        token: 'admin-token'},
      code: 20000
    })
  })
})

// 其他物件添加功能
router.post('/lost/add', multipartMiddleware, function(req, res, next) {
    // 随机生成文件名
  var fileName = uuid.v4() + '.png'
  fs.readFile(req.files.file.path, function (err, data) {
    fs.writeFile('./public/images/' + fileName, data, function (err) {

    })
  })
  var sql = "Insert Into lother(LOname,LOdate,LOdescript,publicer,LOstate,LOimage) Values (?, ?, ?, ?, ?, ?)"
  var params = [req.body.name, req.body.date, req.body.descript, req.body.publicer, req.body.state, fileName]

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
module.exports = router;