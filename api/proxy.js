const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { name, suffix } = req.query;
  try {
    const whoisResponse = await fetch(`https://whois.freeaiapi.xyz/?name=${name}&suffix=${suffix}`);
    
    // Convert to JSON regardless of response type
    const data = await whoisResponse.text();
    try {
      const jsonData = JSON.parse(data);
      res.status(whoisResponse.status).json(jsonData);
    } catch (error) {
      // If not JSON, send as error message
      res.status(whoisResponse.status).json({ error: data });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
