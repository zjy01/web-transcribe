/**
 * Created by carvenzhang on 2016/10/11.
 */
var app = require('http').createServer(handler)
var io = require('./io-server');

function handler (req, res) {
    res.writeHead(200);
    res.end();
}

io.listen(app);
app.listen(2999);