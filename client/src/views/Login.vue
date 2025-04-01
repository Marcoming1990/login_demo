<template>
  <div class="login-container">
    <h1>用户登录</h1>
    
    <!-- 错误提示区域 -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    
    <!-- 登录表单 -->
    <form @submit.prevent="submitForm" class="login-form">
      <!-- 用户名输入框 -->
      <div class="form-group">
        <label for="username">用户名</label>
        <input 
          type="text" 
          id="username" 
          v-model="username" 
          required 
          placeholder="请输入用户名"
        >
      </div>
      
      <!-- 密码输入框 -->
      <div class="form-group">
        <label for="password">密码</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          required 
          placeholder="请输入密码"
        >
      </div>
      
      <!-- 提交按钮 -->
      <button type="submit" class="btn-login" :disabled="loading">
        {{ loading ? '登录中...' : '登录' }}
      </button>
    </form>
    
    <!-- 注册链接 -->
    <div class="register-link">
      没有账号？<router-link to="/register">点击注册</router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginPage',
  setup() {
    // 使用Vuex store和Vue Router
    const store = useStore()
    const router = useRouter()
    
    // 表单数据
    const username = ref('')
    const password = ref('')
    
    // 状态变量
    const loading = ref(false)
    const error = ref('')
    
    // 表单提交处理函数
    const submitForm = async () => {
      // 重置错误信息
      error.value = ''
      
      // 设置加载状态
      loading.value = true
      
      try {
        // 调用Vuex store的login action
        await store.dispatch('login', {
          username: username.value,
          password: password.value
        })
        
        // 登录成功，重定向到控制面板
        router.push('/dashboard')
      } catch (err) {
        // 处理登录错误
        error.value = err.response?.data?.message || '登录失败，请检查用户名和密码'
      } finally {
        // 无论成功或失败，都结束加载状态
        loading.value = false
      }
    }
    
    return {
      username,
      password,
      loading,
      error,
      submitForm
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
}

.login-form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: #42b983;
}

.btn-login {
  width: 100%;
  padding: 12px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-login:hover {
  background-color: #1e2b3c;
}

.btn-login:disabled {
  background-color: #6c8aab;
  cursor: not-allowed;
}

.register-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.register-link a {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>