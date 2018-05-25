<template>
  <div class="project-card is-clickable">
    <router-link :to="{ path: 'projects/' + project.id }">
      <div class="project-card-header title is-7 is-size-16 is-centered is-uppercase">
        {{ project.program.line.name }}
      </div>
      <div class="project-card-body">
        <h6 class="project-card-title title is-7 is-size-16">
          {{ project.name }}
        </h6>
        <div class="title is-5 is-size-12 is-secondary">
          {{ project.domain.name }}
        </div>
        <div class="project-card-description title is-4 is-size-14">
          {{ project.description }}
        </div>
      </div>
      <div class="project-card-footer">
        <div class="project-card-team">
          <img src="../../root/assets/team.svg">
          <span class="title is-6 is-size-19">{{ teamCount }}</span>
        </div>
        <div class="title is-5 is-size-12 is-secondary">
          {{ project.updatedAt | date }}
        </div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {IProject} from '../../../shared/interfaces/IProject';

  export default Vue.extend({
    props: {
      project: {
        type: Object as () => IProject,
        required: true
      }
    },
    computed: {
      teamCount(): number {
        return this.project.schedules.length;
      }
    }
  });
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables';

  $header-height: 35px;
  $padding: 17px;
  $margin: 20px;
  $card-width: 230px;
  $card-height: 245px;

  .project-card {
    display: inline-block;
    line-height: 1;
    margin: 0 $margin $margin 0;
    height: $card-height;
    position: relative;
    width: $card-width;
    box-shadow: $shadow;
    vertical-align: top;

    &.is-clickable {
      cursor: pointer;
    }

    &-header {
      background-color: $magenta;
      color: $white;
      height: $header-height;
      margin-bottom: $margin;
      padding: 0 $padding;

      &.is-centered {
        line-height: $header-height;
        vertical-align: middle;
      }
    }

    &-body {
      padding: 0 $padding;
      max-height: 125px;
      overflow: hidden;
    }

    &-title {
      margin-bottom: 3px;
    }

    &-footer {
      padding: 0 $padding;
      position: absolute;
      bottom: 10px;
    }

    &-team {
      margin-bottom: 10px;
    }

    &-description {
      margin-top: 24px;
    }
  }
</style>
