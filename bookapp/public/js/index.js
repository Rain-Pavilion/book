//top_search
var scrollTop=0;
window.onscroll=function() {
  scrollTop=document.body.scrollTop || document.documentElement.scrollTop ;
  if(scrollTop>1200){
    top_search.style.display="block"
  }else{
    top_search.style.display="none"
  }
  var toTop=document.getElementById("toTop");
  var toTop1=document.getElementById("toTop1");
  var go=function (e){
    e.preventDefault();
    var dist=scrollTop;//总距离
    var steps=100; //总步数
    var dura=1000; //总时间
    var step=dist/steps; //每步的距离
    var interval=dura/steps; //每步的时间 
    var timer= setInterval(function(){      
      window.scrollBy(0,-step);
      steps--;
      if(steps==0){
        clearInterval(timer);
        steps=100;
      }
    },interval)
  }
  toTop.onclick=go
  toTop1.onclick=go
}
function searchOf() {
  var keyword=$("#search2").val();
  window.open(`/cons.html?keyword=${keyword}`,"_self")
}
$("#search2").keydown(function(e){
  if(e.keyCode==13){
    var keyword=$(e.target).val();
    window.open(`/cons.html?keyword=${keyword}`,"_self")
  }
})


////
let url ='/books/cquery?conditions=lid_count&num=80';
axios.get(url).then((function (response) {
    let data = response.data;
    let num1=Math.floor(Math.random()*80);
    let html1 = '';
        html1 += `<a href="/detail.html?lid=${data[num1].lid}">  <img src="${data[num1].lg_pic}" alt="" ></a>
        <div>
          <p>${data[num1].book_name}</p>
          <p>￥${data[num1].price}</p>
          <p><del>￥${parseInt(data[num1].price*1.2)}</del></p>
          <p>${data[num1].comment_count}条评论</p>
      </div>
        `;
    new_book.innerHTML = html1;
    // html1
    let html2 = '';
    for(var i=0;i<=7;i++){
        html2 += `
          <div class="laptop">
          <a href="/detail.html?lid=${data[i].lid}"><img src="${data[i].lg_pic}" alt=""></a>
          <p><a href="/detail.html?lid=${data[i].lid}" title="${data[i].book_name}">${data[i].book_name}</a></p>
          <p title="${data[i].publishing}">${data[i].publishing}</p>
          <p><span>￥${data[i].price}</span><span><del>￥${parseInt(data[i].price*1.2)}</del></span></p>
          <p><span>电子书￥${parseInt(data[i].price*0.5)}</span></p>
        </div>
        `; 
    }
    top_middle_title.innerHTML = html2;
    //middle_laptop1
    let html_laptop1=``;
    for(var j=1;j<=7;j++){
      var banner1="";
      var banner2="";
      var banner3="";
      if(j==1){
        banner1="img/index/banner1.jpg"
        banner2="img/index/banner2.jpg"
        banner3="img/index/banner3.jpg"
        var span="新";
        var p="书推荐";
        var title="新书热卖榜";
      }else if(j==2){
        var span="当";
        var p="当推荐";
        var title="近7日畅销榜";
      }
      else if(j==3){
        banner1="img/index/banner7.jpg"
        banner2="img/index/banner8.jpg"
        banner3="img/index/banner9.jpg"
        var span="畅";
        var p="销";
        var title="电子书榜";
      }else if(j==4){
        var span="超";
        var p="值";
        var title="";
      }else if(j==5){
        var span="电";
        var p="子书";
        var title="";
      }else if(j==6){
        banner1="img/index/banner16.jpg"
        banner2="img/index/banner17.jpg"
        banner3="img/index/banner18.jpg"
        var span="热";
        var p="门";
        var title="精彩专题";
      }else if(j==7){
        var span="热";
        var p="点";
        var title="小当推荐";
      }
    html_laptop1+=`
    <div class="middle">
    <div class="banner">
    <img src="${banner1}" alt="">
    <img src="${banner2}" alt="">
    <img src="${banner3}" alt="">
  </div>
  <div class="top_middle_title clearFloat">
      <span>${span}</span><p>${p} <a href="">更多新书戳这里</a></p>
    </div>
    <div class="middle_right_title clearFloat">
      <div class="sprite_icon"></div><a href="">${title}</a>
    </div>
  
  <div class="middle_laptop">
      <div id="w_laptop${j}">
      
      </div>
      <div id="new_laptop${j}">
      
      </div>
              
  </div>
  <div class="middle_list">
    <div id="middle_list${j}">
      <div class="tab-aa">
      <ul id="middle_ul${j}">
      
      </ul>
      </div>
    </div>
  </div>

  </div>
    `;
  }
  var w_laptop_html1=`<div class="top-w-laptop">
  <p>1.</p>
  <div>
    <div>
    <a href="/detail.html?lid=${data[44].lid}">
    <img src="${data[44].lg_pic}" alt="">
    </a>
    </div>
    <div class="text">
      <p>${data[44].book_name}</p>
      <img src="img/index/start.png" alt="">
      <p>当当价：<span>¥${data[44].price}</span><span>市场价：¥${parseInt(data[44].price*1.6).toFixed(2)}</span></p>
      <p>${data[44].content_introduction}</p>
    </div>
  </div>
  <div class="border"></div>
  <div>
      <span>2.</span><span>3.</span><span>4.</span><span>5.</span><span>6.</span>
    </div>
  </div> `;
  var w_laptop_html2=`<div class="top-w-laptop">
  <p>1.</p>
  <div>
    <div><a href="/detail.html?lid=${data[26].lid}"><img src="${data[26].lg_pic}" alt=""></a></div>
    <div class="text">
      <p>${data[26].book_name}</p>
      <img src="img/index/start.png" alt="">
      <p>当当价：<span>¥${data[26].price}</span><span>市场价：¥${parseInt(data[26].price*1.6).toFixed(2)}</span></p>
      <p>${data[26].content_introduction}</p>
    </div>
  </div>
  <div class="border"></div>
  <div>
      <span>2.</span><span>3.</span><span>4.</span><span>5.</span><span>6.</span>
    </div>
  </div> `;
  middle_laptop1.innerHTML=html_laptop1;
    // html3
    // midddle left
    for(var k=1;k<=7;k++){
      let html_middle=``;
      if(k==1){
        var start=8;
        var end=17;
      }else if(k==2){
        var start=18;
        var end=27;
      }else if(k==3){
        var start=28;
        var end=32;
      }else if(k==4){
        var start=33;
        var end=37;
      }else if(k==5){
        var start=38;
        var end=42;
      }else if(k==6){
        var start=43;
        var end=47;
      }else if(k==7){
        var start=48;
        var end=52;
      }
    for(var i=start;i<=end;i++){
      html_middle+=`
      <div class="laptop">
          <a href="/detail.html?lid=${data[i].lid}"><img src="${data[i].lg_pic}" alt=""></a>
          <p class="name"><a href="/detail.html?lid=${data[i].lid}" title="${data[i].book_name}">${data[i].book_name}</a></p>
          <p class="author" title="}">${data[i].author}</p>
          <p class="time"><span>${data[i].shelf_time}</span></p>
          <p class="price"><span>￥${data[i].price}</span><span><del>￥${parseInt(data[i].price*1.2)}</del></span></p> 
        </div>
        `; 
    }
    if(k==1){
      new_laptop1.innerHTML=html_middle
    }else if(k==2){
      new_laptop2.innerHTML=html_middle
    }else if(k==3){
      new_laptop3.innerHTML=html_middle
    }else if(k==4){
      new_laptop4.innerHTML=html_middle
    }else if(k==5){
      new_laptop5.innerHTML=html_middle
    }else if(k==6){
      lap=1;
      w_laptop6.innerHTML=w_laptop_html1
      new_laptop6.innerHTML=html_middle
    }else if(k==7){
      lap=2;
      w_laptop7.innerHTML=w_laptop_html2
      new_laptop7.innerHTML=html_middle
    }
    
  }
  // ------------
   // midddle ul
   for(let m=1;m<=5;m++){
    let html_middle_li=``;
    if(m==1){
      var start=17;
      var end=8;
    }else if(m==2){
      var start=27;
      var end=18;
    }else if(m==3){
      var start=32;
      var end=28;
    }else if(m==4){
      var start=33;
      var end=29;
    }else if(m==5){
      var start=38;
      var end=34;
    }
    var a=1;
  for(var i=start;i>=end;i--){
    html_middle_li+=`
        <li class="clearFloat">
            <p><span class="num">${a}</span>${data[i].book_name}</p>
            <a  href="/detail.html?lid=${data[i].lid}" class="cover">
                <span class="num">${a}</span>
                <img src="${data[i].lg_pic}" alt="">
                <p>${data[i].book_name}</p>
                <div>
                    <p>￥${data[i].price}</p>
                    <p><del>￥${parseInt(data[i].price*1.2)}</del></p>
                    <p>${data[i].comment_count}条评论</p>
                </div>
            </a>
        </li>
      `; 
      a++;
  }
  if(m==1){
    middle_ul1.innerHTML=html_middle_li
  }else if(m==2){
    middle_ul2.innerHTML=html_middle_li
  }else if(m==3){
    middle_ul3.innerHTML=html_middle_li
  }else if(m==4){
    middle_ul4.innerHTML=html_middle_li
  }else if(m==5){
    middle_ul5.innerHTML=html_middle_li
  }
  
}
let middle_list6_html=`<div><img src="img/index/list_banner1.jpg" alt=""></div>
<div><img src="img/index/list_banner2.jpg" alt=""></div>
<div><img src="img/index/list_banner3.jpg" alt=""></div>
<p><a href="">愿你被这世界温柔相待</a></p>
<p><a href="">雪隐鹭鸶——《金瓶梅》的声色与虚无</a></p>
<p><a href="">你配的上更好的世界</a></p>
<p><a href="">把时间浪费在美好的事物上</a></p>
<p><a href="">惊奇之心</a></p>`;
let num2=Math.floor(Math.random()*80);
let middle_list7_html=`
<div>
  <div>
<a href="/detail.html?lid=${data[num2].lid}">
<img src="${data[num2].lg_pic}" alt="" ></a>
  </div>
<div>
  <p>${data[num2].book_name}</p>
  <p>￥${data[num2].price}</p>
  <p><del>￥${parseInt(data[num2].price*1.2)}</del></p>
  <p>${data[num2].comment_count}条评论</p>
</div></div>
<div><img src="img/index/list_banner4.jpg" alt=""></div>
<div><img src="img/index/list_banner5.jpg" alt=""></div>
<div><img src="img/index/list_banner6.jpg" alt=""></div>
`;
middle_list6.innerHTML=middle_list6_html;
middle_list7.innerHTML=middle_list7_html;
var super_price_html=`
<ul>
   <li><img src="img/index/super_price.jpg" alt=""></li>`;
 for(var h=62;h<=78;h++){
   let num3=(Math.ceil(Math.random()*3)+2).toFixed(1);
  super_price_html+=`<li><a href="/detail.html?lid=${data[h].lid}"><img src="${data[h].lg_pic}" alt=""></a>
  <p><span>${num3}折</span><span>${data[h].book_name}</span></p></li>`
 }
 super_price_html+=`</ul><div class="li_h"></div>`;
 super_price.innerHTML=super_price_html;
  // 自动手风琴
  $(function () {
     var tabAa=$('.tab-aa li');
     var firstlist=$('.tab-aa li:first-child');
     firstlist.addClass('active');
      tabAa.mouseover(function() {
      var self=$(this);
      self.siblings().removeClass('active');
      self.addClass('active');
  })
})  
// ————————
}));
