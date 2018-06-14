<template>
   <div :class="{hello:true,paddingBottom:isIphoneX}" >

  <!-- <div > -->
     <ul v-for="(t,index) in data" :key="index" >
        <p v-if="t.title"><span style="height: .426667rem;width: .053333rem;
background-color: #3296fa;display: inline-block;margin-right:.066667rem;vertical-align: middle;margin-top:-.026667rem;"></span>{{t.title}}</p>
       <li v-for="(item,i) in t.pic" :key="i">
         <img :src="item" alt="">
       </li>
     </ul>
  </div>


  <!-- </div> -->
</template>

<script>
import {getUrlParams,getNative,getUrlName} from '../../static/js/checkcode.js'
export default {
  name: 'hello',
  data:function() {
    return {
      msg: 'helloworld',
      isIphoneX:false,
      data:[{title:"",pic:["./static/img/longpic1.png"]},{title:"方式一: 微信通知",pic:["./static/img/longpic2.png","./static/img/longpic3.png","./static/img/longpic4.png"]},{title:"方式二: 短信绑定",pic:["./static/img/longpic5.png","./static/img/longpic6.png"]}]
    }
  },
  methods: {
    sh:function(){
    	// alert(12233);
    	Native.cancelNativePage();
    }

  },
  created:function(){
      if(/iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)){
      this.isIphoneX=true;
    }
              //  this.iosAndroid(this);
    				//if(getUrlName("isIphoneX")){
					//if(getUrlName("isIphoneX")==1){
           // this.isActive=true;
            // this.isiOS=false;
						// this.mask_imgUrl = "static/img/iphoneXnav.png";
				//	}
  //}
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

ul {
  width: 100%;
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: white;
  border-top: .16rem  solid #f2f2f2 ;
  box-sizing: border-box;
}
ul:nth-child(1){
  border-top: 1px solid #f2f2f2 ;
  box-sizing: border-box;
}
ul>p{
  height: .666667rem;
  line-height: .666667rem;
  width: 100%;
  /* padding-left:  */
  font-size: .4rem;
  color: #9f9f9f;
  padding-left: .44rem;
  border-bottom: 1px solid #f2f2f2;
  box-sizing: border-box;
}
li {
  width: 100%;
  display: block;
}
a {
  color: #42b983;
}

img{
  display: block;
  /* height: 5.626667rem; */
  width: 8.36rem;
  margin: .933333rem auto;
  margin-bottom: 0.4rem;
}


</style>
