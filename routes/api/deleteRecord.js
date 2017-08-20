var express = require('express');
var router = express.Router();
var query_sp = require('../../db/query_sp');

router.post('/deleteRecord', (req, res, next) => {
  var data = req.body;
  var user = req.user;
  var spParas = [user.id];
  spParas.push(data.recordID);
  query_sp(req.app, 'usp_DeleteRecord', spParas, (results, fields) => {
    res.json({
      success: true,
      // RecordID: results[0][0].RecordID
    });
  })
})

module.exports = router;
