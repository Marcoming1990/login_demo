/**
 * 前端路由配置文件
 * 这个文件负责配置Vue Router，定义应用的路由映射和导航守卫
 */

// 导入Vue Router的createRouter和createWebHistory函数
import { createRouter, createWebHistory } from 'vue-router'

// 导入视图组件
// 注意：这里使用了Vue Router的懒加载功能，只有在需要时才会加载组件
// 这有助于提高应用的初始加载性能
const Home = () => import('../views/Home.vue')
const Register = () => import('../views/Register.vue')
const Login = () => import('../views/Login.vue')
const Dashboard = () => import('../views/Dashboard.vue')

// 定义路由映射表
// 每个路由对象包含路径(path)和对应的组件(component)
// 某些路由还可以有额外的元数据(meta)，如requiresAuth表示需要身份验证
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true } // 这个路由需要身份验证
  }
]

// 创建路由实例
const router = createRouter({
  // 使用HTML5历史模式，这种模式利用了history.pushState API
  // 实现URL导航而无需页面刷新
  history: createWebHistory(process.env.BASE_URL),
  routes // 使用上面定义的路由映射表
})

// 全局前置守卫
// 在每次导航之前执行
// 用于保护需要身份验证的路由
router.beforeEach((to, from, next) => {
  // 检查目标路由是否需要身份验证
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  // 从localStorage获取认证令牌
  // 如果令牌存在，则认为用户已登录
  const isAuthenticated = localStorage.getItem('token')
  
  // 如果路由需要身份验证且用户未登录
  if (requiresAuth && !isAuthenticated) {
    // 重定向到登录页面
    next('/login')
  } else {
    // 否则允许导航继续
    next()
  }
})

// 导出路由实例，供main.js使用
export default router