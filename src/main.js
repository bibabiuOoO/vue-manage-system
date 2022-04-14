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
  Tag,
  Form,
  FormItem,
  Input,
  Switch,
  DatePicker,
  Select,
  Option,
  Dialog,
 Pagination,
  MessageBox,
  Message,

} from 'element-ui'
import router from '../router'
import store from './store'
import http from 'axios'
import '../api/mock.js'
import './assets/css/base.css'
Vue.config.productionTip = false

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
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Pagination)


// 定义路由守卫?为什么配置在main.js中
router.beforeEach((to, from, next) => {
  console.log('守卫调用前')

  // 防止丢失页面登录信息
  store.commit('user/getToken')

  const token = store.state.user.token
  if (!token && to.name !== 'login') {
    next({
      name: 'login'
    })
  } else {
    next()
  }
  console.log('守卫调用后')
})

// axios不是插件,所以想使用它只能给Vue的原型
// 绑定上一个方法
Vue.prototype.$http = http
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$Message = Message

// 添加全局loading加载指令
// Vue.directive('loading', {
//   bind: function (el, binding, vnode) {
//     if (binding.value) {
//       //  若果是true创建一个div
//       let div = document.createElement('div');
//       //  插入到被绑定的元素内部
//       el.appendChild(div);
//       //  div内部加入内容
//       div.innerHTML = '加载中...';
//       //  el 元素设置相对定位   div设置绝对定位
//       el.setAttribute('class', 'elrelative');
//       //  设置绝对定位
//       div.setAttribute('class', 'divabsolute');

//     } else {
//       //  去掉div  去掉样式  去掉定位 
//       const ds = document.getElementsByClassName('divabsolute')[0];
//       if (ds) {
//         el.removeChild(ds);
//       }

//     }
//   }
// })

// Loading.service(options);


new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    store.commit('tab/addMenu', router)
  }
}).$mount('#app')