<template>
  <CommonModal @exit="goBack">
    <template slot="modal-title">Edit project</template>
    <p
      class="manage-user-subtitle common-modal-subtitle has-text-centered is-size-5 is-size-6-mobile"
      slot="modal-subtitle">
      Please edit project information here
    </p>
    <template slot="modal-content">
      <div class="form-container">

        <div class="field centered-margin">
          <label class="label is-pulled-left">Project name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Project name">
          </div>
        </div>
        <div class="field centered-margin">
          <label class="label is-pulled-left">Production line</label>
          <div class="control">
            <div class="select">
              <select/>
            </div>
          </div>
        </div>
        <div class="field centered-margin">
          <label class="label is-pulled-left">Domain</label>
          <div class="select">
            <select/>
          </div>
        </div>
        <div class="field centered-margin">
          <label class="label is-pulled-left">Program</label>
          <div class="select">
            <select/>
          </div>
        </div>
        <div class="field centered-margin">
          <label class="label is-pulled-left">Project type</label>
          <div class="select">
            <select/>
          </div>
        </div>
        <div class="field centered-margin">
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label is-pulled-left">Project start</label>
                <div class="control">
                  <b-datepicker
                    placeholder="Project start"
                    icon="calendar-today"
                    :readonly="false"/>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label is-pulled-left">Project end</label>
                <div class="control">
                  <b-datepicker
                    placeholder="Project end"
                    icon="calendar-today"
                    :readonly="false"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="field centered-margin">
          <label class="label is-pulled-left">Customer</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Customer">
          </div>
        </div>
        <div class="field centered-margin">
          <label class="label is-pulled-left">PSS</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="PSS">
          </div>
        </div>
        <div class="field centered-margin">
          <label class="label is-pulled-left">Description</label>
          <div class="control">
            <textarea
              class="textarea"
              placeholder="Description"/>
          </div>
        </div>
        <div class="field centered-margin">
          <label class="label is-pulled-left">Technologies</label>
          <div class="control">
            <b-taginput
              :allow-new="true"
              autocomplete
              icon="label"
              placeholder="Technologies"/>
          </div>
        </div>
      </div>
      <div class="action-buttons field centered">
        <button class="button is-primary is-size-6 is-width-auto  centered">
          Save
        </button>
      </div>
    </template>
  </CommonModal>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    methods: {
      goBack() {
        this.$router.push({path: '/'});
      }
    }
  });
</script>
