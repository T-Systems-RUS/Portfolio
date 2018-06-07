<template>
  <div
    class="employee-item">
    <img
      class="employee-item-image"
      src="../assets/person.svg">
    <div class="employee-item-left">
      <span class="title is-5 is-size-14">
        {{ schedule.employee.firstname }} {{ schedule.employee.lastname }}
      </span>
      <div class="select">
        <select>
          <option
            v-for="role in roles"
            :key="role.id"
            :value="role.id">
            {{role.name}} ({{role.seniority}})
          </option>
        </select>
      </div>
    </div>
    <div class="employee-item-right is-pulled-right">
      <div class="employee-item-block">
        <span class="title is-5 is-size-12 is-marginless">Participation:</span>
        <input
          class="input"
          type="text"
          placeholder="Customer"
          v-model="schedule.participation">
      </div>
      <div class="employee-item-block">
        <b-datepicker
          placeholder="Start date"
          icon="calendar-today"
          :readonly="false"/>
        <input
          class="input is-pulled-right"
          type="text"
          placeholder="End date"
          v-model="schedule.enddate">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {ISchedule} from '../../../shared/interfaces/ISchedule';
  import {IRole} from '../../../shared/interfaces/IRole';
  import {ROLES} from '../../../store/modules/projects/getter-types';

  export default Vue.extend({
    props: {
      schedule: {
        type: Object as () => ISchedule,
        required: true
      }
    },
    computed: {
      roles(): IRole[] {
        return this.$store.getters[ROLES];
      }
    }
  });
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables';

  $padding: 10px;
  $mb: 20px;

  .employee-item{
    display: flex;
    align-items: center;
    border: 1px solid $border-color;
    border-bottom: none;
    padding: 13px;
    width: 420px;

    &-block {
      display: flex;
      align-items: center;
    }

    &:last-child {
      border-bottom: 1px solid $border-color;
    }

    &-left {
      flex: 2;
      padding-left: $padding;
    }
  }

  .select {
    display: block;
    height: 20px;
    max-width: 140px;

    select {
      height: 20px;
      max-width: 140px;
      font-size: 12px;
      padding: 0 30px 0px 5px;

    }
  }

  .control, .input {
    width: 50px;
    height: 20px;
    font-size: 12px;
  }


</style>

