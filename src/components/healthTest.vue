<template>
 	<div :class="['artical','absolute','flex','flex-column','space-between',{paddingBottom:isActive} ]" v-if="btnShow"  >


            <navheader  v-if="!isWx" v-cloak style="position:fixed;"  :class="{activeFadeIn:changestyle1,activeFadeOut:changestyle2}"  @navMethod="send" :msg="{title1:'糖化水平测评',logo:false,title2:'提交',backImgUrl:'static/img/newback.png'}"  ></navheader>

           <div :class="['scroll','flex1',{wx_top:isWx}]" @scroll="scrolla($event)"   >

              <!-- 微信端 -->
              <!-- <div v-if="isWx"  >
             <p  style="width:100%;height:1.066667rem;line-height:1.066667rem;font-size:.426667rem;text-align:center;margin:0 auto;border-bottom:2px solid black;box-sizing:border-box;color:white;color:black;background-color:white;">糖化水平表现测评</p>
                 				<div class="toTang8 flex flex-items" style="background-color:white;">
					<div class="flex flex-items" >
						<img src="static/img/shareLogo.png" alt="糖吧" class="toTang8_img"/>
						<div class="flex flex-column flex-justify">
							<h4>糖吧APP</h4>
							<p>邀你一起管理血糖</p>
						</div>
					</div>
					<div class="downloadNow" @click="downLoad">立即下载</div>
				</div> -->
                <!-- </div> -->
         <div class="flex1">
               <div   :class="{backImga:true,padding_topa:isActive,paddingsa:isIos,normalhealth:!isActive&&!isIos}"  >

                         <img src="../../static/img/whiteImg.png" alt="" style="display:block;height: 1.6rem;width:1.653333rem;margin:0 auto;margin-top:0.1rem;" >
                         <div style="width:100%;padding:0 0.266667rem;">
                   <p class="reportTitle" >如果你的身体存在以下情况，请勾选对应选项</p>
                   </div>
                   <ul class="flex1 scroll"  style="" >
       <li v-for="(v,k,i) in dataStore.evaluationList" :key="i" class="flex1  flex  flex-row  space-between flex-items"  >
                    <img   src="../../static/img/healthStar.png" style="display:block;width: .4rem;   height: .373333rem;margin-right: .2rem;align-self:center;" alt="">
          <label :for="'check'+i" class="flex flex-row flex1 flex-items" >
            {{v}}
            <input  style="display:block;align-self:center;flex:none;" type="checkbox" :id="'check'+i"    class="checkbox"    :key="i" @click="choose(k)">


           </label>
       </li>
              <li class="flex1  flex  flex-row  space-between flex-items"  >
                    <img   src="../../static/img/healthStar.png" style="display:block;width: .4rem;   height: .373333rem;margin-right: .2rem;align-self:center;" alt="">
          <label for="last" class="flex flex-row flex1 flex-items" >

            以上都没有
            <input  style="display:block;align-self:center;flex:none;" type="checkbox" id="last"    class="checkbox" ref="last"    @click="choose(-1)">


           </label>
       </li>

     </ul>
     <summitBtn    @startMethod="send"  style="margin: .693333rem auto  ;"  :word="'查看结果'"  :content="[1,2]"   ></summitBtn>
     <p style="width:100%;height:1px;"></p>
               </div>
        </div>

 </div>

 <!-- 底层列表 -->
  </div>
</template>

<script>
import navheader from "./appheaderb.vue"
import navfooter from "./footer.vue"
import summitBtn from "./button.vue"
import {getUrlParams,getNative,getUrlName, minTips,weixinConfig} from '../../static/js/checkcode.js'
export default {
  name: 'disease',
  data () {
    return {
      msg: 'disease',
      	mask_imgUrl:"static/img/nav.png",
				backImgUrl:"static/img/back1.png",
				shareImgUrl:"static/img/share2.png",
				articalData:{},
				artical_img:"",
				isActive:false,
        isIos:false,
        android:false,
				articalContent:"",
				isCall:true,
				is200:false,
        isIphoneX:false,
        detaily:false,
        change:false,
         work:true,
          channel:false,
          diseaseList:{},
          diseaseNum:[],
          dataList:{
            ab:[],
            re:[]
          },
          healthState:0,
          chooseList:[],
          c:-1,
          click:0,
          showScreen:true,
          inputContent:'',
          lastIsChosed:false,
          lastTime:[],
          changestyle:false,
          btnShow:false,
          isWx:false,
         dataStore:[],
         changestyle1:false,
         changestyle2:false,
         taskSuccess:false,
         completeCode:"",
         isFinish:"",
         isTask:0
    }
  },
  components:{
    navheader,
    navfooter,
    summitBtn
  },
  methods: {
    scrolla:function(a){
         if(this.isWx){return};
		    	var that = this;
		        // 导航优化
		        var d= document.getElementsByClassName("clickButton")[0];
            that.cacheHeight=a.target.scrollTop;
            // that.height=a.target.scrollHeight-a.target.scrollTop -a.target.clientHeight;
            // console.log(that.cacheHeight)

                 if(that.cacheHeight > 150&&that.isCall){
                                    //  10

                                that.changestyle1 = true;
                                that.changestyle2 = false;
                                that.isCall = false;
                                 return;

                }           //10
                if(that.cacheHeight < 150&&!that.isCall){
                      that.changestyle1 =false;
                      that.changestyle2 = true;
                      that.isCall = true;
                      return;
                    }
		    },
    			backPre:function(){
				    this.backImgUrl = "static/img/backActive.png";
          app.native.cancelNativePage();
			},
      choose:function(a){
        // 微信组织功能
         if(this.isWx){return}
          // console.log(a)
            var  inputs=document.querySelectorAll("li input");
          var  ind=this.diseaseNum.indexOf(a);
          if(a == -1){
             this.$refs.last.checked=true;
            for(var i=0;i<this.diseaseNum.length;i++){
                 inputs[Number(this.diseaseNum[i] - 1)].checked=false;
            }
               this.diseaseNum=[];
               this.lastIsChosed=true;

          }else{
            // if(this.diseaseNum.indexOf("0")!=-1){
            //      this.diseaseNum=[];
            // }
            this.lastIsChosed=false;
            this.$refs.last.checked=false;
                if(ind!=-1){
                  this.diseaseNum.splice(ind,1)
                }else{
                  this.diseaseNum.push(a);
                }
          }

        //  console.log(this.diseaseNum)
    },
    clear:function(a){
      var list=document.querySelectorAll("input");
      list.forEach(e => {
        e.style.backgroundColor="";
      });
      a.target.style.backgroundColor="green";
      this.channel=true;
      this.diseaseMessage=[];
      this.chooseList=[];
      this.showScreen=false;
    },
    confirmTask:function(){
      var that=this;
         that.$http.get('/api/tangba/workCard/completeTask.action'+getUrlParams()+'&taskCode='+that.completeCode)
       .then(function (msg) {
        //  console.log(msg)
             if(msg.data.success){
                  // 第一次做
                  if(that.isTask){
                     that.isFinish=0;
                  }else{
                     that.isFinish=1;//不是在做任务
                  }
                  localStorage.taskInfo=JSON.stringify({user:that.user,isFinish:that.isFinish});
                  that.$router.push("/healthresult");
                 app.native.native_completeTask(msg.data.data);//执行较慢  放在后面
             }else if(msg.data.code==11){
                  that.isFinish=1;
                  localStorage.taskInfo=JSON.stringify({user:that.user,isFinish:that.isFinish});
                  that.$router.push("/healthresult");

             }else{
                   minTips("网络错误")
             }

       })
       .catch(function(err){
            minTips("网络错误")
       })
    },
    send:function(){

      var  that=this;
        if(that.send.isDoing){
           return;
        }
        that.send.isDoing=true;
      if(that.lastIsChosed||that.diseaseNum.length){
       that.$http.post('/api/tangba/evaluation/saccharificationEvaluation.action'+getUrlParams(),'items='+that.diseaseNum.toString())

          .then(function (msg) {
             if(msg.data.success){
              //  localStorage.dataStore=JSON.stringify(msg.data.data);
                     if(that.isFinish==0){
                      //  console.log("未完成任务")
                        that.confirmTask();
                      }else{
                        // console.log("已完成任务")
                        that.$router.push("/healthresult")
                      }
             }
            that.send.isDoing=false;
          })
          .catch(function (err) {
            that.send.isDoing=false;
            // minTips("网络错误")
            console.log(err)
            // minTips(err)
          });
      }else{
            //  console.log(minTips)
            minTips("您还没有评测过",1000)
      }


    },
    getData:function(){

      // if(a=-1||)
      // alert("获取列表")
      var  that=this;
               this.$http.get('/api/tangba/evaluation/loadSaccharificationEvaluation.action'+"?user_id="+getUrlName("user_id"))
          .then(function (msg) {
           if(msg.data.success){
              that.dataStore=msg.data.data;
                if(that.dataStore.score>8){that.dataStore.red=true;}
                else if(that.dataStore.score>=4){that.dataStore.yellow=true;}
                else{that.dataStore.green=true;}
              // console.log(that.dataStore)
              // localStorage.hasResult=JSON.stringify(that.dataStore.hasResult);
              localStorage.dataStore=JSON.stringify(that.dataStore);
              //  that.diseaseList=that.dataStore.evaluationList;
                //  localStorage.hasResult=that.dataStore.hasResult;
               that.btnShow=true;
              if(that.dataStore.hasResult&&!getUrlName("reTest")){
                // that.lastTime=msg.data.data.itemList;
                that.btnShow=false;
                // that.$router.replace("/healthresult/close"+"?"+getUrlParams());
                that.isFinish=1;
                localStorage.taskInfo=JSON.stringify({user:that.user,isFinish:that.isFinish});
                that.$router.replace("/healthresult/close");
              }
           }
                // that.$router.push("/conclude")
          })
          .catch(function (err) {

            // alert("网络错误")
          });
    },
    // 微信端方法
    // goDetail:function(){
    //     if(this.btnShow){
    //       this.$router.push("/healthresult");
    //     }else{
    //       minTips("您还没有评测过")
    //     }

    // },

    	downLoad:function(){
		// var isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1;
		if(this.android){
      location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.bianla.tangba";
      console.log(location.href)
		}else{
      location.href="https://itunes.apple.com/cn/app/%E7%B3%96%E5%90%A7/id1219623708?mt=8";
      console.log(location.href)
		}
	}
  },
    mounted:function () {
      document.body.addEventListener('touchstart', function () { });
      // var  targetEl=document.querySelector(".normalu");
      // setTimeout(function(){
      //     var  targetEl=document.querySelector(".normalhealth");
      //     // targetEl.style.paddingTop=30+44+"px";
      //     targetEl.style.paddingTop=getNative("getStatusBarHeight")+44+"px";
      // },100)
      if(getNative("getStatusBarHeight")){
        var  targetEl=document.querySelector(".normalhealth");
        // targetEl.style.paddingTop=30+44+"px";
        targetEl.style.paddingTop=getNative("getStatusBarHeight")+44+"px";
      }
      // creat 钩子函数中执行代码过长   在mounted中标签获取不到  设置延时来实现  需优化
      // console.log(document.querySelector(".normalhealth"))
      // console.log(targetEl)
        //  if(targetEl){
        //    targetEl.style.paddingTop=30+44+"px";
              // targetEl.style.paddingTop=getNative("getStatusBarHeight")+44+"px";
        //        app.native.getStatusBarHeight({fun:function(data){
        //          alert("调用了获取高度的方法")
        //           targetEl.style.paddingTop=data +  44+"px";
        // }})

        //  }

    },
  // beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
    // console.log(to,from.name);
    // console.log(localStorage.dataStore)
    // var  test=JSON.parse(localStorage.dataStore);

    // if(from.name!="HealthResult"&&test.hasResult){
    //   next(vm=>{
    //     vm.$router.push("/healthresult/close");
    //   });
    // }else{
    //   next();
    // }

  // },
  created:function(){
          var that=this;
          that.completeCode=getUrlName("completeCode")||2;
          that.isFinish=getUrlName("isFinish")||0;
          that.user=getUrlName("user_id");
          that.isTask=getUrlName("isTask")||0;
          localStorage.taskInfo=JSON.stringify({user:that.user,isFinish:that.isFinish});
          var isio = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if(/iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)){
      this.isActive=true;
        this.isIos=false;
        this.android=false;
    }else if(isio){
        this.isIos=true;
        this.android=false;
        this.isActive=false;
    }else{
        this.android=true;
        this.isIos=false;
        this.isActive=false;
    }
          var  c=localStorage.dataStore;
          // console.log(getUrlName("user_id")==JSON.parse(localStorage.userInfo)||0);
          if(c){
            that.dataStore=JSON.parse(c);
             if(that.dataStore.hasResult&&!getUrlName("reTest")){
                  that.$router.replace("/healthresult/close");
               }
                if(that.dataStore.score>8){that.dataStore.red=true;}
                else if(that.dataStore.score>=4){that.dataStore.yellow=true;}
                else{that.dataStore.green=true;}
          }else{
            localStorage.userInfo=JSON.parse(getUrlName("user_id"));

            that.dataStore={};
          }
      that.isWx=false;
      that.getData();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.artical{
		height: 100%;
		width: 100%;
		font-size: 0.373333rem;
    color: #1A1A1A;
    background-color: white;
    overflow: hidden;

  }
  .backImg{
    position: fixed;
    background: url("../../static/img/healthtesta.png") no-repeat center center;
    background-size: 100% 100%;
    height:  5.106667rem;
    width: 100%;
    flex: none;

  }
    .backImga{
    /* position: relative; */
    background: url("../../static/img/healthtesta.png") no-repeat center center;
    background-size: 100% 100%;
    height:  5.106667rem;
    width: 100%;
    flex: none;
  }

  .changestyle{
           opacity: 1;
     	     /* background-color:#fff;
           border-bottom:1px solid #e6e6e6; */
           box-sizing: border-box;
  }
  .normalhealth{
  padding-top:74px;
}
 .padding_topa{
  padding-top: 88px;
	}
	.paddingsa{
    padding-top: 64px;
  }
/* 评论内容 */

.reportTitle{
  width: 100%;
  text-align: center;
  /* width: 9.306667rem; */
  height: 1.24rem;
  line-height: 1.24rem;
  background-color: white;
  margin: 0 auto;
  font-size: .373333rem;
  color: #222222;
  border-radius: .106667rem;
  margin-top: .693333rem;
  /* border: 1px solid #e6e6e6; */
  box-shadow: .066667rem .066667rem .266667rem  rgba(53,111,169,0.15);
  margin-bottom: .293333rem;
}
label{
    font-size: .373333rem;
    text-align: left;
    justify-content: space-between;
    padding: .32rem .346667rem .32rem 0;
    }
ul {
  width: 100%;
  list-style-type: none;
  padding: 0;
  background-color: white;
  padding-left: .346667rem;
  box-sizing: border-box;
  background-color: white;
}
li{
  flex: 1;
  min-height: 1.466667rem;
  /* line-height: 1.466667rem; */
  width: 100%;
  font-size: .4rem;
  color: #222222;
  border-bottom: 1px solid #e6e6e6;
  box-sizing: border-box;
  /* padding: .32rem .346667rem  .32rem 0; */
}
.testContent{
  flex: 1;
  word-break: break-all;
  line-height: .48rem;
  font-size: .4rem;
  align-self:center;
  margin-top:.266667rem
}

.reportIcon{
  display: block;
  height: .373333rem;
  width: .373333rem;
}

input.checkbox[type="checkbox"]:checked{
   background: url("../../static/img/healthtChoosed.png") no-repeat center center;
   background-size: 100% 100%;
}

.checkbox{
  /* border: 1px solid rgba(0,0,0,0); */
  height: .426667rem;
  width: .426667rem;
  background: url("../../static/img/healthtnoChoosed.png") no-repeat center center;
  background-size: 100% 100%;
  margin-right: .2rem;
  margin-left: .093333rem;
  border: 1px solid rgba(0,0,0,0);
}
.screen{
  background-color:rgba(0,0,0,0.3);
  position: absolute;
  z-index:3000;
  left: 0 ;right: 0;
  opacity: 0;
  /* display: none; */
}
.chooseRed{
     background: url("../../static/img/healthtChoosed.png") no-repeat center center;
     background-size: 100% 100%;
}
.app_top{
  margin-top:.293333rem;
}
.wx_top{
   margin-top:0;
}
/*微信内样式*/

.toTang8{
	height: 1.6rem;
	width: 100%;
	padding: 0 0.333333rem;
	justify-content: space-between;
	color: #222;
}
.toTang8 h4{
	font-size: 0.48rem;
	line-height: 0.56rem;
	font-family: "PingFangSC-Medium";
}
.toTang8 p{
	color: #666;
	font-size: 0.373333rem;
	line-height: 0.48rem;
}
.toTang8_img{
	width: 1rem;
	height: 1rem;
	margin-right: 0.2rem;
}
.downloadNow{
	height: 0.76rem;
	width: 2.146666rem;
	background: #fc359d;
	border-radius: 0.08rem;
	color: #fff;
	text-align: center;
	line-height: 0.76rem;
	font-size: 0.346666rem;
}
.changeColor{
  /* background-color:#3296FA; */
  /*background: linear-gradient(left, #88c4ff, #3296fa);*/
  /*todo*/
}


/*按钮样式*/
   .reportBtn{
  display: block;
  width: 6rem;
  height: 1.066667rem;
  border-radius: 1.066667rem;
  background-color: #3296FA;
  border: 1px solid #3296fa;
  box-sizing: border-box;
  color: white;
  font-size: .426667rem;
  text-align: center;
  line-height: 1.066667rem;
  margin: 0 auto;
}

.screen{
  background-color:rgba(0,0,0,0.3);
  position: absolute;
  z-index:3000;
  left: 0 ;right: 0;
  opacity: 0;
}

input.screen[type="button"]:active{
      opacity: 1;
      background-color:rgba(0,0,0,0.3);
}
input.screen[type="button"]:visited{
  opacity: 0;
}
  @keyframes moveDown {
    0%{
       background-color: rgba(50,150,250,0);
       /* color:rgba(255,255,255,0); */
    }
    100%{
      background-color: rgba(50,150,250,1);
      /* color:rgba(255,255,255,1); */
    }
  }
    @keyframes moveUp {
    0%{
      background-color: rgba(50,150,250,1);
      /* color:rgba(255,255,255,1); */
    }
    100%{
       background-color: rgba(50,150,250,0);
       /* color:rgba(255,255,255,0); */
    }

  }
  .activeFadeIn{
       animation: moveDown .5s forwards ;

  }
  .activeFadeOut{
       animation: moveUp .5s forwards  ;
  }

</style>
