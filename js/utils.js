/* 表单序列化--提取表单value */
//参数form：form内元素
function serialize(form){
    var obj={};
    var formData=new FormData(form);
    for(var iterator of formData ){
        var value=iterator[1].trim();
        if(value){
            obj[iterator[0]]=iterator[1];
        }
    }
    return obj;
}

/* 获取路由参数---兼容IE */
function query(key) {
    // 切除问号前面的字符
    var params = location.search.slice(1);
    // string => array
    var arr = params.split('&');
    // 遍历数组
    var result = {};
    arr.forEach(function (item) {
        var temp = item.split('=');
        result[temp[0]] = temp[1];
    });
    return result[key];
}

/* 获取路由参数---IE不支持 */
function params(key) {
    return new URLSearchParams(location.search).get(key);
}

/* 给所有element元素添加trigger方法 */
Element.prototype.trigger = function (eventName) {
    this.dispatchEvent(new Event(eventName));
}