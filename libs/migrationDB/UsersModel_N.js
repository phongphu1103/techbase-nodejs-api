


const mongoose = require ("mongoose")

const {BaseModel_N, BaseSchema_N } = require("./mongoose/baseModel_N")
// Define collection name
const collectionNameN = "userTest"

// Define collection schema
const UsersNSchema = new mongoose.Schema({
	username: { type: String, unique: true },
	password: String

})
// Load BaseModel
UsersNSchema.loadClass(BaseModel_N)
UsersNSchema.plugin(BaseSchema_N)


UsersNSchema.statics.findAll = (username) => {
	return this.default.find({
	  	username: username,
	})
}

// Export Model
// export default mongoose.model(collectionName, UsersSchema, collectionName)

module.exports = mongoose.model(collectionNameN,UsersNSchema,collectionNameN)