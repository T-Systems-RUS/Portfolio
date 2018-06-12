<template>
  <transition name="opacity">
    <div class="modal is-active">
      <div class="modal-background"/>
      <div class="modal-card">
        <header class="modal-card-head">
          <h3 class="modal-card-title is-size-3 has-text-centered">
            <slot name="modal-title"/>
          </h3>
        </header>
        <section class="modal-card-body">
          <slot name="modal-body"/>
        </section>
        <footer class="modal-card-foot has-text-centered">
          <div class="modal-confirm is-inline-block">
            <slot name="confirm-button">
              <button
                class="button is-primary"
                slot="modal-buttons"
                @click="confirm">
                <slot name="confirm-button-text">
                  Confirm
                </slot>
              </button>
            </slot>
          </div>
          <a
            role="button is-inline-block"
            @click="exit">Cancel</a>
        </footer>
        <button
          @click="exit"
          class="modal-card-close"/>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    methods: {
      exit() {
        this.$emit('exit');
      },
      confirm() {
        this.$emit('confirm');
      }
    },
    created() {
      document.documentElement.classList.add('is-clipped');
    },
    destroyed() {
      document.documentElement.classList.remove('is-clipped');
    }
  });
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables';
  @import '~bulma/sass/utilities/mixins';

  $padding-hz: $building-unit * 2;
  $padding-top: 54px;
  $padding-bottom: 48px;
  $padding-hz-mobile: $building-unit;
  $close-position: $building-unit * 1.5;
  $close-size: $building-unit * 2;
  $modal-buttons-margin-bottom: $building-unit * 1.5;

  .modal {

    .modal-card {
      position: relative;

      @include mobile {
        width: 100%;
        height: 100%;
        margin: 0;
        max-height: 100vh;
        background: $white;
      }
    }

    .modal-card-head {
      background-color: $white;
      border: 0;
      padding: $padding-top $padding-hz $building-unit;

      @include mobile {
        padding-left: $padding-hz-mobile;
        padding-right: $padding-hz-mobile;
        border-radius: 0;
      }
    }

    .modal-card-body {
      padding: 0 $padding-hz $building-unit * 2;
      flex-grow: 0;

      @include mobile {
        padding-left: $padding-hz-mobile;
        padding-right: $padding-hz-mobile;
        padding-top: $building-unit;
      }
    }

    .modal-card-foot {
      background-color: $white;
      border: 0;
      flex-direction: column;
      padding-left: $padding-hz;
      padding-right: $padding-hz;
      padding-bottom: $padding-bottom;

      @include mobile {
        padding-left: $padding-hz-mobile;
        padding-right: $padding-hz-mobile;
        border-radius: 0;
      }
    }

    .modal-confirm {
      margin-bottom: $modal-buttons-margin-bottom;

      .button {
        line-height: .5;
      }
    }

    .modal-card-close {
      position: absolute;
      right: $close-position;
      top: $close-position;
      width: $close-size;
      height: $close-size;
      outline: none;
      border: 0;
      background: center / contain url('./cancel_outline.svg') no-repeat;
      box-shadow: none;
      cursor: pointer;
    }
  }
</style>
