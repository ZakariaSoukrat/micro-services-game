import express from 'express';
import * as fileController from '../controllers/admin.controller';

const router = express.Router();

router.get('/', fileController.getAllFiles);
router.get('/:id', fileController.getFileById);
// Define other routes for CRUD operations
// Example:
// router.post('/', fileController.createFile);
// router.put('/:id', fileController.updateFile);
// router.delete('/:id', fileController.deleteFile);

export default router;
