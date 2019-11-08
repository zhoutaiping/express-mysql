var express = require('express')
var router = express.Router()
var DB = require('../db/index')
var resData = {
  code: 0,
  msg: ''
}

/* GET home page. */
router.get('/getUserAll', function(req, res, next) {
  // res.render('index', { title: 'Express', params: req.param });
  DB(`select * from user`, (error, results, fields) => {
    if (error) {
      res
        .status(500)
        .send({ code: 0, msg: 'database error' })
        .end()
    }
    if (results.length > 0) {
      res
        .status(200)
        .send({
          code: 1,
          msg: '操作成功!',
          total: results.length,
          data: results
        })
        .end()
    } else {
      res
        .status(200)
        .send({ code: 1, msg: '无数据 error', total: 0, data: [] })
        .end()
    }
  })
})
//TODO 同时支持get,post
router.post('/addUser', function(req, res, next) {
  // 获取前台页面传过来的参数
  var param = req.body
  // 建立连接，向表中插入值
  // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
  DB(
    `INSERT INTO user (name, age, status, description) \
     VALUES('${param.name}', '${param.age}', ${param.status}, '${param.desc}')`,
    (error, results, fields) => {
      if (error) {
        res
          .status(500)
          .send({ code: 0, msg: error })
          .end()
      }
      if (results) {
        res
          .status(200)
          .send({ code: 1, msg: '操作成功' })
          .end()
      } else {
        res
          .status(200)
          .send({ code: 0, msg: '操作失败' })
          .end()
      }
    }
  )
})

module.exports = router
