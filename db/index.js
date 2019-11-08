var mysql = require('mysql')

var db = mysql.createPool({
  host: '127.0.0.1', // 数据库地址
  port: '3306', // 端口
  user: 'root', // 用户名称
  password: 'root', // 用户密码
  database: 'test' // 要链接的数据库名称
})

// 查询相关
let query = (sql, callback) => {
  db.getConnection((err, conn) => {
    if (err) {
      callback(err, null, null)
    } else {
      conn.query(sql, (qerr, vals, fields) => {
        //释放连接
        conn.release()
        //事件驱动回调
        callback(qerr, vals, fields)
      })
    }
  })
}

module.exports = query // 暴露出这个接口
