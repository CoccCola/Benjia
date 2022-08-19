var oProductList=document.querySelector('.product_list');

/*发送ajax*/
//1.创建ajax实例
var ajax=new XMLHttpRequest();
//2.初始化请求
ajax.open('GET','http://localhost:3002/goods/list?pageSize=10&pageIndex=2');
//3.发送请求
ajax.send();
//4.监听readyState
ajax.addEventListener('readystatechange',function(){
    if(ajax.readyState===4){
        var res=JSON.parse(ajax.responseText);
        if(res.status){
            res.data.forEach(function(item){
                var goods=`
                <li class="item">
                    <a href="#">
                        <img src="${item.img_md}" alt="">
                        <div class="detail">
                            <div class="name">${item.name}</div>
                            <div class="introduce">${item.hotPoint}</div>
                            <div class="price"><span>￥</span>${item.price}</div>
                        </div>
                    </a>					
                </li>`;
                oProductList.insertAdjacentHTML("beforeend",goods);  
            });
        }else{
            
        }
    }
});
