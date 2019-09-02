import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        name:'',  //修改名字
        phone:'',  //修改手机号
    }
 });

const install=()=>{
    Vue.prototype.store=store
}

export default install