import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import postModal from './modules/postModal';
import posts from './modules/posts';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: [
    auth,
    postModal,
    posts
  ]
})

export default store;