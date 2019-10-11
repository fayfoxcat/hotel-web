//导入vue及router路由
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


//引入axios传值
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$axios = axios;
//设置跨域session失效问题
axios.defaults.withCredentials = true
Vue.prototype.$qs = qs;

//引入bootstrap样式及其图标库
import 'bootstrap/dist/css/bootstrap.css'
import 'open-iconic/font/css/open-iconic-bootstrap.css'

//本地引入MUI
import '@/assets/mui/css/mui.min.css'


//导入Mint——UI
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

//导入vant-UI
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  data:{
  },
  render: h => h(App)
}).$mount('#app')
