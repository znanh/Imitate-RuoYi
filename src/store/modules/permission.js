const permission = {
  state: {
    sidebarRouters: []
  },
  mutations: {
    SET_SIDEBAR_ROUTERS: (state, routes) => {
      state.sidebarRouters = routes
    },
  }
}

export default permission
