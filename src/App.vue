<template>
  <div id="app" :class="`${$pref}container`">

    <header>
      <h1>Simple (test) project with asynchronous loading modules</h1>

      <p>
        <router-link to="/calculator">Fraction calculator</router-link>&nbsp;|&nbsp;
        <router-link to="/comments">WebSocket communication</router-link>
      </p>

      <loading-indicator
        :progress="componentLoading"/>
    </header>

    <section>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </section>

  </div>
</template>

<script>
import LoadingIndicator from '@/components/LoadingIndicator';

export default {
  name: 'App',

  components: {
    LoadingIndicator
  },

  data () {
    return {
      componentLoading: true
    };
  },

  created: function() {
    this.$router.beforeEach((to, from, next) => {
      this.componentLoading = true;
      next();
    });

    this.$router.afterEach(() => {
      this.componentLoading = false;
    });
  }
};
</script>

<style lang="less">
.@{pref}container {
  &, 
  * {
    box-sizing: border-box;
  }

  position    : relative;
  max-width   : 1200px;
  margin      : 0 auto;
  padding     : 0 20px;

  > header {
    padding   : 20px 0 0;
    margin    : 0 0 10px 0;
  }

  // > section { }
}
</style>
