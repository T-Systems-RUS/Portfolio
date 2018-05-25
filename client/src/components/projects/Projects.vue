<template>
  <div class="columns projects">
    <div class="column is-one-quarter projects-left">
      <div>
        <ProjectFilter/>
      </div>
    </div>
    <div class="column projects-right">
      <AppliedFilters/>
      <p
        class="projects is-empty"
        v-if="!projects.length">No projects found</p>

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
  import {mapActions, mapGetters} from 'vuex';
  import ProjectCard from './project-card/ProjectCard.vue';
  import ProjectFilter from './project-filter/ProjectFilter.vue';
  import AppliedFilters from './AppliedFilters/AppliedFilters.vue';
  import {FETCH_PROJECTS} from '../../store/modules/projects/action-types';
  import {PROJECTS} from '../../store/modules/projects/getter-types';

  export default Vue.extend({
    computed: {
      ...mapGetters({
        projects: PROJECTS
      })
    },
    components: {
      ProjectCard,
      ProjectFilter,
      AppliedFilters
    },
    created() {
      this.fetchProjects();
    },

    methods: {
      ...mapActions({
        fetchProjects: FETCH_PROJECTS
      })
    }
  });
</script>

<style lang="scss" scoped>
  @import '../../styles/variables';

  $filters-top: 125px;

  .projects {
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
          -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.3);
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

    &.is-empty {
      font-size: 40px;
      margin-top: 100px;
      text-align: center;
    }
  }

</style>
