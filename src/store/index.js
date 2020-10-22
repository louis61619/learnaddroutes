import Vue from 'vue'
import Vuex from 'vuex'


//1.安裝插件
Vue.use(Vuex)

//2.創建對象
const state = {
  lolstate: true,
  error: 0
}

const store = new Vuex.Store({
  state,
  mutations: {
    adderror(state, payload) {
      state.lolstate = payload
    }
  },
  actions: {
    goPeace(context, payload) {
      context.state.error = 0
      setTimeout(() => {
        if(context.state.error === 0) {
          context.commit('adderror', true)
        }
      },3000)
    },
    geterror(context, payload) {

      context.state.error ++
      setTimeout(() => {
        if(context.state.error !== 0) {
          context.commit('adderror', false)
        }
        
      },3000) 
    }
  }

})

export default store