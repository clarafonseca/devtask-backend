const router = require('express').Router()
const { projectController } = require('../controllers')
const { isAuthenticated } = require('../middlewares')

router.post('/', isAuthenticated, projectController.create)
router.get('/:id', projectController.get)
router.get('/', projectController.list)
router.put('/:id', isAuthenticated, projectController.update)
router.delete('/:id', isAuthenticated, projectController.delete)

module.exports.project = router
