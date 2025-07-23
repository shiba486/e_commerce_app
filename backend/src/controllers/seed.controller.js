import { User } from "../models/user.model.js"
import data from "../data.js"

export const seedUser = async (req,res,next)=>{
    try {
        //deleting all existing user
      await User.deleteMany({})
      
      //inserting new user
      const users = await User.insertMany(data.users)

    //   successfull response
    return res.status(201).json(users)

    } catch (error) {
        next(error)
    }
    return res.send("hello world")
}