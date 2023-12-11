"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileById = exports.getAllFiles = void 0;
const db_1 = __importDefault(require("../db/db")); // Assuming you have a fileDB file exporting your FileModel
const getAllFiles = async (req, res) => {
    try {
        const files = await db_1.default.find();
        res.json(files);
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};
exports.getAllFiles = getAllFiles;
const getFileById = async (req, res) => {
    const fileId = req.params.id;
    try {
        const file = await db_1.default.findById(fileId);
        if (!file) {
            res.status(404).json({ message: 'File not found' });
            return;
        }
        res.json(file);
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};
exports.getFileById = getFileById;
// Implement other CRUD operations: createFile, updateFile, deleteFile
// Example:
// export const createFile = async (req: Request, res: Response): Promise<void> => {
//   // Logic to create a new file
// };
//# sourceMappingURL=admin.controller.js.map