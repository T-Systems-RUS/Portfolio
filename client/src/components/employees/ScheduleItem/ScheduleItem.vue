<template>
  <div
    class="list-item">
    <img class="list-item-image" src="../assets/person.svg"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {ISchedule} from "../../shared/interfaces/ISchedule";

  export default Vue.extend({
    props: {
      employee: {
        type: {} as () => ISchedule,
        required: true
      }
    }
  });
</script>

<style lang="scss" scoped>
  @import '../../styles/variables';


</style>
