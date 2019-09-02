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

            $(".detail_center>h1").html(`<img src="img/detail/icon_ddzy.png" alt="">${result.book_name==null?"":result.book_name}`);

            $(".detail_center>h2>span").html(`${result.title==null?"":result.title}`);
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
        <p class="name"><a style="color: #000000;"  href="/detail.html?lid=${result[i].lid}">${result[i].book_name}</a></p>
        <p class="author">${result[i].author}</p>
    </li>`;
}
var six_books="";
for(var i=10;i<15;i++){
    six_books+=`<li>
    <img src="${result[i].sm_pic}" alt="">
    <p class="six_price">￥${result[i].price}</p>
    <p class="six_name"><a style="color: #000000;" href="/detail.html?lid=${result[i].lid}">${result[i].book_name}</a></p>
    <p class="six_author">${result[i].publishing}</p>
</li>`;
}
$("#six_books").html(six_books);
$("#produce").html(html);
        }
    });

    $("div.detail_little").on("click","img",function(){
     $(this).attr("data-target");
     $("img.my_big").attr("src",$(this).attr("data-target"));
    });


   var father="";
   for(var i=1;i<=10;i++){
    father+=`<div class="firstDiscuss clearFloat">
    <div class="firstDiscuss_one">
        <div class="one_star">
            <img src="img/detail/fullstar.png" alt="">
        </div>
        <a href="">混子哥真有才，居然能把唐诗发展史、诗的流派和诗人生平通过漫画的形式表现出来，古代诗歌就好比现在的流行音乐，记录和抒发情感，在了解诗人生平后则更能读懂每首诗的深意。文末还有彩蛋——高考古诗词鉴赏[憨笑]，非常精妙，果然很棒[强]</a>
        <div class="two_img">
            <img src="img/detail/pinglun.jpg" alt="">
        </div>
        <div class="three_time">
            <span>2019-06-15 21:25:16已购
                </span>
            <span>
                <img src="img/detail/goumaipinglun.png" alt="">
            </span>
        </div>
    </div>
    <div class="firstDiscuss_two">
        <img src="img/detail/right_header.png" alt="">
    </div>
</div>`;
   }
   $("#pinglun_father").html(father);
})();
// 添加购物车鼠标点击事件
$('.shopcar_link1').click(function (e) {
    axios.get('/cart/addCart',{
        params:{
            lid:location.search.split("=")[1]
        }
    }).then((response)=>{
        alert(response.data.msg);
    })
  })




