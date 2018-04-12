<template>
  <div class="chip">{{ name }}</div>
</template>

<script lang="ts">
  import Vue from 'vue';


  export default Vue.extend({
    props: {
      name: {
        type: String,
        required: true,
        default: ''
      }
    }
  });
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables';
</style>
