<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar v-if="!topNavBar" class="sidebar-container" />
    <div :class="{'noSidebar':topNavBar}" class="main-container" >
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <app-main />
      <right-panel>
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Navbar, Settings, Sidebar, AppMain } from './components'
import RightPanel from '@/components/RightPanel'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Settings,
    Sidebar,
    AppMain,
    RightPanel,
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      topNavBar: state => state.settings.topNavBar,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

  }

  .noSidebar{
      margin-left: 0!important;

      .fixed-header {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 9;
        width: 100%;
        transition: width 0.28s;
      }
    }

    .fixed-header {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 9;
      width: calc(100% - #{$sideBarWidth});
      transition: width 0.28s;
    }

    .hideSidebar .fixed-header {
      // width: calc(100% - 54px)
      width: calc(100% - 54px)
    }

  
</style>