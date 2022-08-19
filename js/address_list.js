var oAddressList = document.querySelector('.address-list');

axios.get("/address/list")
	.then(function (response) {
		if (response.status) {
			var address=``;
			response.data.forEach(function (item) {
				address += `<li>
				<div class="info" data-id="${item.id}">
					<div class="top">
						<span class="name">${item.name}</span>
						<span class="tel">${item.tel}</span>
						${item.isDefault === 1 ? '<div class="default">默认</div>' : ''}
					</div>
					<div class="detail">
                    ${item.province_name}${item.city_name}${item.county_name}${item.town_name}${item.street}
					</div>
				</div>
				<a href="./address_edit.html?id=${item.id}"><img class="edit" src="./img/address/edit.png" alt=""></a>
				<img class="remove" data-id="${item.id}" src="./img/address/remove.png" alt="">
			    </li>`;
				
			});
			oAddressList.insertAdjacentHTML("beforeend", address);
			init();
		}
	})

/* 地址删除 */
oAddressList.addEventListener('click', function (e) {
	if (e.target.matches('.remove')) {
		var isConfirm = confirm("确定要删除吗？");
		if (isConfirm) {
			var id = e.target.dataset.id;
			/*发送axios*/
			axios.post('/address/remove', {
				id: id
			}).then(function (response) {
				if (response.status) {
					e.target.closest('li').remove();
				} else {
					alert(response.msg);
				}
			})
		}
	}
});

function init(){
	//选择地址
	var ifBack=params("redirect");
	var oInfo=document.querySelectorAll('.info');
	oInfo.forEach(function(item){
		item.addEventListener('click',function(){
			if(ifBack==="confirm-order"){
				sessionStorage.addressId=item.dataset.id;
				console.log("nihao ");				
				 history.back();
			}
		});
	});
	
		
}
