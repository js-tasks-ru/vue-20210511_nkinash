import Vue from './vendor/vue.esm.browser.js';

new Vue({
  data() {
    return {
      count: 0,
    };
  },

  methods: {
    increment() {
      this.count += 1;
    },
  },
}).$mount('#app');
