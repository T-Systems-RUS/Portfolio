<template>
  <div
    class="list-item">
    <img class="list-item-image" src="../assets/person.svg"/>
    <div class="list-item-left">
      <span class="title is-5 is-size-14">{{ fullname }}</span>
      <span class="title is-4 is-size-14 is-block"> {{ schedule.role.name }}</span>
    </div>
    <div class="list-item-right is-pulled-right">
      <p class="title is-4 is-size-14">{{ schedule.participation }}%</p>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {ISchedule} from "../../../shared/interfaces/ISchedule";

  export default Vue.extend({
    props: {
      schedule: {
        type: Object as () => ISchedule,
        required: true
      }
    },
    computed: {
      fullname(): string {
        return `${this.schedule.employee.firstname} ${this.schedule.employee.lastname}`;
      }
    }
  });
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables';

  $padding: 10px;
  $mb: 20px;

  .list-item{
    display: flex;
    align-items: center;
    margin-bottom: $mb;

    &-left {
      flex: 2;
      padding-left: $padding;
    }
  }

</style>
