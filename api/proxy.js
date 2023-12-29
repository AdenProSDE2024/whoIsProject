const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { name, suffix } = req.query;
  try {
    const response = await fetch(`https://whois.freeaiapi.xyz/?name=${name}&suffix=${suffix}`);
    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      res.status(response.status).send('Error fetching data');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};
