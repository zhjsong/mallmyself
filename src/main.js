// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import '@/assets/css/index.css'
import MyHttpServer from '@/plugins/http.js'
import moment from 'moment'
import myBread from '@/components/common/myBread.vue'

Vue.use(ElementUI)
Vue.use(MyHttpServer)
Vue.config.productionTip = false
// 设置一个全局的Vue组件
   Vue.component(myBread.name,myBread)

// 给时间转变一下格式
Vue.filter('fmtdata',(v)=>{
   return moment(v).format('YYYY-MM-DD')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
