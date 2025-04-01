/**
 * 服务器入口文件
 * 这个文件是整个后端应用的入口点，负责创建和配置Express服务器
 */

// 导入必要的依赖包
const express = require('express'); // Express框架，用于创建Web服务器
const cors = require('cors');       // CORS中间件，允许跨域请求
const dotenv = require('dotenv');   // dotenv，用于加载环境变量

// 加载.env文件中的环境变量到process.env对象中
// 这样我们就可以通过process.env访问这些变量
dotenv.config();

// 创建Express应用实例
const app = express();
// 设置服务器端口，优先使用环境变量中的PORT，如果没有则使用3000
const PORT = process.env.PORT || 3000;

// 配置中间件
app.use(cors());         // 启用CORS，允许前端应用从不同域名访问API
app.use(express.json()); // 解析JSON格式的请求体数据

// 配置API路由
// 将所有以'/api/auth'开头的请求路由到auth.js文件处理
app.use('/api/auth', require('./routes/auth'));

// 启动HTTP服务器并监听指定端口
app.listen(PORT, () => {
  // 服务器成功启动后在控制台输出信息
  console.log(`服务器已在端口 ${PORT} 上启动`);
});