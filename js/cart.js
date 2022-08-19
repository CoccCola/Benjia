var oRemoves;
var oSub;
var oAdd;
var oSelectBox;
var oSelectAll = document.querySelector('.selectAll');
var oSumPrice = document.querySelector('.total .price');
var oBuyButton = document.querySelector('.buy_button');
var oCartList = document.querySelector('.cart-list');

//获取列表
axios.get('/cart/list')
    .then(function (response) {
        if (response.status) {
            
            var listItem = ``;
            if(response.data.length===0){
                listItem = `<div class="null">购物车为空，快去添加喜欢的商品吧</div>`
            }
            response.data.forEach(function (item) {
                listItem += `<li class="relative" data-id="${item.id}" data-gid="${item.goods_id}" >
				<input class="select-box" type="checkbox">
				<a href="./goods_detail.html?id=${item.goods_id}"><img class="photo" src="${item.img}" alt=""></a>
				<div class="info">
					<div class="top">
						<div class="name">${item.name}</div>
						<div class="style">1.8M;米白色</div>
					</div>
					<div class="bottom">
						<span class="price">￥${item.price}</span>
						<div class="num">
							<span class="left">-</span>
							<input type="number" value="${item.goods_num}">
							<span class="right">+</span>
						</div>
					</div>
				</div>
				<img class="remove" src="./img/cart/remove.png" alt="">
			</li>`;
            });
            oCartList.innerHTML = listItem;
            oRemoves = document.querySelectorAll('.remove');
            oSub = document.querySelectorAll('.num .left');
            oAdd = document.querySelectorAll('.num .right');
            oSelectBox = document.querySelectorAll('.select-box');
            bind();
            sumPrice();
            oSelectAll.checked = ifSelectAll();
        } else {
            alert(response.msg);
        }
    })

function bind() {
    /* 选择 */
    oSelectAll.addEventListener('click', function () {
        oSelectBox.forEach(function (item) {
            item.checked = oSelectAll.checked;
        });
        sumPrice();
    });

    oSelectBox.forEach(function (item) {
        item.addEventListener('click', function () {
            oSelectAll.checked = ifSelectAll();
            sumPrice();
        });
    });

    /* 增加减少 */
    oSub.forEach(function (item) {
        item.addEventListener('click', function () {
            var oCount = item.nextElementSibling;
            var count = parseInt(oCount.value);
            if (count >= 2) {
                count--;
                var id = this.closest("li").dataset.id;
                /*发送axios*/
                axios.post('/cart/decrease', {
                    id: id
                }).then(function (response) {
                    if (response.status) {
                        oCount.value = count;
                        sumPrice();
                    } else {
                        alert(response.msg);
                    }
                })
            }
        });
    });
    oAdd.forEach(function (item) {
        item.addEventListener('click', function () {
            var oCount = item.previousElementSibling;
            var count = parseInt(oCount.value);
            count++;
            var id = this.closest("li").dataset.id;
            var gid = this.closest("li").dataset.gid;
            /*发送axios*/
            axios.post('/cart/increase', {
                id: id,
                gid: gid
            }).then(function (response) {
                if (response.status) {
                    oCount.value = count;
                    sumPrice();
                } else {
                    alert(response.msg);
                }
            })
        });
    });

    /* 删除商品 */
    oRemoves.forEach(function (item) {
        item.addEventListener('click', function () {
            confirm("确定要将此商品从 购物车删除吗？")
            var id = this.closest("li").dataset.id;
            /*发送axios*/
            axios.post('/cart/remove', {
                id: id
            }).then(function (response) {
                if (response.status) {
                    item.closest("li").remove();
                    oSelectAll.checked = ifSelectAll();
                    sumPrice();
                } else {
                    alert(response.msg);

                }
            })

        });
    });

    //结算
    var oBuy = document.querySelector('.buy_button');
    oBuy.addEventListener('click', function () {
        var oItem = document.querySelectorAll('.select-box:checked');
        if(oItem.length===0){
            alert("请先选择至少一件购物车里的商品！");
            return;
        }
        var gidArr = [];
        var idArr = [];
        oItem.forEach(function (item) {
            gidArr.push(item.closest("li").dataset.gid);
            idArr.push(item.closest("li").dataset.id);
        });
        location.assign(`./order_confirm.html?gids=${gidArr}&ids=${idArr}`);
    });

}



/* 总价计算 */
function sumPrice() {
    var price = 0;
    var oSelected = document.querySelectorAll('.select-box:checked');
    oSelected.forEach(function (item) {
        var temp = item.closest("li").querySelector(".price");
        var count = item.closest("li").querySelector(".num input").value;
        var sub_price = parseFloat(temp.innerText.slice(1));
        price += sub_price * count;
    });
    price = price.toFixed(2);
    oSumPrice.innerText = `￥${price}`;
    if (price === "0.00") {
        oBuyButton.classList.add("null");
    } else {
        oBuyButton.classList.remove("null");
    }
}



//判断是否全选函数
function ifSelectAll() {
    var numOfSelected = document.querySelectorAll('.select-box:checked').length;
    var numOfAll = document.querySelectorAll('.select-box').length;
    if (numOfAll == 0) {
        return false;
    }
    return (numOfSelected === numOfAll);
}






