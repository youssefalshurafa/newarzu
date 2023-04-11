import { Router } from 'express';
import {
  createCategory,
  deleteCategory,
  deleteOrder,
  deleteUser,
  getAllOrders,
  getCategories,
  getUser,
  getUsers,
  Login,
  Logout,
  newOrder,
  Register,
  updateUser,
} from '../controllers/appController.js';
import verifyJWT from '../middleware/verifyJWT.js';
import refreshTokenController from '../controllers/refreshTokenController.js';
import ROLES_LIST from '../config/roles_list.js';
import verifyRoles from '../middleware/verifyRoles.js';
import {
  createProduct,
  deleteImage,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from '../controllers/productController.js';
const router = Router();

/* Public routes */
router.route('/register').post(Register);
router.route('/login').post(Login);
router.route('/refresh').get(refreshTokenController);

router.route('/newOrder').post(newOrder);

router.route('/getAllProducts').get(getAllProducts);
router.route('/getCategories').get(getCategories);
/* Private routes */
router.route('/deleteOrder').delete(verifyJWT, deleteOrder);
router.route('/getAllOrders').get(verifyJWT, getAllOrders);

router.route('/createCategory').post(verifyJWT, createCategory);
router.route('/deleteCategory').delete(verifyJWT, deleteCategory);
router.route('/createProduct').post(verifyJWT, createProduct);
router.route('/deleteProduct').delete(verifyJWT, deleteProduct);
router.route('/deleteImage').delete(verifyJWT, deleteImage);
router.route('/updateProduct').put(verifyJWT, updateProduct);

router.route('/updateUser').put(verifyJWT, updateUser);
router.route('/user').get(verifyJWT, getUser);
router.route('/users').get(verifyJWT, verifyRoles(ROLES_LIST.Admin), getUsers);
router.route('/logout').get(Logout);
router
  .route('/delete')
  .delete(verifyJWT, verifyRoles(ROLES_LIST.Admin), deleteUser);

export default router;
