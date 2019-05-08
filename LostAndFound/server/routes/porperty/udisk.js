var express = require('express')
var router = express.Router()
var conn = require('../../core/conn')
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()
var fs = require('fs')
var uuid = require('uuid')
var moment = require('moment')

// U盘列表数据
router.get('/found/get', function(req, res, next) {
  var sql = "Select * From fudisk"
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
        name: result[i]['FUname'],
        size: result[i]['FUsize'],
        date: moment(result[i]['FUdate']).add('8', 'hours'),
        descript: result[i]['FUdescript'],
        image: result[i]['FUimage'],
        publicer: result[i]['publicer'],
        state: result[i]['FUstate'],
        id: result[i]['FUid']}
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

// U盘编辑数据
router.post('/found/edit', multipartMiddleware, function(req, res, next) {

  if(JSON.stringify(req.files) != "{}") {
    // 随机生成文件名
    var fileName = uuid.v4()
    fs.readFile(req.files.file.path, function (err, data) {
      fs.writeFile('./public/images/' + fileName + '.png', data, function (err) {

      })
    })
    var sql = "Update fudisk Set FUname = '" +req.body.name + 
      "', FUsize = '" + req.body.size +
      "', FUdate = '" + req.body.date + 
      "', FUdescript = '" + req.body.descript + 
      "', FUimage = '" + fileName + 
      ".png', publicer = '" + req.body.publicer +
      "', FUstate = '" + req.body.state +
      "' Where FUid = '" + req.body.id +"'"

    conn.query(sql, [], function(error, result, Fields) {
      console.log("img")
      console.log(result)
      console.log(error + 'error')
    })
  } else {
      var sql = "Update fudisk Set FUname = '" +req.body.name + 
      "', FUsize = '" + req.body.size +
      "', FUdate = '" + req.body.date + 
      "', FUdescript = '" + req.body.descript + 
      "', publicer = '" + req.body.publicer +
      "', FUstate = '" + req.body.state +
      "' Where FUid = '" + req.body.id +"'"
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

// U盘删除数据
router.get('/found/delete', function(req, res, next) {
  var sql = "Delete From fudisk Where FUid = '" + req.query.id +"'"
  conn.query(sql, [], function(error, result, Fields) {
    console.log(result)
    res.send({
      data: { 
        token: 'admin-token'},
      code: 20000
    })
  })
})

// U盘添加功能
router.post('/found/add', multipartMiddleware, function(req, res, next) {
    // 随机生成文件名
  var fileName = uuid.v4() + '.png'
  fs.readFile(req.files.file.path, function (err, data) {
    fs.writeFile('./public/images/' + fileName, data, function (err) {

    })
  })
  var sql = "Insert Into fudisk(FUname,FUsize,FUdate,FUdescript,publicer,FUstate,FUimage) Values (?, ?, ?, ?, ?, ?, ?)"
  var params = [req.body.name, req.body.size, req.body.date, req.body.descript, req.body.publicer, req.body.state, fileName]

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

// U盘列表数据
router.get('/lost/get', function(req, res, next) {
  var sql = "Select * From ludisk"
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
        name: result[i]['LUname'],
        size: result[i]['LUsize'],
        date: moment(result[i]['LUdate']).add('8', 'hours'),
        descript: result[i]['LUdescript'],
        image: result[i]['LUimage'],
        publicer: result[i]['publicer'],
        state: result[i]['LUstate'],
        id: result[i]['LUid']}
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

// lost
// U盘编辑数据
router.post('/lost/edit', multipartMiddleware, function(req, res, next) {

  if(JSON.stringify(req.files) != "{}") {
    // 随机生成文件名
    var fileName = uuid.v4()
    fs.readFile(req.files.file.path, function (err, data) {
      fs.writeFile('./public/images/' + fileName + '.png', data, function (err) {

      })
    })
    var sql = "Update ludisk Set LUname = '" +req.body.name + 
      "', LUsize = '" + req.body.size +
      "', LUdate = '" + req.body.date + 
      "', LUdescript = '" + req.body.descript + 
      "', LUimage = '" + fileName + 
      ".png', publicer = '" + req.body.publicer +
      "', LUstate = '" + req.body.state +
      "' Where LUid = '" + req.body.id +"'"

    conn.query(sql, [], function(error, result, Fields) {
      console.log("img")
      console.log(result)
      console.log(error + 'error')
    })
  } else {
      var sql = "Update ludisk Set LUname = '" +req.body.name + 
      "', LUsize = '" + req.body.size +
      "', LUdate = '" + req.body.date + 
      "', LUdescript = '" + req.body.descript + 
      "', publicer = '" + req.body.publicer +
      "', LUstate = '" + req.body.state +
      "' Where LUid = '" + req.body.id +"'"
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

// U盘删除数据
router.get('/lost/delete', function(req, res, next) {
  var sql = "Delete From ludisk Where LUid = '" + req.query.id +"'"
  conn.query(sql, [], function(error, result, Fields) {
    console.log(result)
    res.send({
      data: { 
        token: 'admin-token'},
      code: 20000
    })
  })
})

// U盘添加功能
router.post('/lost/add', multipartMiddleware, function(req, res, next) {
    // 随机生成文件名
  var fileName = uuid.v4() + '.png'
  fs.readFile(req.files.file.path, function (err, data) {
    fs.writeFile('./public/images/' + fileName, data, function (err) {

    })
  })
  var sql = "Insert Into ludisk(LUname,LUsize,LUdate,LUdescript,publicer,LUstate,LUimage) Values (?, ?, ?, ?, ?, ?, ?)"
  var params = [req.body.name, req.body.size, req.body.date, req.body.descript, req.body.publicer, req.body.state, fileName]

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