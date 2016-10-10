/**
 * Created by carvenzhang on 2016/10/10.
 */
var socket = io();
var findHashEventsElements = function (ele, eventType) {
    if (!ele.tagName) return null;
    // html标签内绑定 或者 js直接绑定
    if ( (ele['events'] && ele['events'][eventType]) || ele.hasAttribute("on" + eventType) || ele['on' + eventType] ) {
        return ele;
    }
    else { //事件委托
        if (ele.parentNode != null) {
            return findHashEventsElements(ele.parentNode, eventType);
        }
        else {
            return null;
        }
    }
};

document.addEventListener('click', function (e) {
    if (e.button === 0) {

        var target = e.target,
            enable = findHashEventsElements(target, 'click');

        if(enable){
            socket.emit('send', {
                action: 'click',
                target: getSelector(target),
                time: +new Date()
            })
        }
    }
},true);

document.addEventListener('touchstart', function (e) {
    var target = e.target,
        enable = findHashEventsElements(target, 'touchstart');

    if(enable){
        socket.emit('send', {
            action: 'touchstart',
            target: getSelector(target),
            time: +new Date()
        })
    }
},true);

function getSelector (element) {
    var tagName = element.tagName.toLowerCase();
    //去空格
    function trim(string) {
        return string && string.replace(/^\s+|\s+$/g,"") || string;
    }

    //去掉一些使用时间戳作为ID的元素
    if (element.id && !(/\d{13}/).test(element.id) && !(/^\d+$/).test(element.id) ){
        return '#' + element.id;
    }
    //html
    if (element == document || element == document.documentElement ){
        return 'html';
    }
    //body
    if (element == document.body) {
        return 'html>' + tagName;
    }
    //无父级元素，则返回自己
    if (!element.parentNode) {
        return tagName;
    }

    //有父类元素的情况下，确定target是同种兄弟元素的第几个
    var ix = 0,
        siblings = element.parentNode.childNodes,
        elementTagLength = 0,
        className = trim(element.className);

    //统计同种兄弟元素
    for (var i = 0, l = siblings.length; i < l; i++){
        if (className) {
            if(trim(siblings[i].className) === className){
                ++elementTagLength;
            }
        }
        else {
            if ( (siblings[i].nodeType == 1) && (siblings[i].tagName === element.tagName) ) {
                ++elementTagLength;
            }
        }
    }
    //确定target是父类元素下的第几个兄弟元素
    for (i = 0, l = siblings.length; i < l; i++){
        var sibling = siblings[i];
        if (element === sibling) {
            return arguments.callee(element.parentNode) + '>'
                + ( className
                    ? '.' + className.replace(/\s+/g,',')
                    : tagName)
                + ( (!ix && elementTagLength === 1)
                    ? ''
                    : ':nth-child(' + (ix + 1) + ')');
        }
        else if (sibling.nodeType == 1) {
            ix++;
        }
    }

};