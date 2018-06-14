<template>
   <div :class="['flex','flex-column',{hello:true,paddingBottom:isIphoneX}]" >
       <navheader :msg="{title:'我要举报',borderBottom:1,fullScreen:1}"></navheader>
       <div >
       <p class="reportTitle">请选择原因（可多选）</p>
       <ul >
       <li v-for="(item,i) in reportList" :key="i" >
          <label :for="'check'+i" class="flex flex-row">

               <input   type="checkbox" :id="'check'+i"    class="checkbox flex-items"   :key="i" @click="choose(i)">

           <p class="reportContentCss  flex-items" >{{item}}</p>
           </label>
       </li>

     </ul>

     </div>

           <div class="inputBox" @click="popInput">请输入您想要举报或纠错的内容</div>

        <summitBtn  @startMethod="report" :word="'举报'"  :content="reportContent"   class="btnsubmmit" v-if="showBtn"  v-cloak ></summitBtn>

  </div>



</template>

<script>

import navheader from "./appheadera.vue"
import summitBtn from "./button.vue"
import {getUrlParams,getNative,getUrlName,minTips} from '../../static/js/checkcode.js'
import {cancelNativePage,getAppVersion} from "../../static/js/test.js"
export default {
  name: 'hello',
  data:function() {
    return {
      msg: 'helloworld',
      placeHolder:"请输入您想要举报或纠错的内容",
      isIphoneX:false,
      isReport:false,
      reportContent:[],
      reportBox:'',
      reportList:["低俗色情","广告","标题党","老旧重复内容","有错别字","内容排版错误","其它"],
      screen:false,
      showBtn:true,
      showInput:false,
      inputContent:'',
      lastIsChosed:false,
      isImport:false,
      showColor:false,
      isActive:false
    }
  },
    components:{
    navheader,
    summitBtn
    },
  methods: {
        test1:function(){
      var that=this
      window.Rsend=function(a){
       that.inputContent=a;
       that.isImport=false;
      }
    },
    test2:function(){

      var that=this
      window.RcacheCont=function(a){
        // alert("修改reportBox")
       that.inputContent=a;
       that.isImport=false;
      }
    },
    report:function(){
              // app.native.nativesendReview({'type':"report",'parentId':that.parentId,'toUserId':that.toUserId,fun:function(a){
              //   that.reviewList.commentList.unshift(a.data);
              // }})
              if(!this.reportContent.length){return}
              if(this.report.onlyOne){return}
              this.report.onlyOne=true;
              var  allowPut=this.lastIsChosed&&this.reportBox.length!=0||!this.lastIsChosed&&this.reportBox.length==0;
                 if(!allowPut){
                     minTips("未选类型或内容为空");
                     this.report.onlyOne=false;
                 }else{
                  //  minTips("78989")
                             var  that=this;
          //      const url ='/api/tangba/circle/reportArticle.action'+getUrlParams();

          //     //  alert(getUrlName("user_id"))
          //       var params = new URLSearchParams();
          //       params.append('articleId',Number(getUrlName("articalID")));
          //       params.append('publisherId',Number(getUrlName("user_id")));
          //       params.append('reportType', JSON.stringify(that.reportContent));
          //       params.append('reason', JSON.stringify(that.reportBox));
          //       // alert(url);
          //       // alert(params)
      		// this.$http({
          //   method:"post",
					//      url: url,
          //     data:params,
          //     headers: {'Content-Type': 'application/x-www-form-urlencoded'}

          // })
          /*************************************************************************/
          // that.$http.request({
					// 	url: '/api/tangba/circle/reportArticle.action'+getUrlParams(),
					// 	params: {
          //     "articleId":Number(getUrlName("articalID")),
          //     "publisherId":Number(getUrlName("user_id")),
          //     "reportType":JSON.stringify(that.reportContent),
          //     "reason":JSON.stringify(that.reportBox)
          //   },
          //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          // })
          //     that.$http.post('/api/tangba/circle/reportArticle.action'+getUrlParams(),
          //     "articleId="+Number(getUrlName("articalID"))+
          //     "&publisherId="+Number(getUrlName("user_id"))+
          //     "&reportType="+that.reportContent.toString()+
          //     "&reason="+JSON.stringify(that.reportBox)
          // )

          that.$http.post( '/api/tangba/circle/reportArticle.action'+getUrlParams(),

              "&articleId="+getUrlName("articalID")+
              "&publisherId="+getUrlName("user_id")+
              "&reportType="+that.reportContent+
              "&reason="+that.reportBox
          )
          .then(function(msg){
            that.report.onlyOne=false;
            if(msg.data.success){
              //  minTips("举报成功");
               minTips("举报成功")
               setTimeout(function(){
                //  history.back();
                 that.$router.replace('/');
               },2600)

            }
             if(msg.data.code==11){
                 minTips("您举报的文章已删除")
                   setTimeout(function(){
                       app.native.cancelNativePage();
                   },2600)


             }
             if(msg.data.code==12){
               minTips("举报未成功,请重试")
             }
          })
          .catch(function(err){
            minTips("网络错误")
            that.report.onlyOne=false;
          })
                 }

    },
    popInput:function(){
              // if(this.isImport){return}
              // this.isImport=true;
              app.native.native_showkeyboard({type:2,length:255,placeholder:"请输入您想要举报或纠错的内容",text:this.reportBox,fun:function(){
              // alert("这是举报")
        }});
    },
        choose:function(a){
        var b=Number(this.reportContent.indexOf(this.reportList[a]));

        if(b!=-1){
          this.reportContent.splice(b,1)
          if(a==this.reportList.length-1){
            this.lastIsChosed=false;
          }
        }else{
          // if(a!=6||this.reportBox!="请输入您想要举报或纠错的内容"){
                 this.reportContent.push(this.reportList[a])
                 if(a==this.reportList.length-1){
                   this.lastIsChosed=true;
                  //  alert("最后一个选中了")
                 }
          // }

        }
            //  console.log(this.lastIsChosed)
    },


  },
    watch:{
    inputContent:function(){
        this.reportBox=this.inputContent;
        document.querySelector(".inputBox").innerHTML=this.reportBox;

        },
    reportBox:function(){
          //  alert(this.reportBox)
    }
  }
  ,
  created:function(){
               this.test1();
               this.test2();
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
  background-color: white;
}
.reportTitle{
  width: 100%;
  height: .84rem;
  background-color: #f6f6f6;
  color: #888888;
  font-size: .346667rem;
  line-height: .84rem;
  padding-left: .586667rem;

}
.reportContentCss {
  color: #222222;
  font-size: .426667rem;
}
ul {
  width: 100%;
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: white;
  padding: .733333rem 0 0;
  box-sizing: border-box;
  background-color: white;
}
li{
  height: 1.306667rem;
  line-height: 1.306667rem;
  width: 100%;
  font-size: .4rem;
  color: #9f9f9f;
}
label{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding:0 .586667rem;
}

.reportIcon{
  display: block;
  height: .373333rem;
  width: .373333rem;
}
.inputBox{
  display: block;
  width: 8.84rem;
  height: 2.693333rem;
  overflow-y: scroll;
  -webkit-overflow-scrolling:touch;
  border: 1px solid #f6f6f6;
  background-color: #f6f6f6;
  padding: .36rem .426667rem;
  margin:0 auto .666667rem;
  color: #b6b6b6;
  font-size: .32rem;
  box-sizing: border-box;

}
.reportBtn{
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
}
input:checked{
   background: url("./../assets/img/Reportchosen.png") no-repeat center center;
  background-size: 100% 100%;
}

.checkbox{
  border: 1px solid rgba(0,0,0,0);
  height: .426667rem;
  width: .426667rem;
  background: url("./../assets/img/Reportunchosen.png") no-repeat center center;
  background-size: 100% 100%;
  margin-right: .2rem;
  margin-top: .46rem;
}
.screen{
  background-color:rgba(0,0,0,0.3);
  position: absolute;
  z-index:3000;
  left: 0 ;right: 0;
  opacity: 0;
}

.btnsubmmit{
    margin-bottom: .8rem;
}
.bottomDown{
  bottom: 2.666667rem;
}
.bottomUp{
  bottom: 0px;
}
.unshowBox{
  opacity: 0;
}
.showBox{
  opacity: 1;
}
</style>
