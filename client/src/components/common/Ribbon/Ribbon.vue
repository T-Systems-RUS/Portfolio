<template>
  <div
    class="ribbon help is-danger is-pulled-right"
    v-if="visible"
    :class="{'is-big': isBig}">
    <span class="ribbon-text">{{value}}</span>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      value: String,
      visible: {
        type: Boolean,
        default: false
      },
      isBig: {
        type: Boolean,
        default: false
      }
    }

  });
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables';


  .ribbon{
    border: 1px solid;
    padding: 2px 5px;
    align-self: flex-start;

    &-text {
      font-weight: 500;
    }

    &.is-big {
      font-size: 18px;
    }

  }

</style>
