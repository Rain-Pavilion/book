const http=require("http");
const url=require("url");
const qs = require('querystring');

http.createServer((req,res)=>{
  console.log(req.method);//请求方式
  res.writeHead(200,{
    "Access-Control-Allow-Origin":"*"
  });
  if(req.method=="GET"){
    req.query=url.parse(req.url,true).query;
    console.log(req.query);//请求参数
    var {uname,upwd}=req.query;
    if(uname=="dingding"&&upwd=="123456"){
      res.write(JSON.stringify({code:1}))
    }else{
      res.write(JSON.stringify({code:0}))
    }
    res.end();
  }
}).listen(3000);