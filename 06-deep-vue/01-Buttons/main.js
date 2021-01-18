import Vue from 'vue';
import App from './App.vue';
import './assets/styles/app.css';

// Заглушка для тестирования router-link
Vue.component('router-link', {
  render(h) {
    return h(
      'a',
      { attrs: { href: this.$attrs.to } },
      this.$scopedSlots.default(),
    );
  },
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
