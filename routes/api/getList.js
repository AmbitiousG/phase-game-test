var express = require('express');
var router = express.Router();
var query_sp = require('../../db/query_sp');
var _ = require('lodash');
var moment = require('moment');

/* get list. */
router.post('/getList', function(req, res) {
  var data = req.body;
  var user = req.user;
  var paras = [user.id];
  paras.push(-1);//CategoryID
  paras.push(-1);//RecordType
  paras.push('');//pFrom
  paras.push('');//pTo
  paras.push(1);//PageIndex
  paras.push(50);//PageSize
  query_sp(req.app, 'usp_GetRecords', paras, (results, fields) => {
    var records = results[0];
    _.each(records, r => {
      r.RecordDate = moment(r.RecordDate).format('YYYY-MM-DD HH:mm:ss');
    });
    res.json({
      Success: true,
      Records: records,
    });
  })
});

module.exports = router;
