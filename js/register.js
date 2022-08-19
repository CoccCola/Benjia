var oUsername=document.querySelector("#username");
var oSex=document.querySelector("#boy");
var oPassword=document.querySelector(".pwd");
var oPasswordAgain=document.querySelector(".pwd_again");
var oPrefix=document.querySelector("#prefix");
var oPhoneNum=document.querySelector(".phone_num");
var oVerCode=document.querySelector(".ver_code");
var oGetCode=document.querySelector(".get_code");
var oRegister=document.querySelector("#register");

var verifyList=[oUsername,oPassword,oPasswordAgain,oPhoneNum,oVerCode];
var static_verCode="1234";

/*alert*/
var usernameAlert="用户名由3位及以上的汉字、数字、字母、下划线组成,不能以下划线开头和结尾!";
var passwordAlert="密码是3位及以上的数字!";
var passwordAgainAlert="两次密码不一致!";
var telAlert="电话号码不符合规范!";
var verCodeAlert="验证码错误!";

/*regular*/
var usernameReg=/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{3,}$/;
var passwordReg=/\d{3,}/;
var telReg=/0?(13|14|15|17|18|19)[0-9]{9}/;

/* 验证事件函数 */
function styleChangeAndAlert(obj,alertText,Valid){
    if(Valid){
        obj.style.border="solid 1px #090";
    }else{
        obj.style.border="solid 1px #900";
        alert(alertText);
    }
    obj.validate=Valid;
}
function verify (obj,alertText,reg){
    var value=obj.value;
    var Valid=reg.test(value);
    styleChangeAndAlert(obj,alertText,Valid);
}

//绑定事件
oUsername.addEventListener("change",function(){ verify(oUsername,usernameAlert,usernameReg);} );
oPassword.addEventListener("change",function(){ verify(oPassword,passwordAlert,passwordReg);});
oPhoneNum.addEventListener("change",function(){ verify(oPhoneNum,telAlert,telReg);});
oPasswordAgain.addEventListener("change",function(){
    var password=oPassword.value;
    var passwordAgain=oPasswordAgain.value; 
    styleChangeAndAlert(oPasswordAgain,passwordAgainAlert,password===passwordAgain);
});
oVerCode.addEventListener("change",function(){
    var verCode=oVerCode.value;
    styleChangeAndAlert(oVerCode,verCodeAlert,verCode===static_verCode);
});
oGetCode.addEventListener("click",function(){
    this.innerText=static_verCode;
});
//登入
oRegister.addEventListener("click",function(){
    var tUsername=oUsername.value;
    var tPassword=oPassword.value;
    var tSex="女";
    var pd=oSex.checked;
    if(pd){
        tSex="男";
    }
    var tTel=oPhoneNum.value;
    //表单判断
    var flag=verifyList.every(function(item){
        return item.validate;
    });
    if(flag){
        /*发送axios*/
        axios.post("/user/register",{
            username:tUsername,
            password:tPassword,
            sex:tSex,
            tel:tTel,
        }).then(function(response){
            if(response.status){
                alert(response.msg+"2秒后将跳转到登入页面。");
                setTimeout(function(){location.assign("./login.html");},2000);
            }else{
                alert(response.msg);
            }                
        });       
    }else{
        alert("信息填写有误!");
    }
});
    
    