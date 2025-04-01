<template>
  <div id="app">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link to="/" class="logo">
          <img alt="Vue logo" src="./assets/logo.png" class="logo-img">
          <span>用户认证系统</span>
        </router-link>
      </div>
      
      <div class="navbar-menu">
        <!-- 未登录用户显示注册和登录链接 -->
        <template v-if="!isAuthenticated">
          <router-link to="/register" class="nav-link">注册</router-link>
          <router-link to="/login" class="nav-link">登录</router-link>
        </template>
        
        <!-- 已登录用户显示控制面板和登出链接 -->
        <template v-else>
          <router-link to="/dashboard" class="nav-link">控制面板</router-link>
          <a href="#" @click.prevent="logout" class="nav-link">登出</a>
        </template>
      </div>
    </nav>
    
    <!-- 主内容区域 - 路由视图 -->
    <main class="main-content">
      <router-view />
    </main>
    
    <!-- 页脚 -->
    <footer class="footer">
      <p>&copy; 2023 用户认证系统 - 基于Node.js、Vue和MySQL</p>
    </footer>
  </div>
</template>

<script>
/**
 * 脚本部分，定义组件的JavaScript逻辑
 */
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  // 组件名称
  name: 'App',
  
  // 使用组合式API
  setup() {
    const store = useStore()
    const router = useRouter()
    
    // 计算属性：判断用户是否已认证
    const isAuthenticated = computed(() => store.getters.isAuthenticated)
    
    // 登出方法
    const logout = async () => {
      await store.dispatch('logout')
      router.push('/login')
    }
    
    return {
      isAuthenticated,
      logout
    }
  }
}
</script>

<style>
/**
 * 样式部分，定义组件的CSS样式
 */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 导航栏样式 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #42b983;
  font-weight: bold;
  font-size: 1.2rem;
}

.logo-img {
  height: 30px;
  margin-right: 10px;
}

.navbar-menu {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: #2c3e50;
  text-decoration: none;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #f5f5f5;
}

.router-link-active {
  color: #42b983;
  font-weight: bold;
}

/* 主内容区域样式 */
.main-content {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

/* 页脚样式 */
.footer {
  text-align: center;
  padding: 20px;
  background-color: #f8f8f8;
  color: #666;
  margin-top: auto;
}
/* 全局样式 */
#app {
  /* 字体平滑处理，提高显示效果 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* 文本居中对齐 */
  text-align: center;
  /* 文本颜色 */
  color: #2c3e50;
  /* 顶部外边距 */
  margin-top: 60px;
}
</style>
