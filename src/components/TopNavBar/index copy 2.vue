<template>
    <el-menu
        :default-active="activeMenu"
        :collapse="false"
        text-color="#909399"
        :unique-opened="false"
        active-text-color="#303133"
        :collapse-transition="false"
        mode="horizontal"
        :class="{'flexdis':true}"
        class="el-menu-demo"
        menu-trigger="click"
      >
      
        <!-- <top-nav-bar-item v-for="(route,index) in routes" :key="route.path" :item="route" :index="index" :base-path="route.path" /> -->
        <!-- <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" /> -->

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
// import SidebarItem from '@/layout/components/Sidebar/SidebarItem'

export default {
    name:'TopNavBar',
    components:{
        TopNavBarItem,
        // SidebarItem,
        Item, AppLink
    },
    mixins: [FixiOSBug],
    computed:{
        theme() {
            return '#409EFF';
        },
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
        // 默认激活的菜单
        activeMenu() {
            const path = this.$route.path;
            let activePath = this.defaultRouter();
            if (path.lastIndexOf("/") > 0) {
                const tmpPath = path.substring(1, path.length);
                activePath = "/" + tmpPath.substring(0, tmpPath.indexOf("/"));
            } else if ("/index" == path || "" == path) {
                if (!this.isFrist) {
                this.isFrist = true;
                } else {
                activePath = "index";
                }
            }
            var routes = this.activeRoutes(activePath);
            if (routes.length === 0) {
                activePath = this.currentIndex || this.defaultRouter()
                this.activeRoutes(activePath);
            }
            return activePath;
        },
    },
    data(){
        return{
            basePath:'/',
            // 是否为首次加载
            isFrist: false,
            // 当前激活菜单的 index
            currentIndex: undefined
        }
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
        },
        // 默认激活的路由
        defaultRouter() {
            let router;
            Object.keys(this.routers).some((key) => {
                if (!this.routers[key].hidden) {
                router = this.routers[key].path;
                return true;
                }
            });
            return router;
        },
        // 当前激活的路由
        activeRoutes(key) {
            var routes = [];
            if (this.childrenMenus && this.childrenMenus.length > 0) {
                this.childrenMenus.map((item) => {
                if (key == item.parentPath || (key == "index" && "" == item.path)) {
                    routes.push(item);
                }
                });
            }
            // if(routes.length > 0) {
                this.$store.commit("SET_SIDEBAR_ROUTERS", routes);
            // }
            console.log(routes);
            
            return routes;
        },
    }
}
</script>

<style lang="scss">
.flexdis{
    display: flex;
    /* float: left; */
}
.topBarmenu-container.el-menu--horizontal >a> .el-menu-item {
  float: left;
  height: 50px !important;
  line-height: 50px !important;
  color: #999093 !important;
  padding: 0 5px !important;
  margin: 0 10px !important;
}

.topBarmenu-container.el-menu--horizontal > a > .el-menu-item.is-active, .topBarmenu-container.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
//   border-bottom: 2px solid #{'var(--theme)'} !important;
  border-bottom: 2px solid #409EFF !important;
  color: #303133!important;
}

/* submenu item */
.topBarmenu-container.el-menu--horizontal > .el-submenu .el-submenu__title {
  float: left;
  height: 50px !important;
  line-height: 50px !important;
  color: #999093 !important;
  padding: 0 5px !important;
  margin: 0 10px !important;
}
</style>