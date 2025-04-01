/**
 * 前端应用入口文件
 * 这个文件是整个Vue前端应用的入口点，负责创建Vue应用实例并挂载到DOM
 */

// 导入Vue的createApp函数，用于创建Vue应用实例
import { createApp } from 'vue'
// 导入根组件App.vue
import App from './App.vue'
// 导入路由配置
import router from './router'
// 导入状态管理配置
import store from './store'
// 导入Element Plus UI库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 导入axios用于HTTP请求
import axios from 'axios'

// 配置axios默认值
axios.defaults.baseURL = 'http://localhost:3000'
// 如果localStorage中有token，则设置默认请求头
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['x-auth-token'] = token
}

// 创建Vue应用实例
const app = createApp(App)

// 注册路由、状态管理和UI组件库
app.use(router)
app.use(store)
app.use(ElementPlus)

// 挂载应用到DOM
app.mount('#app')
