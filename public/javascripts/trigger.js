/**
 * Created by carvenzhang on 2016/10/10.
 */
socket.on('connect', function () {
    console.log('connect');
    socket.on('get', function (data) {
        console.log("trigger\t"+data.target+"\t"+data.action);
        document.querySelector(data.target).dispatchEvent(new Event(data.action));
    })
});