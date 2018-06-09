<template>
  <CommonModal @exit="goBack">
    <template slot="modal-title">Edit project</template>
    <p
      class="manage-user-subtitle common-modal-subtitle has-text-centered is-size-5 is-size-6-mobile"
      slot="modal-subtitle">
      Please edit project information here
    </p>
    <template slot="modal-content">
      <div class="form-container project-change">
        <div class="field centered-margin">
          <Stepper
            step="1"
            name="Main Information">
            <div class="field">
              <label class="label is-pulled-left">Project name</label>
              <div class="control">
                <input
                  v-model="name"
                  class="input"
                  type="text"
                  placeholder="Project name">
              </div>
            </div>
            <div class="field">
              <label class="label is-pulled-left">Production line</label>
              <div class="control">
                <div class="select">
                  <select v-model="line">
                    <option
                      v-for="option in addons['Production line']"
                      :value="option">
                      {{ option.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label is-pulled-left">Domain</label>
              <div class="select">
                <select v-model="domain">
                  <option
                    v-for="option in addons['Domain']"
                    :value="option">
                    {{ option.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="field">
              <label class="label is-pulled-left">Program</label>
              <div class="select">
                <select v-model="program">
                  <option
                    v-for="option in addons['Program']"
                    :value="option">
                    {{ option.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="field">
              <label class="label is-pulled-left">Project type</label>
              <div class="select">
                <select v-model="type">
                  <option
                    v-for="option in addons['Project type']"
                    :value="option">
                    {{ option.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="field">
              <div class="columns">
                <div class="column">
                  <div class="field is-short">
                    <label class="label is-pulled-left">Project start</label>
                    <div class="control">
                      <b-datepicker
                        v-model="startDate"
                        placeholder="Project start"
                        :readonly="false"/>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="field is-short">
                    <label class="label is-pulled-left">Project end</label>
                    <div class="control">
                      <b-datepicker
                        placeholder="Project end"
                        :readonly="false"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Stepper>
        </div>

        <div class="field centered-margin">
          <Stepper
            step="2"
            name="Description">
            <div class="field">
              <div class="control">
                <textarea
                  v-model="description"
                  class="textarea"
                  placeholder="Description"/>
              </div>
            </div>
          </Stepper>
        </div>

        <div class="field centered-margin">
          <Stepper
            step="3"
            name="PSS & Customers">
            <div class="field">
              <label class="label is-pulled-left">Customer</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Customer">
              </div>
            </div>
            <div class="field">
              <label class="label is-pulled-left">PSS</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="PSS">
              </div>
            </div>
          </Stepper>
        </div>

        <div class="field centered-margin">
          <Stepper
            step="4"
            name="Technologies">
            <div class="field">
              <div class="control">
                <b-taginput
                  v-model="projectTech"
                  :data="filteredTechnologies"
                  :field="'name'"
                  :allow-new="false"
                  autocomplete
                  icon="label"
                  placeholder="Technologies"
                  @typing="getFilteredTechnologies">
                  <template slot-scope="props">
                    <strong class="is-capitalized">{{ props.option.domain }}</strong>: {{ props.option.name }}
                    <img
                      class="tag-image"
                      :src="imagePath(props.option.image)"
                      v-if="props.option.image">
                  </template>
                  <template slot="empty">
                    There are no items
                  </template>
                </b-taginput>
              </div>
            </div>
          </Stepper>
        </div>

        <div class="field centered-margin">
          <Stepper
            step="5"
            name="Team">
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Select employee">
              </div>
            </div>
            <EmployeeItem
              v-for="schedule of schedules"
              :key="schedule.id"
              :schedule="schedule"/>
          </Stepper>
        </div>


      </div>
      <div class="project-change-footer">
        <button
          class="button
               is-primary
               is-size-6
               is-width-auto
               is-pulled-right">
          Save
        </button>
        <button
          class="button
                 is-default
                 is-size-6
                 is-width-auto
                 is-pulled-right
                 is-pushed-left">
          Cancel
        </button>
      </div>
    </template>
  </CommonModal>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Stepper from '../../common/Stepper/Stepper.vue';
  import EmployeeItem from '../../employees/EmployeeItem/EmployeeItem.vue';
  import {FETCH_ADDONS, FETCH_PROJECT, FETCH_ROLES} from '../../../store/modules/projects/action-types';
  import {
    ADDONS,
    PROJECT_CUSTOMERS, PROJECT_DESCRIPTION, PROJECT_DOMAIN, PROJECT_END_DATE,
    PROJECT_LINE,
    PROJECT_NAME,
    PROJECT_PROGRAM, PROJECT_SCHEDULES, PROJECT_START_DATE, PROJECT_TYPE
  } from '../../../store/modules/projects/getter-types';
  import {ITechnology} from '../../../shared/interfaces/ITechnology';
  import {TECHNOLOGIES} from '../../../store/modules/technologies/getter-types';
  import {FETCH_TECHNOLOGIES} from '../../../store/modules/technologies/action-types';
  import {
    SET_PROJECT_CUSTOMERS,
    SET_PROJECT_DESCRIPTION,
    SET_PROJECT_DOMAIN, SET_PROJECT_END_DATE,
    SET_PROJECT_LINE,
    SET_PROJECT_NAME,
    SET_PROJECT_PROGRAM, SET_PROJECT_SCHEDULES, SET_PROJECT_START_DATE, SET_PROJECT_TYPE
  } from '../../../store/modules/projects/mutation-types';
  import {Util} from '../../../shared/classes/Util';

  interface IData {
    projectTech: {}[];
    filteredTechnologies: {}[];
    startDate: Date | null;
    endDate: Date | null;
  }

  export default Vue.extend({
    components: {
      EmployeeItem,
      Stepper
    },
    data(): IData {
      return {
        projectTech: [],
        filteredTechnologies: [],
        startDate: null,
        endDate: null
      };
    },
    props: {
      id: {
        type: String
      }
    },
    computed: {
      name: Util.mapTwoWay<string>(PROJECT_NAME, SET_PROJECT_NAME),
      program: Util.mapTwoWay<string>(PROJECT_PROGRAM, SET_PROJECT_PROGRAM),
      line: Util.mapTwoWay<string>(PROJECT_LINE, SET_PROJECT_LINE),
      domain: Util.mapTwoWay<string>(PROJECT_DOMAIN, SET_PROJECT_DOMAIN),
      type: Util.mapTwoWay<string>(PROJECT_TYPE, SET_PROJECT_TYPE),
      description: Util.mapTwoWay<string>(PROJECT_DESCRIPTION, SET_PROJECT_DESCRIPTION),
      customers: Util.mapTwoWay<string>(PROJECT_CUSTOMERS, SET_PROJECT_CUSTOMERS),
      schedules: Util.mapTwoWay<string>(PROJECT_SCHEDULES, SET_PROJECT_SCHEDULES),

      technologies(): ITechnology[] {
        return this.$store.getters[TECHNOLOGIES];
      },
      addons(): {} {
        return this.$store.getters[ADDONS];
      }
    },
    mounted() {
      this.$store.dispatch(FETCH_PROJECT, this.id)
        .then(() => {
          // Hack necessary due to https://github.com/buefy/buefy/issues/700
          // TODO change to actual computed+getter after fixed
          this.startDate = new Date(this.$store.getters[PROJECT_START_DATE]);
          this.endDate = new Date(this.$store.getters[PROJECT_END_DATE]);
        });
      this.$store.dispatch(FETCH_TECHNOLOGIES);
      this.$store.dispatch(FETCH_ADDONS);
      this.$store.dispatch(FETCH_ROLES);
    },
    methods: {
      imagePath(path: string): string {
        return `./server/images/presentation/${path}`;
      },
      getFilteredTechnologies(text: string) {
        this.filteredTechnologies = this.$store.getters[TECHNOLOGIES]
          .filter((tech: ITechnology) => tech.name.indexOf(text) > -1);
      },
      goBack() {
        this.$router.back();
      }
    }
  });
</script>


<style lang="scss" scoped>
  @import '../../../styles/variables';

  .project-change {

    &-footer {
      background-color: $white;
      height: 70px;
      border-top: 1px solid $border-color;
      position: fixed;
      bottom: 0;
      width: 100%;
      z-index: 1000;
      left: 0;
      align-items: center;
      padding: 20px;
    }
  }

  .tag-image {
    width: 18px;
    position: absolute;
    margin-left: 10px;
  }

  .field {
    max-width: 420px;
    width: 420px;

    &.is-short {
      width: 100%;
      box-sizing: border-box;
    }
  }
</style>
