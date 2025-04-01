<template>
  <div class="dashboard-container">
    <h1>用户控制面板</h1>
    
    <!-- 用户信息区域 -->
    <div class="user-info-card" v-if="user">
      <h2>欢迎回来，{{ user.username }}</h2>
      <p class="user-email">邮箱：{{ user.email }}</p>
      
      <!-- 退出登录按钮 -->
      <button @click="logout" class="btn-logout">退出登录</button>
    </div>
    <div v-else class="loading-message">
      <p>加载用户信息中...</p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'DashboardPage',
  setup() {
    // 使用Vuex store和Vue Router
    const store = useStore()
    const router = useRouter()
    
    // 从store获取用户信息
    const user = computed(() => store.getters.user)
    
    // 退出登录处理函数
    const logout = async () => {
      try {
        // 先进行路由跳转，再清除用户数据
        router.push('/login')
        
        // 调用Vuex store的logout action
        await store.dispatch('logout')
      } catch (error) {
        console.error('登出过程中发生错误:', error)
      }
    }
    
    return {
      user,
      logout
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}

.user-info-card {
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  color: #42b983;
  margin-bottom: 15px;
}

.user-email {
  color: #666;
  font-size: 18px;
  margin-bottom: 30px;
}

.btn-logout {
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-logout:hover {
  background-color: #c82333;
}
</style>