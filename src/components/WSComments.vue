<template>
  <div>
    <h2>WebSocket connection status: {{connectionStatus}}</h2>

    <comment-item
      v-for="item in existComments"
        :key="item.id"
        :text="item.text"
        :processing="item.state === 'pending'"
        :processingFail="item.state === 'timeout'"
        @remove="requestRemoveComment(item.id)">
    </comment-item>

  </div>
</template>

<script>
import CommentItem from '@/components/WSComments__item';

export default {
  name: 'WSComments',

  components: {
    CommentItem
  },

  data () {
    return {
      wsUri           : 'ws://echo.websocket.org/',
      wsExist         : false,
      wsConnection    : null,
      connectionStatus: 'initialization...',
      isConnected     : false,
      responseTimeout : 1500,
      comments: {
        1:  {id: 1,  text: 'Welcome to the Vue Forum!', state: ''},
        2:  {id: 2,  text: 'Vue component not defined Get Help', state: ''},
        3:  {id: 3,  text: 'CDN based development - Using VueJS on existing projects having jQuery or such', state: ''},
        4:  {id: 4,  text: 'Theses dependencies not found: whene I try to use nodemailer', state: ''},
        5:  {id: 5,  text: 'Vue.js 2.0 share data between method calls Get Help', state: ''},
        6:  {id: 6,  text: 'Vue.compile does not compile template', state: ''},
        7:  {id: 7,  text: 'V-show not working after vuex and axios promise', state: ''},
        8:  {id: 8,  text: 'How auto refresh component when data updated from api, without page refresh', state: ''},
        9:  {id: 9,  text: 'Vuex: How to implement caching for getters that return a function?', state: ''},
        10: {id: 10, text: 'No access to mapGetter() data on beforeDestroy()', state: ''}
      },
      counter: 0,
      deleteQueue: {}
    };
  },

  computed: {
    existComments () {
      let comments = [];

      Object.keys(this.comments).forEach(key => {
        if (this.comments[key].state !== 'removed') {
          comments.push(this.comments[key]);
        }
      });

      return comments;
    }
  },

  beforeMount: function() {
    if ('WebSocket' in window) {
      this.wsExist = true;

      this.wsConnection = new WebSocket(this.wsUri);

      this.wsConnection.onopen    = e => this.connected(e);
      this.wsConnection.onclose   = e => this.disconnected(e);
      this.wsConnection.onmessage = e => this.getMessage(e);
      this.wsConnection.onerror   = e => this.getError(e);
    }
    this.checkConnectionStatus();
  },

  beforeDestroy: function() {
    if (this.isConnected) {
      this.wsConnection && this.wsConnection.close();
    }
  },

  methods: {
    checkConnectionStatus () {
      let status = 'WebSocket not supported by your browser!';

      if (this.wsConnection) {
        switch (this.wsConnection.readyState) {
          case 0:
            status = 'opening...';
            this.isConnected = false;
            break;
          case 1:
            status = 'opened :)';
            this.isConnected = true;
            break;
          case 2:
            status = 'closing...';
            this.isConnected = false;
            break;
          case 3:
            status = 'closed :(';
            this.isConnected = false;
        }
      }

      this.connectionStatus = status;
    },

    connected () {
      this.isConnected = true;
      this.checkConnectionStatus();
    },
    disconnected () {
      this.checkConnectionStatus();
    },
    getMessage (e) {
      this.handleRemoveComment(e.data);
    },
    getError (e) {
      this.checkConnectionStatus();
      alert('WebSocket error: ' + e.data);
    },

    handleRemoveComment (id) {
      // imitate timeout for demonstration
      let timeout = Math.random() * 10 > 6
        ? this.responseTimeout + 500
        : 100;

      setTimeout(() => {
        if (this.deleteQueue[id] 
            && this.comments[this.deleteQueue[id]].state === 'pending') {
          this.comments[this.deleteQueue[id]].state = 'removed';
        }
      }, timeout);
    },

    requestRemoveComment (commentId) {
      let id = ++this.counter;

      this.deleteQueue[id] = commentId;
      this.comments[commentId].state = 'pending';

      if (this.responseTimeout) {
        setTimeout(() => {
          if (this.comments[commentId].state === 'pending') {
            this.comments[commentId].state = 'timeout';

            setTimeout(() => {
              this.comments[commentId].state = '';
            }, 2000);
          }
        }, this.responseTimeout);
      }

      this.wsConnection.send(id);
    }
  }
};
</script>
