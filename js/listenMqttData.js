 /********JS监听来自matt服务器数据的方法*************/


const clientid ="paho1513850198";       //js中设置的客户端标识，可随意，但不应与自己mqtt客户端上的标识重复，否则会互相挤掉，无法进行应用的模拟
const topic="test";     //订阅的主题    
const ip="127.0.0.1";       //服务器的的ip
const port=61623;       //服务器的端口号
/********1.首先建立mqtt类的对象。(注意这里仅仅是建立类的对象，还没有做任何连接操作*********/
client = new Paho.MQTT.Client(ip,port,clientid); //第一个参数是mqtt服务器ip，第二个参数是mqtt服务的端口，第三个参数是自己的clientid.

 var option = {
    onSuccess: function() {
        console.log("onConnected");
        client.subscribe(topic);
    },
    onFailure: function() {
        console.log("onFailConnect");
    },
    userName: 'admin',
    password: 'password'
   // keepAliveInterval: keepAlive
};
client.connect(option);


/*******以上代码是先设置一个参数，然后执行连接函数的。参数是一个javascript的对象，对象中有几个参数：
onSuccess对应的值是一个函数，是当连接成功后执行的回调函数。
onFailure对应的值是也个函数，是当连接失败后执行的回调函数。
userName是字符串类型，是mqtt的接入用户名。
password也是字符串类型，是mqtt的接入密码。
这个参数中还有一些其他参数，如：
useSSL：这是个布尔型变量，默认为false，如果设置成true，连接将会使用wss协议。
timeout：这个是设置连接服务器的超时时间的，默认为30s。
keepAliveInterval：这个是设置发送mqtt心跳包的频率，默认为60s。****/

/*****3.如果连接成功，我们就可以继续往下做，设置当接收到消息后的消息处理函数以及如果出现异常掉线所需要处理的事件处理函数。
消息处理函数*****/

client.onMessageArrived = function(message) {
    //console.log("消息已到达");
   // var topic = message.destinationName;
    var msg = message.payloadString;
    //console.log("接收到消息：");
    //console.log("接收到消息的topic为：" + topic);
    console.log("提取货柜号为：" + msg);
  
   //var statement = new RegExp(msg).test(string);
   // if(statement==true)
    
    //{add(msg-1);}
   // else{
        pick(msg);
    //}

}

/**断线异常处理函数,通常这个函数里会执行一个警告或是断线重连s**/
client.onConnectionLost = function(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("异常掉线，掉线信息为:" + responseObject.errorMessage);
        //client.reconnect();
    }
   /* else{
console.log("重新连接")
        //client.connect(option);
 client.reconnect();
    }*/
}
/*var str    = "My blog name is Benjamin-专注前端开发和用户体验",
    substr = "Ben";
 
function isContains(str, substr) {
    return new RegExp(substr).test(str);
}
 
//true
console.log(isContains(str, substr));*/