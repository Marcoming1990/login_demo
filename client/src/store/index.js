/**
 * 前端状态管理配置文件
 * 这个文件负责配置Vuex Store，管理应用的全局状态
 */

// 导入Vue和Vuex
import { createStore } from 'vuex'
import axios from 'axios'

// 创建并导出Store实例
export default createStore({
  // 状态：存储应用的全局数据
  state: {
    // 用户认证相关状态
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    status: ''
  },
  
  // Getters：从状态派生的计算属性
  getters: {
    // 判断用户是否已认证
    isAuthenticated: state => !!state.token,
    // 获取认证状态
    authStatus: state => state.status,
    // 获取用户信息
    user: state => state.user
  },
  
  // Mutations：用于修改状态的同步函数
  mutations: {
    // 认证请求开始
    AUTH_REQUEST(state) {
      state.status = 'loading'
    },
    // 认证成功
    AUTH_SUCCESS(state, { token, user }) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    // 认证失败
    AUTH_ERROR(state) {
      state.status = 'error'
    },
    // 清除用户认证信息（登出）
    LOGOUT(state) {
      state.status = ''
      state.token = null
      state.user = null
    }
  },
  
  // Actions：可包含异步操作的业务逻辑函数
  actions: {
    // 注册操作
    register({ commit }, userData) {
      return new Promise((resolve, reject) => {
        // 标记认证请求开始
        commit('AUTH_REQUEST')
        
        // 发送注册请求到后端API
        axios.post('http://localhost:3000/api/auth/register', userData)
          .then(response => {
            // 从响应中获取令牌和用户信息
            const { token, user } = response.data
            
            // 将令牌存储在localStorage中，用于持久化
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            
            // 设置axios的默认Authorization头
            axios.defaults.headers.common['x-auth-token'] = token
            
            // 提交认证成功mutation
            commit('AUTH_SUCCESS', { token, user })
            
            // 解析Promise
            resolve(response)
          })
          .catch(err => {
            // 提交认证失败mutation
            commit('AUTH_ERROR')
            
            // 清除localStorage中的认证数据
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            
            // 拒绝Promise
            reject(err)
          })
      })
    },
    
    // 登录操作
    login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        // 标记认证请求开始
        commit('AUTH_REQUEST')
        
        // 发送登录请求到后端API
        axios.post('http://localhost:3000/api/auth/login', credentials)
          .then(response => {
            // 从响应中获取令牌和用户信息
            const { token, user } = response.data
            
            // 将令牌存储在localStorage中，用于持久化
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            
            // 设置axios的默认Authorization头
            axios.defaults.headers.common['x-auth-token'] = token
            
            // 提交认证成功mutation
            commit('AUTH_SUCCESS', { token, user })
            
            // 解析Promise
            resolve(response)
          })
          .catch(err => {
            // 提交认证失败mutation
            commit('AUTH_ERROR')
            
            // 清除localStorage中的认证数据
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            
            // 拒绝Promise
            reject(err)
          })
      })
    },
    
    // 登出操作
    logout({ commit }) {
      return new Promise(resolve => {
        // 提交登出mutation
        commit('LOGOUT')
        
        // 清除localStorage中的认证数据
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        
        // 清除axios的默认Authorization头
        delete axios.defaults.headers.common['x-auth-token']
        
        // 解析Promise
        resolve()
      })
    },
    
    // 获取用户信息
    fetchUserProfile({ commit, state }) {
      return new Promise((resolve, reject) => {
        // 只有在已认证的情况下才发送请求
        if (!state.token) {
          reject(new Error('未认证'))
          return
        }
        
        // 发送请求获取用户信息
        axios.get('http://localhost:3000/api/auth/me', {
          headers: { 'x-auth-token': state.token }
        })
          .then(response => {
            // 更新用户信息
            const user = response.data
            localStorage.setItem('user', JSON.stringify(user))
            commit('AUTH_SUCCESS', { token: state.token, user })
            resolve(response)
          })
          .catch(err => {
            // 如果请求失败（例如令牌过期），则登出
            commit('LOGOUT')
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            delete axios.defaults.headers.common['x-auth-token']
            reject(err)
          })
      })
    }
  }
})