var oProductList = document.querySelector('.product_list');
var id = params("id");
var level = params("level");
var keyword = params("keyword");
var oInput=document.querySelector('.search-box input');
var oSearchBtn=document.querySelector('.search-box button');

//搜索
oSearchBtn.addEventListener('click',function(){
    var keyword=oInput.value;
    if(keyword===""){alert("请输入搜索内容");return;}
    location.assign(`./goods_list.html?keyword=${keyword}`);
});

//渲染函数
function render(response) {
    if (response.status) {
        response.data.forEach(function (item) {
            var goods = `
                <li class="item">
                    <a href="./goods_detail.html?id=${item.id}">
                        <img src="${item.img_md}" alt="">
                        <div class="detail">
                            <div class="name">${item.name}</div>
                            <div class="introduce">${item.hotPoint}</div>
                            <div class="price"><span>￥</span>${item.price}</div>
                        </div>
                    </a>					
                </li>`;
            oProductList.insertAdjacentHTML("beforeend", goods);
        });
    } else {
        alert(response.msg);
    }
}

/*发送axios*/
if (keyword === null) {
    axios.get('/goods/list', { params: { pageSize: 10, pageIndex: 1, cate_id: id, cate_level: level } })
        .then(function (response) {
                render(response);
        })
} else {
    axios.get('/goods/list', { params: { pageSize: 10, pageIndex: 1, keyword:keyword } })
        .then(function (response) {
            if (response.status) {
                if(response.data.length===0){
                    location.replace("./search_null.html");
                }
                render(response);
            } else {
                alert(response.msg);
            }
        })
}



