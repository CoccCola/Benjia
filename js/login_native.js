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
    var username=oUsername.value;
    var password=oPassword.value;
   if(oUsername.validate&&oPassword.validate){
        /*发送ajax*/
        //1.创建ajax实例
        var ajax=new XMLHttpRequest();
        //2.初始化请求
        ajax.open("POST","http://localhost:3002/user/login");
        //3.设置请求header
        ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        //4.发送请求
        ajax.send(`username=${username}&password=${password}`);
        //5.监听readyState
        ajax.addEventListener("readystatechange",function(){
            if(ajax.readyState==4){
                var res=JSON.parse(ajax.responseText);
                if(res.status){
                    location.assign("./index.html");
                }else{
                    alert(res.msg);
                }
                
            }
        });
   }else{
        alert("账号或密码格式有误！");
   } 
});