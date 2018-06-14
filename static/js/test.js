
///js中需要主动调用一下这个代码
setupWebViewJavascriptBridge(
  function(bridge){
      // 这里注册Native 要调用的js 功能。
      bridge.registerHandler("keyboardWillHide", function(data, responseCallback) {
          // ios 的方法
        // var isAndroid =navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1; //android终端或者uc浏览器
        // if(isAndroid){
          // document.querySelector("#temp").innerHTML="456";
          // responseCallback("keyboardWillHide调用js成功");
        // }
      });

      //
      bridge.registerHandler("naticeSetKeyboardHeight", function(data, responseCallback) {
        document.querySelector("textarea").style.bottom="0px";
        // var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        // document.querySelector("#temp").innerHTML=(100 - 30);
        // var  inputel=document.querySelector(".inputField");
        // if(isiOS&&inputel){
        //   if(location.href.indexOf("isIphoneX=1")!=-1){inputel.style.bottom=(100 - 30)+"px";}
        //   else{inputel.style.bottom=data+"px";}

        //   responseCallback("js收到键盘高度");
        // }

      });


  });

///Register a handler in ObjC, and call a JS handler
function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
  if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'https://__bridge_loaded__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

//////////////////////////////////////////js 调 OC//////////////////////////////////////////

/**
  ///不使用WebViewJavascriptBridge时的调用方法
  window.webkit.messageHandlers.glucometer.postMessage({functionName: 'setNavTitle',tittle:'网页'});

  ///使用WebViewJavascriptBridge后调用方法直接为
  WebViewJavascriptBridge.callHandler("showNavigation","what????",function(response) {
                                      document.getElementById('temp').innerHTML = response;
                                      });
  注:后面的function(){}为callHandler的回调方法

*/
function cancelNativePage(){
  //old
  // window.webkit.messageHandlers.glucometer.postMessage({functionName: 'cancelNativePage'});
  WebViewJavascriptBridge.callHandler("cancelNativePage");
}

// 获取设备ID
function getDeviceId() {
//    window.webkit.messageHandlers.glucometer.postMessage({code: '0001', functionName: 'getdevideId'});
  WebViewJavascriptBridge.callHandler("getDeviceID",null,function(response){
                                      document.getElementById('temp').innerHTML = response;
                                      });
}

//设置导航栏主题
function setNavTitle(){
//    window.webkit.messageHandlers.glucometer.postMessage({functionName: 'setNavTitle',tittle:'网页'});
  WebViewJavascriptBridge.callHandler("setNavTitle","这是H5页面",function(response){
                                      document.getElementById('temp').innerHTML = response;
                                      });
}

//显示导航栏
function showNavigation(){
  WebViewJavascriptBridge.callHandler("showNavigation",null,function(response) {
                                      document.getElementById('temp').innerHTML = response;
                                      });
  //    window.webkit.messageHandlers.glucometer.postMessage({functionName: 'showNavigation'});
}

//隐藏导航栏
function hideNavigation(){
  WebViewJavascriptBridge.callHandler("hideNavigation",null,function(response) {
                                      document.getElementById('temp').innerHTML = response;
                                      });
//    window.webkit.messageHandlers.glucometer.postMessage({functionName: 'hideNavigation'});
}

//调用分享
function tangbaShareUrl(a){

  WebViewJavascriptBridge.callHandler("tangbaShareUrl",{title:a.title,icon:a.icon,url:a.url,content:a.content},function(response){

  })
  // window.webkit.messageHandlers.glucometer.postMessage({functionName:'tangbaShareUrl',params:});
}

//设置状态栏为黑色
function setStatusBarStyleDefult(){
  WebViewJavascriptBridge.callHandler("setStatusBarStyleDefult",null,function(response){
  });
  // window.webkit.messageHandlers.glucometer.postMessage({functionName:'setStatusBarStyleDefult'});
}

//设置状态栏为白色
function setStatusbarStyleLight(){
  WebViewJavascriptBridge.callHandler("setStatusbarStyleLight",null,function(response){
  });
  // window.webkit.messageHandlers.glucometer.postMessage({functionName:'setStatusbarStyleLight'});
}

///OC调用js,先调用oc,让OC调起JS
function setDivValue(){
  WebViewJavascriptBridge.callHandler("setDivValue",null);
  // window.webkit.messageHandlers.glucometer.postMessage({functionName:'setDivValue'});
}

//调用图片展示
function showPhotos(){
  WebViewJavascriptBridge.callHandler("showPhotos",{picArr:['https://upload-images.jianshu.io/upload_images/8781106-1a4edd32bbe54575.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/508','https://upload-images.jianshu.io/upload_images/8781106-71a5d592257ddabb.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/508','https://upload-images.jianshu.io/upload_images/2206395-b1f7e6d8c3263ce1.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/524']},function(response){


  });
  //window.webkit.messageHandlers.glucometer.postMessage({functionName:'showPhotos',params:})
}

///获取导航栏高度
function getNavigationHeight(){
   WebViewJavascriptBridge.callHandler("getNavigationHeight",null,function(response){
      document.getElementById('temp').innerHTML = '导航栏高度为'+response;
   });
  // window.webkit.messageHandlers.glucometer.postMessage({functionName:'getNavigationHeight'});
}

function getKeyboardHeight(a){
  WebViewJavascriptBridge.callHandler("getKeyboardHeight",null,function(response){
                                      // document.getElementById('temp').innerHTML = '键盘高度为'+response;
                                      // document.querySelector(a.ele).style.bottom=(response+a.height)+"px";
                                      // document.querySelector(a.ele).style.bottom="0";
                                      });
}

function showKeyBoard(){
  document.getElementById('temp').innerHTML = 'h5页面点击,js调用';
}
////调用delegate
// 弹提示框
function popAlertPanel() {
  alert("提示框");
}

// 弹确认框
function popConfirmPanel() {
  var ok = confirm("确认框");
  document.getElementById('temp').innerHTML = ok;
}
// 弹输入框
function popTextInputPanel() {
  var tel = prompt("输入框","请输入手机号");
  document.getElementById('temp').innerHTML = tel;
}
// 获取app版本号
function getAppVersion() {
  WebViewJavascriptBridge.callHandler("getAppVersion",null,function(response){





    // document.getElementById('temp').innerHTML = '版本号'+response;
    // document.querySelector(a.ele).style.bottom=(response+a.height)+"px";
    // document.querySelector(a.ele).style.bottom="0";
    });
}
// 获取ios版本号
function getiOSVersion() {
  WebViewJavascriptBridge.callHandler("getiOSVersion",null,function(response){





    // document.getElementById('temp').innerHTML = '版本号'+response;
    // document.querySelector(a.ele).style.bottom=(response+a.height)+"px";
    // document.querySelector(a.ele).style.bottom="0";
    });
}

//////////////////////////////////////////OC 调 JS//////////////////////////////////////////

export {
  cancelNativePage,popAlertPanel,getKeyboardHeight,tangbaShareUrl,setStatusBarStyleDefult,setStatusbarStyleLight,getAppVersion
}
