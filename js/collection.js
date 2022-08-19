var oCollectionsList = document.querySelector('.collections');

/*发送axios*/
axios.get('/collection/list')
    .then(function (response) {
        if (response.status) {
            var items = ``;
            response.data.forEach(function (item) {
                items += `<li class="item relative" data-id=${item.goods_id}>
				<a href="./goods_detail.html?id=${item.goods_id}">
					<img src="${item.img_md}" alt="">
					<div class="name">${item.name}</div>
					<div class="introduce">${item.hotPoint ? item.hotPoint : "暂无简介"}</div>
					<div class="price">￥${item.price}</div>
					
				</a>
                <img class="cancel" src="./img/collection/cancelcoll.png" alt="">
			</li>`;
            });
            oCollectionsList.innerHTML = items;


        } else {
            alert(response.msg);
        }
    })

oCollectionsList.addEventListener('click', function (e) {
    e.stopPropagation();
    if (e.target.matches(".cancel")) {
        if (confirm("确定要取消收藏吗？")) {
            var id = e.target.closest("li").dataset.id;
            console.log(id);
            axios.post('/collection/remove', {
                id: id
            }).then(function (response) {
                if (response.status) {
                    e.target.closest("li").remove();
                    alert("取消收藏成功！");
                } else {
                    alert(response.msg);
                }
            })
        }
    }
});
