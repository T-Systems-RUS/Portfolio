<template>
  <div class="column project">
    Hello {{project.id}}
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {FETCH_PROJECT} from '../../../store/modules/projects/action-types';
  import {PROJECT} from '../../../store/modules/projects/getter-types';
  import {mapActions, mapGetters} from "vuex";

  export default Vue.extend({
    computed: {
      ...mapGetters({
        project: PROJECT
      })
    },
    created() {
      this.$store.dispatch(FETCH_PROJECT, this.$route.params.id);
    },
    methods: {

      // ...mapActions({
      //   fetchProject: FETCH_PROJECT
      // })
    }
  });
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables';
</style>
