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
    for(var i=1;i<=2;i++){
    html_laptop1+=`
    <div class="middle">
    <div class="banner">
    <img src="img/index/banner1.jpg" alt="">
    <img src="img/index/banner2.jpg" alt="">
    <img src="img/index/banner3.jpg" alt="">
  </div>
  <div class="top_middle_title clearFloat">
      <span>新</span><p>书上架 <a href="">更多新书戳这里</a></p>
    </div>
    <div class="middle_right_title clearFloat">
      <div class="sprite_icon"></div><a href="">新书热卖</a>
    </div>
  
  <div class="middle_laptop">
      <div class="new_laptop">
      
      </div>
              
  </div>
  <div class="middle_list">
    <ul>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
    </ul>
  </div>

  </div>
    `;
  }
  middle_laptop1.innerHTML=html_laptop1;
    // html3
    let html_middle=``;
    for(var i=8;i<=18;i++){
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
    let laptop=document.querySelectorAll(".new_laptop");
    for(let i in laptop){
        laptop[i].innerHTML=html_middle
    }
}));