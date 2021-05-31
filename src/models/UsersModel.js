import mongoose from 'mongoose';

import BaseModel, { BaseSchema } from '../utils/mongoose/BaseModel';

// Define collection name
const collectionName = 'user';

// Define collection schema
const UsersSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, minlength: 6, maxlength: 255 },
	password: { type: String, maxlength: 1024 }
});
// Load BaseModel
UsersSchema.loadClass(BaseModel)
UsersSchema.plugin(BaseSchema)


UsersSchema.statics.findAll = (username) => {
	// return this.default.find({
	//   	username: username,
	// })
}


// Export Model
export default mongoose.model(collectionName, UsersSchema, collectionName)