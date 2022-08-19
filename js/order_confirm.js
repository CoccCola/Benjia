var gids = params("gids").split(",");
var ids = params("ids").split(",");
var oAddress = document.querySelector('.address');
var oGoodsList = document.querySelector('.goods-list');
var lastPrice;

axios.post('/order/settle', { goods: gids })
    .then(function (response) {
        if (response.status) {
            if (response.data.address) {
                var temp = response.data.address;
                var defAddress = `<img src="./img/order_confirm/border.jpg" alt="">
                <div class="top" data-id="${temp.id}">
                    <div class="name">${temp.name}</div>
                    <div class="right">
                        <div class="tel">${temp.tel}</div>
                        <div class="default">默认</div>
                    </div>
                </div>
                <div class="detail">${temp.province_name}${temp.city_name}${temp.county_name}${temp.street}${temp.town_name}</div>`
                oAddress.innerHTML = defAddress;
            } else {
                var defAddress = `<img src="./img/order_confirm/border.jpg" alt="">
			<a class="null" href="./address_list.html?redirect=confirm-order" >
				请选择收货地址
			</a>`;
                oAddress.innerHTML = defAddress;
            }
            var goods = ``;
            response.data.goods.forEach(function (item) {
                goods += `<li class="item" data-id="${item.id}" >
                        <div class="img-box"><img src="${item.img_md}" alt=""></div>
                        <div class="text">
                            <div class="name">${item.name}</div>
                            <div class="style">神秘灰<span class="count" data-num="${item.goods_num}">× ${item.goods_num}</span></div>
                            <div class="price">￥${(item.price * item.goods_num).toFixed(2)}</div>
                        </div>
                    </li>`
            });
            oGoodsList.innerHTML = goods;
            init();
            addressSelect();
        } else {
            alert(response.msg);
        }
    })

//地址更新
function addressSelect() {
    if (sessionStorage.addressId) {
        /*发送axios*/
        axios.get('/address', { params: { id: sessionStorage.addressId } })
            .then(function (response) {
                if (response.status) {
                    var defAddress = `<img src="./img/order_confirm/border.jpg" alt="">
                    <div class="top" data-id="${response.data.id}">
                        <div class="name">${response.data.name}</div>
                        <div class="right">
                            <div class="tel">${response.data.tel}</div>
                            ${response.data.isDefault === 1 ? '<div class="default">默认</div>' : ``} 
                        </div>
                    </div>
                    <div class="detail">${response.data.province_name}${response.data.city_name}${response.data.county_name}${response.data.street}${response.data.town_name}</div>`
                    oAddress.innerHTML = defAddress;
                } else {
                    alert(response.msg);
                }
            })
        sessionStorage.removeItem("addressId");
    }
}



//初始化-修改页面价格
function init() {
    var oGoodsPrice = document.querySelector('.total .price');
    var oLastPrice = document.querySelector('.submit .price');
    var oItem = document.querySelectorAll('.item .price');
    var oFreight = document.querySelector('.freight .price');
    var goodsPrice = 0;
    var freight = parseFloat(oFreight.innerText.slice(1));
    
    oItem.forEach(function (item) {
        goodsPrice += parseFloat(item.innerText.slice(1));
    });
    lastPrice = (goodsPrice + freight).toFixed(2);
    oGoodsPrice.innerText = `￥${goodsPrice.toFixed(2)}`;
    oLastPrice.innerText = `￥${lastPrice}`;
}

//下单（删除购物车下单商品）
var oBuyBtn = document.querySelector('.button');
oBuyBtn.addEventListener('click', function () {
    var addressId=parseInt(document.querySelector('.top').dataset.id);
    var oItem=document.querySelectorAll('.item');
    var goodsList=[];
    oItem.forEach(function(item){
       var tempid=parseInt(item.dataset.id);
       var tempNum=parseInt(item.querySelector(".count").dataset.num);
       goodsList.push({id:tempid,num:tempNum});
    });
    /*发送axios*/
    axios.post('/order/create', {
        payment:parseInt(lastPrice),
        addressId:addressId,
        goodsList:goodsList
    }).then(function (response) {
        if (response.status) {
            alertDemo();
            setTimeout(back, 1000);
        } else {

        }
    })
});




function back() {
    location.assign("./orders.html?status=0&back=0");
}
function alertDemo() {
    SoloAlert.alert({
        title: "",
        body: "下单成功",
        icon: "success",
        theme: "light",

        // onOk: ()=>{location.assign("./cart.html");}
    });
}