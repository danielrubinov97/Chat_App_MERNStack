import { User } from '../models'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import Joi from 'joi'
import { signUp, signIn } from '../schemas'
import { attemptSignIn, signOut } from '../auth'

export default {
  Query: {
    me: (root, args, { req }, info) => {
      // TODO: projection typeDefs

      return User.findById(req.session.userId)
    },
    users: (root, args, { req }, info) => {
      // TODO: projection, pagination

      return User.find({})
    },
    user: (root, { id }, { req }, info) => {
      // TODO: projection
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError('User ID is not a valid Object ID.')
      }

      return User.findById(id)
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      // TODO: not auth, validation

      await Joi.validate(args, signUp, { abortEarly: false })

      const user = await User.create(args)

      req.session.userId = user.id

      return user
    },
    signIn: async (root, args, { req }, info) => {
      await Joi.validate(args, signIn, { abortEarly: false })

      const user = await attemptSignIn(args.email, args.password)

      req.session.userId = user.id

      return user
    },
    signOut: (root, args, { req, res }, info) => {
      return signOut(req, res)
    }
  }
}
