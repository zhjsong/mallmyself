// vue开发插件
import axios from 'axios'
import Vue from 'vue'

const MyHttpServer = {}
MyHttpServer.install = function (vue) {
  // 统一配置接口文档地址
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  Vue.prototype.$http = axios
}
export default MyHttpServer
