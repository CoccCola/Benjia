var sta = params("status");
var back = params("back");
var btnLText = "";
var btnRText = "";

function pd(sta) {
    var oNavs = document.querySelectorAll('.nav li');
    oNavs.forEach(function (item) {
        item.classList.remove("selected");
    });
    switch (sta) {
        case "0":
            btnLText = "取消订单";
            btnRText = "立即付款";
            var oNav = document.querySelector('.nav li:nth-child(1)');
            oNav.classList.add("selected");
            break;
        case "3":
            btnLText = "取消订单";
            btnRText = "催促发货";
            var oNav = document.querySelector('.nav li:nth-child(2)');
            oNav.classList.add("selected");
            break;
        case "4":
            btnLText = "查看物流";
            btnRText = "确认收货";
            var oNav = document.querySelector('.nav li:nth-child(3)');
            oNav.classList.add("selected");
            break;
        case "5":
            btnLText = "再次购买";
            btnRText = "立即评价";
            var oNav = document.querySelector('.nav li:nth-child(4)');
            oNav.classList.add("selected");
            break;
        default:
            break;
    }
}

pd(sta);

var oOrderList = document.querySelector('.order_list');
/*发送axios*/
axios.get('/order/list', { params: { status: sta } })
    .then(function (response) {
        if (response.status) {
            var orders = ``;
            response.data.forEach(function (item) {
                var allCount = 0;
                var order = `<li class="item">
            <div class="top">
                <div class="unpaidText">${item.status}</div>
                <div class="time">${item.create_time}</div>
            </div>`;
                item.goodsList.forEach(function (sub_item) {
                    allCount += sub_item.goods_num;
                    order += `<a href="./goods_detail.html?id=${sub_item.id}" class="goods">
                <img src="${sub_item.img_md}" alt="">
                <div class="detail">
                    <div class="name">${sub_item.name}</div>
                    <div class="style-box">
                        <div class="style">容量30L</div>
                        <div class="sub-price">￥${sub_item.goods_price}</div>
                    </div>
                    <div class="count-box"><span>×</span><span class="sub-count">${sub_item.goods_num}</span></div>
                </div>
            </a>`;
                });
                order += `<div class="statistics">
                <span>共</span><span class="count">${allCount}</span><span>件商品 &nbsp;合计：</span><span class="price">￥${item.payment.toFixed(2)}</span>
            </div>
            <div class="button-box">
                <div class="cancel">${btnLText}</div>
                <div class="pay">${btnRText}</div>
            </div>`;
                orders += order;
            });
            oOrderList.innerHTML = orders;
        }
    })

var oItem = document.querySelectorAll('.nav .item');
oItem.forEach(function (item) {
    item.addEventListener('click', function () {
        /*发送axios*/
        pd(item.dataset.sta);
        axios.get('/order/list', { params: { status: item.dataset.sta } })
            .then(function (response) {
                if (response.status) {
                    var orders = ``;
                    response.data.forEach(function (item) {
                        var allCount = 0;
                        var order = `<li class="item">
                        <div class="top">
                            <div class="unpaidText">${item.status}</div>
                            <div class="time">${item.create_time}</div>
                        </div>`;
                        item.goodsList.forEach(function (sub_item) {
                            allCount += sub_item.goods_num;
                            order += `<a href="./goods_detail.html?id=${sub_item.id}" class="goods">
                            <img src="${sub_item.img_md}" alt="">
                            <div class="detail">
                                <div class="name">${sub_item.name}</div>
                                <div class="style-box">
                                    <div class="style">容量30L</div>
                                    <div class="sub-price">￥${sub_item.goods_price}</div>
                                </div>
                                <div class="count-box"><span>×</span><span class="sub-count">${sub_item.goods_num}</span></div>
                            </div>
                        </a>`;
                        });
                        order += `<div class="statistics">
                            <span>共</span><span class="count">${allCount}</span><span>件商品 &nbsp;合计：</span><span class="price">￥${item.payment.toFixed(2)}</span>
                        </div>
                        <div class="button-box">
                            <div class="cancel">${btnLText}</div>
                            <div class="pay">${btnRText}</div>
                        </div>`;
                        orders += order;
                    });
                    oOrderList.innerHTML = orders;
                }
            })
    });
});




/*添加气泡*/
axios.get('/order/list', { params: { status: 0 } })
    .then(function (response) {
        if (response.status) {
            if (response.total != 0) {
                var oBubble = document.querySelector('.nav li:nth-child(1) .bubble');
                oBubble.innerText = `${response.total}`;
                oBubble.style.display = "block";
            }
        } else {

        }
    })
axios.get('/order/list', { params: { status: 3 } })
    .then(function (response) {
        if (response.status) {
            if (response.total != 0) {
                var oBubble = document.querySelector('.nav li:nth-child(2) .bubble');
                oBubble.innerText = `${response.total}`;
                oBubble.style.display = "block";
            }
        } else {

        }
    })
axios.get('/order/list', { params: { status: 4 } })
    .then(function (response) {
        if (response.status) {
            if (response.total != 0) {
                var oBubble = document.querySelector('.nav li:nth-child(3) .bubble');
                oBubble.innerText = `${response.total}`;
                oBubble.style.display = "block";
            }
        } else {

        }
    })

axios.get('/order/list', { params: { status: 5 } })
    .then(function (response) {
        if (response.status) {
            if (response.total != 0) {
                var oBubble = document.querySelector('.nav li:nth-child(5) .bubble');
                oBubble.innerText = `${response.total}`;
                oBubble.style.display = "block";
            }
        } else {

        }
    })

/* 返回按钮 */
var oBack = document.querySelector('.arrow-left');
oBack.addEventListener('click', function () {
    if (back == 1) {
        location.assign("./user_center.html");
    } else if (back == 0) {
        location.assign("./cart.html");
    }
});


