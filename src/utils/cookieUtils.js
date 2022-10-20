 export var CookieUtils={
  //获取cookie
  getCookie:function(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return arr[2];
    else
      return null;
  },
  
  //设置cookie,增加到vue实例方便全局调用，以分钟为单位
  setCookie:function(c_name, value, expireMinutes) {
    var exdate = new Date();
    exdate.setMinutes(exdate.getMinutes() + expireMinutes);
    //如果是中文value,需要unescape转换
    // document.cookie = c_name + "=" + escape(value) + ((expireMinutes == null) ? "" : ";expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + value + ((expireMinutes == null) ? "" : ";expires=" + exdate.toUTCString());
  },
  
  //删除cookie
  delCookie:function(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(name);
    cval != null ? document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString() : ""
  }

};
