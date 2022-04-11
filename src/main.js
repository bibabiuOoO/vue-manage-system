import Vue from 'vue'
import App from './App.vue'
import {
  Button,
  Container,
  Aside,
  Header,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  RadioGroup,
  RadioButton,
  Icon,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  TableColumn,
  Table,
  Breadcrumb,
  BreadcrumbItem,
  Tag
} from 'element-ui'
import router from '../router'
import store from './store'
import http from 'axios'
import '../api/mock.js'

// Vue.component('el-button', Button)
Vue.use(Button)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(RadioButton)
Vue.use(RadioGroup)
Vue.use(Icon)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)


// axios不是插件,所以想使用它只能给Vue的原型
// 绑定上一个方法
Vue.prototype.$http = http

import './assets/css/base.css'

Vue.config.productionTip = false


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')