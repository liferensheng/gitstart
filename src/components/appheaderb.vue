<template>
    <div class="clickButton" style="background-color:black;"   >
     <div :class="{padding_top:isActive,paddings:isIos,normalb:!isActive&&!isIos}" ></div>
      <div :class="['flex','flex-row','navIcon','space-between','flex-item','flex-justify']"  >

          <div @click="backPre" class=" flex right-box " >
                <span   :class="['radius', 'flex' ,'flex-items', 'flex-justify','picsize',{changeOpacity:isClicka}]" ><img :src="msg.backImgUrl" alt="" class="span_imga" style="margin-left:-2px;" /></span>
          </div>

          <div class="flex flex-row flex-items   flex1" style="height:100%;" v-if="msg.secondFun" >
              <span class="flex flex-items flex-justify  right-box flex1" style="width:100%;text-align:center;font-size: .48rem;" > </span>
               <span class="flex flex-items flex-justify  right-box flex1" style="width:100%;text-align:center;font-size: .48rem;" >{{msg.title1||msg}}</span>
                <span class="flex flex-column   items-end  right-box flex1" style="width:100%;text-align:right;" @click="msg.secondFun">
                  <img :src="msg.historyImgUrl"   alt="" class="span_imgc" style="" /></span>
          </div>
          <div class="flex flex-row flex-items   flex1" style="height:100%;" v-else>
               <span class="flex flex-items flex-justify  right-box flex1" style="width:100%;text-align:center;font-size: .48rem;" >{{msg.title1||msg}}</span>
          </div>

          <div v-if="msg.logo"  class="flex-row"  style=" text-align:right;"  @click="fun">
              <span   :class="['radius', 'flex' ,'flex-items', 'flex-justify','picsize',{changeOpacity:isClickb}]" >
                <img :src="msg.shareImgUrl" alt="" class="span_imgb" style="margin-left:-2px;" /></span>
          </div>
          <div v-else :class="['flex-row',{changeOpacity:isClickb,nosee:msg.showWord}]"  style=" text-align:right;font-size: .4rem;line-height: 44px;min-width:26px;"  @click="fun">
              {{msg.title2}}
          </div>

      </div>



  </div>
</template>
<script>
import {getUrlParams,getNative,getUrlName,minTips} from '../../static/js/checkcode.js'
  import {cancelNativePage,getAppVersion} from "../../static/js/test.js"
	export default{
    props:["msg"],
    data:function(){
      return{
        isActive:false,
        isIos:false,
        isClicka:false,
        isClickb:false,
        backpic:"./static/img/back.png",
        msgInfo:['需要【完善糖化水平评测】才算完成任务哦','需要【完善糖化水平评测】才算完成任务哦','需要【添加尿酮】才算完成任务哦','需要【完善糖化水平评测】才算完成任务哦','需要【测血糖】才算完成任务哦','需要点击【我了解了】才算完成任务哦','需要【完善糖化水平评测】才算完成任务哦','需要【提醒用户测量血糖】才算完成任务哦',],
        isFromTask:false
      }
    },
    methods:{
      	iosAndroid:function(self){
					var u = navigator.userAgent, app = navigator.appVersion;
					var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
					var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
					if (isAndroid) {
            self.isActive=false;self.isIos=false;
						return ;
					}
					if (isiOS) {

            					if(screen.height == 812 && screen.width == 375){
                          self.isActive=true;self.isIos=false;
                            localStorage.isIphoneX=JSON.stringify(true)
                          // console.log("X")
                          return;}
                          else{self.isIos=true;self.isActive=false;}
                          //  console.log("isIos")
						return ;
					}
					return ;
        },
        backPre:function(){
          this.isClicka=true;//点击变灰
          // var  a=location.hash.split("?")[0].endsWith("/close");
          var  a=location.hash.indexOf("/close")!=-1;
          var  b=getUrlName("noClose");
          // 弹框操作

            if(a&&!b){
                if(this.msg.isFinish==1){
                    this.$router.replace("/taskList/close");
                }else if(this.isFromTask){
                    app.native.native_showdialog(this.msgInfo[this.$route.query.completeCode-1])
                }else{
                    app.native.cancelNativePage();
                }
              this.isClicka=false;
            }else{
              this.isClicka=false;
              history.back();
            }
        },
          fun:function(){
            this.isClickb=true;
            this.isClickb=false;
            this.$emit('navMethod');
         }
    },
       mounted:function(){
         if(getNative("getStatusBarHeight")){
            var  targetEl=document.querySelector(".normalb");
                 targetEl.style.paddingTop=getNative("getStatusBarHeight")+"px";
         }

    },
    created:function(){
      var a=false;
      if(localStorage.taskInfo){
          var  d=JSON.parse(localStorage.taskInfo);
          if(d.user==getUrlName("user_id")){
               if(d.isFinish==0&&getUrlName("isTask")==1){
                 a=true;
               }
          }else{
                 a=false;
            localStorage.removeItem("taskInfo");
          }
          // a ==JSON.stringify({completeCode:that.completeCodek,isFinish:that.isFinish});//测评任务
      }
      // var  a =!JSON.parse(localStorage.getItem("hasResult"));
      var  b =getUrlName("completeCode")!=2&&Number(getUrlName("isFinish"))==0;//其它任务
      this.isFromTask=a||b;
      this.iosAndroid(this);
    }

	}
</script>
<style scoped>
  .navIcon{
    height: 44px;
    line-height:44px;
    /* position:fixed; */
    width:100%;
    /* opacity: 1; */
    padding: 0 15px;
    /* 36px */
  }
  /* .navIcon>div{
    width: calc(100% / 3);
  } */
    .right-box{
    height: 44px;
    line-height:44px;
    /* padding:0 15px; */
    /* display: inline-block; */
  }
	.clickButton{
    line-height: 100%;
    /* position:fixed; */
    z-index:999;
    width: 100%;
    color:white;

	}

.span_imga {
    display: inline-block;
    /* height: 16px;
    width: 16px; */
    height: 20px;
    /* width: 11px; */
    margin: 0 4.5px;
  }
  .span_imgb {
    display: inline-block;
    height: 20px;
    width: 20px;
    /* height: 16px;
    width: 16px; */
  }
    .span_imgc {
    display: inline-block;
    margin-top: 11px;
    height: 20px;
    width: 20px;
    margin-right: 8px;
  }


.normala{
  padding: 0;
}
 .padding_top{
  padding-top: 44px;
	}
	.paddings{
    padding-top: 20px;
  }
  .picsize{
    display: inline-block;
    width: 26px;
    height: 44px;
    z-index: 3000;
    line-height: 44px;
    text-align: center;
    padding-top: 4px;

  }
  .changeOpacity{
    opacity:0.3 ;
  }
  .nosee{
    opacity: 0;
  }
</style>
