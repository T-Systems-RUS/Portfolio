<template>
  <div
  class="employee-item">
    <img
      class="employee-item-image"
      src="../assets/person.svg">
    <div class="employee-item-content columns is-gapless is-marginless">
      <div class="employee-item-left column">
        <div>
          <span class="title is-5 is-size-14">
            {{ schedule.employee.firstname }} {{ schedule.employee.lastname }}
          </span>
        </div>
        <div class="select">
          <select v-model="roleId">
            <option
              v-for="role in roles"
              :key="role.id"
              :value="role.id">
              {{ role.name }} ({{ role.seniority }})
            </option>
          </select>
        </div>
      </div>
      <div class="employee-item-right column is-marginless">
        <div>
          <div>
            <span class="title is-5 is-size-12 is-marginless">Participation(%):</span>
            <input
              class="input is-pulled-right"
              type="text"
              v-model="participation"
              @input="$v.participation.$touch(); setParticipation()">
          </div>
        </div>
        <div class="is-pushed-top">
          <div>
            <b-datepicker
              v-model="startdate"
              placeholder="Start date"
              class="employee-item-datepicker"
              @input="$v.startdate.$touch();setDate($event, 'startdate')"
              :readonly="false"/>
            <b-datepicker
              v-model="enddate"
              placeholder="End date"
              class="employee-item-datepicker"
              @input="$v.enddate.$touch(); setDate($event, 'enddate')"
              :readonly="false"/>
          </div>
        </div>


      </div>
    </div>
    <div class="employee-item-delete">
      <a @click="removeSchedule">
        <img src="../../projects/Project/assets/trash.svg">
      </a>
    </div>
    <div
      class="employee-item-error"
      :class="{'is-pushed': $v.startdate.$dirty || $v.participation.$dirty}">
      <div v-if="$v.startdate.$dirty">
        <p
          class="help is-danger is-size-7"
          v-if="!$v.startdate.required">Start date is required</p>
        <p
          class="help is-danger is-size-7"
          v-if="$v.enddate && !$v.enddate.minValue">End date must be higher than a start date</p>
      </div>
      <div
      v-if="$v.participation.$dirty">
        <p
          class="help is-danger is-size-7"
          v-if="!$v.participation.required">Participation is required</p>
        <p
          class="help is-danger is-size-7"
          v-if="!$v.participation.decimal">Participation must be decimal</p>
        <p
          class="help is-danger is-size-7"
          v-if="!$v.participation.between">Participation must be between 0 and 100</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {decimal, minValue, required, between} from 'vuelidate/lib/validators';
  import {ISchedule} from '../../../shared/interfaces/ISchedule';
  import {IRole} from '../../../shared/interfaces/IRole';
  import {ROLES} from '../../../store/modules/employees/getter-types';
  import {
    REMOVE_PROJECT_SCHEDULE,
    SET_SCHEDULE_DATE,
    SET_SCHEDULE_PARTICIPATION, SET_SCHEDULE_ROLE
  } from '../../../store/modules/projects/mutation-types';


  export default Vue.extend({
    props: {
      schedule: {
        type: Object as () => ISchedule,
        required: true
      }
    },
    data() {
      return {
        startdate: new Date(this.schedule.startdate),
        enddate: this.schedule.enddate ? new Date(this.schedule.enddate) : null,
        participation: this.schedule.participation
      };
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
          decimal,
          between: between(0, 100)
        }
      };
    },
    computed: {
      roles(): IRole[] {
        return this.$store.getters[ROLES];
      },
      roleId: {
        get(): string {
          return this.schedule.role.id;
        },
        set(value: string) {
          this.$store.commit(SET_SCHEDULE_ROLE, {targetId: this.schedule.employee.id,
                                                 role: this.roles.filter(role => role.id === value)[0]});
        }
      }
    },
    methods: {
      setDate(date:Date, mutation: string) {
        this.$store.commit(SET_SCHEDULE_DATE, {key: mutation, targetId: this.schedule.employee.id, date});
      },
      setParticipation() {
        this.$store.commit(SET_SCHEDULE_PARTICIPATION,
                           {targetId: this.schedule.employee.id, participation: this.participation});
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
  $delete-image-size: 15px;
  $input-font-size: 12px;

  .employee-item{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border: 1px solid $border-color;
    border-bottom: none;
    padding: 13px;
    width: 420px;

    &-image {
      margin-right: 10px;
    }

    &:last-child {
      border-bottom: 1px solid $border-color;
    }

    &-percent {
      margin: 4px 0 0 3px;
    }

    &-content {
      flex: 2;
    }

    &-delete {
      padding-left: $delete-image-size;

      img {
        height: $delete-image-size;
      }
    }

    &-error {
      width: 100%;

      &.is-pushed {
        margin-top: 10px;
      }
    }
  }

  .is-pushed-top {
    margin-top: -6px;
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
    font-size: $input-font-size;

  }


</style>

