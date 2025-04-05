# 项目目录结构及文件说明

本文档详细列出项目根目录下所有文件夹及其文件的作用，不包括readme_images文件夹。

## login_demo（用户注册登录系统）

基于Node.js、Vue和MySQL的用户认证系统，实现了用户注册、登录和信息管理功能。

### 根目录文件

- `.gitattributes` - Git属性配置文件，定义项目的特定属性
- `.gitignore` - Git忽略文件配置，指定不需要版本控制的文件
- `README.md` - 项目说明文档，包含项目概述、开发流程和部署指南

### client（前端部分）

#### 根目录文件

- `.gitignore` - 前端项目Git忽略文件配置
- `README.md` - 前端项目说明文档
- `babel.config.js` - Babel配置文件，用于JavaScript代码转译
- `jsconfig.json` - JavaScript项目配置文件，提供编辑器支持
- `package.json` - 项目依赖和脚本配置文件
- `package-lock.json` - 锁定依赖版本的配置文件
- `vue.config.js` - Vue项目配置文件

#### public目录

- `favicon.ico` - 网站图标
- `index.html` - 应用入口HTML文件

#### src目录（源代码）

- `App.vue` - 应用根组件，定义整体布局
- `main.js` - 应用入口文件，创建Vue实例并挂载到DOM

##### assets目录

- `logo.png` - Vue标志图片，用于界面显示

##### components目录

- `HelloWorld.vue` - 示例组件，用于展示Vue基本功能

##### router目录

- `index.js` - 路由配置文件，定义应用的路由映射和导航守卫

##### store目录

- `index.js` - Vuex状态管理配置，管理用户认证状态和信息

##### views目录（视图组件）

- `Dashboard.vue` - 用户控制面板页面，显示用户信息和提供登出功能
- `Home.vue` - 首页组件，提供注册和登录入口
- `Login.vue` - 登录页面，处理用户登录表单和验证
- `Register.vue` - 注册页面，处理用户注册表单和验证

### server（后端部分）

#### 根目录文件

- `index.js` - 服务器入口文件，创建Express应用并配置中间件和路由
- `package.json` - 后端项目依赖和脚本配置
- `package-lock.json` - 锁定后端依赖版本的配置文件

#### config目录

- `db.js` - 数据库连接配置，创建MySQL连接池

#### routes目录

- `auth.js` - 用户认证路由，处理注册、登录和用户信息获取请求

