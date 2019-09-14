(function () {
    location.search
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = JSON.parse(xhr.responseText)[0];         
            var detailLittle="";
            for(var i=0;i<5;i++){
                detailLittle+=`<img src="${result.sm_pic}" data-target="${result.lg_pic}" class="my_small">`;
            $(".detail_little").html(detailLittle);
            }
            $(`<img src="${result.lg_pic}"  class="my_big">`).appendTo($(".detail_left_big"))
            $("#bigimg ").html(`<img src="img/laptop/lg${result.lid}.jpg">`)
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
        var html="";
        for(var i=0;i<6;i++){
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

//商品评论
    axios.get("users/queryComment",{
        params:{  
            lid:location.search.split("=")[1]
        }
    }).then(result=>{         
        var father="";
   for(var i=0;i<result.data.length;i++){      
            father+=`<div class="firstDiscuss clearFloat">
    <div class="firstDiscuss_one">
        <div class="one_star">
            <img src="img/detail/fullstar.png" alt="">
        </div>
        <a href="">${result.data[i].comment}</a>
        <div class="two_img">
        </div>
        <div class="three_time">
            <span>来自书友的评论！
                </span>
            <span>
                <img src="img/detail/goumaipinglun.png" alt="">
            </span>
        </div>
    </div>
    <div class="firstDiscuss_two">
        <img src="img/detail/right_header.png" alt="">  
            <p id="detail_uname">${result.data[i].uname}</p>
        <button id="detail_uname">钻石用户</button>
    </div>
</div>`;
   }
// console.log(father)
$("#pinglun_father").html(father);
        
   
})
   
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
////放大镜效果
var cover = $("#cover");
var left;
var offtop;
var canMove = false;
$(cover).mouseleave(function () { 
    $(".detail_left_big>img:eq(0)").css({
        display:'none'
    })
    $("#bigimg").css({
        display:'none'
    })
});
$(cover).mousemove(function (e) { 
    $(".detail_left_big img:eq(0)").css({
        display:'block'
    })
    $("#bigimg").css({
        display:'block'
    })
    // values: e.clientX, e.clientY, e.pageX, e.pageY
    left = e.offsetX;
    offtop = e.offsetY;
    if(e.offsetX<80){
        left = 80;
    }
    if(e.offsetX>240){
        left = 240;
    }
    if(e.offsetY<80){
        offtop = 80;
    }
    if(e.offsetY>240){
        offtop = 240;
    }

    $(".detail_left_big img:eq(0)").css({
        left:left+"px",
        top:offtop+"px",
        'margin-left': '-80px',
        'margin-top': '-80px'
    })
    var lgleft = -left*2.5+80*2.5;
    var lgtop = -offtop*2.5+80*2.5;
    $("#bigimg img").css({
        left:lgleft+"px",
        top:lgtop+"px"
    })
});

//短评
$("#write").click(function(){
    $("#comment").css({display:'block'})
})
$("#close").click(function(e){
    e.preventDefault();
    $("#comment").css({display:'none'})
})
$("#sendComment").click(function(){
    var text=$("#text").val();
    var lid=location.search.split("=")[1]
    axios.get("/users/session_data").then(result=>{
        if(result.data.uid==undefined){
            alert("请先登录！");         
            return;
        }else {
            uid = result.data.uid
            axios.get("/users/comment",{
                params:{
                    lid,text
                }
            }).then(result=>{
                if(result.data.code==200){
                    alert("评论成功!");
                    location.href="/detail.html?lid="+lid;      
                }
            })
        }
    })
})
