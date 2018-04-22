/*随机生成图片*/
const messageLength = 6; //设置显示的消息条数。
var message = []; //存放消息的数组。
var count = 15; //仓库的跟踪数。
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

function pick(boxId) {

    document.getElementById("message").innerHTML = '';
    if (isNaN(parseInt(boxId, 10)) || (boxId > 15 || boxId < 0)) {
        if (message.length < messageLength) {
            message.push('<span class=\"faile\">非法数据：' + boxId + ' 请输入1~15的数字！' + getTime() + '</span>\n');
        } else if (message.length == messageLength) {
            for (let i = 0; i < message.length - 1; i++) { //将信息数组各上调一个位置。
                message[i] = message[i + 1];
            }
            message[message.length - 1] = '<span class=\"faile\">非法数据：' + boxId + ' 请输入1~15的数字！' + getTime() + '</span>\n';
        }
        for (let i = 0; i < message.length; i++) { //将消息数组显示在message的div
            document.getElementById("message").innerHTML += message[i];
        }
       

    } else {
        music.play();
        var boxId = boxId - 1;
        let product_id = card[boxId].getElementsByTagName("i")[0].id;
        let state = card[boxId].getElementsByTagName("i")[1].className;
        if (state == "true") {
            setTimeout(function() {
                card[boxId].className = "card show match animated wobble";
            }, 500);
            
            setMessage(messageLength, boxId, product_id, state);
            card[boxId].getElementsByTagName("i")[1].className = false;
            count = count - 1;
        } else {
            errormusic.play();
            setTimeout(function() {
                card[boxId].className = "card show error";
            }, 500);

            setTimeout(function() {

                card[boxId].className = "card show match animated wobble";
            }, 1000);
            setMessage(messageLength, boxId, product_id, state);
        }
    }
    document.getElementsByClassName('count')[0].innerHTML = count + "个";

}
/********接收添加的货柜号，做出相应处理*******/
/*function add(addId) {

    if (card[addId].getElementsByTagName("i")[1].className == "false") {
        count = count + 1;
        card[addId].getElementsByTagName("i")[1].className = "true";
        //alert(addId.value + "号货柜添加物品成功!");
        card[addId].className = "card animated wobble";
    } else {
        card[addId].className = "card error animated wobble";
        setTimeout(function() {
            alert("对不起！添加的" + (addId + 1) + "号货柜已存有物品！")
            card[addId].className = "card ";
        }, 600)
    }
    //document.getElementById("add-productId").value = "";
    document.getElementsByClassName('count')[0].innerHTML = count + "个";
}*/

/**********获取时间的函数**************/
function getTime() {
    var myDate = new Date();
    var date = "(" + (myDate.getMonth() + 1) + "月" + myDate.getDate() + "日" + myDate.getHours() + "时" + myDate.getMinutes() + "分" + myDate.getSeconds() + "秒)";
    return date;
}
/***************设置消息显示函数***************/
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
/************播放提示音效******************/