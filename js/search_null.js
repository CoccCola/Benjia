var oInput=document.querySelector('.search-box input');
var oSearchBtn=document.querySelector('.search-box button');

//搜索
oSearchBtn.addEventListener('click',function(){
    var keyword=oInput.value;
    if(keyword===""){alert("请输入搜索内容");return;}
    location.assign(`./goods_list.html?keyword=${keyword}`);
});
