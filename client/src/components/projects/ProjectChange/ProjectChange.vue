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
                  placeholder="Project name"
                  @input="$v.name.$touch()"
                  :class="{'is-danger': $v.name.$error}">
              </div>
              <div v-if="$v.name.$dirty">
                <p
                  class="help is-danger is-size-7"
                  v-if="!$v.name.required">Project name is required</p>
              </div>
            </div>
            <div class="field">
              <label class="label is-pulled-left">Domain</label>
              <div class="select">
                <select v-model="domainId">
                  <option
                    v-for="option in addons['Domain']"
                    :value="option.id">
                    {{ option.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="field">
              <label class="label is-pulled-left">Program</label>
              <div class="select">
                <select v-model="programId">
                  <option
                    v-for="option in addons['Program']"
                    :value="option.id">
                    {{ option.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="field">
              <label class="label is-pulled-left">Project type</label>
              <div class="select">
                <select v-model="typeId">
                  <option
                    v-for="option in addons['Project type']"
                    :value="option.id">
                    {{ option.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="field">
              <div class="columns horizontal-field">
                <div class="column">
                  <div class="is-short">
                    <label class="label is-pulled-left">Project start</label>
                    <div class="control">
                      <b-datepicker
                        v-model="startDate"
                        @input="$v.startDate.$touch();setStartDate()"
                        :class="{'is-danger': $v.startDate.$error}"
                        placeholder="Project start"
                        :readonly="false"/>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="is-short">
                    <label class="label is-pulled-left">Project end</label>
                    <div class="control">
                      <b-datepicker
                        v-model="endDate"
                        @input="$v.endDate.$touch();setEndDate()"
                        :class="{'is-danger': $v.endDate.$error}"
                        placeholder="Project end"
                        :readonly="false"/>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="$v.startDate.$dirty">
                <p
                  class="help is-danger is-size-7"
                  v-if="!$v.startDate.required">Start date is required</p>
                <p
                  class="help is-danger is-size-7"
                  v-if="$v.endDate && !$v.endDate.minValue">End date must be higher than a start date</p>
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
                  placeholder="Description"
                  @input="$v.description.$touch()"
                  :class="{'is-danger': $v.description.$error}"/>
              </div>
              <div v-if="$v.description.$dirty">
                <p
                  class="help is-danger is-size-7"
                  v-if="!$v.description.required">Description is required</p>
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
                <b-taginput
                  v-model="customers"
                  :data="filteredCustomers"
                  :field="'name'"
                  :allow-new="false"
                  autocomplete
                  icon="label"
                  placeholder="Customers"
                  @typing="getFilteredCustomers">
                  <template slot-scope="props">
                    <img
                      class="tag-image-left"
                      :src="imagePath(props.option.image)"
                      v-if="props.option.image">
                    {{ props.option.name }}
                  </template>
                  <template slot="empty">
                    There are no items
                  </template>
                </b-taginput>
              </div>
            </div>
            <div class="field">
              <label class="label is-pulled-left">PSS</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="PSS"
                  v-model="pss"
                  @input="$v.pss.$touch()"
                  :class="{'is-danger': $v.pss.$error}">
              </div>
              <div v-if="$v.pss.$dirty">
                <p
                  class="help is-danger is-size-7"
                  v-if="!$v.pss.decimal">PSS must be decimal</p>
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
                  v-model="technologies"
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
      <div class="field centered-margin">
        <Stepper
          step="6"
          name="Project image">
          <div class="field">
            <div class="control">
              <FileUploader
                :is-image-upload="true"
                :is-multiple="false">
                <span slot="button-text">Select project image</span>
                <span slot="upload-title">Upload project image</span>
                <span slot="upload-optional">Select an image to upload from your computer</span>
                <div
                  slot="upload-info"
                  class="has-text-centered">
                  <p class="is-size-6">Maximum file size: 10 MB</p>
                  <p class="is-size-6">Supported file formats: jpg, jpeg, png</p>
                </div>
                <template slot="upload-btn-text">Upload</template>
              </FileUploader>
            </div>
          </div>
        </Stepper>
      </div>
      <div class="project-change-footer">
        <button
          class="button
               is-primary
               is-size-6
               is-width-auto
               is-pulled-right"
          :disabled="$v.$invalid">
          Save
        </button>
        <button
          class="button
                 is-default
                 is-size-6
                 is-width-auto
                 is-pulled-right
                 is-pushed-left"
          @click="goBack">
          Cancel
        </button>
      </div>
    </template>
  </CommonModal>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {decimal, minValue, required} from 'vuelidate/lib/validators';
  import Stepper from '../../common/Stepper/Stepper.vue';
  import EmployeeItem from '../../employees/EmployeeItem/EmployeeItem.vue';
  import {
    FETCH_ADDONS,
    FETCH_PROJECT,
    FETCH_PROJECT_WITH_IMAGE,
    FETCH_ROLES
  } from '../../../store/modules/projects/action-types';
  import {
    ADDONS,
    PROJECT_CUSTOMERS, PROJECT_DESCRIPTION, PROJECT_DOMAIN_ID, PROJECT_END_DATE,
    PROJECT_NAME,
    PROJECT_PROGRAM_ID, PROJECT_PSS, PROJECT_SCHEDULES, PROJECT_START_DATE, PROJECT_TECHNOLOGIES, PROJECT_TYPE_ID
  } from '../../../store/modules/projects/getter-types';
  import {ITechnology} from '../../../shared/interfaces/ITechnology';
  import {TECHNOLOGIES} from '../../../store/modules/technologies/getter-types';
  import {FETCH_TECHNOLOGIES} from '../../../store/modules/technologies/action-types';
  import {
    SET_PROJECT_CUSTOMERS,
    SET_PROJECT_DESCRIPTION,
    SET_PROJECT_DOMAIN,
    SET_PROJECT_END_DATE,
    SET_PROJECT_NAME,
    SET_PROJECT_PROGRAM,
    SET_PROJECT_PSS,
    SET_PROJECT_SCHEDULES,
    SET_PROJECT_START_DATE,
    SET_PROJECT_TECHNOLOGIES,
    SET_PROJECT_TYPE
  } from '../../../store/modules/projects/mutation-types';
  import {Util} from '../../../shared/classes/Util';
  import {Types} from '../../../store/modules/projects/constant-types';
  import {ICustomer} from '../../../shared/interfaces/ICustomer';
  import {Routes} from '../../../router';
  import {ISchedule} from '../../../shared/interfaces/ISchedule';
  import {IType} from '../../../shared/interfaces/IType';
  import {IDomain} from '../../../shared/interfaces/IDomain';
  import {IProgram} from '../../../shared/interfaces/IProgram';

  interface IData {
    filteredTechnologies: {}[];
    filteredCustomers: {}[];
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
        filteredTechnologies: [],
        filteredCustomers: [],
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
      description: Util.mapTwoWay<string>(PROJECT_DESCRIPTION, SET_PROJECT_DESCRIPTION),
      pss: Util.mapTwoWay<number>(PROJECT_PSS, SET_PROJECT_PSS),
      customers: Util.mapTwoWay<ICustomer[]>(PROJECT_CUSTOMERS, SET_PROJECT_CUSTOMERS),
      schedules: Util.mapTwoWay<ISchedule[]>(PROJECT_SCHEDULES, SET_PROJECT_SCHEDULES),
      technologies: Util.mapTwoWay<ITechnology[]>(PROJECT_TECHNOLOGIES, SET_PROJECT_TECHNOLOGIES),
      programId: {
        get(): string {
          return this.$store.getters[PROJECT_PROGRAM_ID];
        },
        set(value: string) {
          this.$store.commit(SET_PROJECT_PROGRAM, this.$store.getters[ADDONS][Types.PROGRAM]
          .filter((program: IProgram) => program.id === value)[0]);
        }
      },
      domainId: {
        get(): string {
          return this.$store.getters[PROJECT_DOMAIN_ID];
        },
        set(value: string) {
          this.$store.commit(SET_PROJECT_DOMAIN, this.$store.getters[ADDONS][Types.DOMAIN]
          .filter((domain: IDomain) => domain.id === value)[0]);
        }
      },
      typeId: {
        get(): string {
          return this.$store.getters[PROJECT_TYPE_ID];
        },
        set(value: string) {
          this.$store.commit(SET_PROJECT_TYPE, this.$store.getters[ADDONS][Types.PROJECT_TYPE]
          .filter((type: IType) => type.id === value)[0]);
        }
      },
      addons(): {} {
        return this.$store.getters[ADDONS];
      }
    },
    validations() {
      return {
        name: {
          required
        },
        startDate: {
          required
        },
        endDate: {
          minValue: minValue(this.startDate)
        },
        description: {
          required
        },
        pss: {
          decimal
        }
      };
    },
    mounted() {
      this.$store.dispatch(FETCH_PROJECT_WITH_IMAGE, this.id)
        .then(() => {
          // Hack necessary due to https://github.com/buefy/buefy/issues/700
          // TODO change to actual computed+getter after fixed
          this.startDate = new Date(this.$store.getters[PROJECT_START_DATE]);
          const endDate = this.$store.getters[PROJECT_END_DATE];
          if (endDate) {
            this.endDate = new Date(endDate);
          }
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
        // Filter already selected
        this.filteredTechnologies = this.$store.getters[TECHNOLOGIES]
          .filter((tech: ITechnology) => !this.technologies.some((selected: ITechnology) => selected.id === tech.id))
          .filter((tech: ITechnology) => Util.containsIgnoreCase(tech.name, text)); // Search
      },
      getFilteredCustomers(text: string) {
        // Filter already selected
        this.filteredCustomers = this.$store.getters[ADDONS][Types.CUSTOMER]
          .filter((customer: ICustomer) => !this.customers.some((selected: ICustomer) => selected.id === customer.id))
          .filter((customer: ICustomer) => Util.containsIgnoreCase(customer.name, text)); // Search
      },
      goBack() {
        this.$router.push({name: Routes.Project, params: {id: this.id}});
      },
      setStartDate() {
        this.$store.commit(SET_PROJECT_START_DATE, this.startDate);
      },
      setEndDate() {
        this.$store.commit(SET_PROJECT_END_DATE, this.endDate);
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

    &-left {
      position: relative;
      top: 5px;
      margin-right: 10px;
    }
  }

  .field {
    max-width: 420px;
    width: 420px;

    &.is-short {
      width: 100%;
      box-sizing: border-box;
    }
  }

  .horizontal-field {
    padding-bottom: 0;
    margin-bottom: 0;

    .column {
      padding-bottom: 0;
    }
  }
</style>
