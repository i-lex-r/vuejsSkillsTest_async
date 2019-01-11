/* eslint-disable-next-line  */
import Base   from './base';

import Vue    from 'vue';
import App    from './App';
import router from './router';

Vue.config.productionTip = false;
Vue.config.devtools      = true;

/* Create global prefix for styles with easy access in all *vue files. */
Vue.prototype.$pref      = 'vt-';
/* Of course we can use this option:
  new Vue({
    prefix: 'vt-',
    ....
  })

and further use it in components like
    this.$root.$options.pref

but it is less convenient than simply
    this.$pref
*/

/* eslint-disable no-console */
Vue.config.errorHandler = function(err, vm, info) {
  console.error('VueErrorHandler => error detected.\n', err, '\n', vm, '\n', info);
};
Vue.config.warnHandler = function(msg, vm, trace) {
  console.warn('VueWarnHandler => warning detected.\n', msg, '\n', vm, '\n', trace);
};

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
