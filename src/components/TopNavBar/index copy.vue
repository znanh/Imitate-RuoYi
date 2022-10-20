<template>
    <el-menu
        :collapse="false"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="horizontal"
        :class="{'flexdis':true}"
      >
      
        <!-- <top-nav-bar-item v-for="(route,index) in routes" :key="route.path" :item="route" :index="index" :base-path="route.path" /> -->

        <template v-for="(route,index) in routes">
            <template v-if="!route.hidden">
                <template v-if="hasOneShowingChild(route.children,route) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!route.alwaysShow">
                    <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)" :key="route.path">
                        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':true}">
                            <item :icon="onlyOneChild.meta.icon||(route.meta&&route.meta.icon)" :title="onlyOneChild.meta.title" />
                        </el-menu-item>
                    </app-link>
                </template>
                <top-nav-bar-item v-else :item="route" :index="index" :key="route.path" :base-path="route.path"></top-nav-bar-item>
            </template>
        </template>
      </el-menu>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from '@/layout/components/Sidebar/Item'
import AppLink from '@/layout/components/Sidebar/Link'
import FixiOSBug from '@/layout/components/Sidebar/FixiOSBug'

import { eurl } from "@/router";
// import { constantRoutes } from "@/router";
import variables from '@/styles/variables.scss'
import TopNavBarItem from './TopNavBarItem'

export default {
    name:'TopNavBar',
    components:{
        TopNavBarItem,
        Item, AppLink
    },
    mixins: [FixiOSBug],
    computed:{
        topMenus() {
            let topMenus = [];
            this.routers.map((menu) => {
                if (menu.hidden !== true) {
                // 兼容顶部栏一级菜单内部跳转
                if (menu.path === "/") {
                    topMenus.push(menu.children[0]);
                } else {
                    topMenus.push(menu);
                }
                }
            });
            // console.log(topMenus);
            
            return topMenus;
        },
        routers() {
            return eurl
            // return constantRoutes
        },
        routes() {
            // console.log(this.$router.options.routes);
            
          return this.$router.options.routes
        },
        variables() {
      return variables
    },
    
    },
    mounted(){
        const vnodes = []
        // const routes = this.routes
        const noHideeRoutes = this.routes.filter(item => !item.hidden)
        // console.log(noHideeRoutes);
        /* let index = 1
        for(let item of noHideeRoutes){
            if(item.path === '/'){
                vnodes.push(h('el-menu-item',{
                    domProps: {
                        innerHTML: `${item.children[0].name}`
                    },
                    props: {
                        index: `${index}`
                    },
                }))
            }else {
                if(item.children.length == 1){
                    vnodes.push(h('el-menu-item',{
                        domProps: {
                            innerHTML: `${item.children[0].name}`
                        },
                        props: {
                            index: `${index}`
                        },
                     }))
                }else {
                    vnodes.push(h('el-submenu',{
                        props: {
                            index: `${index}`
                        },
                    },
                    [
                        h('template',{
                            slot: 'title'
                        }, title)
                    ]
                    ))
                }
            }
            index++
        } */
    },
    /* render(h){
        const vnodes = []
        const routes = this.routes
        const noHideeRoutes = routes.map(item => !item.hidden)
        console.log(noHideeRoutes);
        
    } */
    methods:{
        hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
    }
}
</script>

<style scoped>
.flexdis{
    display: flex;
    /* float: left; */
}
</style>