/**
 * 数据库连接配置文件
 * 这个文件负责创建与MySQL数据库的连接池，并导出供其他模块使用
 */

// 导入必要的依赖包
const mysql = require('mysql2/promise'); // mysql2的promise版本，支持异步/await操作
const dotenv = require('dotenv');        // 用于加载环境变量

// 加载.env文件中的环境变量
dotenv.config();

/**
 * 创建数据库连接池
 * 连接池可以重用数据库连接，提高性能并管理连接数量
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST,           // 数据库服务器地址，从.env文件读取
  user: process.env.DB_USER,           // 数据库用户名，从.env文件读取
  password: process.env.DB_PASSWORD,   // 数据库密码，从.env文件读取
  database: process.env.DB_NAME,       // 数据库名称，从.env文件读取
  waitForConnections: true,            // 当没有可用连接时，等待而不是立即失败
  connectionLimit: 10,                 // 最大连接数，限制同时连接的数量
  queueLimit: 0                        // 队列限制，0表示不限制等待连接的请求数量
});

// 导出连接池，使其可以在其他文件中使用
module.exports = pool;