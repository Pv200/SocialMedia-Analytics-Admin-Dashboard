// pages/api/proxy.js
export default async function handler(req, res) {
    const response = await fetch('https://api.socialverseapp.com/admin/dashboard', {
      headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }, // If required
    });
  
    const data = await response.json();
    res.status(response.status).json(data);
  }
  