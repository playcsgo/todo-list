//  routes-1 建立專案路由器
const express = require('express')
const todos = require('./modules/todos')
const router = express.Router()

const home = require('./modules/home')
router.use('/', home)       // 路由是 '/' 就導向 home.js
router.use('/todos', todos)  // 路由是 '/todos' 就導向 todos.js 
// 匯出路由器

module.exports = router

