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
    let html2 = '';
    for(var i=9;i<=16;i++){
        html2 += `
          <div class="laptop">
          <img src="${data[i].lg_pic}" alt="">
          <p><a href="">${data[i].book_name}</a></p>
          <p>${data[i].publishing}</p>
          <p><span>￥${data[i].price}</span><span><del>￥${parseInt(data[i].price*1.2)}</del></span></p>
        </div>
        `; 
    }
    top_middle_title.innerHTML = html2;
}));