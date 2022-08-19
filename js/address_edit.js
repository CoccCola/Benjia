var id=query("id");
var oName=document.querySelector('input[name="name"]');
var oTel=document.querySelector('input[name="tel"]');
var oStreet=document.querySelector('textarea[name="street"]');
var oCode=document.querySelector('input[name="code"]');
var oIsDefault=document.querySelector('input[name="isDefault"]');
var oProvince = document.querySelector('select[name="province_id"]');
var oCity = document.querySelector('select[name="city_id"]');
var oCounty = document.querySelector('select[name="county_id"]');
var oTown = document.querySelector('select[name="town_id"]');
var oTitle=document.querySelector('.title');

var temp;
var init=1;

/*监听省，获取市*/
oProvince.addEventListener('change', function () {
    //获取选中省份id
    var pid = this.value;
    //获取市
    axios.get('/pcct/city', { params: { id: pid } })
        .then(function (response) {
            if (response.status) {
                var html = ``;
                response.data.forEach(function (item) {
                    html += `<option value="${item.city_id}">${item.name}</option>`;
                });
                oCity.innerHTML = html;
                if(init===1){oCity.value=temp.city_id;}
                oCity.trigger("change");
            }
        });
});
/*监听市，获取区*/
oCity.addEventListener('change', function () {
    //获取选中省份id
    var cityid = this.value;
    //获取市
    axios.get('/pcct/county', { params: { id: cityid } })
        .then(function (response) {
            if (response.status) {
                var html = ``;
                response.data.forEach(function (item) {
                    html += `<option value="${item.county_id}">${item.name}</option>`;
                });
                oCounty.innerHTML = html;
                if(init===1){oCounty.value=temp.county_id;}
                oCounty.trigger("change");
            }
        });
});
/*监听区，获取街道*/
oCounty.addEventListener('change', function () {
    //获取选中省份id
    var countyid = this.value;
    //获取市
    axios.get('/pcct/town', { params: { id: countyid } })
        .then(function (response) {
            if (response.status) {
                var html = ``;
                response.data.forEach(function (item) {
                    html += `<option value="${item.town_id}">${item.name}</option>`;
                });
                oTown.innerHTML = html;
                if(init===1){oTown.value=temp.town_id;init=2;}
                // aaa();
            }
        });
});

/*获取省份及触发连锁取地址函数*/
function getAddress(){
    axios.get('/pcct/province')
    .then(function (response) {
        if (response.status) {
            var html = ``;
            response.data.forEach(function (item) {
                html += `<option value="${item.province_id}">${item.name}</option>`;
            });
            oProvince.innerHTML = html;
            if(init===1){oProvince.value=temp.province_id;}
            oProvince.trigger("change");
        }
    });
}

//获取地址详情
axios.get("/address",{params:{id:id}})
    .then(function(response){
        if(response.status){
            //还原表单  
            temp=response.data; 
            oName.value=temp.name;
            oStreet.value=temp.street;
            oTel.value=temp.tel;
            oCode.value=temp.code;
            oIsDefault.checked=temp.isDefault?true:false;
            getAddress();
        }
        else{
            alert(response.msg);
        }
    })

//修改按钮
var oSaveButton=document.querySelector('.save-button');
var oForm = document.querySelector('.address_form');
oSaveButton.addEventListener('click', function () {
    var data = serialize(oForm);
    data.id=id;
    data.isDefault = data.isDefault ? 1 : 0;
    /*发送axios*/
    axios.post('/address/edit',data)
        .then(function (response) {
            if (response.status) {
                alert(response.msg);
                
                location.replace("../address_list.html");
            } else {
                alert(response.msg);
            }
        })
});