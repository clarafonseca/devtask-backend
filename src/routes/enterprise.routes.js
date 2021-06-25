const router = require('express').Router()
const { enterpriseController } = require('../controllers')
const { isAuthenticated } = require('../middlewares')

router.post('/', enterpriseController.create)
router.get('/', enterpriseController.list)
router.get('/:userId', enterpriseController.get)
router.put('/', isAuthenticated, enterpriseController.update)
router.delete('/', isAuthenticated, enterpriseController.delete)

module.exports.enterprise = router
