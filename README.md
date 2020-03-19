### express-mysql
nodejs, express, mysql, 记录一点点学习记录
### 本项目启动 命令
1. npm install
2. npm start

3. npm -g install supervisor  (调试，修改代码自动编译，不需要重新启动)
4. npm run dev



### 这个dome 使用的是express 官网 express 程序生成器创建的骨架
1. npm install express-generator -g  安装 express 命令工具
2. express --view=pug myapp  创建文件
3. cd myapp
4. npm install
5. package.json scripts  新增命令 --- "start": "node ./bin/www"
6. npm start
7. localhost:3000  访问

### 上面只是介绍 项目脚手架搭建，对于日常项目开发来说可能不是很够我们开发过程中我们需要的是更多的扩展

### 1：连接数据库mysql, 进行curd 操作
1. /db/db.sql  是新建数据库user
2. /db/index.js 是数据库连接信息和简单的 query 执行sql的方法封装

```javascript
var db = mysql.createPool({
  host: '127.0.0.1', // 数据库地址
  port: '3306', // 端口
  user: 'root', // 用户名称
  password: 'root', // 用户密码
  database: 'test' // 要链接的数据库名称
})

// sql相关
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
```

3. npm install mysql --save  安装mysql 依赖

4. /router/index  mysql -查询和新增
```javascript
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

```

### 持续更新中- 技术始于热爱，忠于实践
