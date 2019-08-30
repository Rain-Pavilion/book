function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
(function () {
    var username=document.querySelector('input[type=text]'),
    password=document.querySelector('input[type=password]');
        button=document.getElementsByClassName('button')[0];
    button.onclick=function(e){
        e.preventDefault();
        var obj={
            uname:username.value,
            upwd:password.value,
        };
        axios.defaults.withCredentials=true;
        axios.post('/users/login',obj).then((response)=>{
            if(response.data.code==200){
                var usermsg=response.data.msg[0].uid
                +"&"+username.value;
                console.log(usermsg);
                setCookie("usermsg",usermsg,1);
                location.href=('/');
            }else{
                var alert=document.getElementById("alert");
                alert.style.display="block";
            }
        })
    };
})(window);