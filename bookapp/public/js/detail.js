(function () {
    location.search
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = JSON.parse(xhr.responseText)[0];
            console.log(result);
         
            var detailLittle="";
            for(var i=0;i<5;i++){
                detailLittle+=`<img src="${result.sm_pic}" data-target="${result.lg_pic}" class="my_small">`;
            $(".detail_little").html(detailLittle);
            }
            $(".detail_left_big").html(`<img src="${result.lg_pic}"  class="my_big">`)

            $(".detail_center>h1").html(`<img src="img/detail/icon_ddzy.png" alt="">${result.title}`);

            $(".detail_center>h2>span").html(`${result.content_introduction}`);
        }
    };
    xhr.open("get",`/books/query${location.search}`,true);
    xhr.send();
    
   

    $.ajax({
        url:`/books/cquery`,
        type:"get",
        data:{num:17,conditions:"price"},
        dataType:"json",
        success:function(result){
            console.log(result);
        var html="";
        for(var i=0;i<17;i++){
        html+=`<li>
        <img src="${result[i].sm_pic}" alt="">
        <p class="prices">￥68</p>
        <p class="name">${result[i].book_name}</p>
        <p class="author">${result[i].author}</p>
    </li>`;
}
var six_books="";
for(var i=10;i<15;i++){
    six_books+=`<li>
    <img src="${result[i].sm_pic}" alt="">
    <p class="six_price">￥${result[i].price}</p>
    <p class="six_name">${result[i].book_name}</p>
    <p class="six_author">${result[i].publishing}</p>
</li>`;
}
$("#six_books").html(six_books);
$("#produce").html(html);
        }
    })

    $("div.detail_little").on("click","img",function(){
     $(this).attr("data-target")
     $("img.my_big").attr("src",$(this).attr("data-target"));
    })
})();





