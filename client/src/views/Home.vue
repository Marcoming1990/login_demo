<template>
  <div class="home">
    <h1>用户认证系统</h1>
    <p>欢迎使用我们的用户认证系统，这是一个基于Node.js、Vue和MySQL的完整应用。</p>
    
    <!-- 根据认证状态显示不同的按钮 -->
    <div class="action-buttons">
      <!-- 未登录用户显示注册和登录按钮 -->
      <div v-if="!isAuthenticated" class="auth-buttons">
        <router-link to="/register" class="btn btn-primary">注册</router-link>
        <router-link to="/login" class="btn btn-secondary">登录</router-link>
      </div>
      
      <!-- 已登录用户显示进入控制面板按钮 -->
      <div v-else class="dashboard-button">
        <router-link to="/dashboard" class="btn btn-success">进入控制面板</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'HomePage',
  setup() {
    const store = useStore()
    
    // 计算属性：判断用户是否已认证
    const isAuthenticated = computed(() => store.getters.isAuthenticated)
    
    return {
      isAuthenticated
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

p {
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
}

.action-buttons {
  margin-top: 40px;
}

.auth-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #42b983;
  color: white;
}

.btn-primary:hover {
  background-color: #3aa876;
}

.btn-secondary {
  background-color: #2c3e50;
  color: white;
}

.btn-secondary:hover {
  background-color: #1e2b3c;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
}
</style>