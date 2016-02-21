/*
 * query操作
 * */

var serialize = function(o){
  var s = [];
  for(var k in o){
    var value = o[k];
    if(value !== undefined) {
      s.push(k + '=' + value);
    } else {
      s.push(k); 
    }
  }
  return s.join('&');
};

var getQueryObject = function(query) {
  var arrQuery = query.split('&')
  , oQuery = {};
  for(var i = 0, ii = arrQuery.length; i < ii; i++) {
    var arrTmp = arrQuery[i].split('=');
    oQuery[arrTmp[0]] = arrTmp[1];
  }
  return oQuery;
}

return {
  get: function(name) {
    var oQuery = getQueryObject(location.search.slice(1));
    return oQuery[name];
  },
  /*
   * key:如果是对象，直接序列化
   * */
  /**
  * 增加query，新的key会覆盖旧的key
  * @key {Object || String}，Object：直接序列化，String，需要增加value参数
  */
  add: function(url, key, vaule) {
    var queryArr = url.split('?');
    var query;
    // 统一成Object形式处理
    if(typeof key === 'string') {
      var cloneKey = {};
      cloneKey[key] = vaule;
      key = cloneKey;
    }
    // 只对新增的query做encode处理，原有的url param不处理
    for(var i in key) {
      key[i] = encodeURIComponent(key[i])
    }
    if(queryArr.length === 1) {
      query = serialize(key);
    } else {
      var oQuery = getQueryObject(queryArr[1]);
      for(var i in key) {
        oQuery[i] =  key[i];
      }
      query = serialize(oQuery);
    }
    return queryArr[0] + '?' + query;
  }
}