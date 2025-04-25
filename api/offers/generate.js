// Offers API endpoint
module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { description } = req.body || {};
  
  res.status(200).json({
    success: true,
    data: {
      oneLiner: "AI-powered clarity for compelling service offers",
      elevatorPitch: `Our service helps freelancers create clear messaging ${description ? 'for ' + description : ''} to attract ideal clients.`
    }
  });
}; 