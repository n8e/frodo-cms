module.exports = {
  'database': process.env.DATABASE || 'mongodb://localhost/docms',
  'port': process.env.PORT || 3000,
  'secretKey': process.env.SECRET_KEY || 'YoUrS3cr3tK3y',
  'codeClimateRepoToken': process.env.CODECLIMATE_REPO_TOKEN || 
  '568f4a1796095db71636f201fa72ea5d7dd7c9d85ffd506fd0e78e9c3cc1cd94' 
};