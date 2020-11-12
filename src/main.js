// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locales'
import bootstrap from './core/bootstrap'

import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { PageLoading } from '@/components'
import themeConfig from './config/theme.config.js'

import './core/lazy_use' // use lazy load components
// 路由守卫
import './router/router-guards'
// 其他
import './styles/global.less'

// ProLayout
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)
window.umi_plugin_ant_themeVar = themeConfig.theme

// Global imports
Vue.use(PageLoading)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: h => h(App),
}).$mount('#app')
