import Vue from 'vue';
import './style.scss';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import routes from './util/routes';
const router = new VueRouter({ routes });

import Tooltip from './util/tooltip';
Vue.use(Tooltip);


//use api service to connect to film server
import api from './util/videoService.js';


new Vue({
  el: '#app',
  data: {
    movies: [],
  },
  created() {
    // this.$http.get('/api').then(response => {
    //   this.movies = response.data;
    // });
    api.getAllFilm().then(response => {
      this.movies = response;
    })
  },
  router
});
