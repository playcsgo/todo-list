const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  done: {
    type: Boolean
  }
})

module.exports = mongoose.model('todo-item', todoSchema)
// 資料庫中collection的檔名會是這邊的'todo-item' 加 s