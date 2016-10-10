/**
 * Created by carvenzhang on 2016/10/10.
 */
var io=require('socket.io')();
exports.listen= function (_server) {
    return io.listen(_server);
};
io.on('connection', function (_socket) {
    console.log('connection:\t' + _socket.id );
    _socket.on('send', function (json) {
        console.log('send');
        _socket.broadcast.emit('get',json);
    })
});