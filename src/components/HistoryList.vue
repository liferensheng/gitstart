<template>
  <div :class="['artical','flex','flex-column','scroll',{paddingBottom:isActive} ]"  >

                       <navheader  v-if="!isWx" @navMethod="submit" :msg="{title1:'评测历史',logo:false,shareImgUrl:'static/img/share2.png',backImgUrl:'static/img/newback.png',title2:'添加'}" style="background:#3296fa;" ></navheader>

           <div  :class="['list',{noShow:show}]" style="overflow-x:hidden;" >
            <ul class="list-ul">
        <li id="li" class="list-li" v-for="(item ,i) in  historyList.commentList" :key="i"   @touchstart="Ontouchstart($event,i)" @touchmove="Ontouchmove($event,i)" @touchend="Ontouchend($event,i)">
          <!-- <div style=" border:1px solid black;box-sizing:border-box;" > -->

              <div class="flex flex-row" >
            <div class="con scrollBox flex flex-row "  style="height: 1.6rem;width:10rem;" @click="go(item.evaluationId)" >
                <div class="flex flex-column flex-justify widthLi"   >
                    <p>糖化水平表现测评</p>
                    <p class="fontDate">{{item.evaluationTime}}</p>
                    <!-- <p class="fontDate flex flex-row space-between">
                       <span>{{item.evaluationTime | filtersTime(0)}}</span><span>{{item.evaluationTime | filtersTime(1)}}</span>
                    </p> -->
                </div>
                <div class="flex1"></div>
                <div class="flex flex-row flex-items  flex-end " style="height: 1.6rem;margin-right: .426667rem;"  >
                    <p class="fontScore  flex flex-row flex-items " >
                         <span :class="{background_green:item.evaluationDegree==1,background_yellow:item.evaluationDegree==2,background_red:item.evaluationDegree==3}">{{item.evaluationGrade}}分</span>
                         <img src="static/img/enter0.png" class="enterImg" alt="">
                         <!-- <span class="enterImg"></span> -->
                    </p>
                </div>
            </div>
          <div class="deleteBtn  btn flex1" style="height: 1.6rem;" @click="deleteLi(item.evaluationId,i)"></div>
          </div>
          </li>

    </ul>
</div>


            <div   :class="['flex', 'flex-column',' flex-items', 'flex-justify','flex1',{noShow:!show}]"  >
                <div class="flex flex-column flex-items flex-justify" >
                    <img src="static/img/nodata.png" class="placeholderImg" alt="">
                    <p style="font-size: .4rem;color: #999999;margin-top: .666667rem;">此处空空，没有测量数据哦~</p>
                </div>
         </div>


  </div>

</template>

<script>
  import navheader from "./appheaderb.vue"

  import {getUrlParams,getNative,getUrlName,minTips,weixinConfig,wEventConfit}  from '../../static/js/checkcode.js'
  export default {
    name: 'artical',
    data () {
      return {
        msg: 'disease',
        historyList:{commentList:[],count:0},
        num:'',
        green:false,
        yellow:false,
        isWx:false,
        dataStore:{},
        scrollDirection:0,
        startPos:0,
        endPos:0,
        startPosY:0,
        endPosY:0,
        historyPage:1,
        historyNum:25,
        onlyOne:false,
        show:false,
        obj:'',
        sliderTo:0,
        completeCode:"",
         isFinish:'',
         taskId:''
      }
    },
    components:{
      navheader
    },
    methods: {
          scrolla:function(a){
            var  that=this;
           that.height=a.target.scrollHeight-a.target.scrollTop -a.target.clientHeight;
               if(!that.onlyOne&&that.height < 300){
                    // console.log("到底了")
                that.onlyOne=true;
                that.historyPage++;
                that.getShowData();
         }
          },
          Ontouchstart :function(a,i){

              if(this.obj&&this.obj!=document.querySelectorAll(".list-li")[i]){
                  this.obj.style.WebkitTransform = "translateX(" + 0 + "px)";
              }
              //滑动其它 前一个自动关闭   如果只用this.obj 来判断 会误判 造成删除按钮失效
                this.obj = document.querySelectorAll(".list-li")[i];
                if (this.obj.className == "list-li") {
             this.startPos = event.targetTouches[0].pageX;
             this.startPosY = event.targetTouches[0].pageY;
                var   objX = (this.obj.style.WebkitTransform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
                }
            },
            Ontouchmove : function(a,i){
                  this.endPos = event.targetTouches[0].pageX;
                  this.endPosY = event.targetTouches[0].pageY;
                // 判断滑动方向，X轴阻止默认事件，Y轴跳出使用浏览器默认
                if (this.flagX == 0) {
                  if(Math.abs(this.endPos - this.startPos) > Math.abs(this.endPosY - this.startPosY)){
                    this.flagX=1;
                  }else{
                    this.flagX=2;
                  }
                  return;
                } else if (this.flagX == 1) {
                  event.preventDefault();
                } else {
                  return;
                }


                  if((this.obj.style.WebkitTransform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1==0){

                          if (this.endPos - this.startPos >= 0) {
                            this.obj.style.WebkitTransform = "translateX(" + 0 + "px)";
                          } else if (this.endPos - this.startPos < 0) {
                            var l = Math.abs(this.endPos - this.startPos);
                            this.obj.style.WebkitTransform = "translateX(" + -l + "px)";
                            if (l > 80) {
                              l = 80;
                              this.obj.style.WebkitTransform = "translateX(" + -l + "px)";
                            }
                          }
                }else if((this.obj.style.WebkitTransform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1 < 0){

                    if (this.endPos - this.startPos >= 0) {
                        var r = -80 + Math.abs(this.endPos - this.startPos);
                        this.obj.style.WebkitTransform = "translateX(" + r + "px)";
                        if (r > 0) {
                          r = 0;
                          this.obj.style.WebkitTransform = "translateX(" + r + "px)";
                        }
                      } else { //向左滑动
                        this.obj.style.WebkitTransform = "translateX(" + -80 + "px)";
                      }
                }
            },
            Ontouchend: function(a,i){
                  // event.preventDefault();
                  // var obj = document.querySelectorAll(".list-li")[i];
                  // if (obj.className == "list-li") {
                 var   objX = (this.obj.style.WebkitTransform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
                    if (objX > -40) {
                      this.obj.style.WebkitTransform = "translateX(" + 0 + "px)";
                      objX = 0;
                    } else {
                      this.obj.style.WebkitTransform = "translateX(" + -80 + "px)";
                      objX = -80;
                    // }
                  }
                  this.flagX=0;
            },
            deleteLi:function(a,i){
              // alert("删除数据")
              var that=this;
              this.obj.style.WebkitTransform = "translateX(" + 0 + "px)";

            this.$http.request({
						url: '/api/tangba/evaluation/deleteSaccharificationEvaluationHistory.action'+getUrlParams(),
						params: {
							  "evaluationId": a,
						},
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
          .then(function(msg){
            if(msg.data.success){
              that.historyList.commentList.splice(i,1);
              if(!that.historyList.commentList.length){
                 that.show=true;
              }
                // minTips("删除成功")
            }else{
              minTips("网络错误")
            }
          })
          .catch(function(err){
            minTips("网络错误")
          })

            },
      submit:function(){
        // this.$router.replace("/healthtest/close")
        // alert("huitui")
        // window.history.back();
        // this.$router.replace("/healthtest/close")
        this.$router.push({path:"/healthtest/close"+"?"+getUrlParams(),
          query:{
            reTest:1
            // noClose:1
          }
         })
        },
      getShowData:function(a,b){
        var  that=this;
        // this.$http.post('/api/tangba/evaluation/loadSaccharificationEvaluation.action',"user_id="+getUrlName("user_id"))
        this.$http.request({
						url: '/api/tangba/evaluation/getSaccharificationEvaluationHistory.action'+getUrlParams(),
						params: {
							  "pageNo": that.historyPage,
                "pageSize": that.historyNum
						},
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
          .then(function(msg){
            if(msg.data.success){
              // console.log(msg.data.data)
                 that.historyList.commentList=[...that.historyList.commentList,...msg.data.data];
                 if(that.historyList.commentList.length){
                    that.show=false;
                 }else{
                   that.show=true;
                 }
                 that.historyList.total=msg.data.total;
                //  console.log(that.historyList)
                if(that.historyList.commentList.length==that.historyList.total){
                     that.onlyOne=true;
                 }else{
                     that.onlyOne=false;
                 }

                localStorage.dataStore=JSON.stringify(that.historyList);
                // console.log(that.green)

            }else{
              minTips("网络错误")
              // alert(msg.data.alertMsg)
            }
          })
          .catch(function(err){
            minTips("网络错误")
          })
      },
      go:function(a){
                this.$router.push({path:"/historyDetail"+"?"+getUrlParams(),
          query:{
            evaluationId:a
          }
        })
      }
    },
    mounted:function(){
    },
    filters: {
       filtersTime:function(value,a){
         return value.replace(/\s+/g, "?").split("?")[a]
       }
    },
    created:function(){
      var that=this;
      var  c=localStorage.dataStore;
      if(c){
        that.dataStore=JSON.parse(c);
        if(that.dataStore.score>8){that.dataStore.red=true;}
        else if(that.dataStore.score>=4){that.dataStore.yellow=true;}
        else{that.dataStore.green=true;}
      }else{
        that.dataStore={};
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

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .artical{
    height: 100%;
    width: 100%;
    color: #1A1A1A;
    background-color: #f6f6f6;
    /* padding-bottom: 1.28rem; */

  }
 ul>li{
  /* width: 100%; */
  font-size: .4rem;
  color:#222222;
  border-top: 1px solid  #f6f6f6;
  /* box-sizing: border-box; */
  background-color: #ffffff;
  overflow-x: hidden;
  /* background-color: green; */
  /* padding: 0 .426667rem; */
}
 ul>li:first-child{
  border-top: none;
}
 .widthLi{
    margin-left: .426667rem;
    /* width: 3.333333rem; */
    height: 1.6rem;
 }
.fontDate{
  font-size: .346667rem;
  color: #666666;
}
.fontScore{
  font-size: .453333rem;
}
.enterImg{
  display: inline-block;
  /* height: .36rem;
  width: .36rem;
  margin: .093333rem;   */
  /* padding: 0 .08rem; */

    height: .36rem;
    width:  .2rem;
  /* height: 13px;
  width: 7px; */
  margin-left: .173333rem;
  /* height: 20px;
  width: 20px; */
  /* color: #999999; */
  /* font-size: .373333rem; */
}
.background_green{
          color: #17d6ad;
}
.background_yellow{
          color: #fbc80a;
}
.background_red{
          color: #ff5a96;
}
.deleteBtn::before{
  /* width: 1.333333rem; */
  content: '删除';
}
.deleteBtn{
  /* width: 1.333333rem; */
  color: white;
  background-color: #ff5a96;
  height: 1.6rem;
  line-height: 1.6rem;
  text-align: center;

}

.scrollBox{
  width:10rem;
  /* padding: 0 .426667rem; */
  /* border: 1px solid blue;
  box-sizing: border-box; */
}
.placeholderImg{
    display:block;
    height: 2.666667rem;
    width: 2.666667rem;

}
.noShow{
  display: none;
}

  /* 评论内容 */
  .list-ul {
    overflow: hidden;

  }

  .list-li {
    position: relative;
    width: calc(100% + 80px);
    transform: translateX(0px);
    -webkit-transform: translateX(0px);
  }

</style>



