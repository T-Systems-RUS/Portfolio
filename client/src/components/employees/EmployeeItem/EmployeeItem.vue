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
        <select v-model="role.id">
          <option
            v-for="role in roles"
            :key="role.id"
            :value="role.id">
            {{ role.name }} ({{ role.seniority }})
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
          placeholder="Participation"
          v-model="participation"
          @input="$v.participation.$touch(); setParticipation">
        <div v-if="$v.participation.$dirty">
          <p
            class="help is-danger is-size-7"
            v-if="!$v.participation.required">Participation is required</p>
          <p
            class="help is-danger is-size-7"
            v-if="!$v.participation.decimal">Participation must be decimal</p>
        </div>
      </div>
      <div class="employee-item-block">
        <b-datepicker
          v-model="startdate"
          placeholder="Start date"
          icon="calendar-today"
          @input="$v.startdate.$touch();setDate($event, 'startdate')"
          :readonly="false"/>
        <b-datepicker
          v-model="enddate"
          placeholder="Start date"
          icon="calendar-today"
          @input="$v.enddate.$touch(); setDate($event, 'enddate')"
          :readonly="false"/>
        <div v-if="$v.startdate.$dirty">
          <p
            class="help is-danger is-size-7"
            v-if="!$v.startdate.required">Start date is required</p>
          <p
            class="help is-danger is-size-7"
            v-if="$v.enddate && !$v.enddate.minValue">End date must be higher than a start date</p>
        </div>
      </div>
    </div>
    <div class="employee-item-delete">
      <a @click="removeSchedule">
        <img src="../../projects/Project/assets/trash.svg">
      </a>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {ISchedule} from '../../../shared/interfaces/ISchedule';
  import {IRole} from '../../../shared/interfaces/IRole';
  import {ROLES} from '../../../store/modules/employees/getter-types';
  import {
    REMOVE_PROJECT_SCHEDULE,
    SET_SCHEDULE_DATE,
    SET_SCHEDULE_PARTICIPATION
  } from "../../../store/modules/projects/mutation-types";
  import {decimal, minValue, required} from 'vuelidate/lib/validators';

  export default Vue.extend({
    props: {
      schedule: {
        type: Object as () => ISchedule,
        required: true
      }
    },
    data() {
      return {
        role: this.schedule.role || {} as IRole,
        startdate: new Date(this.schedule.startdate),
        enddate: new Date(this.schedule.enddate),
        participation: this.schedule.participation || 100.00
      }
    },
    validations() {
      return {
        startdate: {
          required
        },
        enddate: {
          minValue: minValue(this.startdate)
        },
        participation: {
          required,
          decimal
        }
      };
    },
    computed: {
      roles(): IRole[] {
        return this.$store.getters[ROLES];
      }
    },
    methods: {
      setDate(date:Date,mutation: string) {
        this.$store.commit(SET_SCHEDULE_DATE, { key:mutation, targetId:this.schedule.employee.id, date })
      },
      setRole(role:IRole) {
        console.log(role);
      },
      setParticipation() {
        this.$store.commit(SET_SCHEDULE_PARTICIPATION, {targetId: this.schedule.employee.id, participation: this.participation });
      },
      removeSchedule() {
        this.$store.commit(REMOVE_PROJECT_SCHEDULE, this.schedule.employee.id);
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

