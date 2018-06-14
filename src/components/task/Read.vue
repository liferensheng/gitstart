<template>
  <div :class="['artical','flex','flex-column','space-between',{paddingBottomNew:isActive} ]">
    <!-- 头部  -->
     <navheader   style="position:fixed;color:rgba(255,255,255,0)"  :class="{active:isShow,active1:isShow1}" :msg="{title1:taskTitle[codeParams-1],logo:false,showWord:true,title2:'添加',backImgUrl:'static/img/back1.png',fontColor:1,codeParams:codeParams,isFinish:isFinish}" ></navheader>
     <div   :class="['artical_section','flex','scroll','flex-column',{borderBottom:isActive}]">
      <div class="newOne scroll" style="height: 100%;" @scroll="scrolla($event)">
        <div class="artical_banner relative ">
          <img :src="'static/img/renwu'+codeParams+'.png'" alt=""/>
        </div>
        <div class="wangEditor-container" style="width:100%;overflow:hidden;">
          <div v-if="codeParams==6" id="editor-trigger" class="wangEditor-txt" contenteditable="false" style="width:100%;overflow-x:hidden;"
               v-html="articalContent">
          </div>
          <div v-if="codeParams!=6" contenteditable="false" style="width:100%;overflow-x:hidden;" class="textBox">
            <div class="taskMain" v-for="(list,index) in tasksInfo" :key="index" v-if="list.completeCode==codeParams">
              <h3 class="title">{{list.title}}</h3>
              <!-- 有数字的 -->
              <ol class="taskInfo" v-if="list.content.isSerial==true">
                <li class="taskList2" v-for="(items,index) in list.content.paragraph" :key="index">{{items.content}}</li>
              </ol>
              <!-- 没有数字和小贴士的 -->
              <ul class="taskInfo"  v-if="list.content.isSerial==false">
                <li class="taskList" v-for="(items,index) in list.content.paragraph" :key="index">
                  <h4 v-if="items.title">{{items.title}}</h4>
                  <p :class="items.title?'':'active12'">{{items.content}}</p>
                </li>
              </ul>
              <!-- 有任务小贴士的任务 -->
              <ul class="taskInfo" v-if="codeParams==2">
                <li style="height:1.066667rem;line-height:1.066667rem;text-align: left;margin: 0 auto;font-size: .373333rem;color:#222222;"  ><img src="static/img/bulb.png" style="display: inline-block;width:.306667rem;height: .36rem; margin-right:.2rem;vertical-align: text-top;" alt="" > {{list.content.explain.title}}</li>
                <li class="taskList1" v-for="(items,index) in list.content.explain.paragraph" :key="index"><span style=" display: inline-block;width: 1.6rem;margin-top: .173333rem;">{{items.content | filtersTime(0)}}</span>{{items.content | filtersTime(1)}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="buttonBox" v-if="isFinish==0?true:false">
          <summitBtn   @startMethod="maskBox"  style="padding:.853333rem auto .8rem;"  :word="buttomMsg[codeParams-1]"  :content="[1,2]"></summitBtn>
        </div>
      </div>
    </div>
     <div class="mask" v-if="maskShow">
        <div class="maskMian">
          <div class="taxkOk">任务完成</div>
          <div class="maskTitle">多吃水果有利于身体健康</div>
          <div class="goBotton" @click="goTaskList()">继续做任务</div>
          <div class="leaveBotton" @click="close()">留在当前页面</div>
        </div>
     </div>
  </div>
</template>
<script>
import summitBtn from "../button.vue";
import {
  getUrlParams,
  getNative,
  getUrlName,
  minTips,
  windowHeight
} from "../../../static/js/checkcode.js";
import "./../../assets/css/artical.css";
import navheader from "../appheaderb.vue";
export default {
  name: "artical",
  data() {
    return {
      backImgUrl: "static/img/backnew.png",
      readArtical: {},
      artical_img: "",
      isActive: false,
      isIos: false,
      articalContent: "",
      detaily: false,
      reviewList: { commentList: [], count: 0 },
      isShow: false, //头部标题和顶部图片是否显示
      isShow1: false, //头部标题和顶部图片是否显示
      maskShow: false, //遮罩层隐藏
      isCall: true,
      codeParams: -1, //任务CODE
      onlyOne: false,
      tasksInfo: "", //当前任务的信息
      taskTitle: [
        "完善基本健康资料",
        "糖化水平表现评测",
        "尿酮",
        "糖化血红蛋白",
        "每日测血糖",
        "每日一读",
        "每日看数据",
        "提醒测量血糖"
      ], //头部标题
      buttomMsg: [
        "完善基本健康资料",
        "完成糖化水平表现评测",
        "添加尿酮",
        "添加糖化血红蛋白",
        "测血糖",
        "我了解了",
        "去查看",
        "去提醒"
      ], //按钮文字
      isFinish: 0 ,//是否完成任务
      readFinish:true
    };
  },
  components: {
    navheader,
    summitBtn
  },
  methods: {
    // 获取文章内容
    axiosArtical: function(self) {
      if (localStorage.readArtical) {
        this.readArtical = JSON.parse(localStorage.getItem("readArtical"));
      }
      axiosA(self);
      function axiosA(self) {
        if (axiosA.detaily) {
          return;
        }
        axiosA.detaily = true;
        self.$http
          .request({
            url: "/api/tangba/circle/loadArticleDetail.action" + getUrlParams(),
            params: {
              id: self.$route.query.articleId
            },
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
          })
          .then(function(msg) {
            axiosA.detaily = false;
            self.readArtical = msg.data.data;
            self.artical_img = msg.data.data.img_url;
            self.articalContent = msg.data.data.content;
            self.loadingColor = msg.data.data.isThumbs;

            localStorage.setItem("readArtical", JSON.stringify(msg.data.data));
          })
          .catch(function(err) {
            minTips("网络错误");
          });
      }
    },
    //获取任务详情
    taskMessage: function(self) {
      //请求次数限制
      if (self.onlyOne) {
        return;
      }
      self.onlyOne = true;
      self.$http
        .get("api/tangba/workCard/allWorkCardListMeg.action" + getUrlParams())
        .then(function(msg) {
          if ((msg.data.code = 10)) {
            self.onlyOne = false;
            self.tasksInfo = msg.data.data.tasks;
            localStorage.setItem("tasksMain", JSON.stringify(self.tasksInfo));
            console.log(self.isFinish)
          }
        })
        .catch(function(err) {
          minTips("网络错误");
        });  
    },
    //判断获取文章内容还是获取任务详情
    code: function() {
      if (this.codeParams == 6) {
        this.axiosArtical(this);
      } else {
        this.taskMessage(this);
      }
    },

    backPre: function() {
      app.native.cancelNativePage();
    },
    //底部按钮
    maskBox: function() {
      if (this.codeParams == 6) {
        let self = this;
        axiosA(self);
        function axiosA(self) {
          if (axiosA.detaily) {
            return;
          }
          axiosA.detaily = true;
          self.$http
            .request({
              url: "/api/tangba/workCard/completeTask.action" + getUrlParams(),
              params: {
                taskCode: self.codeParams
              },
              headers: { "Content-Type": "application/x-www-form-urlencoded" }
            })
            .then(function(msg) {
              if (msg.data.success) {
                self.maskShow = true;
                self.isFinish=1;
                app.native.native_completeTask(msg.data.data);
              }
            })
            .catch(function(err) {
              minTips("网络错误");
            });
        }
      } else if (this.codeParams == 2) {
        if (this.isFinish == 0) {
          this.$router.replace({
            path: "/healthtest/close" + "?" + location.href.split("?")[1],
            query: {
              completeCode: this.codeParams,
              isFinish: this.isFinish,
              reTest: 1,
              isTask: 1
            }
          });
        } else {
          this.$router.replace({
            path: "/healthtest/close" + "?" + location.href.split("?")[1]
          });
        }
      } else if (this.codeParams !== 6 || this.codeParams !== 2) {
        app.native.native_goToTaskDetail(
          this.codeParams,
          this.$route.query.taskId
        );
      }
    },
    //关闭弹框
    close() {
      this.maskShow = false;
    },
    //跳转到任务列表
    goTaskList() {
      console.log(getUrlParams());
      this.$router.replace("/taskList/close" + getUrlParams());
    },
    //滚动判断顶部导航是否出现
    scrolla: function(a) {
      if (this.isWx) {
        return;
      }
      var that = this;
      // 导航优化
      that.cacheHeight = a.target.scrollTop;
      that.height =
        a.target.scrollHeight - a.target.scrollTop - a.target.clientHeight;
      if (that.cacheHeight > 100 && that.isCall) {
        that.isShow = true;
        that.isShow1 = false;
        that.isCall = false;
        return;
      }
      if (that.cacheHeight < 100 && !that.isCall) {
        that.isShow1 = true;
        that.isShow = false;
        that.isCall = true;
        return;
      }
    },
    test: function() {
      var that = this;
      window.updateTaskPage = function() {
        that.maskShow = true;
        that.isFinish = 1;
      };
    }
  },
  //过滤器
  filters: {
    filtersTime: function(value, a) {
      return value.replace(/\s+/g, "?").split("?")[a];
    }
  },
  mounted: function() {
    window.addEventListener("scroll", this.scrolla);
  },
  created: function() {
    // if (localStorage.getItem("tasksMain")) {
    //   this.tasksInfo = JSON.parse(localStorage.getItem("tasksMain"));
    // }
    console.log(this.$phoneType);
    this.isActive = this.$phoneType == 3 ? true : false;
    this.isIos = this.$phoneType == 2 ? true : false;
    this.isAndroid = this.$phoneType == 1 ? true : false;
    console.log(this.isActive, this.isIos, this.isAndroid);
    this.codeParams = this.$route.query.completeCode; //任务code
    this.isFinish = this.$route.query.isFinish; //是否完成任务
    console.log(this.isFinish)
    this.code();
    this.test();
  }
};
</script>
<style scoped type="text/css" lang="sass">
     @import "./taskRead.scss"
</style>

