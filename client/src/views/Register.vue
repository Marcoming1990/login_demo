<template>
  <div class="register-container">
    <h1>用户注册</h1>
    
    <!-- 错误提示区域 -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    
    <!-- 注册表单 -->
    <form @submit.prevent="submitForm" class="register-form">
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
      
      <!-- 邮箱输入框 -->
      <div class="form-group">
        <label for="email">邮箱</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          required 
          placeholder="请输入邮箱地址"
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
      
      <!-- 确认密码输入框 -->
      <div class="form-group">
        <label for="confirmPassword">确认密码</label>
        <input 
          type="password" 
          id="confirmPassword" 
          v-model="confirmPassword" 
          required 
          placeholder="请再次输入密码"
        >
      </div>
      
      <!-- 提交按钮 -->
      <button type="submit" class="btn-register" :disabled="loading">
        {{ loading ? '注册中...' : '注册' }}
      </button>
    </form>
    
    <!-- 登录链接 -->
    <div class="login-link">
      已有账号？<router-link to="/login">点击登录</router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'RegisterPage',
  setup() {
    // 使用Vuex store和Vue Router
    const store = useStore()
    const router = useRouter()
    
    // 表单数据
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    
    // 状态变量
    const loading = ref(false)
    const error = ref('')
    
    // 表单提交处理函数
    const submitForm = async () => {
      // 重置错误信息
      error.value = ''
      
      // 验证密码和确认密码是否匹配
      if (password.value !== confirmPassword.value) {
        error.value = '两次输入的密码不匹配'
        return
      }
      
      // 设置加载状态
      loading.value = true
      
      try {
        // 调用Vuex store的register action
        await store.dispatch('register', {
          username: username.value,
          email: email.value,
          password: password.value
        })
        
        // 注册成功，重定向到控制面板
        router.push('/dashboard')
      } catch (err) {
        // 处理注册错误
        error.value = err.response?.data?.message || '注册失败，请稍后再试'
      } finally {
        // 无论成功或失败，都结束加载状态
        loading.value = false
      }
    }
    
    return {
      username,
      email,
      password,
      confirmPassword,
      loading,
      error,
      submitForm
    }
  }
}
</script>

<style scoped>
.register-container {
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

.register-form {
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

.btn-register {
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-register:hover {
  background-color: #3aa876;
}

.btn-register:disabled {
  background-color: #95d5b2;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.login-link a {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>