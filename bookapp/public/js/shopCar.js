(function () {
    var target = document.querySelectorAll('.block-product .product-group');
    var filed = ['comment_count', 'price', 'lid'];
    for (let i = 0; i < target.length; i++) {
        var url = `/books/cquery?conditions=${filed[i]}&num=10`;
        axios.default.withCredentials=true;
        axios.get(url).then((function (response) {
            let data = response.data;
            let html = '';
            for (let i = 0; i < data.length; i++) {
                html += `<li>
                <a class="index" href="/detail.html?lid=${data[i].lid}">
                    <img src="${data[i].lg_pic}" alt="">
                    <p class="text"><a href="">${data[i].book_name}</a></p>
                    <span class="price">¥21.60</span>
                    <a href="javascript:;" class="cover AddCart">加入购物车</a>
                    <a class='info'>已有<span class="comment_num">${data[i].comment_count}</span>位用户评</a>
                </a>
            </li>`
            }
            for (let i = 0; i < target.length; i++) {
                target[i].innerHTML = html
            }
        })).then(function () {
            $('.AddCart').click(function () {
                axios.get('/cart/addCart',{
                    params:{
                        lid:$(this).parent().children('.index').attr('href').split('=')[1]
                    }
                }).then((response)=>{
                    console.log(response.data.msg);
                })
            })
        })
    }
}());