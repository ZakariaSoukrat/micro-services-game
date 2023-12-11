import { Request, Response } from 'express';
import FileModel from '../db/db'; // Assuming you have a fileDB file exporting your FileModel

export const getAllFiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = await FileModel.find();
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getFileById = async (req: Request, res: Response): Promise<void> => {
  const fileId = req.params.id;

  try {
    const file = await FileModel.findById(fileId);
    if (!file) {
      res.status(404).json({ message: 'File not found' });
      return;
    }
    res.json(file);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Implement other CRUD operations: createFile, updateFile, deleteFile
// Example:
// export const createFile = async (req: Request, res: Response): Promise<void> => {
//   // Logic to create a new file
// };
