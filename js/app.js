/*随机生成图片*/
const messageLength = 6; //设置显示的消息条数。
var message = []; //存放消息的数组。
var count = 15; //仓库的跟踪数。
const sear = new RegExp('add'); //添加货物时，服务器发布的消息需要含有'add'字符串。
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        if (randomIndex != currentIndex - 1) {
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    }
    return array;
}

function setcards() { //设置卡片。

    var cards_style = [{

            "style": "fa-diamond",
            "id": 0345,
            "state": true
        },
        {

            "style": "fa-diamond",
            "id": 4486,
            "state": true
        },
        {

            "style": "fa-paper-plane-o",
            "id": 8888,
            "state": true
        },
        {

            "style": "fa-paper-plane-o",
            "id": 6666,
            "state": true
        },
        {

            "style": "fa-anchor",
            "id": 5421,
            "state": true
        },
        {

            "style": "fa-anchor",
            "id": 4651,
            "state": true
        },
        {

            "style": "fa-bolt",
            "id": 6902,
            "state": true
        },
        {

            "style": "fa-bolt",
            "id": 2345,
            "state": true
        },
        {

            "style": "fa-cube",
            "id": 8838,
            "state": true
        },
        {

            "style": "fa-cube",
            "id": 2345,
            "state": true
        },
        {

            "style": "fa-leaf",
            "id": 4423,
            "state": true
        },
        {

            "style": "fa-leaf",
            "id": 9023,
            "state": true
        },
        {

            "style": "fa-bicycle",
            "id": 4789,
            "state": true
        },
        {

            "style": "fa-bicycle",
            "id": 5512,
            "state": true
        },
        {

            "style": "fa-diamond",
            "id": 3309,
            "state": true
        },


    ];
    let str = '';
    let i = 0;
    let num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    shuffle(cards_style);
    for (const card of cards_style) {
        str += '<div><li class=\"num\">' + num[i] + '</li>\n<li class = \"card\"><i class=\"fa ' + card.style + '\" id=\" ' + card.id + '\"><i class=\"' + card.state + '\"></i></i></li></div>';
        i = i + 1;
    }
    document.getElementsByClassName("deck")[0].innerHTML = str;
}

function initial() { //初始化;
    setcards();
}
window.onload = initial;
/******************************主要流程***********************************************/
var card = document.getElementsByClassName('card');
var music = document.getElementById("music");
var errormusic = document.getElementById("error-music");
const string = ['非法数据：', '货柜添加成功!货柜号：', '货柜有货添加失败!货柜号:'];
const style = ['','faile'];
function pick(boxId) {

    if (sear.test(boxId)) {　
        if (pickNum(boxId) != '') {　 //检测boxId中是否有add的字眼。
            add(pickNum(boxId) - 1);　
        } else {
            document.getElementById("message").innerHTML = '';
            addMsg(boxId, string[0],style[1]);
        }　
    } else {
        document.getElementById("message").innerHTML = '';
        if (isNaN(parseInt(boxId, 10)) || (boxId > 15 || boxId < 0 || (boxId.indexOf(" ") != -1))) {
            errormusic.currentTime = 1;
            errormusic.play(); //错误提示的音效。
            addMsg(boxId, string[0],style[1]);
        } else {
            music.currentTime = 0.4; //指定音频开始时间为0.4秒开始。
            music.play(); //成功提示的音效。
            var boxId = boxId - 1;
            let product_id = card[boxId].getElementsByTagName("i")[0].id;
            let state = card[boxId].getElementsByTagName("i")[1].className;
            if (state == "true") {
                card[boxId].className = "card show match animated wobble";
                setMessage(messageLength, boxId, product_id, state);
                card[boxId].getElementsByTagName("i")[1].className = false;
                count = count - 1;
            } else {
                errormusic.play();
                card[boxId].className = "card show error";
                setTimeout(function() {
                    card[boxId].className = "card show match animated wobble";
                }, 1000);
                setMessage(messageLength, boxId, product_id, state);
            }
        }
        document.getElementsByClassName('count')[0].innerHTML = count + "个";
    }
}
/********接收添加的货柜号，做出相应处理*******/
function add(addId) {
    document.getElementById("message").innerHTML = '';
    if (isNaN(parseInt(addId, 10)) || (addId >15 || addId < 0)) {
        errormusic.currentTime = 1;
        errormusic.play(); //错误提示的音效。
        addMsg(addId + 1, string[0],style[1]);
    } else if (card[addId].getElementsByTagName("i")[1].className == "false") {
        count = count + 1;
        card[addId].getElementsByTagName("i")[1].className = "true";
         music.currentTime = 0.4; //指定音频开始时间为0.4秒开始。
        music.play(); //成功提示的音效。
        card[addId].className = "card  animated wobble";
        addMsg(addId + 1, string[1],style[0]);
    } else {
        //card[addId].className = "card error animated wobble";
        errormusic.currentTime = 1;
            errormusic.play(); //错误提示的音效。
        addMsg(addId + 1, string[2],style[1])
        card[addId].className = "card ";
    }

    document.getElementsByClassName('count')[0].innerHTML = count + "个";
}

/***************取货时的消息设置***************/
function setMessage(messageLength, boxId, product_id, state) {
    if (message.length < messageLength) {
        if (state == "true") {
            message.push('<span>货物' + product_id + '取出!货柜' + (boxId + 1) + '置空' + getTime() + '</span>\n');
        } else {
            message.push('<span class=\"faile\">' + (boxId + 1) + '号货柜为空，取货失败' + getTime() + '</span>\n');
        }
    } else if (message.length == messageLength) {
        for (let i = 0; i < message.length - 1; i++) { //将信息数组各上调一个位置。
            message[i] = message[i + 1];
        }
        if (state == "true") { //设置消息数组最后一个位置的信息。
            message[message.length - 1] = '<span>货物' + product_id + '取出!货柜' + (boxId + 1) + '置空' + getTime() + '</span>\n';

        } else {
            message[message.length - 1] = '<span class=\"faile\">' + (boxId + 1) + '号货柜为空，取货失败' + getTime() + '</span>\n';
        }
    }
    for (let i = 0; i < message.length; i++) { //将消息数组显示在message的div
        document.getElementById("message").innerHTML += message[i];
    }
}
/**********获取时间的函数**************/
function getTime() {
    var myDate = new Date();
    var date = "(" + (myDate.getMonth() + 1) + "月" + myDate.getDate() + "日" + myDate.getHours() + "时" + myDate.getMinutes() + "分" + myDate.getSeconds() + "秒)";
    return date;
}
/*从字符串中提取数字*/
function pickNum(boxId) {
    var arr = boxId.split(/[a-zA-Z @#%^&*$]/); //去除大小写字母和@#%^&*$与空格符号。
    var len = arr.length;
    var str2 = '';
    for (let i = 0; i < len; i++) {
        str2 += arr[i];
    }
    return str2;　　
}
/*****添加货物时的消息显示*************/
function addMsg(boxId, string,style) {
    if (message.length < messageLength) {
        message.push('<span class=\"'+style+'\">' + string + '' + boxId + ' ' + getTime() + '</span>\n');
    } else if (message.length == messageLength) {
        for (let i = 0; i < message.length - 1; i++) { //将信息数组各上调一个位置。
            message[i] = message[i + 1];
        }
        message[message.length - 1] = '<span class=\"'+style+'\">' + string + '' + boxId + ' ' + getTime() + '</span>\n';
    }
    for (let i = 0; i < message.length; i++) { //将消息数组显示在message的div
        document.getElementById("message").innerHTML += message[i];
    } 
}