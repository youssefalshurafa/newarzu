import { Router } from 'express';
import {
  createCategory,
  deleteUser,
  getUser,
  getUsers,
  Login,
  Logout,
  Register,
  updateUser,
} from '../controllers/appController.js';
import verifyJWT from '../middleware/verifyJWT.js';
import refreshTokenController from '../controllers/refreshTokenController.js';
import ROLES_LIST from '../config/roles_list.js';
import verifyRoles from '../middleware/verifyRoles.js';
import { createProduct } from '../controllers/productController.js';
const router = Router();

/* Public routes */
router.route('/register').post(Register);
router.route('/login').post(Login);
router.route('/refresh').get(refreshTokenController);
/* Private routes */
router.route('/createCategory').post(createCategory);
router.route('/createProduct').post(createProduct);
router.route('/updateUser').put(verifyJWT, updateUser);
router.route('/user').get(verifyJWT, getUser);
router.route('/users').get(verifyJWT, verifyRoles(ROLES_LIST.Admin), getUsers);
router.route('/logout').get(Logout);
router
  .route('/delete')
  .delete(verifyJWT, verifyRoles(ROLES_LIST.Admin), deleteUser);

export default router;
