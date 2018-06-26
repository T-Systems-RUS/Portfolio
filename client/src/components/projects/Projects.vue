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

      <div>
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
        />
      </div>


    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapActions, mapGetters} from 'vuex';
  import ProjectCard from './ProjectCard/ProjectCard.vue';
  import ProjectFilter from './ProjectFilter/ProjectFilter.vue';
  import AppliedFilters from './AppliedFilters/AppliedFilters.vue';
  import {FETCH_PROJECTS, SYNC_PARAMS} from '../../store/modules/projects/action-types';
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
      this.syncParams();
      this.fetchProjects();
    },

    methods: {
      ...mapActions({
        fetchProjects: FETCH_PROJECTS,
        syncParams: SYNC_PARAMS
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
