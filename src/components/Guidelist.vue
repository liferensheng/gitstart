<template>
  <div :class="{hello:true,paddingBottom:isIphoneX}" >
<navheader :msg="{title:'操作手册45',color:'#3296FA',borderBottom:0,fontColor:1,rowColor:'./static/img/newback.png'}"  style="background-color: #3296FA;"></navheader>
    <ul style="height:200%;width:100%;margin-top:-1px;">
      <p class="backBlue"></p>
        <li @click="go(index)"  v-for="(item,index) in guideList" :key="index"   class="classa" >
          <div>
            <img :src="item.urlPic" alt=""><span>{{item.title}}</span>

          </div>

        </li>
    </ul>


  </div>
</template>

<script>
import navheader from "./appheadera.vue"
import {getUrlParams,getNative,getUrlName} from '../../static/js/checkcode.js'
export default {
  name: 'disease',
  data () {
    return {
      msg: 'disease',
      guideList:[
        {title:"糖吧血糖仪如何使用？",urlPic:"./static/img/01.png",color:"#FF984D"},
        {title:"如何注册登录糖吧？",urlPic:"./static/img/02.png",color:"#FFD101"},
        {title:"如何绑定血糖仪？",urlPic:"./static/img/03.png",color:"#04D480"},
        {title:"如何管理血糖数据？",urlPic:"./static/img/04.png",color:"#3396FA"},
        {title:"如何开启测量提醒功能？",urlPic:"./static/img/05.png",color:"#FF57A5"},
        {title:"糖吧如何邀请好友？",urlPic:"./static/img/06.png",color:"#4A79E0"},
        {title:"如何填写教练编码？",urlPic:"./static/img/07.png",color:"#04D480"},
        {title:"如何对血糖数据做记录?",urlPic:"./static/img/08.png",color:"#04D480"},
        {title:"如何将异常数据通知亲友?",urlPic:"./static/img/09.png",color:"#04D480"},
        {title:"如何添加用药记录？",urlPic:"./static/img/10.png",color:"#04D480"},
        {title:"多用户共享使用血糖仪？",urlPic:"./static/img/11.png",color:"#04D480"}
        ],
      	mask_imgUrl:"static/img/nav.png",
				backImgUrl:"static/img/back.png",
				shareImgUrl:"static/img/share.png",
				articalData:{},
				artical_img:"",
				isActive:false,
        isIos:false,
        android:false,
				articalContent:"",
				isCall:true,
				is200:false,
        isIphoneX:false
    }
  },
  components:{
    navheader
  },
  methods: {
    go:function(a){
      //console.log(location.href.split("?")[1])
      this.$router.push({path:"/guidedetail"+"?"+location.href.split("?")[1],
      query:{
          index:a
      }
      })
    }
  },
  created:function(){

    var isio = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if(/iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)){
      this.isIphoneX=true;
        this.isIos=false;
        this.android=false;
    }else if(isio){
        this.isIos=true;
        this.android=false;
        this.isIphoneX=false;
    }else{
        this.android=true;
        this.isIos=false;
        this.isIphoneX=false;
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  position: absolute;
  /* z-index: -200; */
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}


h1, h2 {
  font-weight: normal;
}
ul {
  height: 100%;
  flex: 1;
  width: 100%;
  list-style: none;
  padding: 0;
  overflow-y: scroll;
  -webkit-overflow-scrolling:touch;
  background-color: #F8FAFF;
  margin: 0 auto;
  border: none;
  /* border-top: 2px solid #3296FA; */
  /* box-sizing: border-box; */
  /* border-top-left-radius:  .106667rem;
  border-top-right-radius:  .106667rem; */
}
.backBlue{
   /* position: relative;
   z-index: 100;
   top: 0; */
   background-color: #3296FA;
   height: 36px;
   width: 100%;
   /* border: 1px solid  #3296FA;
   box-sizing: border-box; */
}

li {
 height: 2.88rem;
 width: 9.2rem;
 /* width: 100%; */
 /* margin: .266667rem auto; */
 line-height: 2.88rem;
 font-size: .506667rem;
 color: #ffffff;
 border-radius: .106667rem;
 box-shadow: .026667rem .026667rem .213333rem rgba(104, 104, 104, 0.4);
 margin: 0 auto;
 margin-bottom:.266667rem;
}
ul>li:nth-child(2){
      margin-top: -36px;
}
li>div{
  padding-top: .24rem;
  /* width: 100%; */
  height: 2.4rem;
  line-height: 2.4rem;
}
li>div>img{
  display: inline-block;
  height:2.4rem ;
  width: 2.4rem;
  margin-right: .106667rem;
  margin-left: .24rem;
  vertical-align: middle;
}
a {
  color: #42b983;
}
.classa{
  background-color: white;
  box-shadow: 2.5px 2.5px  7.5px rgba(26, 115, 204, 0.1);
  color: black;
}
/* .class1{
  background-color: #FF984D;
}
.class2{
  background-color: #FFD101;
}
.class3{
  background-color: #04D480;
}
.class4{
  background-color: #3396FA;
}
.class5{
  background-color: #FF57A5;

}
.class6{
  background-color: #4A79E0;
}
.class7{
  background-color: #04D480;
} */



	.clickButton span{
    /* padding:0.2rem 0.4rem; */
    padding:0 0.4rem;
	}
	.clickButton .padding_right{
		padding-right:0;
	}
	.clickButton span u{
		height: 0.693333rem;
		width: 0.693333rem;
		background: rgba(255,255,255,0.8);
		font-size: 0.48rem;
		text-align: center;
    line-height: 0.693333rem;
    color: black;
	}
	/* .clickButton span .span_img{
		width: 60%;
		height: 60%;
	} */
	.radius{
		border-radius: 50%;
	}
</style>
