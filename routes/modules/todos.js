const express = require('express')
const router = express.Router()
const todoDB = require('../../models/todoDB')


// #7 新增todo-item
// 導入body-parser  express已經自帶了  裝都不用裝
// const bodyParser = require('body-parser')   
router.use(express.urlencoded({ extended: true }))

router.post('/create', (req, res) => {
  const newItem = req.body.name
  return todoDB.create({name: newItem})
    .then(()=> res.redirect('/'))
    .catch(err => console.log(err))
})

// #8 detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  return todoDB.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(err => console.error(err))
})

// #9-1 go to edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return todoDB.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(err => console.error(err))
})

// #9-2 edit
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const id = req.params.id
  todoDB.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})


module.exports = router