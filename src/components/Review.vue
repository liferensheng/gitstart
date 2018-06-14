<template>
   <div  class="contentBox flex flex-column space-between"   v-cloak >
          <!-- <div class="report " style="text-align:right;" @click="goNative">
       <span class="reportIcon " style="display:inline-block;vertical-align: text-bottom;"></span>
       <span style="font-size: .293333rem;height:100%;line-height: 1.573333rem;color:#999999;">举报</span>
     </div> -->
               <div class=" flex flex-row  flex-items titleBox">
                <div class=" flex flex-row flex-items  tagBox" >
                        <img src="static/img/tag.png" class="reportTag" alt="">
                        <span style="display:block;">{{title||"健康知识"}}</span>
                 </div>
                 <div class="flex1"></div>
                 <div class="flex flex flex-row flex-items  reportTitle"  @click="goNative">
                        <img src="static/img/Reviewreport.png" class="reportIcon" alt="">
                        <span style="font-size: .293333rem;display:block;">举报</span>
                 </div>

     </div>

        <p class="reviewTitle">
         评论（{{getList.count}}）
       </p>
     <ul class="reviewContentBox" v-if="getList.count" @scroll="loading($event)">

       <li v-for="(item,i) in getList.commentList" :key="i" class="flex flex-row space-between " :id="'box'+item.commentId" >
         <div class="flex  flex-row flex-start flex1" style="width:6.666667rem;">
                     <img :src="item.headImg?item.headImg:'https://apibbs.bianla.cn/page/api/project/img/photsboy.png'" alt=""  class="userPhoto">
                      <div class=" reviewBox ">
                        <p style="height: .426667rem;line-height: .426667rem;">{{item.commentName}}</p>
                        <p style="height: .373333rem;line-height: .373333rem;color:#8e8e8e;font-size: .266667rem;">{{item.created}}</p>
                        <p style="line-height: .48rem;font-size: .373333rem;margin-top:.226667rem;margin-bottom: 0.533333rem;word-break: break-all;" v-if="!item.commentType">{{item.comment}}</p>
                        <p style="line-height: .48rem;font-size: .373333rem;margin-top:.226667rem;margin-bottom: 0.533333rem;word-break: break-all;" v-else >回复<span style="color:#3296fa;">{{item.toUserName}}</span>:{{item.comment}}</p>
                      </div>
         </div>
          <div class="answer " style="width: 1.4rem;text-align:right;" @click="getFocus({key:i,commentId:item.commentId,userId:item.userId,toUserName:item.commentName})">

            <span class="answerIcon" style=""></span>
            <span style="font-size: .293333rem;">回复</span>
          </div>


       </li>


     </ul>
            <div class="replceBox" v-else  @click="getFocus({key:0,commentId:0,userId:'',toUserName:''})">
               <img src="./../assets/img/Reviewmessage.png" alt="" class="replaceImg">
               <p  style="height: .88rem;font-size: .32rem;color: #888888;line-height: .88rem;">成为第一个评论的人吧~</p>
       </div>
       <!-- <div class="inputField">
               <input type="text" v-model="placeHolder" @focus="placeHolder=''"  @blur="change" @click="iosFocus"  class="inputBox" maxlength="140">
               <span @click="sendReview(commentId,userId)" :class="{inputBtn:true,fontColor:changeColor,defaultColor:!changeColor}">发送</span>
       </div> -->

  </div>

</template>

<script>
import {getUrlParams,getNative,getUrlName,minTips} from '../../static/js/checkcode.js'
export default {
  // name: 'hello',
  props:['getList','title'],
  data:function() {
    return {
      msg: 'helloworld',
      placeHolder:"我要点评...",
      reviewNum:13,
      object:'自己',
      key:false,
      reportBox:'',
      reviewPage:1,
      reviewNum:10,
      onlyOne:1,
      height:0,
      changeColor:false,
      operationType:0,
      commentId:0,
      userId:0,
      p:{
        articleId:0,
        publisherId:0
      }
    }
  },
  methods:{
          getFocus:function(toUserId){
       this.$root.$emit("answer",toUserId)
    },
    goNative:function(){
      // alert(123)
        this.p.articleId=getUrlName("articalID");this.p.publisherId=getUrlName("user_id");
        // console.log(this.p)

        var d=getUrlName("noClose");
        var version=getUrlName("injectAppVersion");
        // console.log(window.injectAppVersion)
        var a=version&&version.toString() >= '1.2.2';

        //  alert()
        //  alert(d)
        //  alert(version&&version.toString() >= '1.2.2')
        if(a||d){

                app.native.native_pushReport(this.p)
        }else{

          this.$router.push("/report");
        }

    },
    todo:function(){
      // document.querySelector("#box73").scrollIntoView(false);
    },
    scrollHeight:function () {

              // if(getUrlName("commentID")!=undefined){//通过直接对方法操作，执行延迟逻辑
              //   var  k=document.getElementById("box"+getUrlName("commentID"));
              //     document.querySelector(".newOne").scrollTop=k.offsetTop - k.clientHeight - 200;
              // }


    }
  },
  mounted:function(){
         // this.scrollHeight();
  },
  created:function(){
         // this.scrollHeight();
    // document.querySelector(".reviewTitle").innerHTML="获取到getlist";
    if(/iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)){
      this.isIphoneX=true;
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contentBox{
  /* height: 100%; */
  flex: 1;
}
.report{
  height: 1.44rem;
  flex: none;
  line-height: 1.573333rem;
  font-size: .266667rem;
  width: 100%;
  padding: 0  .44rem;
  border-bottom: .266667rem solid #f2f2f2;
  box-sizing: border-box;
 /* margin-top: -.4rem; */
  background-color: white;
}

.reviewContentBox{
  /* height: 500px; */
  flex: 1;
  width: 100%;
  list-style-type: none;
  padding: 0;
  padding-left:.346667rem;
  margin: 0;
  background-color: white;
  box-sizing: border-box;
      overflow-y: scroll;
    -webkit-overflow-scrolling:touch;
    background-color: white;
    color: #8e8e8e;
}
li {
  width: 100%;
  /* height:2.533333rem ; */
  min-height: 2.533333rem ;
  /* line-height:2.533333rem ; */
  padding-right:.44rem;
  border-bottom: 1px solid #f2f2f2;
  box-sizing: border-box;

}
li:last-child{
  border-bottom: none;
}

.userPhoto{
  display: block;
  height: .973333rem;
  width: .973333rem;
  border-radius: 50%;
  margin-top: .4rem;
}
.reportTag{
  /* display: inline-block; */
  height: .413333rem;
  width: .466667rem;
  /* background: url('./../../static/img/tag.png') no-repeat center center;
  background-size: 100% 100%;
  margin-top: .56rem; */
  margin-right: .133333rem;
}
.reportIcon{
  height: .453333rem;
  width: .346667rem;
  /* background: url('./../assets/img/Reviewreport.png') no-repeat center center; */
  /* background-size: 100% 100%; */
  /* margin-top: .56rem;*/
  margin-right: .16rem;
}
.reviewTitle{
  height: 1.253333rem;
  line-height: 1.52rem;
  width: 100%;
  text-align: left;
  font-size: .373333rem;
  padding: 0 .44rem;
  border-bottom: 1px solid #dcdcdc;
  box-sizing: border-box;
  background-color: white;
}
.reviewBox{
  margin-top: .533333rem;
  font-size: .32rem;
  color: #1a1a1a;
  margin-left: .426667rem;
  width: 6.533333rem;
}
.answer{
  width:1.333333rem;
  color: #999999;


}
.answerIcon{
  display: inline-block;
  width: .41rem;
  height: .4rem;
  background: url('./../assets/img/Reviewnews.png') no-repeat center center;
  background-size: 100% 100%;
  margin-right: .16rem;
  margin-top:.4rem;
  color: #6b6b6b;
  vertical-align: text-bottom;
  /* background-color: #6b6b6b; */
}

/* textarea{
  height: ;
} */
.replceBox{
  height: 4.52rem;
  width: 100%;
  text-align: center;
  padding-top:  .773333rem;
}
.replaceImg{
  display: block;
  height:1.173333rem ;
  width: 1.6rem;
  margin: 0 auto;
  /* margin-top: .773333rem; */
}
.titleBox{
  background-color: #ffffff;
  padding: 0 .306667rem  .533333rem;
  margin-bottom: .266667rem;
}
.tagBox{
  /* width: 2.266667rem; */
  height: .586667rem;
  line-height: .586667rem;
  border-radius: .293333rem;
  border: 1px solid #3296fa;
  box-sizing: border-box;
  font-size: .32rem;
  margin-left: .146667rem;
  padding-left: .12rem;
  padding-right: .186667rem;
  color: #3296fa;
}
.reportTitle{
  height: .586667rem;
}

</style>
