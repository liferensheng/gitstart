<template>
   <div :class="{hello:true,paddingBottom:isIphoneX}" >
       <navheader :msg="{title:'操作手册12',color:'#3296FA',borderBottom:0,fontColor:1,rowColor:'./static/img/newback.png'}"  style="background-color: #3296FA;"></navheader>


            <!-- <navheader style="background-color: #3296FA;"  @startMethod="console.log(0)" :msg="{title1:'操作手册',logo:true,backImgUrl:'../../static/img/back1.png',title2:''}"  ></navheader> -->


    <mt-swipe  :show-indicators="false"  :auto="0"  style="height:100%;margin-top:-1px;"  >

          <mt-swipe-item class="container" v-for="(item,i) in choosedata" :key="i" >
            <mt-loadmore :top-method="loadTop"  ref="loadmore" style="height:100%;"  :topDistance="400" :top-status.sync="topStatus" >
            <div class="flex flex-column" >
                <div class="top flex flex-column"  >
                  <div style="width:100%;">
                       <img :src="item.picUrl" alt="">
                  </div>
                    <div class="wordContent" >
                    <p>{{item.title1}}</p>
                    <p v-if="item.title2.length>4">{{item.title2}}</p>
                     <p v-else >
                       <span v-for="(t,index) in item.title2" :key="index" style="width:100%;display:block;">{{t}}</span>
                     </p>

                    <p v-if="item.title3.length>4" :class="item.titlea?'tipcolor':'color'" style="line-height: .48rem;height: 0.48rem;" @click="!item.titlea&&login()"  >{{item.title3}}</p>
                    <p v-else :class="item.titlea?'tipcolor':'color'" @click="!item.titlea&&login()"  >
                      <span v-for="(tr,ir) in item.title3" :key="ir" style="width:100%;display:block;line-height: .48rem;height: 0.48rem;">{{tr}}</span>
                      </p>
                  </div>

                                    <!-- <div class="wordTip">
                    <p style="font-size: .4rem;line-height: .826667rem;">{{item.title4}}</p>
                    <p>{{item.title5}}</p>
                  </div> -->
                  </div>
                  <div class="wordTip">
                    <p style="font-size: .4rem;line-height: .826667rem;">{{item.title4}}</p>
                    <p>{{item.title5}}</p>
                  </div>
                 </div>

                               <div slot="top" class="mint-loadmore-top" >
    <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">加载中...</span>
    <span v-show="topStatus === 'loading'">加载中...</span>
  </div>
</mt-loadmore>
          </mt-swipe-item>

    </mt-swipe>



</div>

</template>

<script>
import {getUrlParams,getNative,getUrlName} from '../../static/js/checkcode.js'
import navheader from "./appheadera.vue"
export default {
  name: 'conclude',
  data () {
    return {
    //  title:"指导手册",
      msg: 'conclude',
      color:false,
      datas:[[{picUrl:"./static/img/guidelist11.jpg",title1:"糖吧血糖仪如何使用？",title2:"登录“糖吧”APP;",title3:"",title4:"1/4",title5:""},{picUrl:"./static/img/guidelist12.jpg",title1:"糖吧血糖仪如何使用？",title2:"进入APP点击我，进入“血糖仪”;",title3:"",title4:"2/4",title5:""},{picUrl:"./static/img/guidelist13.jpg",title1:"糖吧血糖仪如何使用？",title2:"点击二维码扫描框，将设备或（（血糖仪包装盒））背面的二维码放置在框内，完成绑定；扫描失败时，可以选择手动输入SN码（血糖仪包装盒背面）完成绑定;",title3:"",title4:"3/4",title5:""},{picUrl:"./static/img/guidelist14.jpg",title1:"糖吧血糖仪如何使用？",title2:"打开血糖仪设备进行测量；血糖数据上传到APP可能会有60s的延迟;",title3:"",title4:"4/4",title5:""}],

      [{picUrl:"./static/img/guidelist21.jpg",title1:"如何注册/登录糖吧？",title2:"如果您已有变啦账号，输入账号和密码，直接登录;",title3:"",title4:"1/2",title5:"没有变啦账号查看下一页，如何注册"},{picUrl:"./static/img/guidelist22.jpg",title1:"如何注册/登录糖吧？",title2:"如果您没有变啦的账号，请在糖吧注册通行证完成注册，再输入账号和密码登录。",title3:"注：在糖吧注册的通行证账号，变啦旗下所有APP可以登录。",title4:"2/2",title5:"已有变啦账号查看上一页，如何登录",titlea:true}],

      [{picUrl:"./static/img/guidelist31.jpg",title1:"如何绑定血糖仪？",title2:"点击糖吧APP底部 “我的”菜单，选择“绑定血糖仪”点击进入内页",title3:"",title4:"1/3",title5:""},{picUrl:"./static/img/guidelist32.jpg",title1:"如何绑定血糖仪？",title2:"用二维码扫描血糖仪包装盒背面，完成绑定；",title3:"",title4:"2/3",title5:""},
      {picUrl:"./static/img/guidelist33.jpg",title1:"如何绑定血糖仪？",title2:"若扫描失败时，可选择手动输入SN码（血糖仪包装盒背面）完成绑定。",title3:"",title4:"3/3",title5:""}],

      [{picUrl:"./static/img/guidelist41.jpg",title1:"如何管理血糖数据？",title2:"进入APP下方的“记录”菜单页面，点击上方的血糖值圆圈，进入血糖数据内页；",title3:"",title4:"1/2",title5:""},{picUrl:"./static/img/guidelist42.jpg",title1:"如何管理血糖数据？",title2:"血糖数据会以“列表、图表、曲线图”三种形式展示，方便查看",title3:"",title4:"2/2",title5:""}],

      [{picUrl:"./static/img/guidelist51.jpg",title1:"如何开启测量提醒功能？",title2:"进入APP底部“记录”菜单页面，点击右上角“测量提醒”，进入提醒页面；",title3:"",title4:"1/3",title5:""},{picUrl:"./static/img/guidelist52.jpg",title1:"如何开启测量提醒功能？",title2:"点击“开始”，即可开启餐后两小时倒计时提醒；点击右上角的“+”，可添加提醒项目。",title3:"",title4:"2/3",title5:""},
      {picUrl:"./static/img/guidelist53.jpg",title1:"如何开启测量提醒功能？",title2:"添加提醒内容后保存，即添加提醒成功。",title3:"",title4:"3/3",title5:""}],

      [{picUrl:"./static/img/guidelist61.jpg",title1:"如何邀请好友？",title2:"进入APP底部 “我的”菜单页面，点击“邀请好友”进入内页；",title3:"",title4:"1/3",title5:""},{picUrl:"./static/img/guidelist62.jpg",title1:"如何邀请好友？",title2:'"链接邀请"或"二维码邀请"可选择一种分享方式；',title3:"",title4:"2/3",title5:""},
      {picUrl:"./static/img/guidelist63.jpg",title1:"如何邀请好友？",title2:"选择后，自动生成专属的链接或二维码，长按保存图片或直接分享给好友。",title3:"",title4:"3/3",title5:""}],

      [{picUrl:"./static/img/guidelist71.jpg",title1:"如何填写教练编码？",title2:"进入APP底部 “我的”菜单页面，点击“我的教练”进入内页；",title3:"",title4:"1/2",title5:""},{picUrl:"./static/img/guidelist72.jpg",title1:"如何填写教练编码？",title2:"填写教练的手机号码，点击确定；如要修改教练，请致电4006858885",title3:"",title4:"2/2",title5:""}],

      [{picUrl:"./static/img/guidelist81.jpg",title1:"如何对血糖数据做记录？",title2:"进入APP下方的“首页”菜单页面，点击上方的血糖值圆圈，进入血糖数据内页；",title3:"",title4:"1/3",title5:""},{picUrl:"./static/img/guidelist82.jpg",title1:"如何对血糖数据做记录？",title2:"点击列表血糖数据，进入血糖数据内页;",title3:"",title4:"2/3",title5:""},{picUrl:"./static/img/guidelist83.jpg",title1:"如何对血糖数据做记录？",title2:"对这条数据做记录，如：描述吃的食物、运动等；也可以选择上传照片。",title3:"",title4:"3/3",title5:""}],

      [{picUrl:"./static/img/guidelist91.jpg",title1:"如何将异常数据通知亲友？",title2:"进入APP下方的“我的”菜单页面，点击亲友管理，进入血糖数据内页；",title3:"",title4:"1/2",title5:""},{picUrl:"./static/img/guidelist92.jpg",title1:"如何将异常数据通知亲友？",title2:["两种通知方式：","A.	微信通知：发送二维码给微信亲友，亲友关注后会收到异常血糖数据 " ,"B.	短信通知：添加亲友的手机号码，添加成功后亲友会收到异常血糖数据"],title3:"备注：当血糖数据过高或过低时，会推送异常数据给添加的亲友",title4:"2/2",title5:"",titlea:true}],

      [{picUrl:"./static/img/guidelist101.jpg",title1:"如何添加用药记录？",title2:"进入APP下方的“首页”菜单页面，点击用药记录，进入用药记录内页；",title3:"",title4:"1/4",title5:""},{picUrl:"./static/img/guidelist102.jpg",title1:"如何添加用药记录？",title2:"选择“添加”，进入添加药物内页；",title3:['备注：A.	如果您目前不适用药物调控，可以选择“我不吃药”','B.	如果药品是您常用的，可以在这里添加常用药'],title4:"2/4",title5:"",titlea:true},
      {picUrl:"./static/img/guidelist103.jpg",title1:"如何添加用药记录？",title2:"添加早中午等时间段吃的药物以及剂量；",title3:"",title4:"3/4",title5:""},{picUrl:"./static/img/guidelist104.jpg",title1:"如何添加用药记录？",title2:"添加成功的用药记录，可以通过首页“用药记录”查看和管理",title3:"备注：左滑可以删除药物记录，点击药物记录可以修改",title4:"4/4",title5:"",titlea:true},],

      [{picUrl:"./static/img/guidelist111.jpg",title1:"多用户共享使用血糖仪？",title2:"进入APP下方的“首页”菜单页面，点击人像的图表，进入用户管理内页；",title3:"",title4:"1/2",title5:""},{picUrl:"./static/img/guidelist112.jpg",title1:"多用户共享使用血糖仪？",title2:"点击添加用户，用户添加成功后，可以切换使用血糖仪",title3:"备注：当换用户测量血糖时，一定要切换用户，否则血糖数据会上传到之前使用血糖仪的用户",title4:"2/2",title5:"",titlea:true}],
      ],
				backImgUrl:"static/img/back.png",
				articalData:{},
				artical_img:"",
				isActive:false,
        isIos:false,
        choosedata:{},
        isIphoneX:false,
        topStatus:'123'

    }
  },
  components:{
    navheader
    },
  methods: {
    jump:function(a){
       this.$router.push("/"+a)
    },
    move:function(a){
       var li=document.querySelectorAll("img")[0];
       if(a==0){li.className='moveleft';}else{li.className='moveright';}
    },
    login:function(){
      console.log("返回登录页面")
    },
    gg:function(){
      console.log("aaa")
    },
    loadTop:function() {
      // alert(1)
        this.$refs.loadmore.onTopLoaded();
      //    alert(2)
        this.$refs.loadmore.style.transform='translate3d(0px, 0px, 0px)';
      },
    loadBottom:function() {
  this.$refs.loadmore.onBottomLoaded();
      }

  },
  mounted:function(){
        //          if(getUrlName("hwBottomHeight")!=0){
        //   document.querySelector(".artical").style.paddingBottom=getUrlName("hwBottomHeight")+"px" ;
        // }
  },
  created:function(){
    if(/iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)){
      this.isIphoneX=true;
    }


    // this.indexa=this.$route.query.index||JSON.parse(localStorage.guideNum);
    this.choosedata=this.datas[this.$route.query.index]||JSON.parse(localStorage.guidelistData)
        localStorage.guidelistData=JSON.stringify(this.choosedata);
    // console.log("这是长度",this.choosedata.length)
    if(this.$route.query.index==1){this.color=true;localStorage.guidelistColor=JSON.stringify(this.color);}
    else if(this.$route.query.index==undefined){this.color=JSON.parse(localStorage.guidelistColor);
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.hello{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* border:2px solid yellow;
  box-sizing: border-box; */
  /* overflow-x: scroll;
  -webkit-overflow-scrolling:touch; */
}
.new {
  /* height: 100%; */
  flex: 1;
  width: 100%;
  list-style-type: none;
  padding: 0;
  overflow-x: scroll;
  -webkit-overflow-scrolling:touch;
}
.container{
  height: 100%;
  width: 100%;
  background-color: white;
}


.top img{
  display: block;
  /* height: 7.653333rem; */
  width: 100%;
}
.wordContent{
  width: 100%;
  /* text-align: center; */
  padding: 0 .56rem;
  height: 6.466667rem;
  /* height: 6.666667rem; */
  /* padding: .746667rem; */
}
.wordContent>p:nth-child(1){
  font-size: .64rem;
  color: #222222;
  margin: .266667rem  auto 0;
  height: 1.013333rem;
  line-height:1.013333rem;
}
.wordContent>p:nth-child(2){
  font-size: .426667rem;
  color: #888888;
  /* height: .693333rem; */
  line-height:.693333rem;
}
.wordContent>p:nth-child(3){
  margin-top: .266667rem;
  height: .693333rem;
  line-height:.693333rem;


}
.color{color:#3296FA;font-size: .426667rem;}
.tipcolor{color:#fb308b;font-size:.32rem;}
.wordTip{
  /* position: absolute;
  bottom: 0.8rem; */
  flex: none;
  text-align: center;
  width: 100%;
  color: #888888;
  margin-bottom: .8rem;
}
.moveleft{

  animation:myfirst 1s linear;
  animation-fill-mode: forwards;

}
.moveright{

  animation:myfirst2 1s linear;
  animation-fill-mode: forwards;

}
@keyframes myfirst
{
0%   {margin-left:0px;}
100% {margin-left:-100%;}
}
@keyframes myfirst2
{

0% {margin-left:-100%;}
100%   {margin-left:0px;}
}


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
