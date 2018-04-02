<template>
  <div class="columns projects">
    <div class="column is-one-quarter projects-left">
      <div>
        <ProjectFilter/>
      </div>
    </div>
    <div class="column projects-right">
      <div class="level filters no-margin">
        <div class="level-left">
          <div class="filter">
            <img class="filter-img"
                 src="../common/assets/download.svg">
          </div>
          <div class="filter">
            <img class="filter-img"
                 src="../common/assets/sort.svg">
            <span class="filter-text">Sorted by: production line</span>
          </div>
        </div>
      </div>

      <project-card
        v-for="project in projects"
        :key="project.id"
        :project="project"
      />

    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapActions} from 'vuex';
  import * as types from '../../store/modules/projects/project-types';
  import {IProject} from '../../shared/interfaces/IProject';
  import ProjectCard from './project-card/ProjectCard.vue';
  import ProjectFilter from './project-filter/ProjectFilter.vue';

  export default Vue.extend({
    computed: {
      projects(): IProject[] {
        return this.$store.state.projects.projects;
      }
    },
    components: {
      ProjectCard,
      ProjectFilter
    },
    created() {
      this.fetchProjects();
    },

    methods: {
      ...mapActions({
        fetchProjects: types.FETCH_PROJECTS
      })
    }
  });
</script>

<style lang="scss" scoped>
  @import '../../styles/variables';

  $filters-top: 125px;

  .projects{
    padding: 0 $side-padding;

    &-left {
      position: fixed;
      padding-top: 0;
      top: $filters-top;
      bottom: 0;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 5px;

        &-track {
          -webkit-box-shadow: inset 0 0 1px rgba(0,0,0,0.3);
        }

        &-thumb {
          background-color: $lite-grey;
          outline: 1px solid $lite-grey;
        }
      }
    }

    &-right {
      margin-left: 25%;
      padding-left: 20px;
    }
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
