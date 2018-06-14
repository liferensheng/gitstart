//
// /**
//  *
//  * @authors banche 277658477@qq.com
//  * @date    2017-11-15 18:40:01
//  * @version 1.0
//  */
//
// //获取用户设备dpr计算meta值
// // ;(function(win){
// // 	var dpr=parseInt(win.devicePixelRatio);
// // 	var meta=document.createElement("meta"),
// // 	    Proportion=1/dpr,
// // 	    content="width=device-width, initial-scale="+Proportion+", maximum-scale="+Proportion+", minimum-scale="+Proportion+", user-scalable=no";
// // 	meta.setAttribute("name","viewport");
// // 	meta.setAttribute("content",content);
// // 	document.head.appendChild(meta);
// // 	document.documentElement.setAttribute("dpr",dpr);
// // })(window);
// ;(function(){
// 	document.addEventListener("touchstart",function(ev){
// 		if(ev.target.nodeName!="INPUT" || ev.target.nodeName!="TEXTAREA"){
// 			var input=document.querySelectorAll("input , textarea");
// 			for(var i=0;i<input.length;i++){
// 				input[i].blur();
// 			}
// 		}
// 	},false)
// })();
//
//
//
// //{
// //	if(location.origin.indexOf("api")==-1){
// //		var script=document.createElement("script");
// //		script.src="https://cdn.bootcss.com/eruda/1.2.6/eruda.min.js";
// //		document.body.appendChild(script);
// //		script.onload=function(){
// //			(function (){ var el = document.createElement('div');document.body.appendChild
// //
// //(el);eruda.init({container: el,tool: ['console']});})()
// //		}
// //	}
// //}
//
//
//  // 输入框遮挡问题
// // document.addEventListener("focus",function(ev){
// // if(ev.target.nodeName== "INPUT" || ev.target.nodeName=="TEXTAREA"){
// // 	setTimeout(function(){
// // 		ev.target.scrollIntoView();
// // 	},350);
// // }
// // },true);
//
//
//
// //安卓bug 取消所有输入框焦点
// (function(){
// 	document.addEventListener("touchstart",function(ev){
// 		if(ev.target.nodeName!="INPUT" || ev.target.nodeName!="TEXTAREA"){
// 			var input=document.querySelectorAll("input , textarea");
// 			for(var i=0;i<input.length;i++){
// 				input[i].blur();
// 			}
// 		}
// 	},false);
// })();
//
//
// function minTips(text,t){
//   var  a=t?t:1000;
// 	// 微型提示框
// 	var tips=document.querySelector(".minTips");
// 	if(tips){
// 		tips.innerHTML=text;
// 		tips.className="minTips abcenter absolute animateTips";
// 	}else{
// 		var createTips=document.createElement("div");
// 		createTips.className="minTips abcenter absolute animateTips";
// 		createTips.innerHTML=text;
//     document.body.appendChild(createTips);
//     console.log(a)
// 		setTimeout(function(){
// 			createTips.remove();
// 		},a)
// 	};
// };
//
//
//
