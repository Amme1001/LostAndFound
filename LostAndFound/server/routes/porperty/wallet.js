var express = require('express')
var router = express.Router()
var conn = require('../../core/conn')
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()
var fs = require('fs')
var uuid = require('uuid')
var moment = require('moment')

// 钱包列表数据
router.get('/found/get', function(req, res, next) {
  var sql = "Select * From fwallet"
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
        color: result[i]['FWcolor'],
        include: result[i]['FWinclude'],
        date: moment(result[i]['FWdate']).add('8', 'hours'),
        descript: result[i]['FWdescript'],
        image: result[i]['FWimage'],
        publicer: result[i]['publicer'],
        state: result[i]['FWstate'],
        id: result[i]['FWid']}
      list.push(li) 
      console.log(list)
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

// 钱包编辑数据
router.post('/found/edit', multipartMiddleware, function(req, res, next) {

  if(JSON.stringify(req.files) != "{}") {
    // 随机生成文件名
    var fileName = uuid.v4()
    fs.readFile(req.files.file.path, function (err, data) {
      fs.writeFile('./public/images/' + fileName + '.png', data, function (err) {

      })
    })
    var sql = "Update fwallet Set FWcolor = '" +req.body.color + 
      "', FWinclude = '" + req.body.include +
      "', FWdate = '" + req.body.date + 
      "', FWdescript = '" + req.body.descript + 
      "', FWimage = '" + fileName + 
      ".png', publicer = '" + req.body.publicer +
      "', FWstate = '" + req.body.state +
      "' Where FWid = '" + req.body.id +"'"

    conn.query(sql, [], function(error, result, Fields) {
      console.log("img")
      console.log(result)
      console.log(error + 'error')
    })
  } else {
      var sql = "Update fwallet Set FWcolor = '" +req.body.color + 
      "', FWinclude = '" + req.body.include +
      "', FWdate = '" + req.body.date + 
      "', FWdescript = '" + req.body.descript + 
      "', publicer = '" + req.body.publicer +
      "', FWstate = '" + req.body.state +
      "' Where FWid = '" + req.body.id +"'"
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

// 钱包删除数据
router.get('/found/delete', function(req, res, next) {
  var sql = "Delete From fwallet Where FWid = '" + req.query.id +"'"
  conn.query(sql, [], function(error, result, Fields) {
    console.log(result)
    res.send({
      data: { 
        token: 'admin-token'},
      code: 20000
    })
  })
})

// 钱包添加功能
router.post('/found/add', multipartMiddleware, function(req, res, next) {
    // 随机生成文件名
  var fileName = uuid.v4() + '.png'
  fs.readFile(req.files.file.path, function (err, data) {
    fs.writeFile('./public/images/' + fileName, data, function (err) {

    })
  })
  var sql = "Insert Into fwallet(FWcolor,FWinclude,FWdate,FWdescript,publicer,FWstate,FWimage) Values (?, ?, ?, ?, ?, ?, ?)"
  var params = [req.body.color, req.body.include, req.body.date, req.body.descript, req.body.publicer, req.body.state, fileName]

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

// 钱包列表数据
router.get('/lost/get', function(req, res, next) {
  var sql = "Select * From lwallet"
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
        color: result[i]['LWcolor'],
        include: result[i]['LWinclude'],
        date: moment(result[i]['LWdate']).add('8', 'hours'),
        descript: result[i]['LWdescript'],
        image: result[i]['LWimage'],
        publicer: result[i]['publicer'],
        state: result[i]['LWstate'],
        id: result[i]['LWid']}
      list.push(li) 
      console.log(list)
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
// 钱包编辑数据
router.post('/lost/edit', multipartMiddleware, function(req, res, next) {

  if(JSON.stringify(req.files) != "{}") {
    // 随机生成文件名
    var fileName = uuid.v4()
    fs.readFile(req.files.file.path, function (err, data) {
      fs.writeFile('./public/images/' + fileName + '.png', data, function (err) {

      })
    })
    var sql = "Update lwallet Set LWcolor = '" +req.body.color + 
      "', LWinclude = '" + req.body.include +
      "', LWdate = '" + req.body.date + 
      "', LWdescript = '" + req.body.descript + 
      "', LWimage = '" + fileName + 
      ".png', publicer = '" + req.body.publicer +
      "', LWstate = '" + req.body.state +
      "' Where LWid = '" + req.body.id +"'"

    conn.query(sql, [], function(error, result, Fields) {
      console.log("img")
      console.log(result)
      console.log(error + 'error')
    })
  } else {
      var sql = "Update lwallet Set LWcolor = '" +req.body.color + 
      "', LWinclude = '" + req.body.include +
      "', LWdate = '" + req.body.date + 
      "', LWdescript = '" + req.body.descript + 
      "', publicer = '" + req.body.publicer +
      "', LWstate = '" + req.body.state +
      "' Where LWid = '" + req.body.id +"'"
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

// 钱包删除数据
router.get('/lost/delete', function(req, res, next) {
  var sql = "Delete From lwallet Where LWid = '" + req.query.id +"'"
  conn.query(sql, [], function(error, result, Fields) {
    console.log(result)
    res.send({
      data: { 
        token: 'admin-token'},
      code: 20000
    })
  })
})

// 钱包添加功能
router.post('/lost/add', multipartMiddleware, function(req, res, next) {
    // 随机生成文件名
  var fileName = uuid.v4() + '.png'
  fs.readFile(req.files.file.path, function (err, data) {
    fs.writeFile('./public/images/' + fileName, data, function (err) {

    })
  })
  var sql = "Insert Into lwallet(LWcolor,LWinclude,LWdate,LWdescript,publicer,LWstate,LWimage) Values (?, ?, ?, ?, ?, ?, ?)"
  var params = [req.body.color, req.body.include, req.body.date, req.body.descript, req.body.publicer, req.body.state, fileName]

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