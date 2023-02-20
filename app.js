// #1 基本伺服器呼叫
const express = require('express')
const app = express()
const port = 3000

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

// #4 載入handlebars
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

// #5 建立好model todoDB後 呼叫todoDB
const todoDB = require('./models/todoDB.js')

// # method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// #6 顯示首頁　todo-list
app.get('/', (req, res) => {
  todoDB.find()
    .lean()
    .sort({ _id: 'asc'})
    .then(todoItems => res.render('index', { todoItems }))
    .catch(err => console.log(err))
})

// #7 新增todo-item
// 導入body-parser  express已經自帶了  裝都不用裝
// const bodyParser = require('body-parser')   
app.use(express.urlencoded({ extended: true }))

app.post('/create', (req, res) => {
  const newItem = req.body.name
  return todoDB.create({name: newItem})
    .then(()=> res.redirect('/'))
    .catch(err => console.log(err))
})

// #8 detail
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return todoDB.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(err => console.error(err))
})

// #9-1 go to edit page
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return todoDB.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(err => console.error(err))
})

// #9-2 edit
app.put('/todos/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return todoDB.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// #10 Delete
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id
  todoDB.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

app.listen(port, () => {
  console.log(`Express is running on http//localhost${port}`);
})