<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
      <template v-if="topNav">
        <sidebar-item v-for="route in sidebarRouters" :key="route.path" :item="route" :base-path="route.path" />
      </template>
      <template v-else>
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem,Logo },
  computed: {
    ...mapGetters([
      'sidebar',"sidebarRouters"
    ]),
    topNav(){
      return this.$store.state.settings.topNav
    },
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style>
/*隐藏文字*/
  .el-menu--collapse  .el-submenu__title span{
    display: none;
  }
  .el-menu--collapse  .el-menu-item span{
    display: none;
  }
  
  /*隐藏 > */
  .el-menu--collapse  .el-submenu__title .el-submenu__icon-arrow{
    display: none;
  }
</style>
