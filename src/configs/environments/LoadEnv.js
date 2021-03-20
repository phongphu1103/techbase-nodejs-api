import fs from "fs"
import dotenv from "dotenv"

dotenv.config({path: __dirname + "/.env"})
const NODE_ENV = process.env.NODE_ENV || "development"

const envConfig = dotenv.parse(fs.readFileSync(__dirname + `/.env.${NODE_ENV.toLowerCase()}`))
// Override variables
for (const k in envConfig) {
    process.env[k] = envConfig[k]
}
