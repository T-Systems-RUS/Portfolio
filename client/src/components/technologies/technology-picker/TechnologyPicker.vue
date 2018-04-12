<template>

</template>

<script lang="ts">
  import {Vue} from "vue/types/vue";
  import * as types from '../../../store/modules/technologies/technology-types';

  export default Vue.extend({
    created() {
      this.$store.dispatch(types.FETCH_TECHNOLOGIES);
    }
  })
</script>

<style lang="scss" scoped>

</style>
