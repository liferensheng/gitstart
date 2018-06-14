<template>
	<div :class="['artical','flex','flex-column','space-between',{paddingBottomNew:isActive} ]" v-if="articalData" >
   <div class="clickButton"    >
     <div :class="['ref',{barState:change,padding_top:isActive&&!detaily,paddings:isIos&&!detaily,normal1:isActive&&detaily,normal2:isIos&&detaily}]"  ref="tt"   ></div>
      <div :class="['flex','flex-row','navIcon',{changestyle:change}]" style="width:100%;" >

          <div @click="backPre" class=" flex right-box "  >
                <span   class="radius flex flex-items flex-justify picsize" ><img :src="backImgUrl" alt="" class="span_img" style="margin-left:-2px;" /></span>
          </div>
          <div class=" flex1" style="height:100%;"></div>
          <div class="flex-row  right-box "  style=" text-align:right;" >

              <span class="share  flex flex-items flex-justify picsize" @click="shares"><img :src="shareImgUrl" alt="" class="span_img"  /></span>
          </div>
      </div>

  </div>


		<div v-if="articalContent&&reviewList" v-cloak  :class="['artical_section','flex1',{borderBottom:isActive}]"  >
      <div class="newOne scroll" style="height: 100%;" @scroll="scrolla($event)" >
			<div class="artical_banner relative">
				<img :src="mask_imgUrl" alt="" class="mask absolute"/>
				<img :src="artical_img" alt="" class="artical_banner_img"/>
			</div>

      <section class="loadingContainer">

    	</section>
			<div class="infos">

				<h2 class="artical_title" v-text="articalData.title"></h2>
				<div class="author"  >
					<span>作者： </span>
					<span v-text="articalData.publisher"></span>
          <!-- <span id="temp"></span> -->
					<span class="author_time" v-text="articalData.created"></span>
				</div>
			</div>
      <div class="wangEditor-container" style="width:100%;overflow:hidden;">
        <div id="editor-trigger" class="wangEditor-txt" contenteditable="false" style="width:100%;overflow-x:hidden;"  v-html="articalContent">

        </div>
      </div>

      <!-- <span id="temp"></span> -->
      <Review :getList='reviewList' :title="tag"  style="min-height:100px;" class="flex1"></Review>
      </div>
		</div>
      <div :class="['flex','flex-row','flex-items',{inputField:true,iosBottom:isActive}]" style="z-index:5000;"  v-cloak >

                <p style="vertical-align: text-bottom;" class="flex flex-row flex-items approvalBox flex1" @click="popoutInput">
                  <img src="../../static/img/reviewwrite.png" alt="" class="writeImg">
                  <span class="flex1 middleHeight" >我要点评...</span>
                  </p>
                   <!--<p @click="startLoading"  :class="{inputBtn:true,approvalColor:loadingColor,unapprovalColor:!loadingColor}" v-cloak></p>-->
                    <img @click="startLoading"  class="inputBtn" :src="test" alt=""  v-cloak>

       </div>

	</div>
</template>
<script>
  import Review from "./Review.vue"
  import {getUrlParams,getNative,getUrlName,minTips,windowHeight} from '../../static/js/checkcode.js'
  // import {cancelNativePage,popAlertPanel,getKeyboardHeight,tangbaShareUrl,setStatusBarStyleDefult,setStatusbarStyleLight,getAppVersion} from "../../static/js/test.js"
  import  "./../assets/css/artical.css";
  import "./../../static/fonts/font-awesome-4.5.0/css/font-awesome.min.css"
  import "./../../static/fontcss/icons.css"
  import  * as mo from "./../../static/fontjs/mo.min.js"
  import  {yesinit} from "./../../static/fontjs/demo.js"
  // import app from '../../static/js/app.js'
	export default{
		name:"artical",
		data:function(){
			return {
				mask_imgUrl:"static/img/nav.png",
				backImgUrl:"static/img/back.png",
				shareImgUrl:"static/img/share.png",
        test:"static/img/reviewapprove1.png",
				articalData:{},
				artical_img:"",
				isActive:false,
				isIos:false,
				articalContent:"",
				isCall:true,
				is200:false,
				change:false,
        cacheHeight:0,
        setColor:false,
        detaily:false,
        android:false,
        popup:false,


      placeHoldera:"我要点评...",
      object:'自己',
      key:false,
      up:false,
      reportBox:'',
      reviewPage:1,
      reviewNum:10,
      onlyOne:false,
      height:0,
      changeColor:false,
      operationType:0,
      commentId:'',
      userId:'',
      showInput:false,
      reviewList:{commentList:[],count:0},
      onlyOne:false,
      parentId:0,
      toUserId:0,
      androidcolor:false,
      letBlur:true,
      isChosing:false,
      times:0,
      chooseInput:false,
      loadingColor:false,
      isReporting:false,
      isSending:false,
      cutString:"",
      stringClean:false,
      articalData:{},
      inputContent:'',
      currentKey:-1,
      tag:''
			}
    },
    components:{
      Review
    },
		methods:{
		    scrolla:function(a){
		    	var that = this;
		        // 导航优化
          that.obj=a.target;
		        var d= document.getElementsByClassName("clickButton")[0];
            that.cacheHeight=a.target.scrollTop;
            that.height=a.target.scrollHeight-a.target.scrollTop -a.target.clientHeight;
            // console.log(that.height)

                  if(!that.onlyOne&&that.height < 300){
                    // console.log("到底了")
                that.onlyOne=true;
                that.reviewPage++;
                that.getReview(this.reviewPage,this.reviewNum);
                // that.reviewList.commentList.concat(that.reviewList.commentList);
                //  that.reviewList=[...that.reviewList,...that.reviewList];
                //  console.log(that.reviewList)

         }
                 if(that.cacheHeight > 200&&that.isCall){

                                that.change=true;
                                that.isCall = false;
                                that.detaily=true;
                                // if(!that.android){
                                     app.native.setStatusBarStyleDefult();
                                // }

                                 return;

                }
                if(that.cacheHeight < 200&&!that.isCall){
                      that.change=false;
                      that.isCall = true;
                      that.detaily=false;
                        // if(!that.android){
                                    app.native.setStatusBarStyleLight();
                                // }

                      return;
                    }
		    },
			axiosArtical:function(self){
				 if(/iphone[\s\S]*OS X/.test(navigator.userAgent)){
						self.isActive=true;
						self.mask_imgUrl = "static/img/iphoneXnav.png";

				}

				axiosA(self);
				function axiosA(self){

					if (axiosA.detaily) {
						return
					}
					axiosA.detaily = true;

          // alert(getUrlName("articalID"))
					self.$http.request({
						url: '/api/tangba/circle/loadArticleDetail.action'+getUrlParams(),
						params: {
							"id":getUrlName("articalID")
						},
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					})
					.then(function (msg) {
            // alert(msg.data.alertMsg)
            axiosA.detaily = false;
            // console.log("标签",msg.data.data.tag)
						self.articalData=msg.data.data;
            self.artical_img = msg.data.data.img_url;
            self.articalContent = msg.data.data.content;
            self.loadingColor =msg.data.data.isThumbs;
            self.tag=msg.data.data.tag;
            // alert(msg.data.data.isThumbs)
					})
					.catch(function (err) {
						minTips("网络错误")
					});
				}
			},
			thempUp:function(){
				var self = this;
				thempUpArtical(self);
				function thempUpArtical(self){
					if (thempUpArtical.thempUp) {
						return
					}

					thempUpArtical.thempUp = true;
					self.$http.request({
						url: '/api/tangba/circle/articleThumbsUp.action'+getUrlParams(),
						params: {
							"id":getUrlName("articalID")
						},
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					})
					.then(function (msg) {
            thempUpArtical.thempUp = false;
						if(msg.data.code==10){
              // if(self.loadingColor){
              //   minTips("点赞取消")
              // }
              self.loadingColor=!self.loadingColor;
							// self.loadingColor = true;
						}else if(msg.data.code==11){
							minTips("点赞失败")
						}
					})
					.catch(function (err) {
						minTips("网络错误")
					});
				}
			},
			shares:function(){
				var self = this;
				self.shareImgUrl = "static/img/shareActive.png";
				setTimeout(function(){
					self.shareImgUrl = "static/img/share.png";
        },160);
        if (self.shares.test) {
						return
					}
       self.shares.test=true;
				var links = location.origin.indexOf("https://t8api.bianla.cn")!=-1?'https://t8api.bianla.cn':'https://tang8dev.bianla.cn';
				var slef = this;
				var articalID = getUrlName("articalID");
        // var shareUrls =links + "/page/api/website/shareArticle.html"+"?articalID="+articalID;
        var shareUrls =links + "/page/api/website/shareArticle.html"+getUrlParams()+"&articalID="+articalID;
				var title = slef.articalData.title || "";
				var content = "分享"+slef.articalData.publisher+"的糖吧文章" || "";
        var icon = slef.articalData.articleIcon || "";

        app.native.tangbaShareUrl({title:title,icon:icon,url:shareUrls,content:content})
        self.shares.test=false;

      },
      popoutInput:function(){
        if(this.currentKey!=-1){
          this.reportBox="";
        }
        app.native.native_showkeyboard({type:0,length:140,placeholder:'我要点评...',text:this.reportBox,fun:function(){
              //  alert("这是评论")
        }});

      },
      startLoading:function(){
          //  this.loadingColor=!this.loadingColor;
           if(!this.loadingColor){
             this.test="static/img/reviewapprove1.png";
               yesinit();
           }else{
             this.test="static/img/reviewunapprove2.png";
           }

          this.thempUp();

      },
      down:function(){
        // console.log("down")
        // if(this.isSending){
        //   console.log("执行延迟了")
        //   setTimeout(function(){
        //        this.chooseInput=false;
        //   },500)
        // }
        // if(this.isSending){return;}
        console.log("down")
        if(!this.isReporting){
            this.chooseInput=false;
              // if(!this.reportBox){
              //   this.placeHoldera="我要点评...";
              //   this.chooseInput=false;
              //   }
              // this.chooseInput=false;
          if(!this.android){
              // this.placeHolder="我要点评..."
             document.querySelector(".inputField").style.bottom="0";

          }

          }else {
            // this.reportBox="";
            this.isReporting=false;
            //  console.log("重置成功",this.reportBox)
          }
          // console.log("down")
      },
			backPre:function(){
        if(!getUrlName("noClose")){
          this.backImgUrl = "static/img/backActive.png";
          app.native.cancelNativePage();
        }else{
           window.history.back();
        }

			},
			iosAndroid:function(self){
					var u = navigator.userAgent, app = navigator.appVersion;
					var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
					var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
					if (isAndroid) {
            self.android=true;
            self.isActive=false;self.isIos=false;
            localStorage.isAndroid=self.android;

            // alert(getNative("getStatusBarHeight"))
						return ;
					}
					if (isiOS) {
                self.android=false;
            	 if(screen.height == 812 && screen.width == 375){
                //  alert("iphonex")
                          self.isActive=true;self.isIos=false;
                          return;}
                          else{self.isIos=true;self.isActive=false;}
						return ;
					}

					return ;
        },
    getReview:function(a,b){
            var that=this;

      					this.$http.request({
						url: '/api/tangba/circle/loadArticleCommentList.action'+getUrlParams(),
						params: {
							  "pageNo": Number(a),
              "pageSize": Number(b),
               "articleId":Number(getUrlName("articalID")),
               "userId":Number(getUrlName("user_id"))
						},
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
          .then(function(msg){
            // that.onlyOne=false;
            if(msg.data.success){
                //  that.getListAll=msg.data.data;
                 that.reviewList.commentList=[...that.reviewList.commentList,...msg.data.data.commentList];
                 that.reviewList.count=msg.data.data.count;
                 // that.$nextTick(function() {
                // DOM 更新了

                     // window.scrollHeight();

              // })
                 if(that.reviewList.commentList.length==that.reviewList.count){
                   that.onlyOne=true;
                 }else{
                     that.onlyOne=false;
                 }
            }
          })
          .catch(function(err){
            // that.onlyOne=false;
             console.log(err)

          })
    },
        sendReview:function(){
          var  that=this;

          this.$http.post('/api/tangba/circle/commentArticle.action'+getUrlParams(),
                          'operationType='+that.operationType+
                          '&articleId='+ Number(getUrlName("articalID")) +
                          '&toUserId='+ that.toUserId +
                          '&parentId='+ that.parentId +
                          '&comment='+ that.reportBox
          )
          .then(function(msg){
            if(msg.data.success){
              if(that.operationType){
                minTips("回复成功")
              }else{
                minTips("评论成功")
              }

                that.currentKey=-1;
                that.operationType=0;
                that.commentId='';
                that.userId='';
                that.reportBox='';
                that.reviewList.commentList.unshift(msg.data.data);
                that.chooseInput=false;
            }else{
              if(that.operationType){
                minTips("回复失败")
              }else{
                minTips("评论失败")
              }

            }
          })
          .catch(function(err){
             minTips("网络错误")
          })
      //  }
    },
    test1:function(){
      var that=this
      window.send=function(a){
       that.inputContent=a;
      }
    },
    test2:function(){

      var that=this
      window.cacheCont=function(a){
        // alert("修改reportBox")
       that.reportBox=a;
      }
    },
       setScrollTop:function(scroll_top) {
    document.documentElement.scrollTop = scroll_top;
    window.pageYOffset = scroll_top;
    document.body.scrollTop = scroll_top;
  }
  },
  mounted:function(){
        //            app.native.getStatusBarHeight({fun:function(data){
        //         //  alert("调用了获取高度的方法")
        //            document.querySelector(".ref").style.height=data +"px";
        // }})
        if(getNative("getStatusBarHeight")){
           document.querySelector(".ref").style.height=getNative("getStatusBarHeight")+"px";
        }

    var  that=this;
     this.$root.$on("answer",function(a){
          //  that.letBlur=false;
          console.log(a)
           that.operationType=1;
           that.parentId=a.commentId;
           that.toUserId=a.userId;
           that.toUserName=a.toUserName;
           if(that.currentKey!=a.key){
               that.currentKey=a.key;
               that.reportBox="";
           }
           var d="回复:"+that.toUserName;
          //  排除没有评论情况
           if(that.parentId==0){
             that.operationType=0;
             d="我要点评..."
           }

        app.native.native_showkeyboard({type:that.operationType,length:140,placeholder:d,text:that.reportBox,fun:function(){
              // alert("这是评论")
        }});

          // that.reportBox='回复:'+a.toUserName+" ";
          // that.cutString='回复:'+a.toUserName+" ";
       })
  },
  watch:{
    inputContent:function(){
        this.reportBox=this.inputContent;
        this.sendReview();
        },
    reportBox:function(){
          //  alert(this.reportBox)
    }
  }
  ,
		created:function(){
		  console.log("机型",this.$phoneType)
		  // alert(location.href)
      //  alert(navigator.appVersion.match(/iphone/gi))
      //  var isIphoneX = /iphone[\s\S]*OS X/.test(navigator.userAgent)
      // alert(getNative("getStatusBarHeight"))
      this.test1();//获取输入内容
      this.test2();//获取暂存内容
      // this.thempUp();//点赞
      this.iosAndroid(this);//IOS android判断
      this.axiosArtical(this);//获取文章
      this.getReview(this.reviewPage,this.reviewNum);//获取评论
		}
  }

</script>

<style scoped>

[v-cloak]{
  display: none;
}
/* 文章部分 */
.wangEditor-container{
  width:100%;
  border:none;
}
/* 用于无法输入问题*/
  input, input:before, input:after {
      -webkit-user-select: initial;
      -khtml-user-select: initial;
      -moz-user-select: initial;
      -ms-user-select: initial;
      user-select: initial;
     }
 .KolEditor:nth-child(1){height:180px;min-height:180px;overflow:hidden}
	.artical{
		height: 100%;
		width: 100%;
		font-size: 0.373333rem;
    color: #1A1A1A;
    padding-bottom: 1.28rem;

  }
  .navIcon{
    height: 44px;
    line-height:44px;
    position:fixed;
    width:100%;
    /* border: 1px  solid red;
    box-sizing: border-box; */
    opacity: 1;
  }
  .picsize{
    display: inline-block;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: rgba(255,255,255,0.8);
    z-index: 3000;
    line-height: 26px;
    text-align: center;
    padding-top: 4px;
  }
  .inputUp{
     margin-bottom: 305px;
  }
	.artical_section{
    /* position: absolute; */
    /* top: 0; */
  width: 100%;
  height: 100%;
  /* height: calc(100% - 30px); */
	}
	.artical_banner{
		height: 4.546666rem;
		width: 100%;
		margin-bottom: 0.2rem;
	}
	.artical_banner_img{
		width: 100%;
		height: 100%;
	}
  .span_img {
    display: inline-block;
    height: 16px;
    width: 16px;
  }
  .right-box{
    height: 44px;
    line-height:49px;
    padding:0 15px;
    display: inline-block;
  }
	.clickButton{
    line-height: 100%;
    position:fixed;
    z-index:999;
		width: 100%;
	}
	.clickB .colorSpan{
		color: #fd8000;
	}
	.infos{
		width: 100%;
		padding: 0 0.76rem;
	}
	.artical_title{
		font-size: 0.533333rem;
		line-height: 0.746666rem;
		font-weight: 600;
		margin-bottom: 0.16rem;
	}
	.author{
		margin-bottom: 0.64rem;
	}
	.author span{
		font-size: 0.32rem;
		color: #8e8e8e;
	}
	.mask{
		width: 100%;
		top: 0;
		left: 0;
	}
	.author .author_time{
		margin-left: 0.3rem;
	}
	.content{
		padding: 0 0.76rem;
		line-height: 0.586666rem;
	}
 .normal1{
       width: 100%;
    height: 44px;
   background-color: white;
   opacity: 1;
 }
  .normal2{
        width: 100%;
    height: 20px;
   background-color: white;
   opacity: 1;
 }
	.artical .padding_top{
    width: 100%;
    height: 44px;
    background-color: white;
    opacity: 0;
	}
	.paddings{
    width: 100%;
    height: 20px;
    background-color: white;
    opacity: 0;
  }
  .normal{
    width: 100%;
    opacity: 1;
  }
	.bott{
    height: 30px;
    opacity: 1;
  }
  .changestyle{
           opacity: 1;
     	     background-color:#fff;
           border-bottom:1px solid #e6e6e6;
           box-sizing: border-box;
  }
/* 评论内容 */
.ref{
  width: 100%;
}
.inputField{
  position: fixed;
  bottom: 0;
  z-index: 5000;
  width: 100%;
  height: 1.28rem;
  padding: .2rem .346667rem;
  padding-right:0;
  border-top: 1px solid #dcdcdc;
  border-bottom: 1px solid #dcdcdc;
  box-sizing: border-box;
  background-color: white;
}
.inputField>p:first-child{
  height: .866667rem;
  line-height: .866667rem;
  background-color: #f6f6f6;
  border: 1px soldi #f6f6f6;
  box-sizing: border-box;
  width: 8rem;
  padding-left: .346667rem;
}
.approvalBox{
  width: 8.12rem;
  height: .866667rem;
  line-height:.866667rem;
  border-radius: .106667rem;
  /* border: 1px solid #f6f6f6;
  box-sizing: border-box; */
  font-size: .373333rem;
  color: #8e8e8e;
  /* background-color: #f6f6f6; */

  padding-left: .173333rem;
  caret-color:#3296FA;
}
.writeImg{
  display: inline-block;
  width: .52rem;
  height: .52rem;
  vertical-align: text-bottom;
  margin-right: .066667rem;
}
.inputBox{
  width: 6.12rem;
  /* width: 8.12rem; */
  height: .866667rem;
  border-radius: .106667rem;
  border: 1px solid #f6f6f6;
  box-sizing: border-box;
  font-size: .373333rem;
  color: #8e8e8e;
  background-color: #f6f6f6;

  padding-left: .266667rem;
  caret-color:#3296FA;
    /*上面只能改变ios的光标颜色 line-height: .866667rem;ios中 设置影响光标 */

}
.middleHeight{
  display: block;
  height: .8rem;
  /*line-height:.8rem;*/
}
.fontColor{
  color:#3296FA;
}
.textColor{
  color:#8e8e8e;
}
.defaultColor{
  color: #e6e6e6;
}
 .inputBtn{
   margin: 0  .346667rem ;
   width: .773333rem;
   height: .733333rem;
   /*border: 1px solid black;*/
   /*box-sizing: border-box;*/
}
.inputBoxpaddingBottom{
  margin-bottom: 0;
}
.iosBottom{
  margin-bottom: 30px;
}
/* .borderBottom{
  border-bottom: 30px;
  box-sizing: border-box;
} */
.marginRight{
   margin-right: calc(100% - 144px);
}
/*.approvalColor{*/
  /*background: url("../../static/img/reviewapprove.png") no-repeat center center;*/
  /*background-size: 100% 100%;*/
/*}*/
/*.unapprovalColor{*/
  /*background: url("../../static/img/reviewunapprove.png") no-repeat center center;*/
  /*background-size: 100% 100%;*/
/*}*/

.opacityDefault{
  opacity: 0;
}
.opacityChoose{
  opacity: 1;
}
.barState{
  opacity: 1;
  background-color: white;
}
.paddingBottomNew{
  padding-bottom: 2.08rem;
}
</style>

