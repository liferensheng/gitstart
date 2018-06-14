<template>
      <div style="width:100%;"  class="flex flex1 flex-column">
          <p @click="fun" class="doubleBtn" >{{msg}}</p>
				 <div style="background-color:#f5f5f5;padding:0.4rem 0;" >
					<img src="static/img/tangbascanimg.jpg" alt="" class="scanImg">
					<p style="height:.853333rem;line-height:.853333rem;font-size:.32rem;color:#333333;text-align:center;">与其相忘于江湖，不如扫二维码关注"<span style="color:#ff5a96;">糖吧</span> "</p>
				</div>
       </div>
</template>
<script>
import {getUrlParams,getNative,getUrlName} from '../../static/js/checkcode.js'
	export default{
    props:["msg"],
    data:function(){
      return{
            theme: "footer"
      }
    },
    methods:{
         fun:function(){
           this.$emit('footerMethod')
          //  console.log("触发事件")
         }
    }
  }
</script>
<style scoped>
            .scanImg{
              display: block;
              width: 2.56rem;
              height: 2.56rem;
              margin: 0 auto ;

          }
          .doubleBtn{
              height: 1.066667rem;
              width:6rem;
              line-height: 1.066667rem;
              font-size: .426667rem;
              border-radius: 1.066667rem;
              text-align: center;
              margin: 0 auto;
              border:1px solid #3296fa;
              box-sizing: border-box;
              color:#3296fa;
              margin-bottom: .533333rem;
          }

</style>
