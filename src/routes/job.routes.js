const router = require('express').Router()
const { jobController } = require('../controllers')
const { isAuthenticated } = require('../middlewares')

router.post('/', isAuthenticated, jobController.create)
router.get('/:id', jobController.get)
router.get('/', jobController.list)
router.put('/:id', isAuthenticated, jobController.update)
router.delete('/:id', isAuthenticated, jobController.delete)

module.exports.job = router
