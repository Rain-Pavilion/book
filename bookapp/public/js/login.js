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
        axios.post('/users/login',obj).then((response)=>{
            if(response.data.code==200){
                location.href=('/');
            }else{
                var alert=document.getElementById("alert");
                alert.style.display="block";
            }
        })
    };
})(window);