export const {
  APP_PORT = 4000,
  NODE_ENV = 'development',

  DB_URI = 'mongodb+srv://loginsClient:dannick@loginstest-uqa9w.gcp.mongodb.net/test?retryWrites=true&w=majority',

  SESS_NAME = 'sid',
  SESS_SECRET = 'RICHARDphillipsFeynman6.63',
  SESS_LIFETIME = 1000 * 60 * 15, // 15 Minutes

  REDIS_HOST = 'localhost',
  REDIS_PORT = 6379,
  REDIS_PASSWORD = 'secret'
} = process.env

export const IN_PROD = NODE_ENV === 'production'
