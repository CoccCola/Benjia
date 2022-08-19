var oUsername=document.querySelector("#username");
var oPassword=document.querySelector("#password");
var oLogin=document.querySelector("#login");


oUsername.addEventListener("change",function(){
    var username=oUsername.value;
    var usernameValid=/\w{3,}/.test(username);
    if(usernameValid){
        oUsername.style.border="solid 1px #090";
    }else{
        oUsername.style.border="solid 1px #900";
        alert("用户名需大于三位！");
    }
    this.validate=usernameValid;
});
oPassword.addEventListener("change",function(){
    var password=oPassword.value;
    var passwordValid=/\d{3,}/.test(password);
    if(passwordValid){
        oPassword.style.border="solid 1px #090";
    }else{
        oPassword.style.border="solid 1px #900";
        alert("密码是三位以上的数字！");
    }
    this.validate=passwordValid;
});
oLogin.addEventListener("click",function(){
    var name=oUsername.value;
    var pwd=oPassword.value;
   if(oUsername.validate&&oPassword.validate){
        /*发送axios*/
        axios.post("/user/login",{
                username:name,
                password:pwd,
        }).then(function(response){
            if(response.status){
                //缓存数据
                sessionStorage.id=response.data.id;
                sessionStorage.token=response.data.token;
                //跳转页面
                location.assign("./index.html");
            }else{
                alert(response.msg);
            }                
        });
   }else{
        alert("账号或密码格式有误！");
   } 
});


