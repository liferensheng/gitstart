;
(function() {

	this.native={
		data:{
         inputContent:''
    }
  };
	this.native.isAndroid=navigator.userAgent.indexOf('Android') > -1 ||navigator.userAgent.indexOf('Linux') > -1;


	// this.isFunction=function(fun){
	// 	return typeof fun == "function";
  // }
  // 返回方式请求参数
  this.native.setData=function(a){
     return app.native.data[a]
  }
	////关闭当前页面
	this.native.cancelNativePage=function(p){
		app.callNative({"fun": "cancelNativePage"});
	}

    // 获取设备ID
	this.native.getDeviceId=function(p){
		app.callNative({
			"fun": "getDeviceId",
			"callback": p.fun
		});
  }
  // 获取验证参数
  this.native.getUrlParams=function(p){
		app.callNative({
			"fun": "getUrlParams",
			"callback": p.fun
		});
	}
	//设置导航栏主题
	this.native.setNavTitle=function(p){
		app.callNative({
      "fun": "setNavTitle",
      "data":{
        "title":p.title
      }
      ,
			"callback": p.fun
		});
	}

	//显示导航栏
	this.native.showNavigation=function(p){
		app.callNative({
			"fun": "showNavigation",
			"callback": p.fun
		});
	}


	//隐藏导航栏
	this.native.hideNavigation=function(p){
		app.callNative({
			"fun": "hideNavigation",
			"callback": p.fun
		});
	}

	//调用分享
	this.native.tangbaShareUrl=function(p){
		app.callNative({
			"fun": "tangbaShareUrl",
			"data": {
				"title": p.title,
				"icon":p.icon,
				"url":p.url,
				"content":p.content
			},
			"callback": p.fun
		});
	}
// 弹出输入框
this.native.native_showkeyboard=function(p){
  app.callNative({
    "fun": "native_showkeyboard",
    "data": {
      'type':p.type,
      'length':p.length,
      'placeholder':p.placeholder,
      'text':p.text,
  },
  "callback":p.fun
  });
}

	//设置状态栏为黑色
	this.native.setStatusBarStyleDefult=function(p){
		app.callNative({
      "fun": "setStatusBarStyleDefult"
      // ,
			// "callback": p.fun
		});

	}
	//设置状态栏为白色
	this.native.setStatusBarStyleLight=function(p){
    app.callNative({
      "fun": "setStatusBarStyleLight"
    // ,
		// "callback": p.fun
	    });
	}
	//调用图片展示
	this.native.showPhotos=function(p){
		app.callNative({"fun": "showPhotos",
		"data":{
			"picArr":p.picArr
		},
		"callback": p.fun
	});
	}
	///获取导航栏高度
	this.native.loadFinished=function(p){
		app.callNative({"fun": "getNavigationHeight",
		"callback": p.fun
	   });
	}
	//֪ͨ获取弹出键盘高度
	this.native.updateMessageNum=function(){
		app.callNative({"fun": "getKeyboardHeight",
		"data":{
			"cha":p.cha
		},
		"callback": p.fun
	});
	}
	//调出输入框
	this.native.showKeyBoard=function(p) {
		app.callNative({
			"fun": "showKeyBoard",
			"callback": p.fun
		});
	}

	// // 弹提示框
	// 获取ios版本号
	this.native.popAlertPanel= function(p) {
		app.callNative({
			"fun": "popAlertPanel",
			"callback":p
		});
	};
	// 弹确认框
	this.native.popConfirmPanel = function(p) {
		app.callNative({
			"fun": "popConfirmPanel",
			"callback":p
		});
	};
	// 弹输入框
	this.native.popTextInputPanel= function(p) {
			app.callNative({
				"fun": "popTextInputPanel",
				"callback":p
			});
    };
    // 输入框内容
	// this.native.nativereview=function(p) {
	// 	app.callNative({
	// 		"fun": "getVersion",
	// 		"data": {
  //         'type':p.type,
  //         'parentId':p.parentId,
  //         'toUserId':p.toUserId
  //     },
	// 		"callback":p.fun
	// 	});
	// }
	// this.native.data.get=function(k,f){
	// 	app.callNative({
	// 		"fun": "getData",
	// 		"data": {
	// 			"key":k
	// 		},
	// 		"callback": f
	// 	});
	// };
	// //��ȡ�汾��
	// this.native.getVersion=function(fun) {
	// 	app.callNative({
	// 		"fun": "getVersion",
	// 		"data": {},
	// 		"callback": fun
	// 	});
	// }
	// //����ͷ��
	// this.native.setAvatar=function(fun) {
	// 	app.callNative({
	// 		"fun": "setAvatar",
	// 		"data": {},
	// 		"callback": fun
	// 	});
	// }

	// //����ͼƬ
	// this.native.savePicture=function(p) {
	// 	app.callNative({
	// 		"fun": "savePicture",
	// 		"data": {
	// 			"name": p.name,
	// 			"image": p.image
	// 		},
	// 		"callback": p.fun
	// 	});
	// }


	// $(document).on("click",".native-back",function() {
	// 	app.callNative({"fun": "back"});
	// });


	//封装oc方法  调用js
	this.callNative = function(data) {
		console.log("调用客户端方法/" + data.fun + "/" + JSON.stringify(data.data));
		if (this.native.isAndroid) {
			app.setupWebViewJavascriptBridge(function(bridge) {
				bridge.callHandler(data.fun, data.data,
					function responseCallback(responseData) {
						// if (app.isFunction(data.callback)){
                 	data.callback(responseData);
            // }

						// alert(responseData);
					})
			})
		} else {
			window.WebViewJavascriptBridge.callHandler(
				data.fun, data.data,
				function(responseData) {
					var responseDataJson={};
					if(responseData){
						responseDataJson=JSON.parse(responseData);
					}
					if (app.isFunction(data.callback))
						data.callback(responseDataJson);
					console.log("native/res/" + responseDataJson);
				}
			);
		};
	};

	//Register a handler in ObjC, and call a JS handler
	/**************************基础配置**************************/
	this.setupWebViewJavascriptBridge = function(callback) {
    //第一次调用这个方法的时候，为false
    if(app.native.isAndroid){
		if (window.WebViewJavascriptBridge) {
			return callback(WebViewJavascriptBridge);
		} else {
			document.addEventListener(
				'WebViewJavascriptBridgeReady',
				function() {
					callback(WebViewJavascriptBridge)
				},
				false
			);
    }

  }else{
		//第一次调用的时候，为false
		if (window.WVJBCallbacks) {
			return window.WVJBCallbacks.push(callback);
		}
		//把callback对象赋值给对象
		window.WVJBCallbacks = [callback];
		//加载WebViewJavascriptBridge_JS中的代码
		var WVJBIframe = document.createElement('iframe');
		WVJBIframe.style.display = 'none';
		WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
		document.documentElement.appendChild(WVJBIframe);
		setTimeout(function() {
			document.documentElement.removeChild(WVJBIframe)
		}, 0)
	}
}


/******************oc调用js ***********************/
   //驱动所有hander的初始化
	app.setupWebViewJavascriptBridge(function(bridge) {
			// 这里注册Native 要调用的js 功能。
      //把WEB中要注册的方法注册到bridge里面

      if(app.native.isAndroid){
              bridge.init(function(message, responseCallback) {
                console.log('JS got a message', message);
                var data = {
                    'Javascript Responds': '测试中文!'
                };

                if (responseCallback) {
                    console.log('JS responding with', data);
                    responseCallback(data);
                }
            });
      }
			//data  OC中传过来的数据
			bridge.registerHandler('webViewInit', function(data, responseCallback) {
			app.native.data.imei=data.imei;
			app.native.data.loginInfo=data.loginInfo;
            //JS返回数据
			var responseData = {
				'key': 'ok'
			};
			responseCallback(responseData)
		});

		bridge.registerHandler("js_inputViewEndEdit", function(data, responseCallback) {
      if(app.native.isAndroid){
        app.native.data.inputContent=data;
      }else{
        app.native.data.inputContent=data.content;
      }
      ONE.setdata=app.native.data.inputContent;
      // Vue.prototype.$inputContent=app.native.data.inputContent;
      alert(app.native.data.inputContent)
       document.querySelector("#temp").innerHTML=app.native.data.inputContent;
    });

		bridge.registerHandler("inputRecover", function(data, responseCallback) {

      alert("调用inputRecover方法了")


        });


		bridge.registerHandler("naticeSetKeyboardHeight", function(data, responseCallback) {
			// document.querySelector("textarea").style.bottom="0px";
        });

	});

}).call(app);
