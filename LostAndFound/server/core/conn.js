let mysql = require('mysql')
var mysqlConfig = require('./mysqlConfig')

module.exports = {
	query : function (sql, params, callback) {
		//每次使用的时候需要创建链接，数据操作完成之后要关闭连接
        var connection = mysql.createConnection(mysqlConfig);        
        connection.connect(function(error){
            if(error){
                console.log('数据库链接失败');
                throw error;
            }
         //开始数据操作
         //传入三个参数，第一个参数sql语句，第二个参数sql语句中需要的数据，第三个参数回调函数
        connection.query( sql, params, function(error,results,fields ){
           if(error){
                console.log('数据操作失败');
                throw error;
            }
            //将查询出来的数据返回给回调函数
            callback && callback(error, results, fields);
            //results作为数据操作后的结果，fields作为数据库连接的一些字段
            //停止链接数据库，必须再查询语句后，要不然一调用这个方法，就直接停止链接，数据操作就会失败
             connection.end(function(error){
                  if(error){
                      console.log('关闭数据库连接失败！');
                      throw error;
                  }
              });
           });
    	});
	}
}