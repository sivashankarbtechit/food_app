var app   = require('./app'),
    http  = require('http'),
    port  = 8000;


http.createServer(app).listen(port,function(){
    console.log("server listen on "+port );
});
