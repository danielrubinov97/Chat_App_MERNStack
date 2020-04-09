import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import redis from 'redis'
import connectRedis from 'connect-redis'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { APP_PORT, IN_PROD, DB_URI, SESS_SECRET, SESS_NAME, SESS_LIFETIME, REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from './config'
import schemaDirectives from './directives'

(async () => {
  try {
    await mongoose.connect(DB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

    const app = express()

    app.disable('x-powered-by')

    const RedisStore = connectRedis(session)
    const redisClient = redis.createClient({
      port: REDIS_PORT,
      host: REDIS_HOST
    })
    redisClient.auth(REDIS_PASSWORD)

    const store = new RedisStore({
      client: redisClient
    })

    app.use(session({
      store,
      name: SESS_NAME,
      secret: SESS_SECRET,
      resave: true,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        maxAge: parseInt(SESS_LIFETIME),
        sameSite: true,
        secure: IN_PROD
      }
    }))

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      playground: IN_PROD ? false : {
        settings: {
          'request.credentials': 'include'
        }
      },
      context: ({ req, res }) => ({ req, res })
    })

    server.applyMiddleware({ app, cors: false })

    app.listen({ port: APP_PORT }, () => {
      console.log(`http://localhost:${APP_PORT}${server.graphqlPath}`)
    })
  } catch (e) {
    console.error(e)
  }
})()
