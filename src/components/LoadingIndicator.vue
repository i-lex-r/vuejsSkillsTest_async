<template functional>
  <div :class="{[`${parent.$pref}loader`]: true, '-progress': props.progress}" />
</template>

<script>
export default {
  name: 'LoadingIndicator',

  props: {
    progress: {
      type    : Boolean,
      required: true,
      default : false
    }
  },

  // just play with render function ^)
  // render: function (h) {
  //   return h('div', {
  //     class: {
  //       [this.$pref + 'loader']: true,
  //       '-progress': this.progress
  //     }
  //   }, '');
  // }
};
</script>

<style lang="less">
@keyframes elastic-line-animation {
  from {left : -200px; width: 30%;}
  50%  {width: 30%;}
  70%  {width: 70%;}
  80%  {left : 50%;}
  95%  {left : 120%;}
  to   {left : 100%;}
}
.@{pref}loader {
  position   : relative;
  height     : 2px;
  width      : 100%;
  overflow   : hidden;

  &:before {
    content  : "";
    display  : block;
    position : absolute;
    left     : 0;
    width    : 100%;
    height   : 100%;
    background-color: @color-green;
  }

  &.-progress:before {
    left     : -200px;
    width    : 200px;
    animation: elastic-line-animation 2s linear infinite;
    background-color: @color-blue;
  }
}
</style>
