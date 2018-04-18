/*随机生成图片*/

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
var count = 15;
var card = document.getElementsByClassName('card');
/********记录剩余仓库数***********/

/********接收提取货柜号，做出相应处理*******/
/**function getProduct() {
    let boxId = document.getElementById("check-productId").value - 1;
    check(boxId);
}***/

/*function addProduct() {
    let addId = document.getElementById("add-productId").value - 1;
    add(addId);
}*/
let message='';
function check(boxId) {
        let product_id = card[boxId].getElementsByTagName("i")[0].id;
        let state = card[boxId].getElementsByTagName("i")[1].className;
        if (state == "true") {
            card[boxId].className = "card show open animated wobble";
            card[boxId].getElementsByTagName("i")[1].className = false;
            count = count - 1;
           
                //alert("货物ID:" + product_id + "已成功取出!");
                message+='<span class=\"saved\">货物'+product_id+'取出!货柜'+(boxId+1)+'置空'+ getTime() +'</span>\n';
                document.getElementById("message").innerHTML=message;
                card[boxId].className = "card show match ";
            
        } else {
            card[boxId].className = "card show error";
            setTimeout(function() {
                //alert("抱歉" + boxId + "号货柜为空！取货失败!");
                let message="抱歉" + boxId + "号货柜为空！取货失败!";
                document.getElementById("state").innerHTML+=message;
                card[boxId].className = "card show match animated wobble";
            }, 600)
        }
       // document.getElementById("check-productId").value = "";
    
    document.getElementsByClassName('time')[0].innerHTML = count + "个";

}
/********接收添加的货柜号，做出相应处理*******/
function add(addId) {

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
    document.getElementsByClassName('time')[0].innerHTML = count + "个";
}
 
/**********获取时间的函数**************/
function getTime(){
    var myDate = new Date();
    var date= "("+(myDate.getMonth()+1)+"月"+ myDate.getDate()+"日"+ myDate.getHours()+"时"+ myDate.getMinutes()+"分"+ myDate.getSeconds()+"秒)";
    return date;
}
