import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated:false,
    user:{}
  },
  getters:{
    isAuthenticated: state=>state.isAuthenticated,
    user: state=>state.user
  },
  mutations: {
    setisAuthenticated(state,is){
      state.isAuthenticated=is
    },
    setUser(state,user){
      state.user=user
    },
    clearState(state){
      state.user={}
      state.isAuthenticated=false
    }
  },
  actions: {
  },

})
