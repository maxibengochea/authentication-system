import { UserModel } from "../models/user.model.js"
import { AuthValidator } from "../validators/auth.validator.js"

export class UserController{
  static async register(req, res){
    const body = req.body ?? {}
    const validationUsername = AuthValidator.username(body)
    const validationPassWord = AuthValidator.password(body)

    if (!validationUsername.valid) {
      return res.status(400).json({ message: validationUsername.message })
    }

    if (!validationPassWord.valid) {
      return res.status(400).json({ message: validationPassWord.message })
    }

    const { username, password } = body
    let existsUser

    try {
      existsUser = await UserModel.findUser(username, password)
    }

    catch (error) {
      return res.status(500).json({ message: error.message })
    }

    if (!existsUser) {
      try {
        const newUser = await UserModel.register(username, password)
        res.status(201).json(newUser)
      }

      catch (error) {
        res.status(500).json({ message: error.message })
      }
    }

    else 
      res.status(409).json({ message: 'User already registred' })
  }

  static async login(req, res) {
    const body = req.body ?? {}
    const validationUsername = AuthValidator.username(body)
    const validationPassWord = AuthValidator.password(body)

    if (!validationUsername.valid) {
      return res.status(400).json({ message: validationUsername.message })
    }

    if (!validationPassWord.valid) {
      return res.status(400).json({ message: validationPassWord.message })
    }

    const { username, password } = body
    let user

    try {
      user = await UserModel.findUser(username, password)

      if (user) 
        return res.status(200).json(user)
       
      res.status(409).json({ message: 'User not registred' })
    }

    catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}