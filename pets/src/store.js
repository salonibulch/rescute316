import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

//initiate Vuex
Vue.use(Vuex);

export const store = new Vuex.Store({
    //all data stored in state
    state:{
        currentUser: {
            loggedIn: false,
            data: null
          }
    },
    mutations: {
        //set currentUser and userImgUrl, called when page is refreshed
        SET_LOGGED_IN(state, value) {
            state.currentUser.loggedIn = value;
        },
        SET_USER(state, data) {
            state.currentUser.data = data;
        }
    },
    //get the currentUser
    getters: {
        getUser: (state) => {
            return state.currentUser;
        }
    },

    actions: {
        fetchUser({ commit }, currentUser) {
          commit("SET_LOGGED_IN", currentUser !== null);
          if (currentUser) {
            commit("SET_USER", {
              displayName: currentUser.displayName,
              email: currentUser.email
            });
          } else {
            commit("SET_USER", null);
          }
        }
      }
});
