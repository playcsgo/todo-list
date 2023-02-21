// #2 宣告env來裝mongoDB字串  安裝dotenv後宣告, 不在正式程式使用
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// #3 使用mongoose 透過.env連線到mongoDB
//    並檢查連線狀態
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)  //要在connect之前
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error', ()=> {
  console.log('mongoDB error!!');
})
db.once('open', () => {
  console.log('mongoDB connected!!');
})

module.exports = db