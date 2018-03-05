<template>
  <div class="header">
    <div class="header-bar brand-bar">
      <div class="container">
        <img src="./assets/deutsche-telekom-logo.svg">
        <strong class="is-pulled-right title is-6 is-uppercase">
          Life is for sharing.
        </strong>
      </div>
    </div>
    <div class="header-bar nav-bar">
      <div class="container">
        <strong class="inline title is-5 is-uppercase">
          T-Portfolio
        </strong>

        <div class="control is-pulled-right">
          <div class="select">
            <select>
              <option>EN</option>
              <option>DE</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../styles/variables';
  @import '~bulma/sass/utilities/mixins';

  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;

    .header-bar {
      height: $header-bar-height;
      background-color: $white;
      padding: 24px;

      strong {
        position: relative;
        font-weight: bold;
      }

      &.brand-bar {
        background-color: $magenta;
        color: $white;

        strong {
          top: 10px;
          color: $white;
        }
      }

      &.nav-bar {
        strong {
          top: 6px;

          @include mobile {
            display: none;
          }
        }
      }
    }
  }
</style>
