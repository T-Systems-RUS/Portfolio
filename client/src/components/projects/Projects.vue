<template>
  <div class="columns projects">
    <div class="column is-one-quarter">
      <div class="filters"></div>
      <div>
        <Accordeon
          name="Production line" 
          v-bind:items="lines"/>
         <Accordeon
          name="Program" />
      </div>
    </div>
    <div class="column">
      <div class="level filters no-margin">
        <div class="level-left">
          <div class="filter">
            <img class="filter-img" src="../common/assets/download.svg" alt="">
          </div>
          <div class="filter">
            <img class="filter-img" src="../common/assets/sort.svg" alt="">
            <span class="filter-text">Sorted by: production line</span>
          </div>
        </div>
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
  import Accordeon from '../common/Accordeon/Accordeon.vue';
  import ProjectCard from './project-card/ProjectCard.vue';

  export default Vue.extend({
    computed: {
      projects(): IProject[] {
        return this.$store.state.projects;
      },
      lines(): String[] {
        return Array.from(new Set(this.projects.map(project => project.line)));
      }
    },
    components:{
      Accordeon,
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

  .projects{
    padding: 0 $side-padding;
  }

  .filters{
    height: 60px;

    &.no-margin{
      margin: 0;
    }
  }

  .filter{
    margin-right: 20px;

    &-text{
      color: $text-secondary;
      font-size: 14px;
      margin-left: 20px;
    }

    &-img{
      cursor: pointer;
      height: 27px;
    }
  }




</style>
