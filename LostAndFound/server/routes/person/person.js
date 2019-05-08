var express = require('express');
var router = express.Router();
var conn = require('../../core/conn');

// 用户信息模块
// 获取用户信息列表数据
router.get('/get', function (req, res, next) {
  console.log(req.query.checkPermission)
  var sql = "Select * From user where UPermission = '" + req.query.checkPermission + "'"
  var list = []
  var li = {}
  conn.query(sql, [], function (error, result, Fields) {
    if (!result.length) {
      res.json({
        data: 'Failed',
        code: 50006
      })
      return
    }
    for (var i = 0; i < result.length; i++) {

      li = {
        id: result[i]['Uid'],
        name: result[i]['Uname'],
        password: result[i]['Upassword'],
        sex: result[i]['Usex'],
        phone: result[i]['Uphone'],
        state: result[i]['Ustate'],
        permission: result[i]['Upermission']
      }
      list.push(li)
    }
    console.log(list)
    res.send({
      data: {
        list: list,
        token: 'admin-token'
      },
      code: 20000
    })
  })
})

// 删除用户信息模块
router.get('/delete', function (req, res, next) {
  var sql = "Delete From user Where Uid = '" + req.query.id + "'"
  conn.query(sql, [], function (error, result, Fields) {
    console.log(result)
    res.send({
      data: {
        token: 'admin-token'
      },
      code: 20000
    })
  })
})


//添加用户信息模块
router.get('/getPerson', function (req, res, next) {
  var checksql = "Select * From user where Uname = '" + req.query.username + "'"
  var data = {}
  conn.query(checksql, [], function (error, result, Fields) {
    if (result.length > 0) {
      data = {
        id: result[0]['Uid'],
        name: result[0]['Uname'],
        password: result[0]['Upassword'],
        sex: result[0]['Usex'],
        phone: result[0]['Uphone'],
        state: result[0]['Ustate'],
        permission: result[0]['Upermission']
      }
      res.json({
        data: {
          data: data,
          token: 'admin-token'
        },
        code: 20000
      })
    } else {
      res.json({
        data: 'failed',
        code: 50004
      })
    }
  })
})

// 用户信息更新模块
router.post('/edit', function (req, res, next) {
  var sql = "Update user Set Uname = '" + req.body.username +
    "', Upassword = '" + req.body.password +
    "', Usex = '" + req.body.sex +
    "', Uphone = '" + req.body.phone +
    "', Upermission = '" + req.body.permission +
    "', Ustate = '" + req.body.state +
    "' Where Uid = '" + req.body.id + "'"
  console.log(req.body)
  console.log(sql)
  conn.query(sql, [], function (error, result, Fields) {
    if (error) {
      console.log(error)
    }
  })
  res.send({
    data: {
      token: 'admin-token'
    },
    code: 20000
  })
})

router.post('/add', function (req, res, next) {
  var checksql = "Select * From user where Uname = '" + req.body.username + "'"
  conn.query(checksql, [], function (error, result, Fields) {
    if (result.length > 0) {
      res.json({
        data: 'failed',
        code: 50002
      })
    } else {
      var sql = "insert into user(Uname,Upassword,Usex,Uphone,Upermission) values (?,?,?,?,?)"
      var params = [req.body.username, req.body.password, req.body.sex, req.body.phone, req.body.permission]
      console.log(params)
      conn.query(sql, params, function (error, result, Fields) {
        if (error) {
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
})
module.exports = router