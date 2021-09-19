const router=require('express').Router()
const controller=require('../controller/user')
const{authenticateToken}=require('../Auth/jwt')

router.get('/home',authenticateToken,controller.getUser)
router.post('/user',controller.createUser)
router.put('/update',authenticateToken,controller.updateUser)
router.post('/login',controller.loginUser)


module.exports=router;