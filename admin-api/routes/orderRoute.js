const {Router} = require('express')
const router = Router()
const orderController = require('../controllers/orderController')
router.get('/all', orderController.get_all)
router.post('/change', orderController.changeStatus);

module.exports = router