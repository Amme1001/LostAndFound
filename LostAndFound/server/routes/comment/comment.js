var express = require('express');
var router = express.Router();
var conn = require('../../core/conn');
var moment = require('moment')

// 评论信息模块
// 获取评论信息列表数据
router.get('/get', function(req, res, next) {
  console.log(req.query)
  var sql = "Select * From mboard where Mtype = '"+ req.query.type
    + "'and Mptype = '" + req.query.ptype
    + "'and Mpid = '" + req.query.pid +"'and Mmid is null"
  var list = []
  var midsql = "Select * From mboard where Mtype = '"+ req.query.type
    + "'and Mptype = '" + req.query.ptype
    + "'and Mpid = '" + req.query.pid + "'and Mmid is not null"
  var midlist = []
  var li = {}
  conn.query(midsql, [], function(error, result, Fields) {
    if(!result.length) {
      return
    }
    for(var i=0; i<result.length; i++){
      
      li = {
        id: result[i]['Mid'],
        publicer: result[i]['Mpublicer'],
        time: moment(result[i]['Mtime']).add('8', 'hours'),
        mid: result[i]['Mmid'],
        message: result[i]['Mmessage'],
        type: result[i]['Mtype'],
        ptype: result[i]['Mptype'],
        pid: result[i]['Mpid']}
        midlist.push(li) 
    }
    console.log(222222222222);
    
    console.log(midlist)
  })

  conn.query(sql, [], function(error, result, Fields) {
    console.log(result)
    if(!result.length) {
      res.json({
      data:'Failed', 
      code: 50006
      })
      return
    }
    for(var i=0; i<result.length; i++){
      
      li = {
        id: result[i]['Mid'],
        publicer: result[i]['Mpublicer'],
        time: moment(result[i]['Mtime']).add('8', 'hours'),
        mid: result[i]['Mmid'],
        message: result[i]['Mmessage'],
        type: result[i]['Mtype'],
        ptype: result[i]['Mptype'],
        pid: result[i]['Mpid']}
      list.push(li) 
    }
    console.log(111111111)
    console.log(list)
    res.send({
      data: { 
        list: list,
        midlist: midlist,
        token: 'admin-token'},
      code: 20000
    })
  })
})

// 获取全部评论信息列表数据
router.get('/getAll', function(req, res, next) {
  console.log(req.query)
  var sql = "Select * From mboard order by Mid"

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
        id: result[i]['Mid'],
        publicer: result[i]['Mpublicer'],
        time: moment(result[i]['Mtime']).add('8', 'hours'),
        mid: result[i]['Mmid'],
        message: result[i]['Mmessage'],
        type: result[i]['Mtype'],
        ptype: result[i]['Mptype'],
        pid: result[i]['Mpid']}
      list.push(li) 
    }
    console.log(list)
    res.send({
      data: { 
        list: list,
        token: 'admin-token'},
      code: 20000
    })
  })
})

// 删除评论信息模块
router.get('/delete', function(req, res, next) {
  var sql = "Delete From mboard Where Mid = '" + req.query.id +"'"
  conn.query(sql, [], function(error, result, Fields) {
    console.log(result)
    res.send({
      data: { 
        token: 'admin-token'},
      code: 20000
    })
  })
})

//添加评论信息模块
router.post('/add', function(req, res, next) {
  var sql = "insert into mboard(Mpublicer,Mtime,Mmid,Mmessage,Mtype,Mptype,Mpid) values (?,?,?,?,?,?,?)"
  var params = [
    req.body.publicer,
    req.body.time,
    req.body.mid,
    req.body.message,
    req.body.type,
    req.body.ptype,
    req.body.pid
    ]
  console.log(params)
  console.log(req.body)
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
})

module.exports = router