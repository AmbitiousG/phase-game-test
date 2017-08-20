var express = require('express');
var router = express.Router();
var query_sp = require('../../db/query_sp');
var _ = require('lodash')

/* get list. */
router.post('/getCategories', function(req, res) {
  // console.log(req.ips);
  var data = req.body;
  var user = req.user;
  var spParas = [user.id];
  query_sp(req.app, 'usp_GetPreparedData', spParas, (results, fields) => {
    // res.json({results, fields});
    var categories = results[0];
    res.json({
      Success: true,
      Categories: categories
    })

  })
});

module.exports = router;
