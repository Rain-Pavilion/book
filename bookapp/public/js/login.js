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
        axios.get('/users/login',{
            params:obj,
        }).then((response)=>{
            console.log(response);
        })
    };
})(window);