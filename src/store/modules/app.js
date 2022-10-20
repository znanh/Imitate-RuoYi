
import { CookieUtils } from '@/utils/cookieUtils'

const state = {
  sidebar: {
    // opened: true,
    // opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    opened: CookieUtils.getCookie('sidebarStatus') ? !! + CookieUtils.getCookie('sidebarStatus') : true
  },
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      // Cookies.set('sidebarStatus', 1)
      CookieUtils.setCookie('sidebarStatus', 1)
    } else {
      // Cookies.set('sidebarStatus', 0)
      CookieUtils.setCookie('sidebarStatus', 0)
    }
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
