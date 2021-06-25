const router = require('express').Router()
const { categoryController } = require('../controllers')
const { isAuthenticated } = require('../middlewares')

router.post('/', isAuthenticated, categoryController.create)
router.get('/', categoryController.list)
router.get('/:id', categoryController.get)
router.put('/:id', isAuthenticated, categoryController.update)
router.delete('/:id', isAuthenticated, categoryController.delete)

module.exports.category = router
