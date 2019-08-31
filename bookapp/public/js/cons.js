var dom=function(result){
  if(result.length>0){
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
              <p class="my_js">${result[i].author_introduction==null?"":result[i].author_introduction.substr(0,105)+"...."}</p>
              <p class="my_sc">
                  <a class="my_sc_1 AddCart" href="javascript:;" data-lid="${result[i].lid}">加入购物车</a>
                  <a class="my_sc_2" href="">收藏</a>
              </p>
          </div>
      </div>
  </div>
  </div>
      `;
        }
      $("#main").html(html);
    }else{
      $("<h2 style='color:black;text-align:center;margin:100px 0px'>未找到相关商品....</h2>").appendTo($("#main"));
      var $nav="";
      $("#nav").html($nav)
    } 
      
}
  var keyword=decodeURI(location.search.split("?")[1].split("=")[1]);
  var search=
  function(){
  $.ajax({
    type: "get",
    url: `/books/search${location.search}`,
    data: "",
    dataType: "json",
    success: function (result) {
    var pnos=result.pnos;
    result=result.data;
    // 分页
    var navHtml=`<div class="btn-group btn-group-sm">
    <button class="btn btn-info btn-lg" style="background-color:#ddd;cursor:not-allowed">上一页</button>`;
    for(let i=1;i<=pnos;i++){
      navHtml+=`<button class="btn btn-info btn-lg">${i}</button>`
    }
    navHtml+=`<button class="btn btn-info btn-lg">下一页</button>
    </div>`
    $("#nav").html(navHtml)
    //渲染商品
    dom(result);
    // 添加购物车鼠标点击事件
    $('.my_sc_1.AddCart').click(function (e) {
      axios.get('/cart/addCart',{
          params:{
              lid:e.target.dataset.lid
          }
      }).then((response)=>{
          alert(response.data.msg);
      })
    })
    
    }
  });
}
search();
var pno=1;
$("#nav").on("click","button",function(e){
  var pnos=$("#nav button").length-2;
  
  if($(e.target).html()=="上一页" && pno>1){
    pno--;
  }else if($(e.target).html()=="下一页" && pno<pnos){
    pno++;
  }else if(!isNaN(parseInt($(e.target).html()))){
    pno=parseInt($(e.target).html())
  }
  axios.get(
    `/books/search`,{
      params:{
        keyword,
        pno
      }
    }
  ).then(result=>{
    result=result.data;
    let pnos=result.pnos;
    result=result.data;
    dom(result);
  })
  if(pno==1){
    $("#nav button:first-child").css({'background-color':'#ddd','cursor':'not-allowed'})  
  }else{
    $("#nav button:first-child").css({'background-color':'#17a2b8','cursor':'pointer'})
  }
  if(pno==pnos){
    $("#nav button:last-child").css({'background-color':'#ddd','cursor':'not-allowed'})
  }else{
    $("#nav button:last-child").css({'background-color':'#17a2b8','cursor':'pointer'})
  }
})