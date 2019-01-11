<template>
  <div :class="`${$pref}fraction`">
    <template v-if="!isResult">
      
      <div class="__cell">
        <div class="__cell-top">
          <input type="text"
            maxlength="5"
            title="integer number 1,2,3..."
            required=""
            v-model.number="fraction.top"
            @keypress="handleKeypress">
        </div>
        
        <div class="__cell-sub">
          <input type="text"
            maxlength="5"
            title="integer number 0,1,2,3..."
            required=""
            v-model.number="fraction.sub"
            @keypress="handleKeypress">
        </div>

        <button v-if="!single" class="__remove-btn"
          title="Remove this fraction" 
          @click.prevent="handleRemove">х</button>
      </div>

      <div v-if="!last" class="__cell">
        <select v-model="fraction.operator">
          <option value="add">+</option>
          <option value="substract">−</option>
          <option value="multiply">×</option>
          <option value="divide">÷</option>
        </select>
      </div>  
    </template>

    <template v-else>
       <div class="__cell"> = </div>

      <div v-if="fraction.sign || fraction.integer" class="__cell">
        {{ fraction.sign }}
        {{ fraction.integer || ''}}
      </div>

      <div v-if="fraction.top" class="__cell">
        <div class="__cell-top">{{ fraction.top }}</div>
        <div class="__cell-sub">{{ fraction.sub }}</div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Fraction',
  
  props: {
    fraction: {
      type    : Object,
      required: true
    },
    isResult: {
      type    : Boolean,
      required: false,
      default : false
    },
    last: {
      type    : Boolean,
      required: false,
      default : false
    },
    single: {
      type    : Boolean,
      required: false,
      default : false
    }
  },

  methods: {
    handleKeypress (e) {
      const allowedKeys = [8, 9, 37, 38, 39, 40, 16];

      if ((e.charCode < 48 || e.charCode > 57) && allowedKeys.indexOf(e.keyCode) < 0) {
        e.preventDefault();
      }
      else if (e.keyCode === 38) {
        e.target.value = (parseInt(e.target.value) || 0) + 1;
        e.target.dispatchEvent(new Event('input'));
      } else if (e.keyCode === 40) {
        if (parseInt(e.target.value)) {
          e.target.value = parseInt(e.target.value) - 1;
          e.target.dispatchEvent(new Event('input'));
        }
      } else {
        return true;
      }
    },

    handleRemove () {
      this.$emit('remove');
    }
  }
};
</script>

<style lang="less">
.@{pref}fraction {
  display         : inline-flex;
  align-items     : center;

  > .__cell {
    position      : relative;
    display       : inline-flex;
    flex-direction: column;
    flex-wrap     : nowrap;
    align-items   : center;
    align-content : center;
    padding       : 10px 10px 10px 0;
  }

  > .__cell > .__cell-top,
  > .__cell > .__cell-sub {
    padding       : 0 4px;
  }
   > .__cell > .__cell-top {
    border-bottom : 1px solid @color-gray;
  }

  > .__cell > .__cell-top > input,
  > .__cell > .__cell-sub > input {
      width       : 5em;
      color       : #fff;
      text-align  : center;
      border      : none;
      background-color: @color-green;
  }

  > .__cell > .__remove-btn {
    cursor        : pointer;
    position      : absolute;
    top           : 0;
    right         : 0;
    width         : 13px;
    height        : 13px;
    text-align    : center;
    color         : @color-gray2;
    padding       : 0 3px;
    border        : none;
    background-color: transparent;
    
    &:hover {
      color       : @color-red;
      font-weight : bold; 
    }
  }

  // > .__cell > select {}
}
</style>

