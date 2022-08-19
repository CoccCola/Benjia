/* 点击交互事件 */
var oBuy = document.querySelectorAll(".oBuy");
var oBuyWindow = document.querySelector(".buy-window");
var oCancel = document.querySelector(".cancel");
var oGoods = document.querySelector(".goodsbtn");
var oDetailbtn = document.querySelector(".detailbtn");
var oColor = document.querySelectorAll(".color li");
var oSize = document.querySelectorAll(".size li");
var oSub = document.querySelector(".sub");
var oAdd = document.querySelector(".add");
var oCount = document.querySelector(".count_control input");
var oConfirm = document.querySelector('.confirm');


// 初始化选择
oGoods.classList.add("selected");
var colorSelected = oColor[0];
var sizeSelected = oSize[0];
colorSelected.classList.add("selected_option");
sizeSelected.classList.add("selected_option");

oGoods.addEventListener("click", function () {
	this.classList.add("selected");
	oDetailbtn.classList.remove("selected");
});
oDetailbtn.addEventListener("click", function () {
	this.classList.add("selected");
	oGoods.classList.remove("selected");
});
oBuy.forEach(function (item) {
	item.addEventListener("click", function () {
		oBuyWindow.style.display = "block";
	});
});
oCancel.addEventListener("click", function () {
	oBuyWindow.style.display = "none";
});

oColor.forEach(function (item) {
	item.addEventListener("click", function () {
		colorSelected.classList.remove("selected_option");
		this.classList.add("selected_option");
		colorSelected = this;
	});
});
oSize.forEach(function (item) {
	item.addEventListener("click", function () {
		sizeSelected.classList.remove("selected_option");
		this.classList.add("selected_option");
		sizeSelected = this;
	});
});
oSub.addEventListener("click", function () {
	var count = oCount.value;
	if (count >= 2) {
		count--;
	}
	oCount.value = count;

});
oAdd.addEventListener("click", function () {
	var count = oCount.value;
	count++;
	oCount.value = count;
});



var id = params("id");
var oSwiperWrapper = document.querySelector('.swiper-wrapper');
var oLeft = document.querySelector('.left');
var oDetailData = document.querySelector('.detail_data');
var oAddCart = document.querySelector('.buy-window .data');
var oCollect = document.querySelector('.coll');
var discount = 0;
var isCollected;
var uid = sessionStorage.id;
/*发送axios*/
axios.get('/goods/detail', { params: { id: id, uid: uid } })
	.then(function (response) {
		if (response.status) {
			//轮播图
			var sliders = ``;
			var slidersImgs = response.data.slider.split(",");
			slidersImgs.forEach(function (item) {
				sliders += `
			<div class="swiper-slide">
				<img class="goodspic" src="${item}" alt=""> 
			</div>`;
			});
			oSwiperWrapper.innerHTML = sliders;
			setSwiper();
			//信息
			oLeft.innerHTML = `<div class="name">${response.data.name}</div>
					<div class="introduce">${response.data.hotPoint}</div>
					<div class="price">￥${response.data.price}</div>`;
			//详情
			oDetailData.innerHTML = `${response.data.detail}`;
			//加购页
			oAddCart.innerHTML = `<img src="${response.data.img_md}" alt="">
					<div>
						<div class="price">价格：￥${response.data.price}</div>
						<div class="text">请选择规格属性</div>
					</div>`;
			discount = response.data.discount;
			isCollected = response.data.isCollected;
			if (isCollected) {
				oCollect.innerHTML = `<img src="./img/goods_detail/collection_a.png" alt="">`;
			}
			//评价图
			var oEvalImg=document.querySelector('.eval_list .img-box');
			oEvalImg.innerHTML=`<img src="${response.data.img_md}" alt="">`;
			
		} else {
			alert(response.msg);
		}
	})

//添加到购物车确定按钮
oConfirm.addEventListener('click', function () {
	var count = oCount.value;
	/*发送axios*/
	axios.post('/cart/add', {
		num: count,
		gid: id
	}).then(function (response) {
		if (response.status) {
			oBuyWindow.style.display = "none";
			alert("商品已添加到购物车");
		} else {
			alert(response.msg);
		}
	})

});

//设置轮播图函数
function setSwiper() {
	var swiper = new Swiper('.swiper', {
		keyboard: true,
		virtualTranslate: true,
		on: {
			setTranslate: function () {
				this.$wrapperEl.transition('')
				TweenMax.to(this.$wrapperEl, 1.5, { x: this.translate, ease: Power4.easeOut })

			}
		},
		pagination: {
			el: '.swiper-pagination',
			type: "fraction",
		},
	});
}


//加入/取消收藏
oCollect.addEventListener('click', function () {
	if (!isCollected) {
		/*发送axios*/
		axios.post('/collection/add', {
			id: id
		}).then(function (response) {
			if (response.status) {
				oCollect.innerHTML = `<img src="./img/goods_detail/collection_a.png" alt="">`;
				isCollected = true;
				alert("收藏成功");
			} else {
				alert(response.msg);
			}
		})
	} else {
		if (confirm("确定要取消收藏吗？")) {
			/*发送axios*/
			axios.post('/collection/remove', {
				id: id
			}).then(function (response) {
				if (response.status) {
					oCollect.innerHTML = `<img src="./img/goods_detail/collection.png" alt="">`;
					isCollected = false;
					alert("取消收藏成功！");
				} else {
					alert(response.msg);
				}
			})
		}
	}
});
