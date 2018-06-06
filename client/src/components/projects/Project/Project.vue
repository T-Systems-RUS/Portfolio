<template>
  <div class="container project">
    <div class="level  is-marginless">
      <p class="title is-4 is-size-18 project-secondary">{{project.updatedAt | date }} {{ project.program.line.name }}</p>
    </div>
    <div class="level  is-marginless">
      <p class="title is-7 project-header">{{ project.name }}</p>
    </div>
    <div class="level is-marginless">
      <div class="project-customers">
        <chip
          v-for="customer in project.customers"
          :key="customer.id"
          :name="customer.name"
          :selected = "customer.active"/>
      </div>
    </div>
    <div class="columns project-main">
      <div
        class="column"
        :class="{'is-half': project.image}">
        <p class="project-description">
          {{ project.description }}
        </p>
      </div>
      <div v-if="project.image" class="column is-half">
        <img class="project-image is-pulled-right" :src="image" alt="">
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <p class="title is-6 is-size-22">
          Details
        </p>
        <p>
          <span class="title is-5 is-size-16">Project duration: </span>
          <span class="title is-6 is-size-16">
            {{project.startdate | date}}
          </span>
          <span v-if="project.enddate">- {{project.enddate | date}}</span>
        </p>
        <p>
          <span class="title is-5 is-size-16">Production line: </span>
          <router-link to="/" class="title is-6 is-size-16 project-link is-magenta">
            {{project.program.line.name}}
          </router-link>
        </p>
        <p>
          <span class="title is-5 is-size-16">Program: </span>
          <router-link to="/" class="title is-6 is-size-16 project-link is-magenta">
            {{project.program.name}}
          </router-link>
        </p>
        <p class="project-mb30">
          <span class="title is-5 is-size-16">Domain: </span>
          <router-link to="/" class="title is-6 is-size-16 project-link is-magenta">
            {{project.domain.name}}
          </router-link>
        </p>

        <TechnologyPanel
          v-for="domain in Object.keys(technologies)"
          :domain="domain"
          :technologies="technologies[domain]"></TechnologyPanel>
      </div>
      <div class="column">
        <p class="title is-6 is-size-22">
          Team
          <span class="is-pulled-right">{{project.schedules.length}} FTE</span>
        </p>
        <ScheduleItem
          v-for="schedule in project.schedules"
          :schedule="schedule"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {FETCH_PROJECT} from '../../../store/modules/projects/action-types';
  import {PROJECT, PROJECT_TECHNOLOGIES} from '../../../store/modules/projects/getter-types';
  import Chip from '../../common/Chip/Chip.vue';
  import ScheduleItem from '../../employees/ScheduleItem/ScheduleItem.vue';
  import TechnologyPanel from '../../technologies/TechnologyPanel/TechnologyPanel.vue';
  import {IProject} from "../../../shared/interfaces/IProject";
  import {ITechnology} from "../../../shared/interfaces/ITechnology";

  export default Vue.extend({
    components: {
      Chip,
      TechnologyPanel,
      ScheduleItem
    },
    computed: {
      project(): IProject {
        return this.$store.getters[PROJECT];
      },
      technologies() :ITechnology[] {
        return this.$store.getters[PROJECT_TECHNOLOGIES];
      },
      image(): string {
        return `./server/images/${this.project.image}`;
      }
    },
    props: {
      id: {
        type: String
      }
    },
    mounted() {
      this.$store.dispatch(FETCH_PROJECT, this.id);
    },
    methods: {

    }
  });
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables';

  $image-width: 370px;
  $image-height: 250px;

  .project {
    &-secondary {
      color: $text-secondary3;
      margin-top: 30px;
      margin-bottom: 5px;
    }

    &-header {
      font-size: 40px;
      margin-bottom: 10px;
    }

    &-main{
      margin-top: 5px;
      margin-bottom: 30px;
    }

    &-image {
      width: $image-width;
      height: $image-height;
    }

    &-link {
      color: $magenta;
    }

    &-mb30 {
      margin-bottom: 30px;
    }
  }
</style>
