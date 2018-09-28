var envVariables = {
  'database': {
    'development': process.env.DATABASE_URL,
    'staging': process.env.DATABASE_URL,
    'production': process.env.DATABASE_URL,
    'test': process.env.TEST_DATABASE_URL
  },
  'port': process.env.PORT,
  'secretKey': process.env.SECRET_KEY
};

module.exports = {
  development: envVariables,
  staging: envVariables,
  production: envVariables,
  test: envVariables
};