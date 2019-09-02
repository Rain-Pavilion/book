(function () {
    var target = document.querySelectorAll('.block-product .product-group');
    var filed = ['comment_count', 'price', 'lid'];
    var current_delete_target=null;
    for (let i = 0; i < target.length; i++) {
        var url = `/books/cquery?conditions=${filed[i]}&num=10`;
        axios.default.withCredentials = true;
        axios.get(url).then((function (response) {
            let data = response.data;
            let html = '';
            for (let i = 0; i < data.length; i++) {
                html += `<li>
                <a class="index" href="/detail.html?lid=${data[i].lid}">
                    <img src="${data[i].lg_pic}" alt="">
                    <p class="text"><a href="">${data[i].book_name}</a></p>
                    <span class="price">¥${data[i].price}</span>
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
                axios.get('/cart/addCart', {
                    params: {
                        lid: $(this).parent().children('.index').attr('href').split('=')[1]
                    }
                }).then((response) => {
                    alert(response.data.msg);
                    window.open("/shopcar.html", "_self");
                    if (response.data.code === 0) {
                        location.href = '/'
                    }
                })
            })
        })
    }
    axios.get('/users/session_data').then(function (response) {
        var target = $('.shop-car-replace-area');
        if (response.data.uname) {
            axios.get('/cart/queryCart', {
                params: {
                    user_id: response.data.uid,
                }
            }).then(
                function (response) {
                    target.html(
                        `<div class='ding-dang-area'>
                            <div class="shop-car-header-info">
                                <ul class="shop-section-list">
                                    <li class="f1"><a href='javascript:void(0)' class="check"></a>全选</li>
                                    <li class="f2">商品信息</li>
                                    <li class="f3">单价（元）</li>
                                    <li class="f4">数量</li>
                                    <li class="f5">金额（元）</li>
                                    <li>操作</li>
                                </ul>
                        
                            </div>
                        <div class="shop-car-content-list">
                        </div>
                        <div class="shopping-ui">
                            <p class="f-l">店铺合计</p>
                            <a class="submit f-r">结算</a>
                            <span class="price f-r">￥0</span>
                        </div>
                      </div>
                    `);


                    $('.shop-car-content-list').html(function () {
                        var html = '';
                        for (let i = 0; i < response.data.length; i++) {
                            var current = response.data[i];
                            // if(current.title.length>30){
                            //     current.title=current.title.substr(0,14)
                            // }
                            html += `<div class="shop-car-content-area">                        
                                        <div class="card">
                                            <a href="javascript:void(0)" class="check"></a>
                                            <img src="${current.sm_pic}" alt="">
                     
                 
                                            <div class="info">
                                                    <p class="intro">
                                                        ${current.title || ''}
         
                                                    </p>
                                                    <p>购买此商品,可享促销 <span>加价购</span></p>
                                            </div>
                                            <div class="old-price">￥${current.price}</div>                                           
                                            <div class="input-area">
                                            <span>
                                                <button>-</button>
                                                <input type="text" value="${current.count}">
                                                <button>+</button>
                                            </span>
                                            </div>
                                            <div class="new-price">￥${current.price}</div>
                                            <div class="option">
                                                <div>
                                                    <p><a href="javascript:;">移入收藏</a></p>
                                                    <p><a href="javascript:;" data-id="${current.iid}"
            
                                                    >删除</a></p>
                                                </div>
                                            </div>
                                        </div>
                                   </div>`;
                        }
                        return html;
                    });
                    $('#alert .yes').click(function () {
                        axios.get('/cart/removeCart',
                            {
                                params: {
                                    iid: current_delete_target.attr('data-id')
                                }
                            }).then((response) => {
                            if (response.data.code === 200) {
                                var target = current_delete_target.parent().parent().parent().parent().parent().addClass('active');
                                setTimeout(function () {
                                    target.remove();
                                    getSumprice();
                                    if ($('.shop-car-content-area .check.on').length === 0) {
                                        $('.shopping-ui .price').text('￥' + 0.00)
                                    }

                                }, 500);
                            }
                        });
                        $('#alert').css('display', 'none')
                    });
                    $('#alert .no').click(function () {
                        $('#alert').css('display', 'none')
                    });
                    $(function () {
                        $('.shop-car-content-area .option a[data-id]').click(function () {
                            $('#alert').css('display', 'block');
                            current_delete_target=$(this);
                        });

                        function getBookInfo() {
                            var msg = 'You Are Dead';
                            return new Promise((resolve, reject) => {
                                $.ajax({
                                    url: '/books/query',
                                    method: 'get',
                                    data: {
                                        lid: 1,
                                    },
                                    dataType: 'json',
                                    success: function (data) {
                                        console.log(data);
                                        resolve(data);
                                    }
                                })
                            })
                        }

                        function operation(data) {
                            var html = '';
                            for (let i = 0; i < data.length; i++) {
                                html += '';
                            }
                            // $('.shop-car-content-list').html(html);
                            getSumprice();
                        }

                        getBookInfo().then(operation);


                        function getSumprice() {
                            let $sumNode = $('.ding-dang-area .shopping-ui .price'),
                                $newPrice = $('.shop-car-content-list .check.on').parent().children('.old-price');
                            sum = 0;
                            $newPrice.each(function () {
                                var $self = $(this),
                                    count = parseFloat($self.parent().parent().find('.input-area input').val());
                                sum += parseFloat($self.text().slice(1)) * count;
                                $sumNode.text('￥' + sum.toFixed(2));
                            });
                        }


                        function getCountPrice(eventNode) {
                            var CountpriceNode = eventNode.parent().parent().next();
                            var price = parseFloat(eventNode.parent().parent().parent().children('.old-price').text().slice(1));
                            var count = parseInt(eventNode.siblings('input').val());
                            CountpriceNode.text('￥' + (price * count).toFixed(2))
                        }

                        $('.shop-car-content-list .shop-car-content-area .card')
                            .on('click', 'button,.check', function (e) {
                                var $self = $(e.target);
                                if ($self.text() === '+') {
                                    var $prev = $self.prev();
                                    $prev.val(parseInt($prev.val()) + 1);
                                    getCountPrice($self);
                                    getSumprice();
                                } else if ($self.text() === '-') {
                                    var $next = $self.next(), value = parseInt($next.val()) - 1;
                                    if (value < 0) value = 0;
                                    $next.val(value);
                                    getCountPrice($self);
                                    getSumprice();

                                }
                            });


                        $('.shop-car-content-list .check').click(function () {
                            var $self = $(this);
                            if (!$self.hasClass('on')) {
                                $self.addClass('on');
                                if ($('.shop-car-content-area .check:not(.on)').length === 0) {
                                    $('.shop-section-list .check').addClass('on')
                                }
                            } else {
                                $self.removeClass('on');
                                $('.shop-section-list .check').removeClass('on');
                                if ($('.shop-car-content-area .check.on').length === 0) {
                                    $('.shopping-ui .price').text('￥' + 0.00)
                                }
                            }
                            getSumprice();
                        });

                        $('.shop-section-list .check').click(function () {
                            var $self = $(this);
                            if ($self.hasClass('on')) {
                                $self.removeClass('on');
                                $('.shop-car-content-list .check').removeClass('on');
                                if ($('.shop-car-content-area .check.on').length === 0) {
                                    $('.shopping-ui .price').text('￥' + 0.00)
                                }
                            } else {
                                $self.addClass('on');
                                $('.shop-car-content-list .check').addClass('on ')
                            }
                            getSumprice();
                        });

                        $('.shop-car-content-list .shop-car-content-area .info span').click(
                            function () {
                                $(this).parent().parent().parent().next().children().toggle();
                            }
                        );
                    });


                }
            )
        } else {
            target.html(
                `<div class="shop-car-content-area none">
                    <p>您的购物车还是空的，您可以：</p>
                    <a href="login.html" class="tab-button">
                        立即登陆
                    </a>
                    <span class="info">
                    登录后购物车的商品将保存到您的账号中，或者去 <a href=""
                     style="align-self:flex-start;"
                    >逛逛</a>
                    </span>
                </div>`
            );
        }
    });
}());