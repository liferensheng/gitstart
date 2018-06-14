
function _getNative() {
  if (typeof window.webkit != "undefined") {
    return window.webkit.messageHandlers;
  } else if (window.Native) {
    return Native;
  }
  return false;
};
function getUrlParams(){
  // alert(123)
  var urlParams=_getNative();
  if (typeof window.webkit != "undefined") {
    return getNative('getUrlParams') || sessionStorage.getUrlParams;
  } else if (window.Native) {
//	alert(22)
    return getNative("getUrlParams");
  }
  return localStorage.getUrlParams;
}


function getNative(method,{parames}={}){
	// 不是2.5.3之后的ios
	var str="";
	for(var attr in parames){
		str+=parames[attr]+'|';
	};
	str=str.replace(/\?$/,"");
	if(window.webkit){
		window.webkit.messageHandlers.glucometer.postMessage({functionName:method,params:parames});
		return
	}else if(facility()){
		// ios变啦2.5.3之前
		window.Native[method](str);
		return
	}else if(window.Native && !facility()){
		var arr=[];
	 	arr=parames?Object.keys(parames).map(function(k){return parames[k]}):[];
		var androidStr = window.Native[method].apply(window.Native,arr);
		return androidStr;
	}else {
		// pc端或非主流移动设备
		return false
	}
};
function facility(){
	var u = navigator.userAgent;
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	return isiOS?true:false;
};


//获取url参数
function getUrlName(name){
  // var search=location.search.replace("?","");  //本地没有location.search
  var  a=getUrlParams().split("?")[1]+"&"+(location.href).split("?")[1];
      //post请求参数放于请求体中可能获取不到
  // var  a=getUrlParams().split("?")[1];
var  search=a.split("#")[0];  //android 后面加有#号 需要另外处理一下
// var  search=location.href.split("?")[2]
// console.log("截取路径",search)

  var arr=search.split("&");
  // alert(arr)
	if(name=="all"){
		return search;
	};
	if(name=="verify"){
		// console.log(getNativeObj())
		// if(getNativeObj()){
		// 	return getUrl();
		// };
		var verify1=new RegExp("user_id");
		var verify2=new RegExp("timestamp");
		var verify3=new RegExp("sign");
		var verify4=new RegExp("debug");
    var strings="";
    var k={};
		arr.forEach(function(value){
			if(verify1.test(value)){
        strings=strings==""?value:strings+"&"+value;
			};
			if(verify2.test(value)){
				strings=strings==""?value:strings+"&"+value;
			};
			if(verify3.test(value)){
				strings=strings==""?value:strings+"&"+value;
			};
			if(verify4.test(value)){
				strings=strings==""?value:strings+"&"+value;
			};
		})
		return "?"+strings;
  };

	var opt=new RegExp(name);
		for(var i=0;i<arr.length;i++){
			if(opt.test(arr[i])){
				return arr[i].replace(name+"=","")
			}
		}

};

function minTips(text,b){
  var a=b?b:1000;
	// 微型提示框
	var tips=document.querySelector(".minTips");
	if(tips){
		tips.innerHTML=text;
		tips.className="minTips abcenter absolute animateTips";
	}else{
		var createTips=document.createElement("div");
		createTips.className="minTips abcenter absolute animateTips";
		createTips.innerHTML=text;
		document.body.appendChild(createTips);
		setTimeout(function(){
			createTips.remove();
		},a)
	};
};
function weixinConfig(that){
  var links = location.origin.indexOf("https://t8api.bianla.cn")!=-1?'https://t8api.bianla.cn':'https://tang8dev.bianla.cn';


  that.$http.get(links +"/api/tangba/weichat/wxconfig.action",{timeout:1000})
  .then(msg=>{
     if (msg.data.code) {
        wx.config({
          debug: false,
          appId: msg.data.data.appId,
          timestamp: msg.data.data.timestamp,
          nonceStr: msg.data.data.noncestr,
          signature: msg.data.data.signature,
          jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"]
        });

        // minTips("配置成功")
      } else {
        // minTips("微信配置错误");
      }
 })
 .catch(function (err) {
      // minTips("微信配置错误2");
 });

}



//微信二次分享的数据
function wEventConfit(that) {
  var links = location.origin.indexOf("https://t8api.bianla.cn")!=-1?'https://t8api.bianla.cn':'https://tang8dev.bianla.cn';
	var title = that.title || "";
	var shareLink =links + that.shareLink||"";
	var articleIcon =links + that.articleIcon || "";
	var content = that.contentr || "";
 console.log(wx)
	if (wx) {
		wx.ready(function () {
			wx.onMenuShareAppMessage({
				title: title,
				link: shareLink,
				desc:content,
				imgUrl: articleIcon,
				success: function () {
        // 用户确认分享后执行的回调函数
//      alert(shareLink)
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
        console.log(4566)
    }
			});
			wx.onMenuShareTimeline({
				title: title,
				link: shareLink,
				desc:content,
				imgUrl: articleIcon
			});
		});
	}
};


export {
  getUrlParams,getNative,getUrlName,_getNative,minTips, weixinConfig,wEventConfit
}
