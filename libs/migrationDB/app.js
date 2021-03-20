import AppConfig from "./config/AppConfig"
import http from "http"
import query from './query/getData'

// Start Htpp Server
const server = http.createServer()
server.listen(AppConfig.API_SERVER_PORT, _ => {
  if( process.env.NODE_ENV !== "test") console.log(`|>>>>>>>>>>>>>>>>>>>>>>> Server is listening on port: ${AppConfig.API_SERVER_PORT}`)

  query.getData()
    
})

export default server
