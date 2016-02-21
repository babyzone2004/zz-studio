/**
 * 简单的模板引擎，会把{{}}里面的内容替换
 ** @param {dom} contain dom容器
 ** @param {String} tpl 模板
 ** @param {Array} list render的数组
 */
var render = function(opt) {
  var list = opt.list;
  var str = '';
  var tpl = opt.tpl;
  for (var i = 0, ii = list.length; i < ii; i++) {
    var data = list[i];
    var domStr = tpl.replace(/{{([^{}]+)}}/g, function(s0, s1) {
      // 如是是0，会转换为空
      var val = data[s1];
      if(val !== undefined) {
        val = val.toString();
      } else {
        val = '';
      }
      return val;
    });
    str += domStr;
  };
  try{
    opt.contain.innerHTML = str;
  } catch(e) {
    console.log(e);
  }
  
};

return render;