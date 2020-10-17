import Vue from './vue.esm.browser.js';

const app = new Vue({
  el: '#app',
  data() {
    return {
      number: 0,
    };
  },
  methods: {
    counter() {
      this.number++;
    }
  },
});
// Рекомендуется использовать МЕТОД в качестве обработчика события
