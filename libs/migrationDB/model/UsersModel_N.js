
import mongoose from "../query/mongoose"

import {BaseModel_N, BaseSchema_N } from "../cores/baseModel_N"
// Define collection name
const collectionName_N = "userTest"

// Define collection schema
const Users_NSchema = new mongoose.Schema({
	username: { type: String, unique: true },
	password: String

})
// Load BaseModel
Users_NSchema.loadClass(BaseModel_N)
Users_NSchema.plugin(BaseSchema_N)


Users_NSchema.statics.findAll = (username) => {
	return this.default.find({
	  	username: username,
	})
}

// Export Model
// export default mongoose.model(collectionName, UsersSchema, collectionName)

export default mongoose.db_N.model(collectionName_N,Users_NSchema,collectionName_N)