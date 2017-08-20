var express = require('express');
var router = express.Router();
var query_sp = require('../../db/query_sp');
var moment = require('moment');
var _ = require('lodash');

router.post('/save', (req, res, next) => {
  var user = req.user;
  var paras = [user.id];
  var ret = {
    Success: false,
    Error: '',
    RecordID: 0
  };
  var item = req.body.item;
  var datetime = moment(item.datetime);
  var category = parseInt(item.category);
  var recordType = parseInt(item.recordType);
  var amount = parseFloat(item.amount);
  var desc = _.trim(item.desc);
  var memo = _.trim(item.memo);

//check valid
  if(!datetime.isValid()){
    ret.Error = 'Invalid date';
    res.json(ret);
  }
  else if(recordType != 0 && recordType != 1){
    ret.Error = 'Invalid Record type';
    res.json(ret);
  }
  else if(isNaN(category)){
    ret.Error = 'Invalid Category';
    res.json(ret);
  }
  else if(isNaN(amount) || amount == 0){
    ret.Error = 'Invalid Amount';
    res.json(ret);
  }
  else if(desc == ''){
    ret.Error = 'Empty Desc';
    res.json(ret);
  }
  else {
    // pUserID
    // pCategoryID
    // pRecordType
    // pAmount
    // pMemo
    // pDescription
    // pRecordDate
    paras = _.concat(paras, [category, recordType, amount, memo, desc, datetime.format('YYYY-MM-DD HH:mm')]);
    query_sp(req.app, 'usp_SaveRecord', paras, (results, fields) => {
      ret.Success = true;
      ret.RecordID = results[0][0].RecordID;
      res.json(ret);
    })
  }
})

module.exports = router;
