<template>
  <!-- 模板部分，定义组件的HTML结构 -->
  <div class="hello">
    <!-- 使用双大括号语法显示传入的msg属性 -->
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
/**
 * HelloWorld组件脚本部分
 * 定义组件的JavaScript逻辑和属性
 */
export default {
  // 组件名称
  name: 'HelloWorld',
  // 定义组件接收的属性
  props: {
    // msg属性，类型为String
    // 这个属性是从父组件App.vue传递过来的
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- scoped属性确保这些样式只应用于当前组件，不会影响其他组件 -->
<style scoped>
/* 三级标题样式 */
h3 {
  margin: 40px 0 0; /* 设置上外边距为40px，左右为0 */
}
/* 无序列表样式 */
ul {
  list-style-type: none; /* 移除列表项的默认标记 */
  padding: 0; /* 移除内边距 */
}
/* 列表项样式 */
li {
  display: inline-block; /* 设置为内联块元素，使列表项水平排列 */
  margin: 0 10px; /* 设置左右外边距为10px */
}
/* 链接样式 */
a {
  color: #42b983; /* 设置链接颜色为Vue的绿色 */
}
</style>
