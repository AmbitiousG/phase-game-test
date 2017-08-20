var _ = require('lodash');

module.exports = (app, spName, paras, callback) => {
  var pool = app.get('mysql_pool');
  var strParas = _.trimEnd(_.repeat('?,', paras.length), ',');
  var options = {
    sql: `CALL ${spName}(${strParas})`,
    // nest
  };

  pool.getConnection((err, connection) => {
    connection.query(options, paras, (err, results, fields)=> {
      callback(results, fields);
      connection.release();
      if(err)
        throw error;
    })
  })
}
