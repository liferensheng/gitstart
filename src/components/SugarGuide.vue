<template>
   <div :class="{hello:true,paddingBottom:isIphoneX}" >

     <ul>
       <li v-for="(item,i) in data" :key="i">
         <p class="text1">{{i+1}}.{{item.title1}}</p>
         <p class="text2">{{item.title2}}</p>
         <img :src="item.pic" style="margin:0 auto;" :class="'imgSize'+(i+1)" alt="">
       </li>
     </ul>
  </div>


</template>

<script>
import {getUrlParams,getNative,getUrlName} from '../../static/js/checkcode.js'
export default {
  name: 'hello',
  data:function() {
    return {
      msg: 'helloworld',
      isIphoneX:false,
      data:[{title1:"点击绑定血糖仪选项,扫描二维码",title2:"二维码位于血糖仪设备背面",pic:"./static/img/sugar/sugarGuide1.png"},{title1:"如遇绑定失败,可手动输入SN码",title2:"SN码位于血糖仪包装盒的背面",pic:"./static/img/sugar/sugarGuide2.png"},{title1:"完成绑定,打开血糖仪设备进行测量",title2:"血糖数据上传APP可能会有60S延迟",pic:"./static/img/sugar/sugarGuide3.png"},{title1:"读取数据成功,数据展示",title2:"进入糖吧“首页”就可以看到数据",pic:"./static/img/sugar/sugarGuide4.png"}]
    }
  },
  created:function(){
      if(/iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)){
      this.isIphoneX=true;
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    height: 100%;
    width: 100%;
    overflow-y: scroll;
  -webkit-overflow-scrolling:touch;
    background-color: white;
  }

ul{
  text-align: center;
  padding-bottom: .626667rem;
    /* font-family:"宋体",Verdana, Arial; */
}
.text1{
    color: #222222;
    font-size: .426667rem;
    height:.826667rem;
    line-height:.826667rem;
    margin-top: .626667rem;
}
.text2{
    color: #999999;
    font-size: .346667rem;
    height:.746667rem;
    line-height:.746667rem;
    margin-bottom:  .626667rem;
}

.imgSize1{
  height:9.106667rem ;
  width: 6.853333rem;
}
.imgSize2{
  height:8.906667rem ;
  width: 6.666667rem;
}
.imgSize3{
  height:10.36rem ;
  width:6.6rem;
}
.imgSize4{
  height:10.373333rem ;
  width: 5.133333rem;
}
</style>
