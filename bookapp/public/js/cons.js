$(function () {
  $.ajax({
    type: "get",
    url: "/books/cquery?conditions=lid_count&num=80",
    data: "",
    dataType: "json",
    success: function (result) {
      let html="";
      for(var i=0;i<result.length;i++){
        html+=`
        <div class="laptop">
    <div class="c1">
        <div class="my_width">
            <img src="${result[i].lg_pic}" alt="">
            <div class="my_xq">
                <a class="my_name" href="/detail.html?lid=${result[i].lid}">${result[i].book_name}</a>
                <p class="my_price">¥${(result[i].price)}&nbsp;&nbsp;&nbsp;<span class="my_price_1">定价：</span><span class="my_price_2"> ¥${parseInt(result[i].price*1.2)}</span> </p>
                <p class="my_time">
                    <a class="my_time_1" href="">${result[i].author}</a>/2018-04-16/
                    <a class="my_time_1" href=""> ${result[i].publishing}</a>
                </p>
                <p class="my_pl">
                    <span>    </span>
                    <a class="my_pl_1" href="">${result[i].comment_count}条评论</a>
                </p>
                <p class="my_mj">
                    <span class="my_mj_1">当当自营</span>
                    <span class="my_mj_2">每满100-50</span>
                </p>
                <p class="my_js">${result[i].author_introduction==null?"":result[i].author_introduction}</p>
                <p class="my_sc">
                    <a class="my_sc_1" href="">加入购物车</a>
                    <a class="my_sc_2" href="">收藏</a>
                </p>
            </div>
        </div>
    </div>
    </div>
        `;
      }
      $(html).appendTo($("#main"))
    }
  });
})