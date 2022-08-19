var oCategoryList = document.querySelector('.category_list');
var oTitle = document.querySelector('.title');
var oSubList = document.querySelector('.sub_list');
var selected;
// 获取数据
/*发送axios*/
axios.get("/category/sub", { params: { pId: 1 } })
	.then(function (response) {
		if (response.status) {
			var category="";
			response.data.forEach(function (item) {
				category += `<li data-pid="${item.id}" class="${item.id === 2 ? 'item relative selected':'item relative'}" >${item.name}</li>`;
				oCategoryList.innerHTML=category;
				selected=document.querySelector('.selected');
			});
			getSubCategory(2,selected);
		} else {
			alert(response.msg);
		}
	})
//获取子分类函数
function getSubCategory(pId,e){
	axios.get("/category/sub",{params:{pId:pId}})
			.then(function(response){
				if(response.status){
					oTitle.innerText=`${e.innerText}分类`;
					var subCategory="";		
					if(response.data.length===0){
						subCategory="<li class='null'>暂无数据</li>";
					}					
					response.data.forEach(function (item) {
						subCategory += `<li class="item">
						<a href="./goods_list.html?id=${item.id}&level=2">
							<img src="${item.img}" alt="">
							<div class="name">${item.name}</div>
						</a>
					</li>`;					
					});
					oSubList.innerHTML=subCategory;
				}else{
					alert(response.msg);
				}
			})
}

//左侧栏点击事件
oCategoryList.addEventListener("click", function (e) {
	if (e.target.matches("li")) {
		//左侧选中分类样式
		selected.classList.remove("selected");
		e.target.classList.add("selected");
		selected = e.target;
		//请求子分类
		getSubCategory(e.target.dataset.pid,e.target);
	}
});