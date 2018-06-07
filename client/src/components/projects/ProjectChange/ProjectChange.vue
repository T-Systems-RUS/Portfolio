<template>
  <CommonModal @exit="goBack">
    <template slot="modal-title">Edit project</template>
    <p
      class="manage-user-subtitle common-modal-subtitle has-text-centered is-size-5 is-size-6-mobile"
      slot="modal-subtitle">
      Please edit project information here
    </p>
    <template slot="modal-content">
      <div class="form-container">
        <div class="field centered-margin">
          <Stepper
            step="1"
            name="Main Information">
            <div class="field">
              <label class="label is-pulled-left">Project name</label>
              <div class="control">
                <input
                  v-model="project.name"
                  class="input"
                  type="text"
                  placeholder="Project name">
              </div>
            </div>
            <div class="field">
              <label class="label is-pulled-left">Production line</label>
              <div class="control">
                <div class="select">
                  <select/>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label is-pulled-left">Domain</label>
              <div class="select">
                <select/>
              </div>
            </div>
            <div class="field">
              <label class="label is-pulled-left">Program</label>
              <div class="select">
                <select/>
              </div>
            </div>
            <div class="field">
              <label class="label is-pulled-left">Project type</label>
              <div class="select">
                <select/>
              </div>
            </div>
            <div class="field">
              <div class="columns">
                <div class="column">
                  <div class="field">
                    <label class="label is-pulled-left">Project start</label>
                    <div class="control">
                      <b-datepicker
                        placeholder="Project start"
                        icon="calendar-today"
                        :readonly="false"/>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label is-pulled-left">Project end</label>
                    <div class="control">
                      <b-datepicker
                        placeholder="Project end"
                        icon="calendar-today"
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
                  v-model="project.description"
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



      </div>
      <div class="action-buttons field centered">
        <button class="button is-primary is-size-6 is-width-auto centered">
          Save
        </button>
      </div>
    </template>
  </CommonModal>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Stepper from '../../common/Stepper/Stepper.vue';
  import {FETCH_PROJECT} from '../../../store/modules/projects/action-types';
  import {PROJECT} from '../../../store/modules/projects/getter-types';
  import {ITechnology} from '../../../shared/interfaces/ITechnology';
  import {IProject} from '../../../shared/interfaces/IProject';
  import {TECHNOLOGIES} from '../../../store/modules/technologies/getter-types';
  import {FETCH_TECHNOLOGIES} from '../../../store/modules/technologies/action-types';

  export default Vue.extend({
    components: {
      Stepper
    },
    data() {
      return {
        projectTech: [],
        filteredTechnologies: []
      };
    },
    props: {
      id: {
        type: String
      }
    },
    computed: {
      project(): IProject {
        return this.$store.getters[PROJECT];
      },
      technologies(): ITechnology[] {
        return this.$store.getters[TECHNOLOGIES];
      }
    },
    mounted() {
      this.$store.dispatch(FETCH_PROJECT, this.id);
      this.$store.dispatch(FETCH_TECHNOLOGIES);
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

  .tag-image {
    width: 18px;
    position: absolute;
    margin-left: 10px;
  }
</style>
