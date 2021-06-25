const router = require('express').Router()
const { devController } = require('../controllers')
const { isAuthenticated } = require('../middlewares')

router.post('/', devController.create)
router.get('/', devController.list)
router.get('/:userId', devController.get)
router.put('/', isAuthenticated, devController.update)
router.delete('/', isAuthenticated, devController.delete)

module.exports.dev = router
