import mongoose from './mongoose'
mongoose.Promise = global.Promise;


import UsersModel  from "../model/UsersModel"
import UsersModel_N from '../model/UsersModel_N'


class query {
   async getData(){

      try {
              const data = await UsersModel.findOne()
              // const data_N = await UsersModel_N.findOne()
              
              const userQuery = new UsersModel_N({
                username: data.username + Math.round(Math.random()*100),
                password: data.password
              })
              
              
              
              await userQuery.save();
              console.log(userQuery)

            //   const data_N = await UsersModel_N.findOne()
            //   console.log(data_N.username)
            //   console.log(data)

      } catch (error) {
                if( process.env.NODE_ENV !== "test") console.log("|>>>>>>>>>>>>>>>>>>>>>>> Cannot Connect Mongo Database")
        }
    }    

}
    
    export default new query()


