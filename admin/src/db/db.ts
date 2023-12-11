import { ConnectOptions } from 'mongodb';
import mongoose, { Schema, Document } from 'mongoose';


const mongoURI = 'http://localhost:27017'; // Replace with your MongoDB URI

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB', err));

interface File extends Document {
  filename: string;
  // ... other file-related fields
}

const FileSchema: Schema = new Schema({
  filename: String,
  // ... other file-related fields
});

const FileModel = mongoose.model<File>('File', FileSchema);

export default FileModel;
