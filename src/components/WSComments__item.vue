<template>
  <transition name="fade" mode="out-in">
    
    <div :class="{[`${$pref}comment`]: true, '-processing': processing}">
      <div class="__text">
        {{text}}
      </div>

      <div class="__actions">
        <button 
          :class="{'-fail': processingFail}"
          :disabled="processing"
          @click="removeItem">
          {{processingFail ? 'Ooups..timeout' : 'Remove comment'}}
        </button>
      </div>
    </div>

  </transition>
</template>

<script>
export default {
  name: 'Comment',

  props: {
    text: {
      type    : String,
      required: true
    },
    processing: {
      type    : Boolean,
      required: true,
      default : false
    },
    processingFail: {
      type    : Boolean,
      required: true,
      default : false
    }
  },

  methods: {
    removeItem () {
      if (!this.processing) {
        this.$emit('remove');
      }
    }
  }
};
</script>

<style lang="less">
@keyframes processingComment {
  0%   {background-position: 0 0;}
  100% {background-position: -20% 0;}
}

.@{pref}comment {
  display             : table;
  width               : 100%;

  &:hover {
    background-color  : rgba(180, 180, 180, 0.26);
  }

  &.-processing {
    width             : 100%;
    animation         : processingComment .5s linear infinite;
    background-size   : 50px 50px;
    background-repeat : repeat;
    background-image  : linear-gradient(
      -45deg,
      rgba(180, 180, 180, .4) 25%,
      transparent 25%,
      transparent 50%,
      rgba(180, 180, 180, .4) 50%,
      rgba(180, 180, 180, .4) 75%,
      transparent 75%,
      transparent
    );
  }

  > * {
    display           : table-cell;
    vertical-align    : top;
    padding           : 10px 10px 5px 10px;
  }

  > .__text {
    width             : 70%;
    border-bottom     : solid 1px rgba(180, 180, 180, 0.26);
  }

  > .__actions {
    white-space       : nowrap;

    > button {
      &:active,
      &:hover,
      &:focus {
        outline       : none !important;
      }

      &:not(:disabled) {
        cursor        : pointer;
      }

      &.-fail {
        color           : @color-red;
        border          : solid 1px transparent;
        border-bottom   : solid 1px @color-red;
        background-color: transparent;
        box-shadow      : none;
      }
    }
  }
}
</style>
