// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./style/public.less"
import "./style/base.less"
import "./style/fujihangBase.less"
import http from './api/http'
import Vant from 'vant';
import 'vant/lib/index.css';
import Vui from './api/Vui'
import vueX from './api/vueX'
import VRFCT from './api/VRFCT'
import cookie from './api/cookie'
Vue.use(Vant);
Vue.use(http)
Vue.use(Vui)
Vue.use(vueX)
Vue.use(cookie)
Vue.use(VRFCT)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
