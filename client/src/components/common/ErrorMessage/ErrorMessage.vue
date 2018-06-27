<template>
  <section class="has-text-left centered">
    <span class="title is-4 is-regular">{{ title }}</span>
    <slot/>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      title: String
    }
  });
</script>
<style lang="scss" scoped>
  @import '../../../styles/variables';
  @import '~bulma/sass/utilities/mixins';

  $building-unit: 12px;
  $building-unit-x1_5: $building-unit * 1.5; // 18px

  $error-message-width: 480px;
  $building-unit-x2: $building-unit * 2; // 24px
  $error-message-padding: $building-unit-x1_5 $building-unit-x2;

  $error-message-spacing: $building-unit-x1_5;

  section {
    width: $error-message-width;
    padding: $error-message-padding;
    margin-bottom: $error-message-spacing;
    border-radius: $telekom-radius;
    background-color: $red-a05;
    border: 1px solid $red;

    @include mobile {
      width: 100%;
    }
  }
</style>
