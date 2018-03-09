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

      <project-card
        v-for="project in projects"
        :key="project.id"
        v-bind:project="project">
      </project-card>
     
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import axios from 'axios';
  import {Util} from '../../shared/classes/Util';
  import {DELETE_PROJECT, EDIT_PROJECT, NEW_PROJECT, SET_PROJECTS} from '../../store/mutation-types';
  import {IProject} from '../../shared/interfaces/project';
  import ProjectCard from './project-card/ProjectCard.vue';

  export default Vue.extend({
    computed: {
      projects(): IProject[] {
        return this.$store.state.projects;
      }
    },
    components:{
      ProjectCard
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
    vertical-align: top;
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
