var envVariables = {
  'database': process.env.DATABASE_URL,
  'testDB': process.env.TEST_DATABASE_URL,
  'port': process.env.PORT,
  'secretKey': process.env.SECRET_KEY
};

module.exports = {
  development: envVariables,
  staging: envVariables,
  production: envVariables,
  test: envVariables
};