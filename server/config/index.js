var envVariables =  {
  'database': process.env.DATABASE_URL,
  'port': process.env.PORT,
  'secretKey': process.env.SECRET_KEY,
  'codeClimateRepoToken': process.env.CODECLIMATE_REPO_TOKEN
};

module.exports = {
  development: envVariables,
  staging: envVariables,
  production: envVariables,
  test: envVariables
};