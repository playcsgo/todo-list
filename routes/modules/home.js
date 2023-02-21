// 需要引用的檔案有
// 1. express本身
// 2. express路由器
// 3. todo model

const express = require('express')
const router = express.Router()
const todoDB = require('../../models/todoDB')

// 原本首頁路由設定  本來是app.get 改成 router.get
router.get('/', (req, res) => {
  todoDB.find()
    .lean()
    .sort({ _id: 'asc'})
    .then(todoItems => res.render('index', { todoItems }))
    .catch(err => console.log(err))
})

// 匯出模組
module.exports = router