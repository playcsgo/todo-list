// todo item的種子腳本
// 執行它等於 連線到mongoDB去建立固定的代辦事項todo
// 所以跟mongoDB 連線相關的程式碼要先複製過來

const mongoose = require('mongoose')
const todoitem = require('../todoDB.js') //載入model中的dotoDB.js
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error', () => {
  console.log('~mongoDB error~');
} )
db.once('open', () => {
  console.log('mongoDB connected!');
  // 連上之後建立10資料
  for (let i = 0; i < 10; i++) {
    todoitem.create({name:`name-${i}`})
  }
  console.log('done');
})