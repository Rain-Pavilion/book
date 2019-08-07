let url = 'http://127.0.0.1:8080/books/cquery?conditions=lid_count&num=80';
axios.get(url).then((function (response) {
    let data = response.data;
    let num=Math.floor(Math.random()*80);
    let html1 = '';
        html1 += `   <img src="${data[num].lg_pic}" alt="" >
        <div>
          <p>${data[num].book_name}</p>
          <p>￥${data[num].price}</p>
          <p><del>￥${parseInt(data[num].price*1.2)}</del></p>
          <p>${data[num].comment_count}条评论</p>
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
    for(var j=1;j<=3;j++){
      if(j==1){
        var span="新";
        var p="书推荐";
        var title="新书热卖榜";
      }else if(j==2){
        var span="当";
        var p="当推荐";
        var title="近7日畅销榜";
      }
      else if(j==3){
        var span="畅";
        var p="销";
        var title="电子书榜";
      }
    html_laptop1+=`
    <div class="middle">
    <div class="banner">
    <img src="img/index/banner${(j-1)*3+1}.jpg" alt="">
    <img src="img/index/banner${(j-1)*3+2}.jpg" alt="">
    <img src="img/index/banner${(j-1)*3+3}.jpg" alt="">
  </div>
  <div class="top_middle_title clearFloat">
      <span>${span}</span><p>${p} <a href="">更多新书戳这里</a></p>
    </div>
    <div class="middle_right_title clearFloat">
      <div class="sprite_icon"></div><a href="">${title}</a>
    </div>
  
  <div class="middle_laptop">
      <div id="new_laptop${j}">
      
      </div>
              
  </div>
  <div class="middle_list">
    <div class="tab-aa">
    <ul id="middle_ul${j}">
      <li>
      <p><span class="num">1</span>亲密关系：通往灵魂的桥梁（新版）</p>
      <a  href="" class="cover">
          <span class="num">1</span>
          <img src="${data[1].lg_pic}" alt="">
      </a>
      </li>
      <li>
      <p><span class="num">1</span>亲密关系：通往灵魂的桥梁（新版）</p>
      <a  href="" class="cover">
          <span class="num">1</span>
          <img src="${data[2].lg_pic}" alt="">
      </a>
      </li>
    </ul>
    </div>
  </div>

  </div>
    `;
  }
  middle_laptop1.innerHTML=html_laptop1;
    // html3
    // midddle left
    for(let k=1;k<=3;k++){
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
    }else{
      new_laptop3.innerHTML=html_middle
    }
    
  }
  // ------------
   // midddle ul
   for(let m=1;m<=3;m++){
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
    }
    var a=1;
  for(var i=start;i>=end;i--){
    html_middle_li+=`
        <li class="clearFloat">
            <p><span class="num">${a}</span>${data[i].book_name}</p>
            <a  href="/detail.html?${data[i].lid}" class="cover">
                <span class="num">${a}</span>
                <img src="${data[i].lg_pic}" alt="">
                <p>${data[i].book_name}</p>
                <div>
                    <p>￥${data[i].price}</p>
                    <p><del>￥${parseInt(data[i].price*1.2)}</del></p>
                    <p>${data[i].comment_count}</p>
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
  }
  
}
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
