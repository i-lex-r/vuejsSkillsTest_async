import Vue            from 'vue';
import Router         from 'vue-router';
import ErrorComponent from '@/components/AsyncLoadingFail';

Vue.use(Router)

const asyncComponentTimeout = 10000;
const requestDelayImitation = 3000;

/* Simple asynchronous loading of a module (component). 
   In accordance with the documentation: https://vuejs.org/v2/guide/components-dynamic-async.html#Handling-Loading-State.
   Only slightly modified. 
*/
/*
function AsyncLoading (сomponentName) {
  const AsyncHandler = () => ({
    component: import('@/components/' + сomponentName),
    error    : ErrorComponent,
    timeout  : asyncComponentTimeout,
  });

  return Promise.resolve({
    functional: true,
    render (h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children);
    },
  });
}
*/

/* Asynchronous loading with custom processing. */
function AsyncLoading (сomponentName) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        functional: true,
        render (h) {
          return h(ErrorComponent, {
            props: { 
              сomponentName, 
              errorMessage: 'Request timeout: сheck your internet connection.' 
            }
          });
        }
      });
    }, asyncComponentTimeout);

    import('@/components/' + сomponentName)
      .then(loadedComponent => {
        // simulate asynchronous module request delay
        setTimeout(() => {
          resolve(loadedComponent);
        }, requestDelayImitation);
      })
      .catch((error) => {
        resolve({
          functional: true,
          render (h) {
            return h(ErrorComponent, {
              props: { 
                сomponentName, 
                errorMessage: error.message 
              }
            });
          }
        });
      });
  });
}

const routes = [
  {
    path     : '/',
    alias    : '/calculator',
    name     : 'Calculator',
    component: () => AsyncLoading('Calculator'),
    
  },
  {
    path     : '/comments',
    name     : 'WSComments',
    component: () => AsyncLoading('WSComments'),
  }
  
  /* or we could just do it like this */
  // {
  //   path     : '/comments',
  //   name     : 'WebSocketComments',
  //   component:  () => import(/* webpackChunkName: "WSComments" */ '@/components/WebSocketComments.vue')
  // }
  /* This way we will get a lazy load, however it’s not possible to handle any load error
     and replace with another component, as we do in "AsyncLoading". 
  */
];

const router = new Router({
  mode: 'history',
  routes
});

export default router;
