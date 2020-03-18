export const {
  APP_PORT = 4000,
  NODE_ENV = 'development',

  DB_URI = 'mongodb+srv://loginsClient:dannick@loginstest-uqa9w.gcp.mongodb.net/test?retryWrites=true&w=majority'
} = process.env

export const IN_PROD = NODE_ENV === 'production'
