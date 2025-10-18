import * as Joi from 'joi'

export const validationSchema = Joi.object({
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_URL: Joi.string().uri().required(),
})

export const configuration = () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
  jwtSecret: process.env.JWT_SECRET || 'defaultSecretKey',
})

export const getConfigPath = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return '.env.production'
    case 'staging':
      return '.env.staging'
    case 'test':
      return '.env.test'
    default:
      return '.env.development'
  }
}
