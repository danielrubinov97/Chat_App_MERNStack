export const {
  APP_PORT = 4000,
  NODE_ENV = 'development',

  DB_URI = 'mongodb+srv://loginsClient:dannick@loginstest-uqa9w.gcp.mongodb.net/test?retryWrites=true&w=majority',

  SESS_NAME = 'sid',
  SESS_SECRET = 'RICHARDphillipsFeynman6.63',
  SESS_LIFETIME = 1000 * 60 * 15, // 15 Minutes

  REDIS_HOST = 'redis-17498.c114.us-east-1-4.ec2.cloud.redislabs.com',
  REDIS_PORT = 17498,
  REDIS_PASSWORD = 'rvf5iviihCUyRDNtC05WTfemAbSW0qjr'
} = process.env

export const IN_PROD = NODE_ENV === 'production'
