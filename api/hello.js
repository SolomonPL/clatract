// Simple serverless function
module.exports = (req, res) => {
  res.status(200).json({
    message: 'Hello from Clatract API!',
    timestamp: new Date().toISOString()
  });
}; 