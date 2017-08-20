module.exports = (app, sql, paras, callback) => {
  var pool = app.get('mysql_pool');
  pool.getConnection((err, connection) => {
    connection.query(sql, paras, (err, results, fields)=> {
      callback(results, fields);
      connection.release();
      if(err)
        throw error;
    })
  })
}