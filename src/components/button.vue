<template>
      <!-- <div @click="reporta" style="width:100%;" >
         <input type="button"  class="reportBtn  screen"   v-if="content.length"  >
         @touchstart="opacityRecover($event,'0.3')" @touchend="opacityRecover($event,'0')"
         <div class="reportBtn" style="margin-top: -1.066667rem;"    v-if="content.length">{{word}}</div>
         <div class="reportBtn " style="opacity: 0.5;" v-else >{{word}}</div>
       </div> -->
                      <div @click="reporta"  style="width:100%;"  class="btnBlockComponent" >
         <input type="button"  class="doubleBtnComponent screenComponent"  style="position: relative; display: block;margin: 0 auto;"    v-if="content.length"  >
         <div class="doubleBtnComponent backgroundComponent" style="margin-top: -1.066667rem;"    v-if="content.length">{{word}}</div>
         <div class="doubleBtnComponent backgroundComponent " style="opacity: 0.5;" v-else >{{word}}</div>
                <!-- <input type="button"  class="doubleBtn screen"    >
                <div class="doubleBtn background" style="margin-top: -1.066667rem;"  >点击查看详情</div> -->
              </div>
</template>
<script>
import {getUrlParams,getNative,getUrlName} from '../../static/js/checkcode.js'
	export default{
    props:["word",'content'],
    data:function(){
      return{

      }
    },
    methods:{
      	opacityRecover:function(a,b){
		    console.log(a)
         a.target.style.opacity=b;
	},
         reporta:function(){
           this.$emit('startMethod')
          //  console.log("触发事件")
         }
    },

    mounted:function(){

      document.body.addEventListener('touchstart', function () { });   //为了兼容添加的    不添加也有效

    }
  }
</script>
<style >
    /* .reportBtn{
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
  box-shadow:  .066667rem .066667rem .2rem rgba(0,128,255,0.4);
}

.screen{
  background-color:rgba(0,0,0,0.3);
  position: relative;
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
} */


.doubleBtnComponent{
    height: 1.066667rem;
    width:6rem;
    position: relative;
    line-height: 1.066667rem;
    font-size: .426667rem;
    border-radius: 1.066667rem;
    text-align: center;
    margin: 0 auto;
    border:1px solid #3296fa;
    box-sizing: border-box;
    /* box-shadow:  .066667rem .066667rem .2rem rgba(0,128,255,0.4); */
  }


  input.screenComponent[type="button"]:active{
        opacity: 1;
        background-color: rgba(0,0,0,0.3);
        /* border: 1px solid  black; */
  }
  input.screenComponent[type="button"]:visited{
         opacity: 0;
  }
  .screenComponent{
    z-index:3000;
    opacity: 0;
    /* -webkit-touch-callout: none; */
    /*禁用手机浏览器的用户选择功能  无效 */
    /* -webkit-user-select: none;
    -moz-user-select: none; */
  }
  .backgroundComponent{
    background-color:#3296fa;
    color:white;
    box-shadow:  .066667rem .066667rem .2rem rgba(0,128,255,0.4);
  }
  .btnBlockComponent{
    width: 6rem;
    height: 1.066667rem;
    border-radius: 1.066667rem;
    margin: 0 auto;
  }
  img{
    -webkit-touch-callout: none;
  }
</style>
