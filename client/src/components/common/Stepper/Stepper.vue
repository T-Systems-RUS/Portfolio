<template>
  <div class="stepper">
    <div class="stepper-number">
      <span class="title is-7 is-size-14">{{step}}</span>
    </div>
    <div class="stepper-name title is-5 is-size-14">
      {{name}}
    </div>
    <div class="stepper-content">
      <slot/>
    </div>
  </div>

</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      step: String,
      name: String
    }

  });
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables';

  $width: 25px;

  .stepper {
    border-left:1px solid $border-color;
    padding-left: $width;
    position: relative;
    margin-top: 50px;

    &-name{
      position: absolute;
      top: -26px;
    }

    &-number {
      height: $width;
      width: $width;
      line-height: $width;
      background-color: $magenta;
      text-align: center;
      border-radius: 50%;
      vertical-align: middle;
      position: absolute;
      left: -13px;
      top: -32px;


      span{
        color: $white;
      }
    }
  }


</style>
