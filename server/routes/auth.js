/**
 * 用户认证路由文件
 * 这个文件处理所有与用户认证相关的API请求，包括注册、登录和获取用户信息
 */

// 导入必要的依赖包
const express = require('express');    // Express框架，用于创建路由
const bcrypt = require('bcrypt');      // bcrypt库，用于密码加密和比对
const jwt = require('jsonwebtoken');   // jsonwebtoken库，用于生成和验证JWT令牌
const router = express.Router();       // 创建Express路由器实例
const pool = require('../config/db');  // 导入数据库连接池

/**
 * 用户注册路由
 * 处理POST请求到/register路径
 * 接收用户名、邮箱和密码，创建新用户并返回JWT令牌
 */
router.post('/register', async (req, res) => {
  try {
    // 从请求体中解构获取用户提交的数据
    const { username, email, password } = req.body;
    
    // 验证所有必填字段是否都已提供
    if (!username || !email || !password) {
      // 如果有字段缺失，返回400错误
      return res.status(400).json({ message: '所有字段都是必填的' });
    }
    
    // 检查数据库中是否已存在相同用户名或邮箱的用户
    // pool.query返回一个数组，第一个元素是查询结果
    const [existingUsers] = await pool.query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email] // 参数化查询，防止SQL注入攻击
    );
    
    // 如果查询结果不为空，说明用户已存在
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: '用户名或邮箱已被使用' });
    }
    
    // 使用bcrypt加密密码，这是一种单向加密，无法解密
    // 首先生成一个随机的盐值
    const salt = await bcrypt.genSalt(10); // 10是加密的复杂度
    // 使用盐值和密码生成加密后的密码哈希
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // 将新用户信息插入数据库
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword] // 存储加密后的密码，而不是原始密码
    );
    
    // 生成JWT令牌，用于后续认证
    // jwt.sign方法接收三个参数：有效载荷、密钥和选项
    const token = jwt.sign(
      { id: result.insertId, username }, // 有效载荷，包含用户ID和用户名
      process.env.JWT_SECRET,           // 密钥，从环境变量中读取
      { expiresIn: '1h' }               // 选项，设置令牌有效期为1小时
    );
    
    // 返回成功响应，包括令牌和用户信息
    res.status(201).json({
      message: '注册成功',
      token,                                        // JWT令牌
      user: { id: result.insertId, username, email } // 用户基本信息（不包含密码）
    });
  } catch (error) {
    // 捕获并处理任何可能发生的错误
    console.error(error); // 在控制台记录错误
    res.status(500).json({ message: '服务器错误' }); // 返回500错误响应
  }
});

/**
 * 用户登录路由
 * 处理POST请求到/login路径
 * 验证用户凭据并返回JWT令牌
 */
router.post('/login', async (req, res) => {
  try {
    // 从请求体中解构获取用户名和密码
    const { username, password } = req.body;
    
    // 验证所有必填字段是否都已提供
    if (!username || !password) {
      // 如果有字段缺失，返回400错误
      return res.status(400).json({ message: '所有字段都是必填的' });
    }
    
    // 根据用户名在数据库中查找用户
    const [users] = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username] // 参数化查询，防止SQL注入攻击
    );
    
    // 如果没有找到用户，返回错误
    // 注意：出于安全考虑，我们不明确说明是用户名不存在，而是使用通用错误消息
    if (users.length === 0) {
      return res.status(400).json({ message: '无效的凭据' });
    }
    
    // 获取找到的用户对象
    const user = users[0];
    
    // 使用bcrypt比较提供的密码和数据库中存储的加密密码
    // bcrypt.compare会自动处理盐值和加密过程
    const isMatch = await bcrypt.compare(password, user.password);
    
    // 如果密码不匹配，返回错误
    if (!isMatch) {
      return res.status(400).json({ message: '无效的凭据' });
    }
    
    // 密码验证成功，生成JWT令牌
    const token = jwt.sign(
      { id: user.id, username: user.username }, // 有效载荷，包含用户ID和用户名
      process.env.JWT_SECRET,                   // 密钥，从环境变量中读取
      { expiresIn: '1h' }                       // 选项，设置令牌有效期为1小时
    );
    
    // 返回成功响应，包括令牌和用户信息
    res.json({
      message: '登录成功',
      token,                                                    // JWT令牌
      user: { id: user.id, username: user.username, email: user.email } // 用户基本信息（不包含密码）
    });
  } catch (error) {
    // 捕获并处理任何可能发生的错误
    console.error(error); // 在控制台记录错误
    res.status(500).json({ message: '服务器错误' }); // 返回500错误响应
  }
});

/**
 * 根路径路由
 * 处理GET请求到根路径
 * 返回简单的API状态信息
 */
router.get('/', (req, res) => {
  res.json({ message: 'Auth API is running' });
});

/**
 * 获取当前用户信息路由
 * 处理GET请求到/me路径
 * 验证JWT令牌并返回当前登录用户的信息
 */
router.get('/me', async (req, res) => {
  try {
    // 从请求头中获取JWT令牌
    // 前端应在每个需要认证的请求中，在x-auth-token头部包含令牌
    const token = req.header('x-auth-token');
    
    // 检查令牌是否存在
    if (!token) {
      // 如果没有提供令牌，返回401未授权错误
      return res.status(401).json({ message: '没有令牌，授权被拒绝' });
    }
    
    // 验证令牌并解码其中的信息
    // jwt.verify会检查令牌的有效性、是否过期，并返回解码后的数据
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 使用解码后的用户ID查询数据库获取用户信息
    // 注意我们只选择了id、username和email字段，不包括密码
    const [users] = await pool.query(
      'SELECT id, username, email FROM users WHERE id = ?',
      [decoded.id] // 使用令牌中的用户ID
    );
    
    // 检查是否找到了用户
    if (users.length === 0) {
      // 如果用户不存在，返回404错误
      return res.status(404).json({ message: '用户不存在' });
    }
    
    // 返回用户信息
    res.json(users[0]);
  } catch (error) {
    // 捕获并处理错误
    console.error(error);
    
    // 特别处理JWT验证错误
    if (error.name === 'JsonWebTokenError') {
      // 如果令牌无效（格式错误、签名无效等），返回401未授权错误
      return res.status(401).json({ message: '令牌无效' });
    }
    
    // 处理其他类型的错误
    res.status(500).json({ message: '服务器错误' });
  }
});

// 导出路由器，使其可以在index.js中使用
module.exports = router;