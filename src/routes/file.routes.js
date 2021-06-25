const router = require('express').Router()
const multer = require('multer')
const multerConfig = require('../config/multer')
const { imageController } = require('../controllers')
const { isAuthenticated } = require('../middlewares')

router.get('/', imageController.list)
router.get('/:id', imageController.get)
router.post('/', isAuthenticated, multer(multerConfig).single('file'), imageController.create)
router.delete('/:id', isAuthenticated, imageController.delete)

module.exports.file = router
