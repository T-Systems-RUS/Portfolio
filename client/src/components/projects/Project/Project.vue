<template>
  <div class="container project">
    <ConfirmModal
      v-if="modalVisible"
      @exit="closeModal"
      @confirm="deleteProject">
      <template slot="modal-title">
        Delete project?
      </template>
      <template slot="modal-body">
        <p class="title is-4 is-size-18 has-text-centered">
          Would you like to delete project
          <span class="title is-5">{{ project.name }}?</span>
        </p>
      </template>
      <template slot="confirm-button-text">Delete project</template>
    </ConfirmModal>
    <div class="level  is-marginless">
      <p
        class="title
                is-4
                is-size-18
                project-secondary">
        {{ project.updatedAt | date }} {{ project.program.line.name }}
      </p>
    </div>
    <div class="level  is-marginless">
      <p class="title is-7 is-size-40 project-header">{{ project.name }}</p>
      <Ribbon
        value="Completed"
        :is-big="true"
        :visible="isCompleted"/>
    </div>
    <div class="level is-marginless">
      <div class="project-customers">
        <chip
          v-for="customer in project.customers"
          :id="customer.id"
          :key="customer.id"
          :name="customer.name"
          :selected="customer.active"
          :with-image="true"
          :image="customer.image"
          :filter-key="'customers'"
          :project-chip="true"/>
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
      <div
        class="column is-half"
        v-if="project.image">
        <img
          class="project-image is-pulled-right"
          :src="`./server/images/${project.image}`">
      </div>
    </div>
    <div class="columns project-nomb">
      <div class="column">
        <p class="title is-6 is-size-22">
          Details
        </p>
        <p>
          <span class="title is-5 is-size-16">Project duration: </span>
          <span class="title is-6 is-size-16">
            {{ project.startdate | date }}
          </span>
          <span
            v-if="project.enddate"
            class="title is-6 is-size-16">
            - {{ project.enddate | date }}
          </span>
        </p>
        <p>
          <span class="title is-5 is-size-16">Production line: </span>
          <a
            @click="openWithFilter('line', project.program.line.id)"
            class="title is-6 is-size-16 project-link is-magenta">
            {{ project.program.line.name }}
          </a>
        </p>
        <p>
          <span class="title is-5 is-size-16">Program: </span>
          <a
            @click="openWithFilter('program', project.program.id)"
            class="title is-6 is-size-16 project-link is-magenta">
            {{ project.program.name }}
          </a>
        </p>
        <p class="project-mb30">
          <span class="title is-5 is-size-16">Domain: </span>
          <a
            @click="openWithFilter('domain', project.domain.id)"
            class="title is-6 is-size-16 project-link is-magenta">
            {{ project.domain.name }}
          </a>
        </p>

        <TechnologyPanel
          v-for="(domain, key) in technologies"
          :key="key"
          :domain="key"
          :technologies="domain"/>
      </div>
      <div class="column">
        <p
          class="title is-6 is-size-22"
          v-if="project.schedules.length">
          Team
          <span class="is-pulled-right">{{ project.schedules.length }} FTE</span>
        </p>
        <ScheduleItem
          v-for="schedule in project.schedules"
          :key="schedule.id"
          :schedule="schedule"/>
      </div>
    </div>

    <ProjectFooter @delete="showDeleteModal"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {DELETE_PROJECT, FETCH_PROJECT} from '../../../store/modules/projects/action-types';
  import {PROJECT, PROJECT_TECHNOLOGIES_GROUPED} from '../../../store/modules/projects/getter-types';
  import ConfirmModal from '../../common/ConfirmModal/ConfirmModal.vue';
  import Chip from '../../common/Chip/Chip.vue';
  import ProjectFooter from './ProjectFooter.vue';
  import ScheduleItem from '../../employees/ScheduleItem/ScheduleItem.vue';
  import TechnologyPanel from '../../technologies/TechnologyPanel/TechnologyPanel.vue';
  import {IProject} from '../../../shared/interfaces/IProject';
  import {ITechnology} from '../../../shared/interfaces/ITechnology';
  import {Util} from '../../../shared/classes/Util';
  import {Routes} from '../../../router';

  export default Vue.extend({
    components: {
      Chip,
      ProjectFooter,
      TechnologyPanel,
      ScheduleItem,
      ConfirmModal
    },
    data() {
      return {
        modalVisible: false
      };
    },
    computed: {
      project(): IProject {
        return this.$store.getters[PROJECT];
      },
      technologies(): ITechnology[] {
        return this.$store.getters[PROJECT_TECHNOLOGIES_GROUPED];
      },
      isCompleted(): boolean {
        return Util.projectCompleted(this.project);
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
      showDeleteModal() {
        this.modalVisible = !this.modalVisible;
      },
      closeModal() {
        this.modalVisible = false;
      },
      deleteProject() {
        this.$store.dispatch(DELETE_PROJECT, this.project.uniqueId);
      },
      openWithFilter(key: string, value: string) {
        this.$router.push({name: Routes.Projects, query: {[key]: value.toString()}});
      }
    }
  });
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables';

  $image-width: 370px;
  $image-height: 250px;

  .project {
    margin-bottom: 100px;


    &-secondary {
      color: $text-secondary3;
      margin-top: 30px;
      margin-bottom: 5px;
    }

    &-header {
      margin-bottom: 10px;
    }

    &-main {
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

    &-nomb {
      margin-bottom: 0;
    }
  }
</style>
