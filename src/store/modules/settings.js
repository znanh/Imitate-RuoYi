import defaultSettings from '@/settings'

const { showSettings, topNav, topNavBar, sidebarLogo, fixedHeader, dynamicTitle } = defaultSettings

const state = {
  title: '',
  showSettings: showSettings,
  topNav: topNav,
  topNavBar: topNavBar,
  sidebarLogo: sidebarLogo,
  fixedHeader: fixedHeader,
  dynamicTitle: dynamicTitle
}
const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  // 修改布局设置
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  // 设置网页标题
  setTitle({ commit }, title) {
    state.title = title
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
