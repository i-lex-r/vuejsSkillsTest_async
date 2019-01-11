<template>
  <div :class="$pref + 'calculator'"> 
    <h2 class="__title">Expression:</h2>

    <div class="__expression">
      <fraction
        v-for="(item, index) in expressionItems"
          :key="item.id"
          :last="!expressionItems[index + 1]"
          :single="expressionItems.length === 1"
          v-bind:fraction="item"
          @remove="removeExpressionItem(item.id)">
      </fraction>

      <fraction
          key="fi_result"
          :isResult="true"
          v-bind:fraction="expressionResult">
      </fraction>
    </div>

    <div class="__toolbar">
      <button :class="$pref + 'button'" @click="addExpressionItem">Add fraction</button>
    </div>
  </div>
</template>

<script>
import Fraction from '@/components/Calculator__fraction.vue';

export default {
  name: 'Calculator',
  components: {
    Fraction
  },

  data () {
    return {
      newItemIndex   : 3,
      newItemDefaults: { top: 1, sub: 2, operator: 'add' },
      expressionItems: [
        { top: 1, sub: 2, operator: 'add', id: 'fi_1' },
        { top: 3, sub: 4, operator: 'add', id: 'fi_2' }
      ],
      operatorFunctions: {
        'add'      : (a, b, c, d) => { return {top: a * d + b * c, sub: b * d} },
        'substract': (a, b, c, d) => { return {top: a * d - b * c, sub: b * d} },
        'multiply' : (a, b, c, d) => { return {top: a * c, sub: b * d} },
        'divide'   : (a, b, c, d) => { return {top: a * d, sub: b * c} }
      },
      primeNumbers: [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199 ]
    };
  },

  computed: {
    expressionResult () {
      let result = {
        top     : 'Error',
        sub     : '',
        integer : 0,
        sign    : ''
      };
      let temp = {
        top     : 0,
        sub     : 0
      };
      let fail  = false;
      let items = [];
      
      // 1) check expression's items for "bugs"
      // and perform additonal items' array for calculations 
      this.expressionItems.forEach((fraction, i) => {
        if (!fail) {
          if (fraction.top === '') {
            result.sub = `you must specify numerator (fraction #${i + 1})`;
            fail = true;
          } else if (fraction.sub === '') {
            result.sub = `you must specify denominator (fraction #${i + 1})`;
            fail = true;
          } else if (fraction.top === 0) {
            result.sub = `numerator can not be zero (fraction #${i + 1})`;
            fail = true;
          } else if (fraction.sub === 0) {
            result.sub = `denominator can not be zero (fraction #${i + 1})`;
            fail = true;
          } else if (isNaN(parseInt(fraction.top))) {
            result.sub = `numerator is NaN (fraction #${i + 1})`;
            fail = true;
          } else if (isNaN(parseInt(fraction.sub))) {
            result.sub = `denominator isNaN (fraction #${i + 1})`;
            fail = true;
          } else {
            items.push(Object.assign({}, fraction));
          }
        }
      });

      // 2) processing expression
      if (!fail) {
        while (items.length > 1) {
          const prevItem    = items[0];
          const currItem    = items[1];
          const nextItem    = items[2];
          let priorityRight = false;

          /* eslint-disable operator-linebreak, no-multi-spaces */
          if (nextItem 
              && !['multiply', 'divide'].includes(prevItem.operator)
              &&  ['multiply', 'divide'].includes(currItem.operator)) {
            priorityRight = true;
          }

          if (priorityRight) {
            temp = this.operatorFunctions[currItem.operator](
              +currItem.top,
              +currItem.sub,
              +nextItem.top,
              +nextItem.sub);

            items.splice(1, 2, Object.assign({}, nextItem, temp));
          } else {
            temp = this.operatorFunctions[prevItem.operator](
              +prevItem.top,
              +prevItem.sub,
              +currItem.top,
              +currItem.sub);

            items.splice(0, 2, Object.assign({}, currItem, temp));
          }
        }

        // get computed result
        temp = items[0];

        if (temp.top < 0 || temp.sub < 0) {
          result.sign = '-';
        }
        temp.top = Math.abs(temp.top);
        temp.sub = Math.abs(temp.sub);

        result.integer = Math.floor(temp.top / temp.sub);

        result.top = temp.top - result.integer * temp.sub;
        result.sub = temp.sub;

        // cut down fraction
        let divisor = this.getGreatestCommonDivisor(result);
        while (divisor > 1) {
          result.top = result.top / divisor;
          result.sub = result.sub / divisor;
          divisor = this.getGreatestCommonDivisor(result);
        }
      }

      return result;
    }
  },

  methods: {
    addExpressionItem () {
      this.expressionItems.push(
        Object.assign(
          { id: `fi_${this.newItemIndex}` }, 
          this.newItemDefaults)
      );
      
      this.newItemIndex++;
    },
    removeExpressionItem (id) {
      this.expressionItems = this.expressionItems.filter(item => item.id !== id);
    },
    getGreatestCommonDivisor ({top, sub}) {
      let divisor = 1;

      this.primeNumbers.forEach(prime => {
        if (top >= prime && sub >= prime) {
          if (!(top % prime) && !(sub % prime)) {
            divisor = prime;
          }
        }
      });

      return divisor;
    }
  }
};
</script>

<style lang="less">
.@{pref}button {
  cursor    : pointer;
  padding   : 10px 15px;
  margin    : 10px;
  color     : #fff;
  border    : solid 1px transparent;
  box-shadow: none;
  background-color: @color-green;
}

.@{pref}button {
  cursor    : pointer;
  padding   : 10px 15px;
  margin    : 10px;
  color     : #fff;
  border    : solid 1px transparent;
  box-shadow: none;
  background-color: @color-green;
}

.@{pref}calculator {
  // > .__title { }
  
  > .__expression {
    margin    : 15px 0;
    padding   : 10px;
    border    : solid 1px @color-green;
    display   : flex;
    flex-wrap : wrap;

    > * {
      flex    : 0 0 auto;
    }
  }
  
  > .__toolbar {
    > * {
      display     : inline-block;
      margin-left : 0;
    }
  }
}
</style>
