// userRoutes.ts
import express from 'express';
import userController from '../controllers/userController';
import { authMiddleware, selfMiddleware } from '../middleware/authMiddleware';
import { adminMiddleware } from '../middleware/routeMiddleware';
const router = express.Router();


// Protected routes
router.get('/', adminMiddleware, userController.getAllUsers);
// should be adminMiddleware or selfMiddleware
router.get('/:id', selfMiddleware, userController.getUserById);
router.delete('/:id', adminMiddleware, userController.deleteUser);

router.put('/:userId/edit', userController.editUser);
export default router;
