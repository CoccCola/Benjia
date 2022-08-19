var oUser=document.querySelector('.user');


/*发送axios*/
axios.get('/user/info')
    .then(function (response) {
        if (response.status) {            
            oUser.innerHTML=`<div class="img-box"><img src="${response.data.avatar}" height="100%" alt=""></div>
            <div class="name">${response.data.nickname}</div>`

        } else {

        }
    })