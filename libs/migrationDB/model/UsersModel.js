

import mongoose from '../query/mongoose'
import {BaseModel, BaseSchema } from "../cores/baseModel"

// Define collection name
const collectionName = "user"

// Define collection schema
const UsersSchema = new mongoose.Schema({
	username: { type: String, unique: true },
	password: String

})
// Load BaseModel
UsersSchema.loadClass(BaseModel)
UsersSchema.plugin(BaseSchema)


UsersSchema.statics.findAll = (username) => {
	return this.default.find({
	  	username: username,
	})
}

// Export Model
// export default mongoose.model(collectionName, UsersSchema, collectionName)

export default mongoose.db.model(collectionName,UsersSchema,collectionName)