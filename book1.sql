SET NAMES UTF8;
DROP DATABASE IF EXISTS book;
CREATE DATABASE book CHARSET=UTF8;
USE book;

/**书本分类**/
CREATE TABLE book_laptop_family (
  fid INT PRIMARY KEY AUTO_INCREMENT,
  fname VARCHAR(32)
);

/**书本**/
CREATE TABLE book_laptop (
  lid INT PRIMARY KEY AUTO_INCREMENT,
  book_name VARCHAR(128),          #商品名称
  family_id INT,              #所属型号家族编号
  title VARCHAR(128),         #主标题
  price DECIMAL(10,2),        #价格
  promise VARCHAR(64),        #服务承诺
  author VARCHAR(32),             #作者
  publishing VARCHAR(32),         #出版社
  comment_count INT,           #评论数量     
  laptop_count INT,           #商品数量
  content_introduction VARCHAR(1000),   #内容简介
  author_introduction VARCHAR(1000),       #作者简介
  catalogue_introduction VARCHAR(1000),     #目录简介
  lg_pic VARCHAR(128),      #商品大图
  sm_pic VARCHAR(128),      #商品小图
  inbetweening VARCHAR(128),      #商品插画
  shelf_time VARCHAR(32),          #出版时间
  FOREIGN KEY (family_id) REFERENCES book_laptop_family(fid)
);
/**用户信息**/
CREATE TABLE book_user (
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32) NOT null UNIQUE,
  upwd VARCHAR(32),
  email VARCHAR(64),
  phone VARCHAR(16),
  avatar VARCHAR(128),        #头像图片路径
  user_name VARCHAR(32),      #用户名，如王小明
  gender INT                  #性别  0-女  1-男
);

/**收货地址信息**/
CREATE TABLE book_receiver_address (
  aid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,                #用户编号
  receiver VARCHAR(16),       #接收人姓名
  province VARCHAR(16),       #省
  city VARCHAR(16),           #市
  county VARCHAR(16),         #县
  address VARCHAR(128),       #详细地址
  cellphone VARCHAR(16),      #手机
  fixedphone VARCHAR(16),     #固定电话
  postcode CHAR(6),           #邮编
  tag VARCHAR(16),            #标签名
  is_default BOOLEAN default 1,          #是否为当前用户的默认收货地址
  FOREIGN KEY (user_id) REFERENCES book_user(uid)
);

/**购物车条目**/
CREATE TABLE book_shoppingcart_item (
  iid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,      #用户编号
  product_id INT,   #商品编号
  count INT,        #购买数量
  is_checked BOOLEAN, #是否已勾选，确定购买
  FOREIGN KEY (user_id) REFERENCES book_user(uid),
  FOREIGN KEY (product_id) REFERENCES book_laptop(lid)
);

/**用户订单**/
CREATE TABLE book_order (
  aid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  address_id INT,
  status INT,             #订单状态  1-等待付款  2-等待发货  3-运输中  4-已签收  5-已取消
  order_time BIGINT,      #下单时间
  pay_time BIGINT,        #付款时间
  deliver_time BIGINT,    #发货时间
  received_time BIGINT,    #签收时间
  FOREIGN KEY (user_id) REFERENCES book_user(uid),
  FOREIGN KEY (address_id) REFERENCES book_receiver_address(aid)
);

/**用户订单**/
CREATE TABLE book_order_detail (
  did INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT,           #订单编号
  product_id INT,         #产品编号
  count INT,               #购买数量
  FOREIGN KEY (product_id) REFERENCES book_laptop(lid),
  FOREIGN KEY (order_id) REFERENCES book_order(aid)
);

/****首页轮播广告商品****/
CREATE TABLE book_index_carousel (
  cid INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(128),
  title VARCHAR(64),
  href VARCHAR(128)
);

/****首页商品****/
CREATE TABLE book_index_product (
  pid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(64),
  details VARCHAR(128),
  pic VARCHAR(128),
  price DECIMAL(10,2),
  author VARCHAR(64),
  shelf_time DATE,
  href VARCHAR(128),
  seq_recommended TINYINT,
  seq_new_arrival TINYINT,
  seq_top_sale TINYINT
);
/****用户评论****/
CREATE TABLE book_comment (
 cid INT PRIMARY KEY AUTO_INCREMENT,
 user_id INT,
 product_id INT,
 comment VARCHAR(3000),
 FOREIGN KEY (user_id) REFERENCES book_user(uid),
 FOREIGN KEY (product_id) REFERENCES book_laptop(lid)
);
/*******************/
/******数据导入******/
/*******************/
