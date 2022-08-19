var oPhoto = document.querySelector('.photo img');
var oNickname = document.querySelector('input[name="nickname"]');
var oSex = document.querySelectorAll('input[name="sex"]');
var oTel = document.querySelector('input[name="tel"]');

var avatarSrc;
/*获取资料*/
axios.get('/user/info')
    .then(function (response) {
        if (response.status) {
            oPhoto.setAttribute("src", response.data.avatar);
            avatarSrc = response.data.avatar;
            oNickname.value = response.data.nickname;
            oSex.forEach(function (item) {
                if (item.value === response.data.sex) {
                    item.checked = true;
                }
                else {
                    item.checked = false;
                }
            });
            oTel.value = response.data.tel;
        }
    })

/*上传头像*/
var oUploader = document.getElementById("uploader");
oUploader.addEventListener("change", function () {
    var file = this.files[0];
    var formData = new FormData();
    formData.append("file", file);
    formData.append("type", "avatar");
    /*发送axios*/
    axios.post('/upload/common', formData)
        .then(function (response) {
            if (response.status) {
                oPhoto.setAttribute("src", response.src);
                avatarSrc = response.src;
            }
        })
        .catch(function (error) {
            alert(error.response.data.msg);
        });
});

var oSaveBtn = document.querySelector('.save-btn');
var oForm = document.querySelector('form');

oSaveBtn.addEventListener('click', function () {
    //获取表单数据
    var data = serialize(oForm);
    data.avatar = avatarSrc;
    console.log(data);
    /*发送axios*/
    axios.post('/user/edit', data)
        .then(function (response) {
            if (response.status) {
                alertDemo();
                 setTimeout(refresh, 1000);
            } else {

            }
        })
});

function refresh() {
    location.reload();
}
function alertDemo() {
    SoloAlert.alert({
        title: "",
        body: "信息修改成功",
        icon: "success",
        theme: "light",
    });
}