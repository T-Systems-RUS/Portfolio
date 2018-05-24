<template>
  <div class="header level">
    <div class="level-left">
      <div class="header-logo level-item">
        <img src="../assets/logo-tportfolio.svg">
      </div>
      <nav class="header-nav level-item">
        <a
          href="/"
          class="header-nav-item is-active">
          Projects
        </a>
        <a
          href="#"
          class="header-nav-item">
          Employees
        </a>
        <a
          href="#"
          class="header-nav-item">
          Technologies
        </a>
        <a
          href="#"
          class="header-nav-item">
          Statistik
        </a>
        <a
          href="#"
          class="header-nav-item">
          Help
        </a>
      </nav>
    </div>
    <div class="level-right">
      <a class="search-bar level-item">
        <transition name="search">
          <Search v-if="searchToggled"/>
        </transition>
      </a>

      <a
        class="level-item"
        @click="toggleSearch">
        <img
          v-if="!searchToggled"
          src="../assets/search.svg">
        <img
          v-if="searchToggled"
          class="close-icon"
          src="../assets/close.svg">
      </a>
      <a class="level-item">
        <img src="../assets/user.svg">
      </a>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Search from './Search.vue';

  export default Vue.extend({
    components: {
      Search
    },
    data() {
      return {
        searchToggled: false
      };
    },
    methods: {
      toggleSearch() {
        this.searchToggled = !this.searchToggled;
      }
    }
  });
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables';
  @import '../../../../node_modules/bulma/sass/utilities/mixins';

  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background-color: $white;
    border-top: $top-border-height solid $magenta;
    height: $header-height;
    padding: 0 $side-padding;
    box-shadow: $shadow;

    &-nav {
      margin-left: 20px;

      &-item {
        color: $text-color;
        margin-right: 30px;
        transition: all .3s;

        &.is-active {
          font-weight: bold;
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .close-icon {
      width: 20px;
    }
  }

  .search-enter-active, .search-leave-active {
    width: 100%;
    transition: all 0.5s ease;
    opacity: 1;
  }

  .search-enter, .search-leave-to {
    width: 0;
    opacity: 0;
  }
</style>
