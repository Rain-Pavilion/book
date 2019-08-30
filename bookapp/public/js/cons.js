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
      $("<h2 style='color:black;text-align:center;margin:100px 0px'>未找到相关商品....</h2>").appendTo($("#main"))
    } 
    // 添加鼠标点击事件
    $('.my_sc_1.AddCart').click(function (e) {
      axios.get('/cart/addCart',{
          params:{
              lid:e.target.dataset.lid
          }
      }).then((response)=>{
          alert(response.data.msg);
      })
    })
    // 分页
    var navHtml=`<div class="btn-group btn-group-sm">
    <button class="btn btn-info">上一页</button>`;
    for(let i=1;i<=pnos;i++){
      navHtml+=`<button class="btn btn-info">${i}</button>`
    }
    navHtml+=`<button class="btn btn-info">下一页</button>
    </div>`
    $("#nav").html(navHtml)
    }
  });
}
search();

$("#nav").on("click","button",function(e){
  if(typeof parseInt($(e.target).html()==Number)){
    axios.get(
      `/books/search`,{
        params:{
          keyword,
          pno:$(e.target).html()
        }
      }
    ).then(result=>{
      result=result.data;
      
    var pnos=result.pnos;
    result=result.data;
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
      $("<h2 style='color:black;text-align:center;margin:100px 0px'>未找到相关商品....</h2>").appendTo($("#main"))
    } 
    // 添加鼠标点击事件
    $('.my_sc_1.AddCart').click(function (e) {
      axios.get('/cart/addCart',{
          params:{
              lid:e.target.dataset.lid
          }
      }).then((response)=>{
          alert(response.data.msg);
      })
    })
    // 分页
    var navHtml=`<div class="btn-group btn-group-sm">
    <button class="btn btn-info">上一页</button>`;
    for(let i=1;i<=pnos;i++){
      navHtml+=`<button class="btn btn-info">${i}</button>`
    }
    navHtml+=`<button class="btn btn-info">下一页</button>
    </div>`
    $("#nav").html(navHtml)

    })
  }
})