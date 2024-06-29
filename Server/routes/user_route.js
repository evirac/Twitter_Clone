const router = require('express').Router();
const UserController = require('../controllers/user_controller');
const auth = require('../middleware/auth');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/profile', auth, UserController.getProfile);
router.put('/profile', auth, UserController.updateProfile);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/update/:id', UserController.updateUserDetails);

module.exports = router;
