import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/compat'
Vue.use(Vuex)
class User {
  constructor ( email, password, id = null) {
    this.id = id
    this.email = email
    this.password = password
  }
}
export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    updatePassword (state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registerUser ({commit}, {email, password}) {
     const user = new User(email, password)
     const savedUser = await firebase.database().ref('users').push(user)
      commit('setUser', {
        ...user,
        id: savedUser.key
      })
    },
    async loginUser ({commit}, {email, password}) {
      const user = await firebase.auth().signInWithEmailAndPassword(email, password)
      commit('setUser', new User(user.user.uid))
    },
    async updatePassword ({commit}, {id, email, password}) {
       await firebase.database().ref('users').child(id).update({
         email, password
      })
      // child('users').child(id).child('name').set('Jon Snow')
      const user = new User(id)
      user.email = email
      user.password = password
      commit('updatePassword', user)
    },
    async getUserData ({ commit }, payload) {
      const fbvalue = await firebase.database().ref('users').once('value')
      const users = fbvalue.val()
      Object.keys(users).forEach(key => {
        const user = users[key]
        if (user.email === payload.email) {
          commit('setUser', new User(user.email, user.password, key))
        }
      })
    },
  },
  getters: {
    user (state) {
      return state.user
    }
  }
})
