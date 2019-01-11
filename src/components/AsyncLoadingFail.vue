<template functional>
  <div class="errorMessage">
    <h3 v-if="props.сomponentName">Failed to load asynchronous component: "{{ props.сomponentName }}".</h3>
    <h3 v-else>Failed to load asynchronous component: request timeout.</h3>
    <p>{{ props.errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name:  'AsyncLoadingFail',
  
  props: {
    сomponentName: {
      type    : String,
      required: false
    },
    errorMessage: {
      type    : String,
      required: false
    }
  }
};
</script>

<style scoped>
.errorMessage {
  font-weight: bold;
  color      : darkred;
}
</style>
