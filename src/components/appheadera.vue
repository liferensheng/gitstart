<template>
      <div >
       <div @click="backPre" :class="['flex','flex-row','firstOne',{padding_top:isActive,paddings:isIos,normala:!isActive&&!isIos,bcBlue:msg.color,bortoma:msg.borderBottom,bortomnone:!msg.borderBottom,fontwhite:msg.fontColor,fontblack:!msg.fontColor}]" ref="top" >
		<div :class="['clickButton','flex','flex-row',{screen:isClick} ]" style="height: 44px;line-height:44px;width:100%;padding:0 .533333rem;"  >
			<span class="flex flex-items  flex1" ><img :src="msg.rowColor||backpic" alt="" class="span_img"  style="display:block;text-align:left;"/></span>
          <span class="flex,flex-items  flex1" style="font-size: 18px;height: 44px; text-align: center;line-height:44px;
 ">{{msg.title||msg}}</span>
      <span class="flex,flex-items  flex1" style="font-size: 18px;height: 44px; text-align: right;line-height:44px;
  "></span>
		</div>
    <!-- <span class="flex,flex-items flex-justify marginleft" style="font-size: 18px;height: 44px; text-align: center;line-height:44px;
  width: 4rem;">{{msg.title||msg}}</span> -->
  </div>


  <div  :class="['flex','flex-row',{padding_top:isActive,paddings:isIos,normala:!isActive&&!isIos}]" >
		<div  style="height: 44px;line-height:44px;"  >	kk</div>

  </div>
 </div>
</template>
<script>
import {getUrlParams,getNative,getUrlName} from '../../static/js/checkcode.js'
  import {cancelNativePage,getAppVersion} from "../../static/js/test.js"
	export default{
    props:["msg"],
    data:function(){
      return{
        isActive:false,
        isIos:false,
        isClick:false,
        backpic:"./static/img/back.png"
      }
    },
    methods:{
      	iosAndroid:function(self){
					var u = navigator.userAgent, app = navigator.appVersion;
					var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
					var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
					if (isAndroid) {
            self.isActive=false;self.isIos=false;
                           app.native.getStatusBarHeight({fun:function(data){
                 alert("调用了获取高度的方法")
                  self.$refs.top.style.paddingTop=data +"px";
        }})
            // self.$refs.top.style.paddingTop=getNative("getStatusBarHeight")+"px";
            // alert(getNative("getStatusBarHeight"))
						return ;
					}
					if (isiOS) {

            					if(screen.height == 812 && screen.width == 375){
                          self.isActive=true;self.isIos=false;
                            localStorage.isIphoneX=JSON.stringify(true)
                          console.log("X")
                          return;}
                          else{self.isIos=true;self.isActive=false;}
                           console.log("isIos")
						return ;
					}

					return ;
        },
        backPre:function(){
          this.isClick=true;
          var  a=location.hash.split("?")[0].endsWith("/close");
            if(a){
              var isios=!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
              if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
                app.native.cancelNativePage();
              }else{
                getNative("cancelNativePage");
              }

            }else{
              // this.isClick=false;
              history.back();
            }
        }
    },
       mounted:function(){


         if(getNative("getStatusBarHeight")){
          //  targetEl[0].style.paddingTop=30+"px";
          //  targetEl[1].style.paddingTop=30+"px";
                  var  targetEl=document.querySelectorAll(".normala");
                   targetEl[0].style.paddingTop=getNative("getStatusBarHeight")+"px";
                  targetEl[1].style.paddingTop=getNative("getStatusBarHeight")+"px";
                  // targetEl.style.paddingTop=data +  44+"px";

         }
},
    created:function(){
      this.iosAndroid(this);

    }

	}
</script>
<style scoped>
.firstOne{
    box-sizing:border-box;
    position:fixed;
    background-color: white;
    width:100%;
    color: black;
    position:fixed;
    z-index:999;
}
	.clickButton span{
    /* padding:0 20px; */

	}
	.clickButton .padding_right{
		padding-right:0;
	}
	.clickButton span u{
		height: 26px;
		width: 26px;
		background: rgba(255,255,255,0.8);
		font-size: 18px;
		text-align: center;
    line-height: 26px;
    color: black;

	}
	.clickButton span .span_img{
		/* width: 60%;
    height: 60%; */
    display: inline-block;
    /* height: 16px;
    width: 16px; */
    height: 20px;
    width: 11px;
    margin: 0 4.5px;
	}
	.radius{
		border-radius: 50%;
	}

.normala{
  padding-top: 0;
}
 .padding_top{
  padding-top: 44px;
	}
	.paddings{
    padding-top: 20px;
  }

.screen{
  opacity: 0.3;
}
.bcBlue{
  background-color: #3296FA;
  /* background-color: black; */
}
.bortomnone{
  border-bottom:none;
}
.bortoma{
   /* border-bottom:1px solid #d4d4d4; */
   /* box-sizing: border-box; */
}
.fontwhite{
  color: white;
}
.fontblack{
  color: black;
}

</style>
