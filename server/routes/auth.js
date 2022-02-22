const {Router} = require('express')
const { getUsers, newUser, login, dashboard, logout, home, forgotPass } = require('../controllers/auth')
const { updateUser } = require('../controllers/update')
const { userAuth } = require('../middlewares/auth-middleware')
const { validationMiddleware } = require('../middlewares/validation-middleware')
const { registerValidation, loginValidation, forgotPassValidation } = require('../validators/auth')
const router = Router()

router.get("/get-users", getUsers)
router.post('/signup', registerValidation, validationMiddleware, newUser)
router.post('/login', loginValidation, validationMiddleware, login)
router.post('/forgot-password', forgotPassValidation, validationMiddleware, forgotPass)
router.get('/dashboard', userAuth, dashboard)
router.get('/home', userAuth, home)
router.get('/logout', logout)
router.put('/update-user', userAuth, updateUser)

module.exports = router