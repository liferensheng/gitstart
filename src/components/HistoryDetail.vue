<template>
  <div :class="['artical','flex','flex-column','space-between',{paddingBottom:isActive} ]"  >


    <!-- <div v-if="!isWx"   class="backImg"></div> -->
    <!-- 背景 -->
    <!-- 微信端 -->
    <!-- <div  v-if="isWx" > -->
    <div   class="backImga"></div>

    <!-- </div> -->
    <div style="z-index:999;width:100%;" :class="['scroll', 'flex1',{app_position:!isWx}]">


      <navheader   @navMethod="shares" :msg="{title1:'测评结果',logo:true,shareImgUrl:'static/img/share2.png',backImgUrl:'static/img/newback.png',historyImgUrl:'static/img/history.png',secondFun:goHistory}"  ></navheader>
      <!-- <div v-if="isWx" v-cloak> -->
      <!-- <p  style="width:100%;height:1.066667rem;line-height:1.066667rem;font-size:.426667rem;text-align:center;margin:0 auto;border-bottom:2px solid black;box-sizing:border-box;color:white;color:black;background-color:white;">糖化水平表现测评</p> -->

      <!-- </div> -->
      <div style="width:100%;flex:none;" class="scroll"  v-cloak >


        <div :class="['healthResult',{marginbBottom:isWx}]"  >
          <!-- <p class="titleWord">糖化水平表现测评结果</p> -->
          <div class="circled"   >

            <div :class="['circlea','circlec',{background_green:dataStore.green,background_yellow:dataStore.yellow,background_red:dataStore.red}]"></div>
            <div :class="['circlea','circleb',{background_green:dataStore.green,background_yellow:dataStore.yellow,background_red:dataStore.red}]"></div>
            <div :class="['circlea','circlek',{background_green:dataStore.green,background_yellow:dataStore.yellow,background_red:dataStore.red}]"></div>
            <div :class="['circlea',{background_green:dataStore.green,background_yellow:dataStore.yellow,background_red:dataStore.red}]" >
              <span style="font-size:1.6rem;">{{dataStore.score}}</span>分
            </div>
          </div>
          <p class="testTime">{{dataStore.created}}</p>
          <p class="judge">{{dataStore.result}}</p>
          <p class="jumpStart"  @click="goExplain">什么是人体糖失衡？</p>
          <ul class="tipList">
            <p class="tipTitle">健康点评</p>
            <li v-for="(item ,i) in  resultList" :key="i"><span>{{item.level}}</span>{{item.description}}</li>
          </ul>
        </div>

        <div   class="healthTip">
          <p ><span class="tipImg" ></span><span style="vertical-align: super;">健康贴士</span></p>
          <p class="tipContent">测评结果仅供参考，我们建议您可以联系您的教练或者相关专业医师进行健康咨询~~</p>

        </div>


        <!-- <navfooter  v-if="isWx"   style="margin-top:.533333rem;"  @footerMethod="downLoad" :msg="'下载糖吧app'"></navfooter> -->


        <summitBtn    @startMethod="submit"  style="margin: .693333rem auto;"  :word="'重新测评'"  :content="[1,2]"    ></summitBtn>

      </div>

    </div>

  </div>
  <!-- </div> -->
</template>

<script>
  import summitBtn from "./button.vue"
  import navheader from "./appheaderb.vue"
  import navfooter from "./footer.vue"
  import {getUrlParams,getNative,getUrlName,minTips,weixinConfig,wEventConfit}  from '../../static/js/checkcode.js'
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
        testResult:'你的糖平衡情况很不错。理想情况是0分',
        resultList:[{level:"<4分",description:'你的糖平衡情况很不错。理想情况是0分'},{level:"4-8分",description:'你有中度及以下的糖失衡'},{level:"9-12分",description:'你有严重的糖失衡问题和中度的AGEs损伤'},{level:">12分",description:'你有极度糖失衡和严重的AGEs损伤'}],
        num:'',
        green:false,
        yellow:false,
        isWx:false,
        dataStore:{},
         taskId:''
      }
    },
    components:{
      navheader,
      summitBtn,
      navfooter
    },
    methods: {
      goExplain:function(){
        // if(!location.href.startsWith('http://localhost:8070')){
        if(location.origin.indexOf("https://t8api.bianla.cn")!=-1){
          // location.href=location.href.split("healthresult")[0]+getUrlParams()+"&articalID=20&noClose=1"
          this.$router.push({path:"/"+"?"+getUrlParams(),
            query:{
              articalID:20,
              noClose:1
            }
          })
        }else{
          //  location.href=location.href.split("healthresult")[0]+getUrlParams()+"&articalID=60&noClose=1"
          this.$router.push({path:"/"+"?"+getUrlParams(),
            query:{
              articalID:60,
              noClose:1
            }
          })
        }

        //      console.log(d)
        // }else{
        //  alert(location.href.split("healthresult")[0]+getUrlParams()+"&articalID=66")
        //  this.$router.replace("/")+getUrlParams()+"&articalID=66"
        //       this.$router.push({path:"/"+"?"+getUrlParams(),
        // query:{
        //     articalID:66
        // }
        // })
        // this.$router.push({
        //    name:"Artical",
        //       params: {
        //         articalID:66
        //       }
        // })
        //  location.href=location.href.split("healthresult")[0]+getUrlParams()+"&articalID=66"
        //  location.href="https://www.baidu.com"
        // }

        //跳转到解释糖平衡的文章页面
      },
      goHistory:function(){
            this.$router.replace("/historyList/close"+getUrlParams())
      },
      submit:function(){
        // this.$router.replace("/healthtest/close")
        // alert("huitui")
        // window.history.back();
        // this.$router.replace("/healthtest/close")
        this.$router.replace({path:"/healthtest/close"+"?"+getUrlParams(),
          query:{
            reTest:1
          }
        })

      },
      shares:function(){
        var self = this;
        if (self.shares.test) {
          return
        }
        self.shares.test=true;
        var links = location.origin.indexOf("https://t8api.bianla.cn")!=-1?'https://t8api.bianla.cn':'https://tang8dev.bianla.cn';

// {title:'糖化水平评测',shareLink:'/page/api/tangba/dist/index.html#/healthtest/close',articleIcon:'/page/api/tangba/dist/static/img/shareLogo.png',content:'分享糖吧水平测评项'}
        var shareUrls =links + "/page/api/website/shareHealthtest.html"+"?id="+getUrlName("user_id");
        // console.log(shareUrls)
        var title = '糖化水平表现评测' || "";
        var content = "先来做个小测试，看看你被“糖化”盯上了吗？" || "";
        var icon =links + '/page/api/tangba/dist/static/img/shareLogo.jpg' || "";

        app.native.tangbaShareUrl({title:title,icon:icon,url:shareUrls,content:content})
        // alert(app.native.tangbaShareUrl)
        // alert(1666)
        // alert(wEventConfit)
        //  wx.ready(function(){

        // });
        self.shares.test=false;

      },
      getShowData:function(){
        var  that=this;
        // this.$http.post('/api/tangba/evaluation/loadSaccharificationEvaluation.action',"user_id="+getUrlName("user_id"))
        this.$http.get('/api/tangba/evaluation/intoEvaluationResultFromHistory.action'+getUrlParams()+"&evaluationId="+getUrlName("evaluationId"))
          .then(function(msg){
            if(msg.data.success){
              if(msg.data.data.result){
                // alert("获取列表成功")
                that.dataStore=msg.data.data;
                  //  console.log( that.dataStore)
                // that.num=msg.data.data.score||0;
                // that.testResult=msg.data.data.result;
                if(that.dataStore.score>8){that.dataStore.red=true;}
                else if(that.dataStore.score>=4){that.dataStore.yellow=true;}
                else{that.dataStore.green=true;}

                localStorage.dataStore=JSON.stringify(that.dataStore);
                // console.log(that.green)
              }else{
                that.$router.replace("/healthtest/close")
              }
            }else{
              minTips("网络错误")
              // alert(msg.data.alertMsg)
            }
          })
          .catch(function(err){
            minTips("网络错误")
          })
      },
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
    mounted:function(){
      var  targetE2=document.querySelector(".normal");
      if(targetE2){
        targetE2.style.paddingTop=30+"px";
        //                  app.native.getStatusBarHeight({fun:function(data){
        //         //  alert("调用了获取高度的方法")
        //           targetEl.style.paddingTop=data +"px";
        // }})
        // targetEl.style.paddingTop=getNative("getStatusBarHeight")+"px";
      }
    },
    created:function(){
      var that=this;
      // var  c=localStorage.dataStore;
      // if(c){
      //   that.dataStore=JSON.parse(c);
      //   if(that.dataStore.score>8){that.dataStore.red=true;}
      //   else if(that.dataStore.score>=4){that.dataStore.yellow=true;}
      //   else{that.dataStore.green=true;}
      // }else{
      //   that.dataStore={};
      // }



      if(navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1){
        // alert("微信端")
        that.isWx=true;
        //  wx.ready(function () {
        //   wEventConfit({title:'糖化水平评测结果',shareLink:'/page/api/tangba/dist/index.html#/healthresult'+"?id="+getUrlName("id"),articleIcon:'/page/api/tangba/dist/static/img/shareLogo.png',content:'分享糖吧水平测结果'})
        //  })
      }else{
        that.isWx=false;
      }
      that.getShowData();
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

    }


    //     ,beforeRouteEnter (to, from, next) {
    //   　　console.log("这是来路径",from.path);
    //   console.log("这是去路径",to.path);
    //   console.log("这是回调函数",next);
    //   　　next();
    // }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .artical{
    height: 100%;
    width: 100%;
    font-size: 0.373333rem;
    color: #1A1A1A;
    /* padding-bottom: 1.28rem; */

  }
  .navIcon{
    height: 44px;
    line-height:44px;
    position:fixed;
    width:100%;
    opacity: 1;

  }

  .backImg{
    position: absolute;
    background: url("../../static/img/healthtesta.png") no-repeat center center;
    background-size: 100% 100%;
    height: 6.4rem;
    flex: none;
    width: 100%;
  }
  .backImga{
    position: absolute;
    background: url("../../static/img/healthtesta.png") no-repeat center center;
    background-size: 100% 100%;
    height: 6.4rem;
    flex: none;
    width: 100%;
  }

  .picsize{
    display: inline-block;
    width: 26px;
    height: 26px;
    z-index: 3000;
    line-height: 26px;
    text-align: center;
    padding-top: 4px;
  }

  .normal1{
    width: 100%;
    height: 44px;
    background-color: white;
    opacity: 1;
  }
  .margin_top{
    margin: 88px auto 0;
  }
  .margins{
    margin: 64px auto 0;
  }
  .marginChange{
    margin: 69px auto 0;
  }

  .changestyle{
    opacity: 1;
    /* background-color:#fff;
   border-bottom:1px solid #e6e6e6; */
    box-sizing: border-box;
  }
  /* 评论内容 */
  .healthResult{
    margin: 0 auto ;
    width: 9.306667rem;
    height: 10.533333rem;
    background-color: white;
    box-shadow: .026667rem .026667rem .213333rem rgba(104, 104, 104, 0.4);
    padding-top: .626667rem;
    text-align: center;
    border-radius: .106667rem;
  }
  .titleWord{
    color: #888888;
    font-size: .373333rem;
    height: 1.333333rem;
    line-height:  1.333333rem;
    /* text-align: center; */
  }

  .circled{
    position: relative;
    width: 3.293333rem;
    height: 3.293333rem;
    /* background-color: #17d6ad; */
    left: calc(50%  - 3.293333rem/2);
    top: 0;
  }
  .testTime{
    /* height: .693333rem;
    line-height:.693333rem;
    margin:.24rem  auto 0; */
    height: .506667rem;
    line-height:.506667rem;
    margin:.426667rem  auto 0;
    font-size: .373333rem;
    color:#888888;
  }

  .judge{
    color: #222222;
    font-size: .426667rem;
    height: 1.093333rem;
    line-height:   1.093333rem;
    /* text-align: center; */
  }
  .jumpStart{
    font-size: .346667rem;
    color: #3296fa;
    border-bottom: 1px solid #3296fa;
    height: .373333rem;
    line-height: .373333rem;
    width: 3.2rem;
    margin: 0 auto .706667rem;
  }
  .tipList{
    width: 8.613333rem;
    margin: 0 auto;
    border-top: 1px solid #e6e6e6;
  }
  .tipTitle{
    font-size: .346667rem;
    height: 1.013333rem;
    line-height: 1.013333rem;
    color: #222222;
    position: relative;
    margin: 0 auto;
    margin-top: -.506667rem ;
    width: 1.733333rem;
    background-color: white;
  }
  ul>li{
    text-align: left;
    padding-left: .133333rem;
    font-size: .32rem;
    color: #888888;
    height: .586667rem;
    line-height: .586667rem;

  }
  ul>li>span{
    display: inline-block;
    width: 1.066667rem;
  }
  .healthTip{
    margin-top: .346667rem;
    width: 9.306667rem;
    height: 2.266667rem;
    border-radius: .106667rem;
    padding-left: .346667rem;
    padding-right: .346667rem;
    margin: .346667rem auto 0;
    box-shadow: .026667rem .026667rem .213333rem rgba(104, 104, 104, 0.4);
  }
  .tipImg{
    display: inline-block;
    width: .573333rem;
    height: .693333rem;
    background: url("../../static/img/healthTip.png") no-repeat center center;
    background-size: 100% 100%;
    margin-right: .213333rem;
  }
  .tipContent{
    font-size: .373333rem;
    color: black;
  }
  .btnsubmmit{
    display: block;
    width: 6rem;
    height: 1.066667rem;
    border-radius: 1.066667rem;
    margin: 0 auto;
    margin-top: .693333rem;
    /* margin-bottom: .693333rem; */
    box-shadow: .026667rem .026667rem .2rem rgba(0, 128, 255, 0.4);
  }


  /*动效*/
  @keyframes warnb {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    /* 50%{
      transform: scale(1.17);
        opacity: 0.2;

    } */
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }



  /* 保持大小不变的小圆圈  */

  .circlea{
    position: absolute;
    width: 2.506667rem;
    height:2.506667rem;
    line-height: 2.506667rem;
    font-size: .426667rem;
    color: #ffffff;
    border-radius: 50%;
    z-index: 700;
    top:.46rem;
    left:.46rem;
  }
  /* 产生动画（向外扩散变大）的圆圈  */
  .circleb {

    animation: warnb 4.2s linear;
    /* animation-delay: 1s; */
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }
  .circlek {
    animation: warnb 4.2s linear;
    animation-delay: 1.4s;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }
  .circlec {
    animation: warnb 4.2s linear;
    animation-delay: 2.8s;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }

  .background_green{
    background: #17d6ad;
  }
  .background_yellow{
    background: #fbc50a;
  }
  .background_red{
    background: #ff5a96;
  }
  .background_white{
    background: white;
  }
  .marginbBottom{
    margin-bottom: 0.5rem;
    margin-top: 1.066667rem;
  }
  .app_position{
    position: fixed;
  }
</style>
