import mongoose from "mongoose"
import { User } from "./schemas/user.schema.js"
import { MONGO_DB_NAME, MONGO_URL } from "../config.js"

mongoose.connect(MONGO_URL, { dbName: MONGO_DB_NAME })

export class UserModel {
  static async findUser(username, password) {
    try{
      const user = await User.findOne({
        username: username,
        password: password
      })

      return user ?? false
    }

    catch (error) {
      throw new Error(error)
    }
  }

  static async register(username, password) {
    
    const user = new User({
      username,
      password
    })

    try {
      const newUser = await user.save()
      return newUser
    }
 
    catch (error) {
      throw new Error(error)
    }
  }
}