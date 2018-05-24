<template>
  <CommonModal>
    <template slot="modal-title">Edit project</template>
    <p
      class="manage-user-subtitle common-modal-subtitle has-text-centered is-size-5 is-size-6-mobile"
      slot="modal-subtitle">
      Please edit project information here
    </p>
    <template slot="modal-content">
      <div class="form-container">
        <div class="field centered">
          <label class="label is-pulled-left is-required">Some select</label>
          <div class="control">
            <div class="select">
              <select/>
            </div>
          </div>
        </div>
        <div class="field centered">
          <label class="label is-pulled-left is-required">Field</label>
          <div class="control">
            <input
              class="input"
              type="text">
          </div>
        </div>
        <div class="field centered">
          <label class="label is-pulled-left is-required">Other field</label>
          <div class="control">
            <input
              class="input"
              type="text">
          </div>
        </div>
        <div class="field centered">
          <label class="label is-pulled-left is-required">More fields</label>
          <div class="control">
            <input
              class="input"
              type="text">
          </div>
        </div>
        <div class="field centered">
          <label class="label is-pulled-left is-required">Even more</label>
          <div class="control">
            <input
              class="input"
              type="text">
          </div>
        </div>
        <div class="field centered">
          <label class="label is-pulled-left is-required">Some select</label>
          <div class="control">
            <div class="select">
              <select/>
            </div>
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
