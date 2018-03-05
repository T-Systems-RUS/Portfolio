<template>
  <div class="columns">
    <div class="column is-one-quarter">FILTER</div>
    <div class="column">
      <div>
        <a
          class="button is-small"
          @click="newProject()">
          New project
        </a>
      </div>

      <div
        class="project"
        v-for="project in projects"
        :key="project.id"
        @click="deleteProject(index)">
        <h6 class="project-header title is-6 is-uppercase">{{ project.line }}</h6>
        <div class="project-body">
          <h6 class="title is-6">{{ project.name }}</h6>
          <h6 class="subtitle">{{ project.domain }}</h6>
          <div class="is-size-6">{{ project.description }}</div>
          <strong>{{ project.teamcount }}</strong>
          <div class="is-size-7">{{ new Date(project.startdate).toLocaleDateString() }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import axios from 'axios';
  import {Util} from '../../shared/classes/Util';
  import {DELETE_PROJECT, EDIT_PROJECT, NEW_PROJECT, SET_PROJECTS} from '../../store/mutation-types';
  import {IProject} from '../../store';

  export default Vue.extend({
    computed: {
      projects(): IProject[] {
        return this.$store.state.projects;
      }
    },
    created() {
      axios.get(Util.getApiUrl('projects'))
        .then(response => {
          this.$store.commit(SET_PROJECTS, response.data);
        });
    },
    methods: {
      newProject() {
        this.$store.commit(NEW_PROJECT, {name: 'test'});
      },
      editProject(index: number, item: IProject) {
        this.$store.commit(EDIT_PROJECT, {item, index});
      },
      deleteProject(index: number) {
        this.$store.commit(DELETE_PROJECT, index);
      }
    }
  });
</script>

<style lang="scss" scoped>
  @import '../../styles/variables';

  .project {
    vertical-align: middle;
    display: inline-block;
    height: 250px;
    width: 200px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    margin: 10px;

    .project-header {
      padding: 10px;
      background-color: $magenta;
      color: $white;
      margin-bottom: 0;
    }

    .project-body {
      padding: 10px;
    }
  }

</style>
