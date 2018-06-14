<template>
  <div :class="['artical','flex','flex-column',{paddingBottomNew:isActive} ]">
    <!--头部-->
    <navheader  :msg="{title1:'任务卡',logo:false,showWord:true,title2:'添加',shareImgUrl:'',backImgUrl:'static/img/newback.png',}"  style="background-color:#3296fa;" ></navheader>
    <div class="contain  scroll flex1"  v-if="pressShow">
        <!--任务进度-->
        <div class="task">
          <div class="taskText flex space-between">
            <strong class="text">今日任务完成进度</strong>
            <div class="progressNub">
              <span>{{taskInfo.completeTask}}</span><span>/</span><span>{{taskInfo.allTask}}</span>
            </div>
          </div>
          <ul class="taskProgress flex  flex-row ">
            <li v-for= " i  in taskInfo.allTask" :key="i" :class="['item','flex1',{itemColor:i<(taskInfo.completeTask+1)}]"></li>
          </ul>
        </div>
        <!--任务内容-->
        <div class="taskMian flex1" >
          <ul class="taskBox  flex1">
            <li class="tasklist" v-for="(items,index) in taskInfo.tasks" :key="index" @click="go(items.completeCode,items.isFinish,items.id)" v-if="(items.isTady==true&&items.isNewTaskCompletion==1)||items.isNewTaskCompletion==0">
              <div class="listTop flex">
                <div class="info" :class="items.isFinish==1?'finish':''">{{items.title}}</div>
                <div class="newTask" v-if="items.isNewTaskCompletion==1">新手任务</div>
              </div>
              <p v-if="items.isNewTaskCompletion==1">{{items.text}}</p>
              <p  v-if="items.isNewTaskCompletion==0&&!items.rule">已坚持 <span>{{items.completeTimes}}</span> 天</p>
              <p  v-if="items.rule">{{items.rule}}</p>
              <div class="complete" v-if="items.isFinish==1">
                <img src="../../assets/img/renwuka_yiwancheng_icon 2@3x.png" alt="">
              </div>
            </li>
          </ul>
        </div>
       </div>
      <!-- <div class="failBox flex1 contain"   v-if="!pressShow">
          <div class="failImg">
            <img src="../../assets/img/fail.png" alt="">
          </div>
          <div class="failText">
            任务获取失败，请<span>重新加载</span>
          </div>
      </div> -->
  </div>
</template>
<script>
import {
  getUrlParams,
  getNative,
  getUrlName,
  minTips,
  windowHeight
} from "../../../static/js/checkcode.js";
import "./../../assets/css/artical.css";
import navheader from "../appheaderb.vue";
// import app from '../../../static/js/app.js'
export default {
  name: "artical",
  data() {
    return {
      mask_imgUrl: "static/img/nav.png",
      backImgUrl: "static/img/back.png",
      shareImgUrl: "static/img/share.png",
      articalData: {},
      change: false,
      isShow: true,
      taskInfo: "",
      pressShow: false,
      taskLists:""
    };
  },
  components: {
    navheader
  },
  methods: {
    backPre: function() {
      app.native.cancelNativePage();
    },
    //获取任务列表
    taskList() {
      var that = this;
      this.$http
        .get("api/tangba/workCard/allWorkCardListMeg.action" + getUrlParams())
        .then(msg=> {
          if(msg.data.code==10){
            this.pressShow = true;
            this.taskInfo=msg.data.data
            console.log(JSON.stringify(this.taskInfo))
            this.taskLists=this.taskInfo.tasks.map(v=>{
                v.isTady=this.timestampToTime(v.taskTime)
                return v
            })
            localStorage.setItem("taskInfo", JSON.stringify(msg.data.data));
          }
        })
        .catch(function(err) {
          minTips("网络错误");
        });
    },

    //任务跳转
    go: function(completeCode, isFinish, id) {
      this.$router.replace({
        path: "/taskRead/close" + "?" + location.href.split("?")[1],
        query: {
          articleId: this.taskInfo.randomArticleId,
          completeCode: completeCode,
          isFinish: isFinish,
        }
      });
    },
    //时间戳转化时间
    timestampToTime:function(timestamp) {

        let Y,M,D
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1) + '-';
        D = date.getDate() ;
        let oldTime=Y+M+D;

        var  myDate = new Date(getUrlName("timestamp")*1000);
        let newY,newM,newD
        newY = myDate.getFullYear() + '-';
        newM=(myDate.getMonth()+1) + '-';
        newD=myDate.getDate();
        let nowTime=newY+newM+newD;
        if(oldTime==nowTime) {
          return true
        }else if(oldTime=='1970-1-1'){
          return true
        }else{
          return false
        }
    }
  },
  created: function() {
    if(localStorage.getItem("taskInfo")){
        this.pressShow = true;
        this.taskInfo = JSON.parse(localStorage.getItem("taskInfo"));
      }
    this.taskList();
    console.log(this.$phoneType);
    this.isActive = this.$phoneType == 3 ? true : false;
    this.isIos = this.$phoneType == 2 ? true : false;
    this.isAndroid = this.$phoneType == 1 ? true : false;
    console.log(this.isActive, this.isIos, this.isAndroid);
  }
};
</script>

<style scoped type="text/css" lang="sass">
   @import "./taskList.scss"
</style>
