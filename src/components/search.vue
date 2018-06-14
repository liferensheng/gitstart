<template>
      <div @click="reporta" style="height:100%;width:100%;border:1px solid black;box-sizing:border-box; background: url('static/img/guidelist104.jpg')  no-repeat center center;
  background-size: 100%  100%;background:#000;color:white;">
  这是啥，看不明白
<!-- <mt-loadmore :top-method="loadTop"  ref="loadmore" style="height:100%;" :top-status.sync="topStatus" >
  <ul>
    <li v-for="item in 50" :key="item" style="text-align:center;">{{ item }}</li>
  </ul> -->
  <!-- <div slot="top" class="mint-loadmore-top">
    <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
    <span v-show="topStatus === 'loading'">Loading...</span>
  </div> -->
    <!-- <p style="height:100px;width:100%;border:1px solid red;box-sizing:border-box;">哎哎哎</p> -->
<!-- <mt-search
  v-model="valuea"
  cancel-text="发送"
  placeholder="评论" style="display:block;position:absolute;bottom:0;width:100%;">
</mt-search> -->
  <!-- <div slot="top" class="mint-loadmore-top">
    <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">加载中...</span>
    <span v-show="topStatus === 'loading'">加载中...</span>
  </div> -->
<!-- </mt-loadmore> -->
         <input type="text" style="position:absolute;bottom:40px;display:block;height:80px;width:100%;background:red;" @focus="funa">
       </div>

</template>
<script>
import {getUrlParams,getNative,getUrlName} from '../../static/js/checkcode.js'
// import bottomInputHack from '../../static/js/bottomInputHack.js'
	export default{
    props:["word",'content'],
    data:function(){
      return{
          valuea:'',
          topStatus:false
      }
    },
    methods:{
         funa:function(){
          //  console.log(bottomInputHack)
            //  bottomInputHack.init(navigator.userAgent,this).focus();
         },
         reporta:function(){
          //  this.$emit('startMethod')
         },
         loadTop:function() {
                this.$refs.loadmore.onTopLoaded();
              },
         loadBottom:function() {
          this.$refs.loadmore.onBottomLoaded();
             }
            //  ,
        //  allLoaded:function() {
          // this.$refs.loadmore.onBottomLoaded();
// }
    }
  }
</script>
<style scoped>
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

.screen{
  background-color:rgba(0,0,0,0.3);
  position: absolute;
  z-index:3000;
  left: 0 ;right: 0;
  opacity: 0;
}

input[type="button"]:active{
      opacity: 1;
      background-color:rgba(0,0,0,0.3);
}
input[type="button"]:visited{
  opacity: 0;
}

</style>
