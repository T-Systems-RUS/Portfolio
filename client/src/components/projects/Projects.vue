<template>
  <div class="columns">
    <div class="column is-one-quarter">FILTER</div>
    <div class="column">
      <div
        v-for="project in projects"
        :key="project.id"
        class="project">
        <h6 class="project-header title is-6 is-uppercase">{{ project.line }}</h6>
        <div class="project-body">
          <h6 class="title is-6">{{ project.name }}</h6>
          <h6 class="subtitle">{{ project.domain }}</h6>
          <div class="is-size-6">{{ project.description }}</div>
          <strong>{{ project.teamcount }}</strong>
          <div>{{ new Date(project.startdate).toLocaleDateString() }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import axios from 'axios';
  import {Util} from '../../shared/classes/Util';

  export default Vue.extend({
    data() {
      return {
        projects: []
      };
    },
    created() {
      axios.get(Util.getApiUrl('projects'))
        .then(response => {
          this.projects = response.data
        });
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
