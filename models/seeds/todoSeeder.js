// todo item的種子腳本
// 執行它等於 連線到mongoDB去建立固定的代辦事項todo
// 所以跟mongoDB 連線相關的程式碼要先複製過來

const todoDB = require('../todoDB')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongoDB connected!');
  // 連上之後建立10資料
  for (let i = 0; i < 10; i++) {
    todoDB.create({name:`name-${i}`})
  }
  console.log('done');
})