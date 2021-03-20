


const mongoose = require ("mongoose")

// const {BaseModel, BaseSchema } = require("../cores/mongoose/BaseModel")
const {BaseModel, BaseSchema } = require("./mongoose/baseModel")

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

module.exports = mongoose.model(collectionName,UsersSchema,collectionName)