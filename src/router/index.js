import Vue from 'vue'
import Router from 'vue-router'
import Artical from '@/components/Artical'
import Website from '@/components/Website'
import Guidedetail from '@/components/Guidedetail'
import Firstpage  from '@/components/Firstpage'
import Guidelist from '@/components/Guidelist'
import Longpic from '@/components/Longpic'
import Review from '@/components/Review'
import Report from '@/components/Report'
import search from '@/components/search'
import HealthTest from '@/components/HealthTest'
import HistoryList from '@/components/HistoryList'
import HistoryDetail from '@/components/HistoryDetail'
import HealthResult from '@/components/HealthResult'
// import HistoryDetail  from '@/components/HistoryDetail'
// import HistoryList from '@/components/HistoryList'
import SugarGuide from  '@/components/SugarGuide'
//任务卡
import TaskList from '@/components/task/taskList.vue'
import Read from '@/components/task/Read.vue'
Vue.use(Router)

export default new Router({
//	mode: 'history',
  routes: [
    {

      path: '/',
      name: 'Artical',
      component: Artical
    },
    // {

    //   path: '/',
    //   name: 'search',
    //   component: search
    // },
    {

      path: '/website',
      name: 'Website',
      component: Website
    },
    {
      path: '/guidedetail',
      name: 'Guidedetail',
      component: Guidedetail
    },
    {
      path: '/guidelist/close',
      name: 'Guidelist',
      component: Guidelist
    },
      {

        path: '/longpic',
        name: 'Longpic',
        component: Longpic
      },
      {
        path: '/firstpage/close',
        name: 'Firstpage',
        component: Firstpage
      },
      {
        path: '/review',
        name: 'Review',
        component: Review
      },
      {

        path: '/report',
        name: 'Report',
        component: Report
      },
      {
        path: '/healthtest/close',
        name: 'HealthTest',
        component: HealthTest
      },
      {
        path: '/healthresult',
        name: 'HealthResult',
        component: HealthResult
      },
      {
        path: '/healthresult/close',
        name: 'HealthResult',
        component: HealthResult
      },
    {
      path: '/historyList/close',
      name: 'HistoryList',
      component: HistoryList
    },
    {
      path: '/historyDetail',
      name: 'HistoryDetail',
      component: HistoryDetail
    },
    {
      path: '/sugarGuide',
      name: 'SugarGuide',
      component: SugarGuide
    },
    //任务列表
    {
      path:'/taskList/close',
      name:'taskList',
      component: TaskList
    },
    //每日一读
    {
      path:"/taskRead/close",
      name:"read",
      component: Read
    },



  ]
  // ,
  // mode:'history'
})
