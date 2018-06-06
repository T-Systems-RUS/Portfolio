<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <span class="is-pulled-left logo">
          <img src="../assets/deutsche-telekom-logo.svg">
        </span>
        <span>
          Imprint
        </span>
        <span>
          Contact
        </span>
        <span>
          FAQ
        </span>
        <span>
          Privacy Policy
        </span>
        <span class="copyright">
          © 2018 Deutsche Telekom AG
        </span>
      </div>
    </div>
  </footer>
</template>

<style lang='scss' scoped>
  @import '../../../styles/variables';
  @import '../../../../node_modules/bulma/sass/utilities/initial-variables';

  $footer-background-color: $light-black;

  @import '../../../../node_modules/bulma/sass/layout/footer';
  @import '../../../../node_modules/bulma/sass/utilities/mixins';

  .footer {
    height: $header-bar-height;
    padding: 26px;
    color: $white;

    @include mobile {
      height: $header-bar-height * 2;
    }

    .container {
      height: 100%;

      span {
        margin-right: 24px;

        &.logo {
          position: absolute;
          bottom: -8px;
          left: 0;
        }

        &.copyright {
          position: absolute;
          bottom: 2px;
          right: 0;
        }
      }
    }
  }
</style>
