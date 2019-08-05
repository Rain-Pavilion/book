var xhr=new XMLHttpRequest();
xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
        var result=xhr.responseText;
        console.log(xhr.responseText)
    }
}
xhr.open("get","/books/query?lid=1",true);
xhr.send(null);