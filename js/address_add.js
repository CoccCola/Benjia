var oProvince = document.querySelector('select[name="province_id"]');
var oCity = document.querySelector('select[name="city_id"]');
var oCounty = document.querySelector('select[name="county_id"]');
var oTown = document.querySelector('select[name="town_id"]');
/*获取省份*/
axios.get('/pcct/province')
    .then(function (response) {
        if (response.status) {
            var html = ``;
            response.data.forEach(function (item) {
                html += `<option value="${item.province_id}">${item.name}</option>`;
            });
            oProvince.innerHTML = html;
            oProvince.trigger("change");
        }
    });
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
            }
        });
});

var oAddButton = document.querySelector('.save-button');
var oForm = document.querySelector('.address_form');



oAddButton.addEventListener('click', function () {
    var data = serialize(oForm);
    data.isDefault = data.isDefault ? 1 : 0;
    /*发送axios*/
    axios.post('/address/add',data)
        .then(function (response) {
            if (response.status) {
                location.replace("../address_list.html");
            } else {
                alert(response.msg);
            }
        })
});

